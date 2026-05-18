import { NextResponse } from "next/server"

import { connectMongoose } from "@/utils/mongoose-client"
import { Employee } from "@/models/employee-model"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectMongoose()

  const { id } = await params

  await Employee.findByIdAndDelete(id)

  return NextResponse.json({ message: "Darbuotojas ištrintas" })
}