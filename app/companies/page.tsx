import { CompanyList } from "@/components/companies/company-list"
import { getApi } from "@/utils/server-api"
import type { ICompany } from "@/models/company-model"

export default async function CompaniesPage() {
  const companies = await getApi<ICompany[]>("/api/companies")

  return (
    <main className="grid gap-4">
      <h1 className="text-2xl font-bold">Firmos</h1>

      <CompanyList companies={companies ?? []} />
    </main>
  )
}
