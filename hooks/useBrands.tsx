import React, {useMemo} from "react";
import {ICar} from "../types/cars";


type UseSearchProducts = (
    data: ICar[] ,
    sort: string,
    query: string,
) => ICar[]

export const useSearchProduct: UseSearchProducts = (data,  sort, query) => {
        return useMemo(() => {
            return data.filter(element => element.name.toLowerCase().includes(query.toLowerCase()))
        },[query, data]);

}


type UseSearchData = (
    data: any[] ,
    propertyName: string,
    sort: string,
    query: string,
) => ICar[]

export const useSearchData: UseSearchData = (data, propertyName, sort, query) => {
    return useMemo(() => {
        return data.filter(element => element[propertyName].toLowerCase().includes(query.toLowerCase()))
    },[query, data]);

}

type UseBrands = (
    brands: ICar[],
    sort: string,
    query: string,
) => ICar[][] | []
export const useBrands: UseBrands = (brands, sort, query) =>{
    const searchedBrands = useSearchProduct(brands,  sort, query)
    return  useMemo(()=>{
        let store: ICar[][] = [];
        let localeStore: ICar[] = [];
        searchedBrands.map(function (element, index){
            switch (true){
                case (index === searchedBrands.length-1 && index===0):
                    localeStore=[...localeStore, element];
                    store=[...store, localeStore];
                    break;
                case (index===0 && index !== searchedBrands.length-1) :
                    localeStore=[...localeStore, element];
                    break;
                case (element.name[0]===localeStore[0].name[0]):
                    localeStore=[...localeStore, element];
                    break;
                case (element.name[0]!==localeStore[0].name[0]):
                    switch (index === searchedBrands.length-1){
                        case true:
                            store=[...store, localeStore];
                            localeStore=[element];
                            store=[...store, localeStore];
                            break;
                        case false:
                            store=[...store, localeStore];
                            localeStore=[element];
                            break;
                    }
                    break;
            }
        })
        return store;
    }, [searchedBrands]);


}




