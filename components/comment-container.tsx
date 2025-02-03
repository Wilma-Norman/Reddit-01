'use client'

import { Button } from './button'
import { CreateCommentForm } from '@/app/(main)/create-comment/form'
import { useState } from 'react'
import { CommentComponent } from './comment-component'
import { PostCommentsType } from '@/utils/supabase/queries'

type CommentData = {
  comment: PostCommentsType[number]
  isPostAuthor: boolean
  isCommentAuthor: boolean
}

export const CommentContainer = ({
  postId,
  data,
}: {
  postId: string
  data: CommentData[] | undefined
}) => {
  const [active, toggleActive] = useState(false)

  return (
    <div className='blue bg-secondary rounded p-4'>
      <Button variant='pink' onClick={() => toggleActive(!active)}>
        {active ? 'Close' : 'Comment'}
      </Button>
      {active ? <CreateCommentForm postId={postId} /> : null}
      {data &&
        data.map(({ comment, isCommentAuthor, isPostAuthor }) => (
          <CommentComponent
            key={comment.id}
            isCommentAuthor={isCommentAuthor}
            isPostAuthor={isPostAuthor}
            {...comment}
          />
        ))}
    </div>
  )
}
