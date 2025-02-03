'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { editComment } from '@/actions/edit-comment'
import { Button } from './button'
import { Input } from '@/components/input'

interface EditCommentButtonProps {
  commentId: string
  text: string | null
  onCancel: () => void
}

export const EditCommentButton = ({
  commentId,
  text,
  onCancel,
}: EditCommentButtonProps) => {
  const { mutate } = useMutation({
    mutationFn: editComment,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      toast.success('your post was edited!'), reset(), onCancel()
    },
    onMutate: () => toast.loading('editing post...'),
    onSettled: () => toast.dismiss(),
  })

  const editCommentSchema = z.object({
    text: z.string().min(1, 'Comment cannot be empty'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof editCommentSchema>>({
    resolver: zodResolver(editCommentSchema),
    defaultValues: {
      text: text || undefined,
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        mutate({
          newText: values.text,
          commentId: commentId,
        })
      })}
      className='flex flex-col gap-4 pt-4'
    >
      <div>
        <Input {...register('text')} label='' error={errors.text} />
      </div>
      <div>
        <Button type='submit' variant='secondary'>
          Save
        </Button>
      </div>
    </form>
  )
}
