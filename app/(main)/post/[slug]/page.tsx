import { notFound } from 'next/navigation'
import Link from 'next/link'

import { getComments } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { DeletePostButton } from '@/components/delete-post-button'

import { CommentContainer } from '@/components/comment-container'
import { Button } from '@/components/button'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, user_id, users("email")')
    .eq('slug', params.slug)
    .single()

  if (error || !post) notFound()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthor = user && user.id === post.user_id

  const { data: comments } = await getComments(post.id)

  const isCommentAuthor = (commentUserId: string) => {
    return user && user.id === commentUserId
  }

  const commentList = comments?.map((comment) => {
    return {
      comment,
      isCommentAuthor: isCommentAuthor(comment.user_id)!,
      isPostAuthor: isAuthor!,
    }
  })

  return (
    <main className='main'>
      <article className='space-y-4 bg-[#E993B0] border-2 rounded-2xl p-5  drop-shadow-2xl'>
        <header className='flex items-start justify-between'>
          <div className='space-y-1'>
            <span className='text-black'>{post.users?.email}</span>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
          </div>
        </header>
        <p>{post.content} </p>  
        {isAuthor && (
          <div className='justify-end flex gap-3'>
            <Button as={Link} href={`/post/${params.slug}/edit`} className="bg-black  text-white shadow-lg">
              Edit
            </Button>
            <DeletePostButton postId={post.id} />
          </div>
        )}      
      </article>
      <div className="bg-[#FFF1E8] rounded-2xl border-2 mt-5">
      <CommentContainer data={commentList} postId={post.id} />
        </div>
    </main>
  )
}

