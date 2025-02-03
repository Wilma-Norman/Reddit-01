import Link from 'next/link'

export const HomePost = ({
  author,
  title,
  slug,
  image,
}: {
  author: string
  title: string
  slug: string
  image: string | null
}) => {
  return (
    <Link
      href={`/post/${slug}`}
      className='pink bg-accent flex w-full flex-col rounded-3xl p-4'
    >
      <span className='text-zinc-600'>{author}</span>
      {image ? <img src={image} alt='' /> : null}
      <h2 className='text-lg font-bold'>{title}</h2>
    </Link>
  )
}
