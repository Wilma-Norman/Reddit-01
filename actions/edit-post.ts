'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { postSchema } from './schemas'
import { createClient } from '@/utils/supabase/server'
import { uploadImage } from '@/utils/supabase/upload-image'
import { slugify } from '@/utils/slugify'

export const editPost = async ({
  postId,
  data,
}: {
  postId: string
  data: z.infer<typeof postSchema>
}) => {
  const parsedData = postSchema.parse(data)
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('not authenticated')
  }

  const { data: post } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', postId)
    .single()

  if (!post) {
    throw new Error('post not found')
  }

  const isAuthor = user && user.id === post.user_id

  if (!isAuthor) {
    throw new Error("you're not allowed to edit this post")
  }

  const imageFile = data.image.get('image')
  if (!(imageFile instanceof File) && imageFile !== null) {
    throw new Error('malformed image')
  }

  const imagePublicUrl = imageFile ? await uploadImage(imageFile) : null

  //skapa en bucket i supabase dashboarden     ---klar
  //util/upload-image      ----klar
  // sedan i edit och create-posts behgöver vi göra om så att vi tar ut bild filen ur formdata
  //sedan göra upload-image functionen så den laddar upp till supabase
  // sedan skicka url till supabase här
  const { data: updatedPost } = await supabase
    .from('posts')
    .update({ ...parsedData, slug: slugify(data.title), image: imagePublicUrl })
    .eq('id', postId)
    .select('slug')
    .single()
    .throwOnError()

  if (!updatedPost?.slug) {
    throw new Error('could not redirect')
  }

  revalidatePath('/')
  redirect(`/post/${updatedPost.slug}`)
}
