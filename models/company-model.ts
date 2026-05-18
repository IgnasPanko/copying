import { model, models, Schema, Model, Types } from "mongoose"

export interface ICompany {
  id?: string
  name: string
}

const CompanySchema = new Schema<ICompany>(
  {
    name: String,
  },
  {
    timestamps: false,
    collection: "companies",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_doc: unknown, ret: ICompany & { _id: Types.ObjectId }) => {
        const { _id, ...rest } = ret

        return { ...rest, id: _id.toString() }
      },
    },
  },
)

export const Company: Model<ICompany> =
  models.Company || model("Company", CompanySchema)
