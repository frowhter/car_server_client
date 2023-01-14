import React from 'react';
import classes from "./Input.module.scss";


interface GroupProperties {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>)=>void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>)=>void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>)=>void;
    onFocus?: ()=>void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>)=> void;
    type?: string;
    value?: string | number;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;

}
const Input:React.FC<GroupProperties> = ({value,placeholder, onChange, onKeyDown,  type, disabled, maxLength, onKeyUp, onBlur, onFocus, onClick, pattern, minLength})  => {

    return (
        <input
            pattern={pattern}
            value={value}
            placeholder={placeholder}
            type={type ? type :'text'}
            maxLength={maxLength}
            minLength={minLength}
            disabled={disabled}
            className={classes.Input}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            onClick={onClick}

        />
    );
};

export default Input;