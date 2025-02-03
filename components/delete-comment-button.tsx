'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteComment } from '@/actions/delete-comment'
import { Button } from './button'

export const DeleteCommentButton = ({ commentId }: { commentId: string }) => {
  const { mutate } = useMutation({
    mutationFn: () => deleteComment(commentId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('your post was deleted!'),
    onMutate: () => toast.loading('deleting post...'),
    onSettled: () => toast.dismiss(),
  })

  return (
    <Button onClick={() => mutate()} variant='pink'>
      delete
    </Button>
  )
}
