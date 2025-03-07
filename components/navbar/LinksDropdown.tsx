import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { links } from '@/lib/utils'
import Link from 'next/link'
import { LuAlignLeft } from 'react-icons/lu'
import { Button } from '../ui/button'

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
        {links.map( link => (
          <DropdownMenuItem key={link.href}>
            <Link href={link.href} className='capitalize w-full'>
            {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown
