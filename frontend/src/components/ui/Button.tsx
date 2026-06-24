import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const base = 'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 rounded-[4px] whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-red text-paper hover:bg-red/90',
        ghost: 'bg-transparent border border-gold text-gold hover:bg-gold/5',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3.5 text-base',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}
