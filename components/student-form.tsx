"use client"

import { useState } from "react"
import { useSWRConfig } from "swr"
import { Loader2, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createStudent, STUDENTS_KEY, type NewStudent } from "@/lib/students-api"

const initialForm: NewStudent = {
  name: "",
  email: "",
  age: 18,
  course: "",
}

export function StudentForm() {
  const { mutate } = useSWRConfig()
  const [form, setForm] = useState<NewStudent>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await createStudent({
        ...form,
        age: Number(form.age),
      })
      setForm(initialForm)
      await mutate(STUDENTS_KEY)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">
          Add a new student
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter the student&apos;s details and submit to add them to the roster.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="jane@school.edu"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min={1}
            max={120}
            required
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: Number(e.target.value) || 0 })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            required
            placeholder="Computer Science"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Adding...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" aria-hidden />
              Add Student
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
