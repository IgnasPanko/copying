import { EmployeeList } from "@/components/employees/employee-list"
import { getApi } from "@/utils/server-api"
import type { IEmployee } from "@/models/employee-model"

export default async function EmployeesPage() {
  const employees = await getApi<IEmployee[]>("/api/employees")

  return (
    <main className="grid gap-4">
      <h1 className="text-2xl font-bold">Darbuotojai</h1>

      <EmployeeList employees={employees ?? []} />
    </main>
  )
}
