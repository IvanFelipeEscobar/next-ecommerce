'use client'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { LuTrash2, LuSquarePen } from 'react-icons/lu'

type btnSize = 'default' | 'lg' | 'sm'

type SubmitButtonProps = {
  className?: string
  text?: string
  size?: btnSize
}

export const SubmitButton = ({
  className = '',
  text = 'submit',
  size = 'lg',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn('capitalize', className)}
      size={size}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

type ActionType = 'edit' | 'delete'

export const IconButton = ({ actionType }: { actionType: ActionType }) => {
  const { pending } = useFormStatus()

  const renderIcon = () =>
    actionType === 'edit' ? <LuSquarePen /> : <LuTrash2 />
  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <Loader2 className="animate-spin" /> : renderIcon()}
    </Button>
  )
}

export const CardSigninButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size={'icon'}
        variant={'outline'}
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({ isFav }: { isFav: boolean }) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="button"
      size={'icon'}
      variant={'outline'}
      className="p-2 cursor-pointer"
      asChild
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : isFav ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  )
}
