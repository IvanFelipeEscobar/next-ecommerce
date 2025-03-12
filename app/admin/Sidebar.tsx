'use client'
import { Button } from '@/components/ui/button'
import { adminLinks } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathName = usePathname()
  return (
    <aside>
      {adminLinks.map((link) => (
        <Button
          asChild
          key={link.label}
          className="w-full mb-2 capitalize font-normal justify-start" 
          variant={pathName === link.href ? 'secondary' : 'ghost'}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </aside>
  )
}
export default Sidebar
