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
    const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#0A4535] text-white hover:bg-[#073528] shadow-md hover:shadow-lg',
        ghost: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm',
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
