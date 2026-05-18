"use client"

import { useState } from "react"

import type { ICompany } from "@/models/company-model"

type IProps = {
  companies: ICompany[]
}

export function CompanyList(props: IProps) {
  const [companies, setCompanies] = useState<ICompany[]>(props.companies)
  const [name, setName] = useState("")

  const handleSave = async () => {
    if (!name) return

    const response = await fetch("/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    const company = await response.json()

    setCompanies([...companies, company])
    setName("")
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    await fetch(`/api/companies/${id}`, {
      method: "DELETE",
    })

    setCompanies(companies.filter((company) => company.id !== id))
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 max-w-md">
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Firmos pavadinimas"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-700 text-white rounded p-2"
        >
          Pridėti firmą
        </button>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Firmos pavadinimas</th>
            <th className="px-4 py-2">Veiksmai</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="border-b">
              <td className="px-4 py-2">{company.name}</td>
              <td className="px-4 py-2">
                <button
                  type="button"
                  onClick={() => handleDelete(company.id)}
                  className="text-red-600 hover:underline"
                >
                  Ištrinti
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
