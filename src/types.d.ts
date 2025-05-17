import { QInput } from "quasar"

export interface MtgFormInput {
  label: string
  type: QInput
  value: any
}

export type MtgForm = Array<MtgFormInput>