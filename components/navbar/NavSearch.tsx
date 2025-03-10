'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'


const NavSearch = () => {
  const searchParams = useSearchParams()
  const navigation = useRouter()
  const [search, setSearch] = useState<string>(
    searchParams.get('search')?.toString() || ''
  )
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    navigation.replace(`/products?${params.toString()}`)
  }, 600)

  const currentSearch = searchParams.get('search')
  useEffect(() => {
    if (!currentSearch) {
      setSearch('')
    }
  }, [currentSearch])
  return (
    <Input
      type="search"
      placeholder="search products..."
      className="max-w-3xs dark:bg-muted"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
    />
  )
}
export default NavSearch
