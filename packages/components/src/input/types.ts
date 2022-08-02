import { ExtractPropTypes } from 'vue'

const InputType = ['text', 'password', 'textarea']
export const inputProps = {
  type: {
    type: String,
    validator: (value: string) => {
      return InputType.includes(value)
    }
  }
}
export type InputProps = ExtractPropTypes<typeof inputProps>