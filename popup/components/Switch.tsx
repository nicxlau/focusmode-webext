import { Switch as Base } from '@headlessui/react'
import type { FunctionComponent } from 'react'

interface ISwitchProp {
  onChange: (checked: boolean) => void
  checked: boolean
}

export const Switch: FunctionComponent<ISwitchProp> = ({
  onChange,
  checked,
}: ISwitchProp) => {
  return (
    <Base
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white`}
      />
    </Base>
  )
}
