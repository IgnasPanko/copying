import { model, models, Schema, Model, Types } from "mongoose"

import { IEmployee } from "./employee-model"
import { ICompany } from "./company-model"

export interface IAccounting {
  id?: string
  employeeId: string
  companyId: string
  date: string
  pageCount: number
  amount: number
}

export interface IAccountingWithData extends IAccounting {
  employee?: IEmployee
  company?: ICompany
}

const AccountingSchema = new Schema<IAccounting>(
  {
    employeeId: String,
    companyId: String,
    date: String,
    pageCount: Number,
    amount: Number,
  },
  {
    timestamps: false,
    collection: "accounting",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IAccounting & { _id: Types.ObjectId },
      ) => {
        const { _id, ...rest } = ret

        return { ...rest, id: _id.toString() }
      },
    },
  },
)

export const Accounting: Model<IAccounting> =
  models.Accounting || model("Accounting", AccountingSchema)
