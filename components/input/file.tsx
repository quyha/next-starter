import React, { useState } from 'react';
import cx from 'classnames';
import Image from '../image';
import styles from './file.module.scss';
import stylesEle from '@styles/elements.module.scss';
import { kebabCaseToCamelCase } from '@utils/string';

interface Props {
    /**
     * Name input
     */
    name: string;
    /**
     * Change event handler (e: React.FormEvent<HTMLInputElement) => void
     */
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    label?: string;
    /**
     * Has input file name?
     */
    hasName?: boolean;
    /**
     * Placeholder for the selected file name
     */
    fileName?: string;
    /**
     * Class name for file wrapper
     */
    className?: string;
    /**
     * Align the file input
     */
    align?: 'center' | 'right';
    /**
     * Expand the name to fill up the space
     */
    ctaFullWidth?: boolean;
    /**
     * Display message when file is invalid
     */
    error?: string;
    hasPreview?: boolean;
}

const InputFile: React.FC<Props> = (props: Props) => {
    const {
        name,
        onChange,
        label,
        hasName,
        fileName,
        className,
        align,
        ctaFullWidth,
        error,
        hasPreview = true,
    } = props;

    const [ preview, setPreview ] = useState<string>('');
    const [ fName, setFName ] = useState<string>(fileName ?? '');

    const cn = cx(
        styles.file,
        hasName && styles.hasName,
        align && styles[kebabCaseToCamelCase(`is-${ align }`)],
        ctaFullWidth && styles.isFullwidth,
        className && className
    );

    const changeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target?.files?.[0];

        if (error || file === undefined) {
            return;
        }

        if (hasName) {
            setFName(file.name);
        }

        setPreview(URL.createObjectURL(file));
        
        if (onChange) {
            onChange(e);
        }
    };
    
    return (
        <>
            <div className={ cn }>
                <label className={ styles.fileLabel }>
                    <input
                        className={ styles.fileInput }
                        type="file"
                        name={ name }
                        onChange={ changeInput }
                    />
                    <span className={ styles.fileCta }>
                        <span className={ styles.fileIcon }>
                            <svg
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                fill="none"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M13.25 16h-2.5c-.689 0-1.25-.561-1.25-1.25V9H6.75a.75.75 0 01-.542-1.268l5.25-5.5a.774.774 0 011.085 0l5.25 5.5A.75.75 0 0117.25 9H14.5v5.75c0 .689-.561 1.25-1.25 1.25zm9 6H1.75C.785 22 0 21.215 0 20.25v-.5C0 18.785.785 18 1.75 18h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z" />
                            </svg>
                        </span>
                        <span className={ styles.fileLabel }>
                            { label }
                        </span>
                    </span>
                    { hasName && <span className={ styles.fileName } title={ fName }>{ fName }</span> }
                </label>
            </div>
            { error && <p className={ cx(stylesEle.help, stylesEle.isDanger) }>{ error }</p> }
            {
                (!error && preview && hasPreview) && (
                    <Image
                        src={ preview }
                        size={ 128 }
                        borderRadius={ 4 }
                        objectFit="contain"
                        alt=""
                    />
                )
            }
        </>
    )
};

InputFile.defaultProps = {
    label: 'Chọn file ...',
};

export default InputFile;
