import React from 'react';
import classes from "../../styles/Catalog.module.scss";
import Card from "../UI/Cards/Card";
import CardsClasses from "../UI/Cards/Cards.module.scss";
import {v4 as uuidv4} from "uuid";
import {ICar} from "../../types/cars";
import {useRouter} from "next/router";


interface IModelsResult{
    sortedAndSearchedModels: ICar[];
    brand: string | string[] | undefined;
}
const ModelsResult: React.FC<IModelsResult> = ({sortedAndSearchedModels, brand}) => {
    const router = useRouter();

    return (
        <>
            <div className={classes.catalog_result + ' ' + 'container'}>

                {sortedAndSearchedModels.length!==0
                    ?
                    sortedAndSearchedModels.map(element=>

                        <Card className={CardsClasses.Card_catalog_models} key={Date.now() + uuidv4()}>

                                <div onClick={()=> router.push(`/catalog/${brand}/${element.name}`)} className={classes.catalog_result_item}
                                     key={Date.now() + uuidv4()}>
                                    {element.name}
                                </div>


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

export default ModelsResult;

