"use client"

import useSWR from "swr"
import { useState } from "react"
import { Loader2, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  deleteStudent,
  fetchStudents,
  STUDENTS_KEY,
  type Student,
} from "@/lib/students-api"

export function StudentTable() {
  const { data, error, isLoading, mutate } = useSWR<Student[]>(
    STUDENTS_KEY,
    fetchStudents,
  )
  const [deletingId, setDeletingId] = useState<string | number | null>(null)

  async function onDelete(id: string | number) {
    setDeletingId(id)
    try {
      // Optimistic update
      await mutate(
        async (current) => {
          await deleteStudent(id)
          return (current ?? []).filter((s) => s.id !== id)
        },
        {
          optimisticData: (current) =>
            (current ?? []).filter((s) => s.id !== id),
          rollbackOnError: true,
          revalidate: true,
        },
      )
    } catch {
      // SWR rolls back automatically; surface lightweight feedback
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Students
          </h2>
          <p className="text-sm text-muted-foreground">
            {data ? `${data.length} enrolled` : "Loading roster..."}
          </p>
        </div>
        <Users className="h-5 w-5 text-muted-foreground" aria-hidden />
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 px-6 py-12 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading students...
        </div>
      ) : error ? (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load students"}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => mutate()}
          >
            Try again
          </Button>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <Users
            className="mx-auto h-8 w-8 text-muted-foreground"
            aria-hidden
          />
          <p className="mt-2 text-sm font-medium text-card-foreground">
            No students yet
          </p>
          <p className="text-sm text-muted-foreground">
            Add your first student using the form above.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-6 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-6 py-3 font-medium text-card-foreground">
                    {student.name}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {student.email}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {student.age}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {student.course}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(student.id)}
                      disabled={deletingId === student.id}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Delete ${student.name}`}
                    >
                      {deletingId === student.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      ) : (
                        <Trash2 className="h-4 w-4" aria-hidden />
                      )}
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
