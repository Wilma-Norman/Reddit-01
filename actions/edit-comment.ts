'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { commentSchema } from './schemas'

export const editComment = async ({
  newText,
  commentId,
}: {
  newText: string
  commentId: string
}) => {
  const supabase = createClient()

  const { data: comment } = await supabase
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthor = user && user.id === comment?.user_id

  if (!isAuthor) {
    throw new Error("you're not allowed to delete this post")
  }

  await supabase
    .from('comments')
    .update({ text: newText })
    .eq('id', commentId)
    .single()

  revalidatePath('/')
}
