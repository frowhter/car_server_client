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
    dataSelected: string[];
    focusIndex: number;
    propertyName: string;
}
const SelectBodyMany: React.FC<ISelectBody> = ({searchResults, refLink, focusIndex, visible, selectedData, propertyName, dataSelected}) => {
    return (
        <>
            <ul ref={refLink} onClick={(e)=> e.stopPropagation()} className={visible? classes.ACTIVE + ' ' +  classes.inputSelectBody:classes.disable + ' ' + classes.inputSelectBody}>
                {searchResults.map((element, index) => (
                    <li key={index} onClick={()=> selectedData(element[propertyName])} className={focusIndex === index ? classes.item + ' ' + classes.active + ' ' + classes.details: classes.item + ' ' + classes.details}>
                        <input type={'checkbox'} name={"check" + index} className={classes.check} onChange={(e)=> {
                            e.stopPropagation()
                            selectedData(element[propertyName])
                        }} checked={dataSelected.filter(i=> i.toLowerCase()===element[propertyName].toLowerCase()).length!==0}/>
                        <label htmlFor={"check" + index}>
                            {element[propertyName]}
                        </label>
                    </li>

                ))}
            </ul>
        </>
    );
};

export default SelectBodyMany;