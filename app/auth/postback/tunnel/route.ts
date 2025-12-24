export async function GET(request: Request) {
  const url = new URL(request.url)
  const rd = url.searchParams.get('rd')
  if (rd) {
    const fullUrl = process.env.AUTH_URL + decodeURIComponent(rd)
    return new Response(null, {
      status: 302,
      headers: {
        Location: fullUrl,
      },
    })
  }
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  })
}