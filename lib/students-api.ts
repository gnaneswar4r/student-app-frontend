export type Student = {
  id: string | number
  name: string
  email: string
  age: number
  course: string
}

export type NewStudent = Omit<Student, "id">

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? ""

function buildUrl(path: string) {
  if (!API_BASE) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Add your Railway URL to the project environment variables.",
    )
  }
  return `${API_BASE}${path}`
}

export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(buildUrl("/students"), { cache: "no-store" })
  if (!res.ok) throw new Error(`Failed to load students (${res.status})`)
  const data = await res.json()
  return Array.isArray(data) ? data : (data?.students ?? [])
}

export async function createStudent(payload: NewStudent): Promise<Student> {
  const res = await fetch(buildUrl("/students"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Failed to create student (${res.status})`)
  return res.json()
}

export async function deleteStudent(id: string | number): Promise<void> {
  const res = await fetch(buildUrl(`/students/${id}`), { method: "DELETE" })
  if (!res.ok) throw new Error(`Failed to delete student (${res.status})`)
}

export const STUDENTS_KEY = "/students"
