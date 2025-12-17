import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
    const hoverClass = hover ? 'hover-lift' : '';

    const paddingClass = {
        none: 'p-0',
        sm: 'p-sm',
        md: 'p-lg',
        lg: 'p-2xl'
    }[padding];

    return (
        <div className={`card ${paddingClass} ${hoverClass} ${className}`.trim()}>
            {children}
        </div>
    );
}
