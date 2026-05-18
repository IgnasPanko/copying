"use client"

import { useState } from "react"

import { IEmployee } from "@/models/employee-model"

type IProps = {
  employees: IEmployee[]
}

export function EmployeeList(props: IProps) {
  const [employees, setEmployees] = useState<IEmployee[]>(props.employees)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleSave = async () => {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName }),
    })

    const employee = await response.json()

    setEmployees([...employees, employee])
    setFirstName("")
    setLastName("")
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    })

    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2 max-w-md">
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Vardas"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Pavardė"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-700 text-white rounded p-2 col-span-2"
        >
          Pridėti darbuotoją
        </button>
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Vardas</th>
            <th className="px-4 py-2">Pavardė</th>
            <th className="px-4 py-2">Veiksmai</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="px-4 py-2">{employee.firstName}</td>
              <td className="px-4 py-2">{employee.lastName}</td>
              <td className="px-4 py-2">
                <button
                  type="button"
                  onClick={() => handleDelete(employee.id)}
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
