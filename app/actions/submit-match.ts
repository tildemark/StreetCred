'use server'

import { db } from "@/lib/db"
import { calculateElo } from "@/lib/elo"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function submitMatch(formData: FormData) {
  const winnerId = formData.get("winnerId") as string
  const loserId = formData.get("loserId") as string
  const game = formData.get("game") as "DARTS" | "CHESS"
  const pin = formData.get("pin") as string // "1234"

  // 1. Security: Verify Loser's PIN
  const loserUser = await db.user.findUnique({ where: { id: loserId } })
  if (!loserUser || !loserUser.pin) throw new Error("User has no PIN setup")
  
  const isPinValid = await bcrypt.compare(pin, loserUser.pin)
  if (!isPinValid) throw new Error("Invalid PIN")

  // 2. Get Current Ratings
  // (Helper function fetchRating would get or create default rating)
  const winnerRating = await fetchRating(winnerId, game)
  const loserRating = await fetchRating(loserId, game)

  // 3. Calculate Math
  const { winnerNew, loserNew, delta } = calculateElo(winnerRating.elo, loserRating.elo)

  // 4. Update Database (Atomic Transaction)
  await db.$transaction(async (tx) => {
    // Record Match
    await tx.match.create({
      data: {
        game,
        winnerId,
        loserId,
        eloDelta: delta,
        players: { connect: [{ id: winnerId }, { id: loserId }] }
      }
    })

    // Update Winner (Stats + Streak)
    const newStreak = winnerRating.currentStreak + 1
    await tx.rating.update({
      where: { id: winnerRating.id },
      data: {
        elo: winnerNew,
        wins: { increment: 1 },
        gamesPlayed: { increment: 1 },
        currentStreak: newStreak,
        maxStreak: Math.max(newStreak, winnerRating.maxStreak)
      }
    })

    // Update Loser (Reset Streak)
    await tx.rating.update({
      where: { id: loserRating.id },
      data: {
        elo: loserNew,
        losses: { increment: 1 },
        gamesPlayed: { increment: 1 },
        currentStreak: 0 // Streak reset!
      }
    })
    
    // TODO: Insert Achievement Check Logic here
  })

  // 5. Refresh Dashboards
  revalidatePath("/") 
}