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
    <header className='flex min-h-16 w-full flex-col items-center justify-between gap-4 bg-secondary p-2 md:flex-row md:px-4 md:py-2'>
      <div className='flex w-full flex-row items-center justify-between gap-2 md:w-10/12'>
        <Link
          href='/'
          className='min-w-[90px] rounded bg-primary p-1 text-2xl font-bold'
        >
          Vice-it
        </Link>
        <SearchBar />
      </div>
      <div className='ml-auto'>
        {user ? (
          <div className='flex gap-4'>
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
      </div>
    </header>
  )
}
