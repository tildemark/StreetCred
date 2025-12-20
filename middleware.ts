import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname === "/"
  
  // Allow everyone to see the Leaderboard (Dashboard)
  if (isOnDashboard) return

  // Redirect unauthenticated users to home/login for protected routes
  if (!isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl))
  }
})

// Run middleware on everything EXCEPT static files and images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}