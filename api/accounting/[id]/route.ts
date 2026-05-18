import { NextResponse } from "next/server"

import { connectMongoose } from "@/utils/mongoose-client"
import { Accounting } from "@/models/accounting-model"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongoose()

  const { id } = await params

  await Accounting.findByIdAndDelete(id)

  return NextResponse.json({ message: "Apskaitos įrašas ištrintas" })
}
