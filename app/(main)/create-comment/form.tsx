'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { createComment } from '@/actions/create-comment'
import { useMutation } from '@tanstack/react-query'

type CreateCommentFormProps = {
  postId: string
}

type FormValues = {
  text: string
}

export const CreateCommentForm = ({ postId }: CreateCommentFormProps) => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: (formData: FormValues) => {
      return createComment({
        data: {
          postId: postId,
          text: formData.text,
        },
      })
    },
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Comment posted successfully')
      reset()
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      z.object({
        text: z.string().min(1, 'Comment cannot be empty'),
      }),
    ),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log('Submitting with:', { ...values, postId })
        mutate(values)
      })}
      className='mt-4 flex w-full flex-col gap-4'
    >
      <Input {...register('text')} label='Add a comment' error={errors.text} />
      {error && <div className='text-sm text-red-500'>{error.message}</div>}
      <Button type='submit' disabled={isPending}>
        {isPending ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  )
}
