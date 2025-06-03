'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export const deleteComment = async (commentId: string, postId: string) => {
  const supabase = createClient()

  const { data: post } = await supabase
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single()

  const {
    data: { user },
  } = await supabase.auth.getUser()
 
  await supabase.from('comments').delete().eq('id', commentId).throwOnError()

  revalidatePath('/')
}
