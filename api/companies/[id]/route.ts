import { NextResponse } from "next/server"

import { connectMongoose } from "@/utils/mongoose-client"
import { Company } from "@/models/company-model"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectMongoose()

  const { id } = await params

  await Company.findByIdAndDelete(id)

  return NextResponse.json({ message: "Firma ištrinta" })
}
