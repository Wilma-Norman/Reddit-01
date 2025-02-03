'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { signUpSchema } from './schemas'
import { createClient } from '@/utils/supabase/server'

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  const supabase = createClient()

  const parsedData = signUpSchema.parse(data)

  const { error, data: { user } } = await supabase.auth.signUp(parsedData)
  if(error) {
    throw error
  }

  if (user && user.email) {
    await supabase.from('users').insert([{ id: user.id, email: user.email }])
  }
  
  redirect('/')
}

/* const {
    data: { user },
    error
  } = await supabase.auth.signUp(data)
  if (error) {
    throw error
  }
  
  if (user && user.email) {
    const { id, email } = user
    await supabase.from('users').insert([{ id, email }])
  }*/