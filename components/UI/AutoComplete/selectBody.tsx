import React, {memo} from 'react';
import {ICar} from "../../../types/cars";
import {IGenerations} from "../../../types/generations";
import {IProduct} from "../../../types/product";
import classes from "./Autocomplete.module.scss";

interface ISelectBody{
    searchResults: ICar[] | IGenerations[] | IProduct[];
    refLink:  React.LegacyRef<HTMLUListElement>;
    visible: boolean;
    selectedData: (element: string)=> void;
    focusIndex: number;
    propertyName: string;
}
const SelectBody: React.FC<ISelectBody> = memo(({searchResults, refLink, focusIndex, visible, selectedData, propertyName}) => {
    return (
        <>
            <ul ref={refLink} onClick={(e)=> e.stopPropagation()} className={visible? classes.ACTIVE + ' ' +  classes.inputSelectBody:classes.disable + ' ' + classes.inputSelectBody}>
                {searchResults.map((element, index) => (
                    <li key={index} onClick={()=> selectedData(element[propertyName])} className={focusIndex === index ? classes.item + ' ' + classes.active : classes.item}>
                        {element[propertyName]}
                    </li>
                ))}
            </ul>
        </>
    );
});

export default SelectBody;