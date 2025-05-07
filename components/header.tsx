import Link from 'next/link'

import { createClient } from '@/utils/supabase/server'
import { SearchBar } from './search-bar'
import { LogOutButton } from './log-out-button'
import { Button } from './button'

export const Header = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className='md:flex md:h-16 md:w-full md:items-center md:justify-between md:gap-4 bg-[#FFF1E8] shadow-lg px-4 md:py-2 md:px-20'>
    <Link href='/' className='md:text-2xl md:font-bold text-3xl font-bold justify-center flex m-1'>
      Postit
    </Link>
    <SearchBar />
    {user ? (
      <div className='md:flex md:gap-4 p-2 border-b md:border-none'>
        <Button as={Link} href='/create-post'>
          create post
        </Button>
        <LogOutButton />
      </div>
    ) : (
      <Button as={Link} href='/auth/log-in'>
        Log in
      </Button>
    )}
  </header>
)
}

