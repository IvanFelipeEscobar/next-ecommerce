import Link from 'next/link'
import { Button } from '../ui/button'
import { LiaStoreAltSolid } from 'react-icons/lia'

const Logo = () => {
  return (
      <Button asChild size={'icon'}>
        <Link href="/">
          <LiaStoreAltSolid className="w-6 h-6" />{' '}
        </Link>
      </Button>
  )
}
export default Logo
