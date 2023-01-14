import {useMemo} from "react";
import {IProduct} from "../types/product";
import {element} from "prop-types";
import {max} from "@popperjs/core/lib/utils/math";


type useProducts = (
    products: IProduct[],
    sort: number,
) => IProduct[][] | []
export const useProducts: useProducts = (products, sort) =>{
    return  useMemo(()=>{
        let store: IProduct[][] = [];
        let localeStore: IProduct[] = [];

        products.map(function (element, index) {
            switch (true){
                case (index === 0):
                    localeStore = [element]
                    if (index === products.length-1){
                        store = [...store, localeStore]
                    }
                    break;
                case (index%sort!==0):
                    localeStore = [...localeStore, element]
                    if (index === products.length-1){
                        store = [...store, localeStore]
                    }
                    break;
                case (index%sort === 0 ):
                    store = [...store, localeStore]
                    localeStore = [element]
                    if (index === products.length-1){
                        store = [...store, localeStore]
                    }
                    break;
            }
        })
        return store;
    }, [products]);


}

type useMinWithMax = (
    products: IProduct[],
) => [minPrice:number, maxPrice: number]

export const useMinWithMax: useMinWithMax = (products)=> {
    return useMemo(()=>{
        const priceArray = products.map(element=> element.price)
        return [Math.min.apply(null, priceArray), Math.max.apply(null,priceArray)]
    }, [products])
}