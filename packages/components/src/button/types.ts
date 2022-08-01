import { ExtractPropTypes } from 'vue'

const ButtonType = ['default', 'primary', 'info', 'success', 'warning', 'danger']
const ButtonSize = ['large', 'normal', 'small', 'mini']

export const buttonProps = {
  type: {
    type: String,
    validator: (value: string) => {
      return ButtonType.includes(value)
    }
  },
  size: {
    type: String,
    validator: (value: string) => {
      return ButtonSize.includes(value)
    }
  }
}
export type ButtonProps = ExtractPropTypes<typeof buttonProps>