'use client'

import { logOut } from '@/actions/log-out'
import { Button } from './button'

export const LogOutButton = () => {
  return (
    <Button className='bg-black text-white' variant='tertiary' onClick={() => logOut()}>
      log out
    </Button>
  )
}
