import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'outline-white' | 'secondary' | 'gold';
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
    const baseClass = 'btn';

    const variantClass = {
        primary: 'btn-primary',
        outline: 'btn-outline',
        'outline-white': 'btn-outline-white',
        secondary: 'btn-secondary',
        gold: 'btn-gold'
    }[variant];

    const sizeClass = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg'
    }[size];

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}
