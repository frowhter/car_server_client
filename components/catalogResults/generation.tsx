import React from 'react';
import {IGenerations} from "../../types/generations";
import classes from './generation.module.scss'

interface IGenerationProps{
    generation: IGenerations
}

const Generation: React.FC<IGenerationProps> = ({generation}) => {
    return (
        <>
            <div className={classes.slider_card}>
                <div className={classes.slider_card_item_img}>

                </div>
                <div>
                    <div className={classes.slider_card_item_label}>
                        {generation.year_start}-{generation.year_end}
                    </div>
                    <div className={classes.slider_card_item_description}>
                        {generation.pokolenie}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Generation;