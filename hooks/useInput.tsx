import React, {useEffect, useState} from "react";


export const useValidation = (value, validations) => {
    const [isEmpty, setEpmty] = useState<{flag: boolean, text: string}>({flag: true, text: 'Поле не может быть пустым'})
    const [minLengthError, setMinLengthError] = useState<{flag: boolean, text: string}>({flag: false, text: 'Некорректная длина'})
    const [maxLengthError, setMaxLengthError] = useState<{flag: boolean, text: string}>({flag: false, text: ''})
    const [phoneError, setPhoneError] = useState<{flag: boolean, text: string}>({flag: false, text: 'Некорректный телефон'})
    const [inputValid, setInputValid] = useState<boolean>(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError({...minLengthError, flag: true}) : setMinLengthError({...minLengthError, flag: false})
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError({...maxLengthError, flag: true}) : setMaxLengthError({...maxLengthError, flag: false})
                    break;
                case 'isEmpty':
                    value ? setEpmty({...isEmpty, flag: false}) : setEpmty({...isEmpty, flag: true})
                    break;
                case 'isPhone':
                    const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
                    re.test(String(value).toLowerCase()) ? setPhoneError({...phoneError, flag: false}) : setPhoneError({...phoneError, flag: true})
                    break;

            }
        }
    }, [value])

    useEffect(()=> {
        if(isEmpty.flag || maxLengthError.flag || minLengthError.flag || phoneError.flag){
            setInputValid(false)
        }else {
            setInputValid(true)
        }
    }, [isEmpty.flag, maxLengthError.flag, minLengthError.flag, phoneError.flag])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        phoneError,
        inputValid,
    }

}

export const useInput = (initialValue, validations)=> {
    const [value, setValue] = useState<string>(initialValue)
    const [isDirty, setDirty] = useState<boolean>(false)
    const valid = useValidation(value, validations)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return {
        value,
        setValue,
        onChange,
        onBlur,
        isDirty,
        ...valid,
    }
}