// components/MatchLogger.tsx
'use client' // This must be a client component because it uses forms/interaction

import { submitMatch } from "@/app/actions/submit-match"
import { User } from "@prisma/client" 

export default function MatchLogger({ players }: { players: Partial<User>[] }) {
  // Note: Using Partial<User> allows passing objects that might just have id/name
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Result</h2>
      
      {/* Game Selector */}
      <div className="flex gap-4 mb-6">
        {/* We use a hidden input or state to select game, but for simplicity let's default to DARTS for now or add a selector */}
        <p className="text-sm text-gray-500 italic">Select game in the future updates</p>
      </div>

      <form action={submitMatch} className="space-y-4">
        {/* We need to pass the game type hiddenly if not selected */}
        <input type="hidden" name="game" value="DARTS" /> 
        
        {/* Winner & Loser Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Winner</label>
            <select name="winnerId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-gray-50 text-black">
              {players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loser</label>
            <select name="loserId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-gray-50 text-black">
               {players.map(p => (
                 <option key={p.id} value={p.id}>{p.name}</option>
               ))}
            </select>
          </div>
        </div>

        {/* PIN Entry */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Verify Loser's PIN</label>
          <input 
            type="password" 
            name="pin" 
            maxLength={4} 
            placeholder="****"
            className="mt-1 block w-full text-center text-2xl tracking-widest rounded-md border-gray-300 shadow-sm p-3 text-black"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-lg shadow hover:bg-green-700 transition">
          CONFIRM VICTORY
        </button>
      </form>
    </div>
  )
}