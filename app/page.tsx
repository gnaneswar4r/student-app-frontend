import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  const { userId } = await auth()
  const isSignedIn = Boolean(userId)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-28">
          <div className="flex flex-col items-center text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden />
              Built for educators
            </span>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground text-balance md:text-6xl">
              Manage your students in one secure place
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A simple dashboard to add, view, and remove students from your
              roster. Sign in to access your protected workspace.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              {isSignedIn ? (
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Go to dashboard
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href="/sign-in">
                      Log in to continue
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/sign-up">Create an account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Users className="h-5 w-5" aria-hidden />}
              title="Roster at a glance"
              description="View every enrolled student with their course and contact info in a clean, sortable table."
            />
            <FeatureCard
              icon={<GraduationCap className="h-5 w-5" aria-hidden />}
              title="Quick enrollment"
              description="Add new students in seconds with a focused form designed for fast data entry."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
              title="Secure by default"
              description="Authentication keeps your dashboard private. Only signed-in users can manage student records."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
