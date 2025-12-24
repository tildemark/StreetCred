import { auth } from "@/auth"

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params.error as string

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-700 mb-4">
          There was a problem with your sign-in attempt.
        </p>
        {error && (
          <p className="text-sm text-gray-500 mb-4">
            Error: {error}
          </p>
        )}
        <a
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-blue-700"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}