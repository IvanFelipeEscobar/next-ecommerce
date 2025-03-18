'use client'

import { type actionFunction } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'
import FormContainer from './FormContainer'
import ImageInput from './ImageInput'
import { SubmitButton } from './Buttons'

type ImageInputProps = {
  name: string
  image: string
  action: actionFunction
  text: string
  children?: React.ReactNode
}
const ImageInputContainer = ({
  name,
  image,
  action,
  text,
  children,
}: ImageInputProps) => {
  const [isFormVisible, setFormVisible] = useState(false)
  return (
    <div className="mb-8">
      <Image
        src={image}
        width={200}
        height={200}
        className="rounded object-cover mb-4 w-[200px] h-[200px]"
        alt={name}
        priority
      />
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={() => setFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer action={action}>
            {children}
            <ImageInput />
            <SubmitButton size="sm" text={text} />
          </FormContainer>
        </div>
      )}
    </div>
  )
}
export default ImageInputContainer
