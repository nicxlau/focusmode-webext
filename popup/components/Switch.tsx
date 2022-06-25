import { Switch as Base } from '@headlessui/react'
import type { FunctionComponent } from 'react'

export interface ISwitchProp {
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
      className={`${checked ? 'bg-[#4364ea]' : 'bg-[#2d3748]'}
          relative inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      onChange={onChange}
    >
      <span className="sr-only">{'Enable focus mode'}</span>
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform border-solid border-[1px] border-[#bdbdbd] rounded-full bg-[#f3f4f6] shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Base>
  )
}
