'use client'

import { Checkbox } from '../ui/checkbox'

type CheckboxIputProps = {
  name: string
  label: string
  defaultChecked?: boolean
}

const CheckboxInput = ({
  name,
  label,
  defaultChecked = false,
}: CheckboxIputProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <label
        htmlFor={name}
        className="text-sm leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >{label}</label>
    </div>
  )
}
export default CheckboxInput
