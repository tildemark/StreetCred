export default function MatchLogger({ players }: { players: User[] }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Result</h2>
      
      {/* Game Selector */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold">🎯 Darts</button>
        <button className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold">♟️ Chess</button>
      </div>

      <form action={submitMatch} className="space-y-4">
        {/* Winner & Loser Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Winner</label>
            <select name="winnerId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-gray-50">
              {players.map(p => <option value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loser</label>
            <select name="loserId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 bg-gray-50">
               {players.map(p => <option value={p.id}>{p.name}</option>)}
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
            className="mt-1 block w-full text-center text-2xl tracking-widest rounded-md border-gray-300 shadow-sm p-3"
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-lg shadow hover:bg-green-700 transition">
          CONFIRM VICTORY
        </button>
      </form>
    </div>
  )
}