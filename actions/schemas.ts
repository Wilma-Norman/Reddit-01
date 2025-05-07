import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'password is too short'),
})

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'password must be at least 6 characters'),
})

export const postSchema = z.object({
  title: z.string().min(3, 'title must be at least 3 characters'),
  content: z.string().optional(),
})

export const commentSchema = z.object({
  postId: z.string(),
  text: z.string().min(1, 'comment must be at least 1 character'),
})



// image: z.instanceof(FormData),