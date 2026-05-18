import { NextResponse } from "next/server"

import { connectMongoose } from "@/utils/mongoose-client"
import { Employee } from "@/models/employee-model"

export async function GET() {
  await connectMongoose()

  const employees = await Employee.find()

  return NextResponse.json(employees)
}

export async function POST(request: Request) {
  await connectMongoose()

  const body = await request.json()

  const employee = await Employee.create({
    firstName: body.firstName,
    lastName: body.lastName,
  })

  return NextResponse.json(employee)
}
