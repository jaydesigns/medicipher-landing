import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    variant?: 'default' | 'outlined'
}

export default function Button({ children, className = '', type, variant = 'default', ...props }: ButtonProps) {
    const baseClasses = 'px-6 py-2 font-medium button-text rounded-full transition-all max-h-10 flex items-center'
    const variantClasses =
        variant === 'outlined'
            ? 'bg-white text-accent border border-accent hover:bg-accent/10'
            : 'bg-accent text-white border border-transparent hover:bg-accent-dark'

    return (
        <button
            type={type ?? 'button'}
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}