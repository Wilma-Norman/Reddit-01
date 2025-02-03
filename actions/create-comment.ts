'use server'

import { revalidatePath } from 'next/cache'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { commentSchema } from './schemas'

export const createComment = async ({
  data,
}: {
  data: z.infer<typeof commentSchema>
}) => {
  console.log('Creating comment with data:', data)

  const parsedData = commentSchema.parse(data)

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('not authenticated')
  }

  console.log(
    'postid ',
    parsedData.postId,
    ' text: ',
    parsedData.text,
    'user: ',
    user.id,
  )
  const {} = await supabase.from('comments').insert([
    {
      post_id: parsedData.postId,
      text: parsedData.text,
      user_id: user.id,
    },
  ])

  revalidatePath('/')
}
