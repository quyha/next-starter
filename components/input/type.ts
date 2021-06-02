import { ReactNode } from 'react';

export interface InputProps {
    type: string;
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    /**
     * One of 'primary' | 'info' | 'success' | 'warning' | 'danger'
     */
    appearance?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
    rounded?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    loading?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    label?: string;
    error?: string;
}
