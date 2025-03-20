import { Decimal } from '@prisma/client/runtime/library'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type NavLink = {
  href: string
  label: string
}

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/products', label: 'products' },
  { href: '/favorites', label: 'favorites' },
  { href: '/reviews', label: 'reviews' },
  { href: '/cart', label: 'cart' },
  { href: '/orders', label: 'orders' },
  { href: '/admin/sales', label: 'dashboard' },
]

export const adminLinks: NavLink[] = [
  { href: '/admin/sales', label: 'sales' },
  { href: '/admin/products', label: 'my products' },
  { href: '/admin/products/create', label: 'create product' },
]

export const formatCurrency = (amount: Decimal | null) => {
  const value = amount || 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+value)
}
