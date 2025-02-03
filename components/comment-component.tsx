'use client'

import { DeleteCommentButton } from './delete-comment-button'
import { EditCommentButton } from './edit-comment-button'
import { PostCommentsType } from '@/utils/supabase/queries'
import { useState } from 'react'
import { Button } from './button'

type CommentData = PostCommentsType[number] & {
  isPostAuthor: boolean
  isCommentAuthor: boolean
}

export const CommentComponent = ({
  id,
  text,
  users,
  isPostAuthor,
  isCommentAuthor,
}: CommentData) => {
  const [activeEdit, setActiveEdit] = useState(false)

  return (
    <div className='pink mt-4 rounded border bg-accent p-4'>
      <p className='text-sm text-zinc-600'>{users?.email}</p>
      {activeEdit ? (
        <EditCommentButton
          text={text}
          commentId={id}
          onCancel={() => setActiveEdit(false)}
        />
      ) : (
        <p>{text}</p>
      )}
      <div className='flex w-full justify-end gap-4 pt-4'>
        {isCommentAuthor && (
          <Button variant='blue' onClick={() => setActiveEdit(!activeEdit)}>
            {activeEdit ? 'Cancel' : 'Edit'}
          </Button>
        )}
        {(isPostAuthor || isCommentAuthor) && (
          <DeleteCommentButton commentId={id} />
        )}
      </div>
    </div>
  )
}
