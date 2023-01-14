import React, {useState} from 'react';
import ProductsList from "./productsList";
import {IProduct} from "../../types/product";
import ButtonsPagination from "../UI/pagination/ButtonsPagination/buttonsPagination";
import {IGenerations} from "../../types/generations";
import {v4 as uuidv4} from "uuid";

interface IProductsResultsProps{
    products: IProduct[];
    generations: IGenerations[];
}

const ProductsResults: React.FC<IProductsResultsProps> = ({products, generations}) => {
    return (
        <>
            <div className={'container'}>
                <div>
                    <div style={{margin: '30px 0'}} className={'bold'}>
                        В наличии запчасти на поколения:
                    </div>
                    <div style={{columnGap: '50px'}} className={'flexRowWrap'}>
                        {generations.map(element=>
                            <div key={Date.now() + uuidv4()}>
                                {element.pokolenie} ({element.year_start}-{element.year_end})
                            </div>
                        )}
                    </div>
                </div>
                <ProductsList products={products}/>
            </div>
        </>
    );
};

export default ProductsResults;