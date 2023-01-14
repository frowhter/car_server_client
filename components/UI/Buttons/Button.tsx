import React, {memo} from 'react';
import classes from './Button.module.scss'

interface GroupProperties {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    width?: string;
    color?: string;
    reference?: React.MutableRefObject<HTMLButtonElement> | null;

    disabled?: boolean


}
const Button: React.FC<GroupProperties> = memo(({children, className, onClick, width, color, reference, disabled}) => {
    return (
        <>
            <button disabled={disabled}  ref={reference} style={{width: width, color: color}} onClick={onClick} className={`${classes.btn} ${className}`}>
                {children}
            </button>
        </>

    );
});

export default Button;