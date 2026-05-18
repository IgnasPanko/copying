import { AccountingList } from "@/components/accounting/accounting-list"
import { getApi } from "@/utils/server-api"
import type { IAccountingWithData } from "@/models/accounting-model"
import type { ICompany } from "@/models/company-model"
import type { IEmployee } from "@/models/employee-model"

export default async function AccountingPage() {
  const employees = await getApi<IEmployee[]>("/api/employees")
  const companies = await getApi<ICompany[]>("/api/companies")
  const accounting = await getApi<IAccountingWithData[]>("/api/accounting")

  return (
    <main className="grid gap-4">
      <h1 className="text-2xl font-bold">Apskaita</h1>

      <AccountingList
        employees={employees ?? []}
        companies={companies ?? []}
        accounting={accounting ?? []}
      />
    </main>
  )
}
