import EmptyList from '@/components/global/EmptyList'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchAdminProduct } from '@/lib/actions'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

const AdminProductsPage = async () => {
  const items = await fetchAdminProduct()
  if (items.length === 0) return <EmptyList />

  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total product: {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item
            const dollarPrice = formatCurrency(price)
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className="underline text-muted-foreground tracking-wide capitalize"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{dollarPrice}</TableCell>
                <TableCell className='flex items-center gap-x-2'></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
export default AdminProductsPage
