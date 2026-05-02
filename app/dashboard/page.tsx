import { GraduationCap } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { StudentForm } from "@/components/student-form"
import { StudentTable } from "@/components/student-table"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
          <header className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
                Student Management Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Add, view, and remove students from your roster.
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-8">
            <StudentForm />
            <StudentTable />
          </div>
        </div>
      </main>
    </div>
  )
}
