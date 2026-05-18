"use client"

import { useState } from "react"

import type { IAccountingWithData } from "@/models/accounting-model"
import type { ICompany } from "@/models/company-model"
import type { IEmployee } from "@/models/employee-model"

type IProps = {
  employees: IEmployee[]
  companies: ICompany[]
  accounting: IAccountingWithData[]
}

export function AccountingList(props: IProps) {
  const [accounting, setAccounting] = useState<IAccountingWithData[]>(
    props.accounting,
  )

  const [employeeId, setEmployeeId] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [date, setDate] = useState("")
  const [pageCount, setPageCount] = useState("")
  const [amount, setAmount] = useState("")

  const reloadAccounting = async () => {
    const response = await fetch("/api/accounting")
    const data = await response.json()

    setAccounting(data)
  }

  const handleSave = async () => {
    if (!employeeId || !companyId || !date || !pageCount || !amount) return

    await fetch("/api/accounting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId,
        companyId,
        date,
        pageCount,
        amount,
      }),
    })

    await reloadAccounting()

    setEmployeeId("")
    setCompanyId("")
    setDate("")
    setPageCount("")
    setAmount("")
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    await fetch(`/api/accounting/${id}`, {
      method: "DELETE",
    })

    setAccounting(accounting.filter((item) => item.id !== id))
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2 max-w-2xl">
        <select
          className="border border-gray-300 rounded p-2"
          value={employeeId}
          onChange={(event) => setEmployeeId(event.target.value)}
        >
          <option value="">Pasirinkite darbuotoją</option>

          {props.employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded p-2"
          value={companyId}
          onChange={(event) => setCompanyId(event.target.value)}
        >
          <option value="">Pasirinkite firmą</option>

          {props.companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>

        <input
          className="border border-gray-300 rounded p-2"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <input
          className="border border-gray-300 rounded p-2"
          type="number"
          placeholder="Lapų skaičius"
          value={pageCount}
          onChange={(event) => setPageCount(event.target.value)}
        />

        <input
          className="border border-gray-300 rounded p-2"
          type="number"
          placeholder="Gauta pinigų suma"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-700 text-white rounded p-2"
        >
          Pridėti įrašą
        </button>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Darbuotojas</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Firma</th>
            <th className="px-4 py-2">Lapų skaičius</th>
            <th className="px-4 py-2">Gauta suma</th>
            <th className="px-4 py-2">Veiksmai</th>
          </tr>
        </thead>

        <tbody>
          {accounting.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">
                {item.employee?.firstName} {item.employee?.lastName}
              </td>
              <td className="px-4 py-2">{item.date}</td>
              <td className="px-4 py-2">{item.company?.name}</td>
              <td className="px-4 py-2">{item.pageCount}</td>
              <td className="px-4 py-2">{item.amount}</td>
              <td className="px-4 py-2">
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
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
