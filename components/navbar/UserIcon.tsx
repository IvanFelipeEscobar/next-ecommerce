import { currentUser } from '@clerk/nextjs/server'
import { LucideUser2 } from 'lucide-react'
import Image from 'next/image'

const UserIcon = async () => {
  const user = await currentUser()
  const avatar = user?.imageUrl

  if (avatar)
    return (
      <Image
        src={avatar}
        alt="user avatar"
        className="size-6 rounded-full object-cover"
      />
    )

  return <LucideUser2 className='size-6 rounded-full text-white'/>
}
export default UserIcon
