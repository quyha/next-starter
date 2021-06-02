/* eslint-disable react/button-has-type */
import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './button.module.scss';
import { kebabCaseToCamelCase } from '@utils/string';

interface Props {
    children: ReactNode;
    /**
        Buttons have type 'button' | 'submit' | 'reset'
    */
    type?: 'button' | 'submit' | 'reset';
    /**
        Buttons that have hrefs should use link instead of button
    */
    isAnchor?: boolean;
    /**
     *  Use this when button is anchor
     */
    href?: string;
    titleAnchor?: string;
    className?: string;
    /**
     *  Appearance is one of 'white' | 'light' | 'black' | 'dark' | 'primary'
     * | 'info' | 'success' | 'warning' | 'danger'
     */
    appearance?: 'white' | 'light' | 'black' | 'dark' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
    inverter?: boolean;
    /**
     * Size is one of 'small' | 'medium' | 'large'
     */
    size?: 'small' | 'medium' | 'large';
    outlined?: boolean;
    rounded?: boolean;
    loading?: boolean;
    disabled?: boolean;
    selected?: boolean;
    fullWidth?: boolean;
    /**
     * Click handler (event) => void
     */
    onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
}


const Button: React.FC<Props> = (props: Props) => {
    const {
        children,
        type = 'button',
        isAnchor,
        href,
        titleAnchor,
        onClick,
        appearance,
        inverter,
        size,
        outlined,
        rounded,
        loading,
        disabled,
        selected,
        fullWidth,
        className,
    } = props;

    const cn = cx(
        styles.button,
        appearance && styles[kebabCaseToCamelCase(`is-${ appearance }`)],
        inverter && styles.isInverter,
        size && styles[kebabCaseToCamelCase(`is-${ size }`)],
        outlined && styles.isOutlined,
        rounded && styles.isRounded,
        loading && styles.isLoading,
        disabled && styles.isDisabled,
        selected && styles.isSelected,
        fullWidth && styles.isFullwidth,
        className && className,
    );

    const doClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (onClick) {
            onClick(e);
        }
    }
    
    return isAnchor ? (
        <a
            href={ href }
            title={ titleAnchor }
            className="button"
        >
            { children }
        </a>
    ) : (
        <button
            type={ type }
            className={ cn }
            onClick={ doClick }
            disabled={ disabled }
        >
            { children }
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
    isAnchor: false,
}

export default Button;

interface ButtonGroup {
    children: ReactNode;
    className?: string;
    hasAddons?: boolean;
    align?: 'left' | 'centered' | 'right';
}

export const ButtonGroup: React.FC<ButtonGroup> = (props: ButtonGroup) => {
    const {
        children,
        className,
        hasAddons,
        align,
    } = props;
    
    const cn = cx(
        styles.buttons,
        hasAddons && styles.hasAddons,
        align && styles[kebabCaseToCamelCase(`is-${ align }`)],
        className,
    );
    
    return (
        <div className={ cn }>
            { children }
        </div>
    )
};
