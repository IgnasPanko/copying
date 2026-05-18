import { model, models, Schema, Model, Types } from "mongoose"

export interface IEmployee {
  id?: string
  firstName: string
  lastName: string
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    firstName: String,
    lastName: String,
  },
  {
    timestamps: false,
    collection: "employees",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_doc: unknown, ret: IEmployee & { _id: Types.ObjectId }) => {
        const { _id, ...rest } = ret

        return { ...rest, id: _id.toString() }
      },
    },
  },
)

export const Employee: Model<IEmployee> =
  models.Employee || model("Employee", EmployeeSchema)
