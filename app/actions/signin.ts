'use server'

import { redirect } from "next/navigation"

export async function signInAction() {
  redirect("/api/auth/signin/google")
}