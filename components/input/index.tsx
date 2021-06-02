import React, { ReactNode, useMemo, InputHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './input.module.scss';
import stylesEle from '@styles/elements.module.scss';
import { kebabCaseToCamelCase } from '@utils/string';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    type: string;
    className?: string;
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
    /**
     * If you want a horizontal form control
     */
    horizontal?: boolean;
    /**
     * One of small | medium | large
     */
    sizes?: string | number;
}

export const FieldWrap: React.FC<Partial<InputProps>> = (props) => {
    const {
        loading,
        iconLeft,
        iconRight,
        label,
        error,
        children,
        horizontal,
        value = '',
        sizes,
    } = props;

    const cnControl = cx(
        styles.control,
        loading && styles.isLoading,
        iconLeft && styles.hasIconLeft,
        iconRight && styles.hasIconRight
    );

    const render = useMemo(() => (
        <div className={ cx(styles.field, sizes && styles[kebabCaseToCamelCase(`is-${ sizes }`)] ) }>
            { label && <label className={ styles.label }>{ label }</label> }
            <div className={ cnControl }>
                { children }
                { iconLeft && <span className={ cx(styles.iconIp, styles.isLeft) }>{ iconLeft }</span> }
                { iconRight && <span className={ cx(styles.iconIp, styles.isRight) }>{ iconRight }</span> }
            </div>
            { error && <p className={ cx(stylesEle.help, stylesEle.isDanger) }>{ error }</p> }
        </div>
    ), [ value, error, cnControl, children ]);

    const renderHorizontal = useMemo(() => (
        <div className={ cx(
            styles.field,
            sizes && styles[kebabCaseToCamelCase(`is-${ sizes }`)],
            styles.isHorizontal
        )}>
            <div className={ styles.fieldLabel }>
                { label && <label className={ styles.label }>{ label }</label> }
            </div>
            <div className={ styles.fieldBody }>
                <div className={ styles.field }>
                    <div className={ cnControl }>
                        { children }
                        { iconLeft && <span className={ cx(styles.iconIp, styles.isLeft) }>{ iconLeft }</span> }
                        { iconRight && <span className={ cx(styles.iconIp, styles.isRight) }>{ iconRight }</span> }
                    </div>
                    { error && <p className={ cx(stylesEle.help, stylesEle.isDanger) }>{ error }</p> }
                </div>
            </div>
        </div>
    ), [ value, error, cnControl, children ]);
    
    return horizontal ? renderHorizontal : render;
};

/**
 * Use React.memo in the production. Edit source file directly
 */
const Input = React.forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>((props, ref) => {
    const {
        type,
        className,
        placeholder = '',
        appearance,
        rounded,
        disabled = false,
        readonly = false,
        error,
        iconLeft,
        iconRight,
        loading,
        horizontal,
        label,
        ...restProps
    } = props;

    const cnInput = cx(
        styles.input,
        className,
        appearance && styles[kebabCaseToCamelCase(`is-${ appearance }`)],
        rounded && styles.isRounded,
        error && styles.isDanger,
    );
    
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FieldWrap { ...props }>
            {
                (type !== 'textarea') ? (
                    <input
                        type={ type }
                        className={ cnInput }
                        placeholder={ placeholder }
                        disabled={ disabled }
                        readOnly={ readonly }
                        ref={ ref }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        { ...restProps }
                    />
                ) : (
                    <textarea
                        className={ cx(styles.textarea, className, error && styles.isDanger) }
                        placeholder={ placeholder }
                        disabled={ disabled }
                        readOnly={ readonly }
                        ref={ ref }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        { ...restProps }
                    />
                )
            }
        </FieldWrap>
    )
})

export default React.memo<InputProps>(Input, (prevProps, nextProps) => (
    prevProps.value === nextProps.value
    && prevProps?.loading === nextProps?.loading
));
