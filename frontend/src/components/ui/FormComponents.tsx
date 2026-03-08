import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="form-group">
            {label && (
                <label htmlFor={props.id} className="form-label">
                    {label}
                </label>
            )}
            <input
                className={`form-input ${error ? 'error' : ''} ${className}`.trim()}
                {...props}
            />
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
    return (
        <div className="form-group">
            {label && (
                <label htmlFor={props.id} className="form-label">
                    {label}
                </label>
            )}
            <textarea
                className={`form-textarea ${error ? 'error' : ''} ${className}`.trim()}
                {...props}
            />
            {error && <p className="form-error">{error}</p>}
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
        <div className="form-group">
            {label && (
                <label htmlFor={props.id} className="form-label">
                    {label}
                </label>
            )}
            <select
                className={`form-select ${error ? 'error' : ''} ${className}`.trim()}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
