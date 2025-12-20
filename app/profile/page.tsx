import { auth, signOut } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import QRCode from "react-qr-code" // npm install react-qr-code

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { ratings: true }
  })

  if (!user) return <div>User not found</div>

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <img src={user.image || ""} className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg" />
          <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* QR Code */}
        <div className="bg-gray-50 p-6 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <div className="bg-white p-2">
            <QRCode value={user.qrCode} size={150} />
          </div>
          <p className="mt-4 text-sm font-medium text-gray-500">Scan to verify a match</p>
        </div>

        {/* PIN Management */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-bold text-blue-900 mb-2">Security PIN</h3>
          <p className="text-sm text-blue-700 mb-4">Used when you don't have your phone.</p>
          {user.pin ? (
            <div className="text-green-600 font-bold">✅ PIN is set</div>
          ) : (
             <div className="text-red-500 font-bold">⚠️ No PIN set. Ask Admin to set one.</div>
          )}
        </div>

        {/* Sign Out */}
        <form action={async () => { "use server"; await signOut() }}>
          <button className="w-full py-3 text-red-600 font-bold border border-red-200 rounded-xl hover:bg-red-50">
            Sign Out
          </button>
        </form>

        <a href="/" className="block text-center text-gray-500 py-4">← Back Home</a>
      </div>
    </div>
  )
}