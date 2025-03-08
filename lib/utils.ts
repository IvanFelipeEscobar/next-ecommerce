import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
  { href: '/cart', label: 'cart' },
  { href: '/orders', label: 'orders' },
]

export const formatCurrency = ( amount :  number | null ) => {
  const value = amount || 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}