import React from 'react';
import classes from "../../styles/Catalog.module.scss";
import Card from "../UI/Cards/Card";
import CardsClasses from "../UI/Cards/Cards.module.scss";
import {v4 as uuidv4} from "uuid";
import {ICar} from "../../types/cars";
import {useRouter} from "next/router";

interface IBrandResult{
    sortedAndSearchedBrand: ICar[][];
}

const BrandResult: React.FC<IBrandResult> = ({sortedAndSearchedBrand}) => {
    const router = useRouter();
    return (
        <>
            <div className={classes.catalog_result + ' ' + 'container'}>

                {sortedAndSearchedBrand.length!==0
                    ?
                    sortedAndSearchedBrand.map(el=>

                        <Card className={CardsClasses.Card_catalog} key={Date.now() + uuidv4()}>
                            <div style={{fontWeight: 'bold'}} className={classes.catalog_result_item}
                                 key={Date.now() + uuidv4()}>
                                {el[0].name[0]}
                            </div>
                            {el.map(element =>
                                <div onClick={()=> router.push(`/catalog/${element.name}`)} className={classes.catalog_result_item}
                                     key={Date.now() + uuidv4()}>
                                    {element.name}
                                </div>
                            )}
                        </Card>
                    )
                    :
                    <Card className={CardsClasses.Card_catalog} key={Date.now() + uuidv4()}>
                        <div style={{fontWeight: 'bold'}} className={classes.catalog_result_item}
                             key={Date.now() + uuidv4()}>
                            {'Ничего не найдено'}
                        </div>
                    </Card>
                }

            </div>
        </>
    );
};

export default BrandResult;