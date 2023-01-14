import React, {useState} from 'react';
import CatalogLayout from "../../../layouts/CatalogLayout";
import classes from '../../../styles/Catalog.module.scss'
import Search from "../../../components/UI/search/search";
import {useSearchProduct} from "../../../hooks/useBrands";
import ModelsResult from "../../../components/catalogResults/modelsResult";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import modelsClasses from '../../../styles/Catalog_Models.module.scss'
import {Close} from "@mui/icons-material";
import {CATALOG_ROUTE} from "../../../consts";
import {ICar} from "../../../types/cars";
import {fetchModels} from "../../../htttp/razboroAPI";



interface ModelListProps{
    models: ICar[]
}

interface IUseState{
    sort: string;
    query: string;
}


const Index: React.FC<ModelListProps> = ({models}) => {
    const router = useRouter()
    const {brand} = router.query;
    const [filter, setFilter] = useState<IUseState>({sort: '', query: ''});
    const sortedAndSearchedModels = useSearchProduct(models, filter.sort, filter.query);
    return (
        <>
            <CatalogLayout classContainer={'container'}>
                <div className={classes.catalog_wrapper}>
                    <div className={classes.catalog_wrapper_header}>
                        <div className={modelsClasses.catalog_step_two}>
                            Выберите модель для
                        </div>
                        <div onClick={()=>router.push(CATALOG_ROUTE)} className={modelsClasses.brandBlock}>
                            {brand}
                            <Close/>
                        </div>
                        <Search filter={filter} setFilter={setFilter}/>
                    </div>
                    <ModelsResult brand={brand} sortedAndSearchedModels={sortedAndSearchedModels}/>
                </div>
            </CatalogLayout>
        </>
    );
};


export const getServerSideProps: GetServerSideProps  = async (context) => {
        let param: string | string[] = '';
        if(context.params){
            const {brand} = context.params
            param=String(brand);
        }
        const models = await fetchModels(param)

        // Pass data to the page via props
        return { props: { models } }

};
export default Index;