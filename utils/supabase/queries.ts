import 'server-only'

import { type QueryData } from '@supabase/supabase-js'

import { createClient } from './server'

export const getComments = (postId: string) => {
  const supabase = createClient()

  return supabase
    .from('comments')
    .select('id, text, user_id, users(email)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })
}

export const getHomePosts = () => {
  const supabase = createClient()

  return supabase
    .from('posts')
    .select('id, title, slug, image, users("email")')
    .order('created_at', { ascending: false })
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>
export type PostCommentsType = QueryData<ReturnType<typeof getComments>>
