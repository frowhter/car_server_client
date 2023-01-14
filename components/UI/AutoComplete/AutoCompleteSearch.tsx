import React, {useState, useRef, useCallback, memo} from 'react'
import {ICar} from "../../../types/cars";
import classes from './Autocomplete.module.scss'
import {useSearchData} from "../../../hooks/useBrands";
import Input from "../inputs/Input";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import {IGenerations} from "../../../types/generations";
import {IProduct} from "../../../types/product";
import SelectedResults from "./selectedResults";
import SelectBody from "./selectBody";
import SelectBodyMany from "./selectBodyMany";

interface IAutoCompleteSearchProps{
    data: ICar[] | IGenerations[] | IProduct[];
    setSubData: (subData:string[])=> void;
    propertyName?: string | 'name';
    placeholder?: string;
    disabled: boolean;
    many: boolean;
}

const AutoCompleteSearch: React.FC<IAutoCompleteSearchProps> = memo(({data, setSubData, placeholder, propertyName, disabled, many}) => {
    const [visible, setVisible] = useState(false)
    const [focusIndex, updateFocusIndex] = useState(-1);
    const [dataInput, setDataInput] = useState({sort: '', query: ''});
    const searchResults  =  useSearchData(data, propertyName, dataInput.sort, dataInput.query);
    const [dataSelected, setDataSelected] = useState<string[]>([])

    const [onBlur, setBlur] = useState<boolean>(false)

    const selectBodyLink = useRef(null)
    const keys = {
        ENTER: 'Enter',
        UP: 'ArrowUp',
        DOWN: 'ArrowDown'
    };

    const selectedData = (element) => {

        switch (many){
            case true:
                setDataInput({...dataInput, query: ''})
                switch (dataSelected.filter(i=> i.toLowerCase()===element.toLowerCase()).length!==0){
                    case true:
                        setDataSelected([...dataSelected.filter(i=> i.toLowerCase()!==element.toLowerCase())])
                        setSubData([...dataSelected.filter(i=> i.toLowerCase()!==element.toLowerCase())]);
                        break;
                    case false:
                        setDataSelected([...dataSelected, element])
                        setSubData([...dataSelected, element]);
                        break;
                }
                break;
            case false:
                setDataInput({...dataInput, query: element})
                setSubData([element])
                break;
        }


    }

    const onClick = (element)=>{
        setDataSelected(dataSelected.filter(i=> i.toLowerCase()!==element.toLowerCase()))
        setSubData(dataSelected.filter(i=> i.toLowerCase()!==element.toLowerCase()))

    }


    const onClickInput = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()
        setVisible(true)
        document.addEventListener('click', ()=>{
            setVisible(false)
            document.removeEventListener('click', ()=>{})
        })
    }, [])

    const updateSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setBlur(false)
        setDataInput({...dataInput, query: e.currentTarget.value})
    }

    const hideAutoSuggest = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.persist();
        setBlur(true)
        updateFocusIndex(0);
    };

    const handleNavigation = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case keys.ENTER:
                if (focusIndex !== -1 && searchResults.length!==0)  {
                    selectedData(searchResults[focusIndex][propertyName])
                } else if (many && searchResults.length===0) {
                    selectedData(dataInput.query)
                }


                hideAutoSuggest(e);
                break;
            case keys.UP:
                if (focusIndex % 4===0){
                    selectBodyLink.current.scrollTop = (focusIndex-4)*(selectBodyLink.current.scrollHeight/searchResults.length);
                }
                if (focusIndex > -1) {
                    updateFocusIndex(focusIndex - 1);
                }

                break;
            case keys.DOWN:
                if (focusIndex % 3===0){
                    selectBodyLink.current.scrollTop = (focusIndex+1)*(selectBodyLink.current.scrollHeight/searchResults.length);
                }

                if (focusIndex < searchResults.length - 1) {
                    updateFocusIndex(focusIndex + 1);
                }

                break;
        }
    };


    return (
        <section className={"search" + ' ' + classes.inputContainer}>
            {many
                ?searchResults.length===0 && onBlur && <div style={{color: "blue", marginBottom: 5}}>Отсутствует в каталоге, но вы можете запросить нажав ENTER</div>
                :searchResults.length===0 && onBlur && <div style={{color: "red", marginBottom: 5}}>Отсутствует в каталоге</div>
            }
            <div className={classes.selection_items_item}>
                <Input value={dataInput.query}
                       disabled={disabled}
                       type={'text'}
                       placeholder={placeholder}
                       onChange={updateSearch}
                       onKeyDown={handleNavigation}
                       onBlur={hideAutoSuggest}
                       onClick={onClickInput}
                />
                <div className={classes.selection_arrow}>
                    {visible
                        ?<ArrowDropUp/>
                        :<ArrowDropDown/>
                    }

                </div>
            </div>
            {many
                ?
                <>
                    <SelectedResults dataSelected={dataSelected} onClick={onClick}/>
                    <SelectBodyMany searchResults={searchResults} refLink={selectBodyLink} visible={visible} dataSelected={dataSelected} selectedData={selectedData} focusIndex={focusIndex} propertyName={propertyName}/>
                </>

                :
                <>
                    <SelectBody searchResults={searchResults} refLink={selectBodyLink} visible={visible} selectedData={selectedData} focusIndex={focusIndex} propertyName={propertyName}/>
                </>
            }

        </section>
    );
})

export default AutoCompleteSearch;