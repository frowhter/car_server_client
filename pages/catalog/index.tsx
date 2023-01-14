import React, {useState} from 'react';
import CatalogLayout from "../../layouts/CatalogLayout";
import classes from '../../styles/Catalog.module.scss'
import {ICar} from "../../types/cars";
import Search from "../../components/UI/search/search";
import {useBrands} from "../../hooks/useBrands";
import BrandResult from "../../components/catalogResults/brandResult";
import axios from "axios";
import {fetchBrand} from "../../htttp/razboroAPI";



interface BrandListProps{
    brands: ICar[]
}

interface IUseState{
    sort: string;
    query: string;
}


const Index: React.FC<BrandListProps> = ({brands}) => {
    const [filter, setFilter] = useState<IUseState>({sort: '', query: ''});
    const sortedAndSearchedBrand = useBrands(brands, filter.sort, filter.query);

    return (
        <>
            <CatalogLayout classContainer={'container'}>
               <div className={classes.catalog_wrapper}>
                   <div className={classes.catalog_wrapper_header}>
                       <div className={classes.catalog_step}>
                           Выберите марку
                       </div>
                       <Search filter={filter} setFilter={setFilter}/>
                   </div>

                   <BrandResult sortedAndSearchedBrand={sortedAndSearchedBrand}/>


               </div>
            </CatalogLayout>
        </>
    );
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const brands = await fetchBrand()

    // Pass data to the page via props
    return { props: { brands } }
}

export default Index;