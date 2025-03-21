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
      className='flex w-full flex-col rounded-3xl border-2 border-[#ff4500] bg-[#868686] p-4'
    >
      <span className='font-bold text-md p-2'>{author}</span>
      {image ? <img src={image} alt='' /> : null}
      <h2 className='text-lg font-bold m-2'>{title}</h2>
    </Link>
  )
}
