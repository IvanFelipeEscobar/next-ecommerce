import { currentUser } from '@clerk/nextjs/server'
import { LuUser } from 'react-icons/lu'
// import Image from 'next/image'

const UserIcon = async () => {
  const user = await currentUser()
  const avatar = user?.imageUrl

  if (avatar)
    return (
      <img
        src={avatar}
        alt="user avatar"
        className="size-6 rounded-full object-cover"
      />
    )

  return <LuUser className='size-6 rounded-full'/>
}
export default UserIcon
