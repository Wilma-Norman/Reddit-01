import { forwardRef, type InputHTMLAttributes } from 'react'
import { type FieldError } from 'react-hook-form'

import { cn } from '@/utils/classnames'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'htmlFor'> & {
  label: string
  error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, error, ...props }, ref) => {
    return (
      <div className='group relative'>
      <input
        ref={ref}
        {...props}
        name={name}
        id={name}
        className='peer w-full rounded-full border border-zinc-200 bg-white mt-5 mb-5 px-4 py-2 text-base text-zinc-800 outline-none placeholder:text-transparent'
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={cn(
          'absolute -top-1 left-2 cursor-text text-xs text-black transition-all',
          'peer-focus-visible:-top-0.5 peer-focus-visible:left-2 peer-focus-visible:cursor-default peer-focus-visible:text-xs text-black',
          'peer-placeholder-shown:left-4 peer-placeholder-shown:top peer-placeholder-shown:text-base',
        )}
      >
        {label}
      </label>
      {error && <span className='text-sm text-primary'>{error.message}</span>}
    </div>
  )
},
)
Input.displayName = 'Input'
