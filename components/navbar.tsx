import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import { GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"

export async function Navbar() {
  const { userId } = await auth()
  const isSignedIn = Boolean(userId)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Student Dashboard
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton
                afterSignOutUrl="/"
                appearance={{ elements: { avatarBox: "h-8 w-8" } }}
              />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
