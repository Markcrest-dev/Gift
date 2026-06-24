import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const baseInputStyles = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-[#0A4535] focus:ring-1 focus:ring-[#0A4535] transition-all duration-200 shadow-sm placeholder-gray-400";
const errorInputStyles = "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/50";
const labelStyles = "block text-sm font-semibold text-gray-700 mb-2";
const errorTextStyles = "mt-1.5 text-xs font-medium text-red-500";

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={props.id} className={labelStyles}>
                    {label}
                </label>
            )}
            <input
                className={`${baseInputStyles} ${error ? errorInputStyles : ''} ${className}`.trim()}
                {...props}
            />
            {error && <p className={errorTextStyles}>{error}</p>}
        </div>
    );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={props.id} className={labelStyles}>
                    {label}
                </label>
            )}
            <textarea
                className={`${baseInputStyles} min-h-[100px] ${error ? errorInputStyles : ''} ${className}`.trim()}
                {...props}
            />
            {error && <p className={errorTextStyles}>{error}</p>}
        </div>
    );
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={props.id} className={labelStyles}>
                    {label}
                </label>
            )}
            <select
                className={`${baseInputStyles} appearance-none ${error ? errorInputStyles : ''} ${className}`.trim()}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className={errorTextStyles}>{error}</p>}
        </div>
    );
}
