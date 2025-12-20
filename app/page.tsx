import { db } from "@/lib/db"
import { auth, signIn } from "@/auth"
import Link from "next/link"

export const dynamic = 'force-dynamic' // Ensure it refreshes

export default async function Home() {
  const session = await auth()
  
  // Fetch Top Players for Darts
  const dartsRankings = await db.rating.findMany({
    where: { game: 'DARTS' },
    orderBy: { elo: 'desc' },
    include: { user: true },
    take: 10
  })

  // Fetch Top Players for Chess
  const chessRankings = await db.rating.findMany({
    where: { game: 'CHESS' },
    orderBy: { elo: 'desc' },
    include: { user: true },
    take: 10
  })

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black tracking-tighter text-blue-900">STREETCRED</h1>
        {session ? (
          <Link href="/profile">
             <img src={session.user?.image || ""} className="w-10 h-10 rounded-full border-2 border-blue-500" />
          </Link>
        ) : (
          <form action={async () => { "use server"; await signIn("google") }}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-sm">Sign In</button>
          </form>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link href="/match" className="bg-emerald-500 text-white p-4 rounded-xl shadow-lg text-center font-bold">
          🎯 Log Darts
        </Link>
        <Link href="/match" className="bg-slate-700 text-white p-4 rounded-xl shadow-lg text-center font-bold">
          ♟️ Log Chess
        </Link>
      </div>

      {/* Leaderboards */}
      <div className="space-y-8">
        
        {/* Darts Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-700 mb-2">🎯 Darts Ladder</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {dartsRankings.map((r, i) => (
              <div key={r.id} className="flex items-center p-4 border-b last:border-0">
                <span className={`font-bold w-8 ${i < 3 ? 'text-amber-500 text-xl' : 'text-gray-400'}`}>#{i + 1}</span>
                <img src={r.user.image || "/placeholder.png"} className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                <div className="flex-1">
                  <div className="font-bold text-gray-800">{r.user.name}</div>
                  <div className="text-xs text-gray-500">{r.wins}W - {r.losses}L</div>
                </div>
                <div className="font-mono font-bold text-blue-600">{r.elo}</div>
              </div>
            ))}
            {dartsRankings.length === 0 && <div className="p-4 text-center text-gray-500">No matches yet. Be the first!</div>}
          </div>
        </section>

        {/* Chess Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-700 mb-2">♟️ Chess Ladder</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
             {/* Duplicate logic for Chess (or make a reusable component) */}
             {chessRankings.map((r, i) => (
              <div key={r.id} className="flex items-center p-4 border-b last:border-0">
                <span className={`font-bold w-8 ${i < 3 ? 'text-amber-500 text-xl' : 'text-gray-400'}`}>#{i + 1}</span>
                <div className="flex-1 font-bold text-gray-800 ml-2">{r.user.name}</div>
                <div className="font-mono font-bold text-slate-700">{r.elo}</div>
              </div>
            ))}
             {chessRankings.length === 0 && <div className="p-4 text-center text-gray-500">No matches yet.</div>}
          </div>
        </section>

      </div>
    </main>
  )
}