import React, {memo} from 'react';
import Card from "../Cards/Card";
import {v4 as uuidv4} from "uuid";
import cardClasses from "../Cards/Cards.module.scss";
import {Close} from "@mui/icons-material";


interface ISelectedResults{
    dataSelected: string[]
    onClick: (i: string)=> void
}
const SelectedResults: React.FC<ISelectedResults> = memo(({dataSelected, onClick}) => {
    return (
        <>
            <div className={'flexRowWrap'} onClick={(e)=>e.stopPropagation()}>
                {dataSelected.map(element=>
                    <Card key={Date.now() + uuidv4()} className={cardClasses.Card + ' ' + cardClasses.Card_style_white + ' ' + cardClasses.Card_style_height}>
                        <div onClick={()=>onClick(element)} className={'flexRow bold'}>
                            {element}
                            <Close/>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
});

export default SelectedResults;