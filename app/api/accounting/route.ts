import { NextResponse } from "next/server"

import { connectMongoose } from "@/utils/mongoose-client"
import { Accounting } from "@/models/accounting-model"
import { Employee } from "@/models/employee-model"
import { Company } from "@/models/company-model"

export async function GET() {
  await connectMongoose()

  const accounting = await Accounting.find()

  const result = await Promise.all(
    accounting.map(async (item) => {
      const employee = await Employee.findById(item.employeeId)
      const company = await Company.findById(item.companyId)

      return {
        id: item.id,
        employeeId: item.employeeId,
        companyId: item.companyId,
        date: item.date,
        pageCount: item.pageCount,
        amount: item.amount,
        employee,
        company,
      }
    }),
  )

  return NextResponse.json(result)
}

export async function POST(request: Request) {
  await connectMongoose()

  const body = await request.json()

  const accounting = await Accounting.create({
    employeeId: body.employeeId,
    companyId: body.companyId,
    date: body.date,
    pageCount: Number(body.pageCount),
    amount: Number(body.amount),
  })

  return NextResponse.json(accounting)
}
