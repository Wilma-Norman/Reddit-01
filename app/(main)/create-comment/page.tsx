import { CreateCommentForm } from './form'

export default function CreatePage() {
  return (
    <main className='main'>
      <h1 className='mb-8 pl-2 text-2xl font-bold'>create comment</h1>
      <CreateCommentForm postId='1754b423-36d6-4b83-ae10-bad3d82a4202' />
    </main>
  )
}
