import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import MatchLogger from "@/components/MatchLogger" // Assuming your component is here

export default async function MatchPage() {
  const session = await auth()
  if (!session) redirect("/") // Protect the route

  // Fetch all users to populate the dropdowns
  const players = await db.user.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <MatchLogger players={players} />
      
      <a href="/" className="mt-8 text-gray-500 underline text-sm">
        ← Back to Leaderboard
      </a>
    </div>
  )
}