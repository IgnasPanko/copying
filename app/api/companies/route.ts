import { NextResponse } from "next/server"

import { connectMongoose } from "@/utils/mongoose-client"
import { Company } from "@/models/company-model"

export async function GET() {
  await connectMongoose()

  const companies = await Company.find()

  return NextResponse.json(companies)
}

export async function POST(request: Request) {
  await connectMongoose()

  const body = await request.json()

  const company = await Company.create({
    name: body.name,
  })

  return NextResponse.json(company)
}
