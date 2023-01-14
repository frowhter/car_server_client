import React, {useEffect, useRef, useState} from 'react';
import CatalogLayout from "../../../../layouts/CatalogLayout";
import classes from '../../../../styles/Catalog.module.scss'
import Search from "../../../../components/UI/search/search";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import modelsClasses from '../../../../styles/Catalog_Models.module.scss'
import detailsClasses from '../../../../styles/Catalod_Models_Details.module.scss'
import {Close} from "@mui/icons-material";
import {useSearchProduct} from "../../../../hooks/useBrands";
import DetailsResult from "../../../../components/catalogResults/detailsResult";
import {IGenerations} from "../../../../types/generations";
import Generation from "../../../../components/catalogResults/generation";
import {v4 as uuidv4} from "uuid";
import {CATALOG_ROUTE} from "../../../../consts";
import {ICar} from "../../../../types/cars";
import Slider from "../../../../components/UI/slider/slider";
import cardClasses from "../../../../components/UI/Cards/Cards.module.scss";
import Button from "../../../../components/UI/Buttons/Button";
import btnClasses from "../../../../components/UI/Buttons/Button.module.scss";
import Modal from "../../../../components/UI/modals/modal";
import FormCatalogDetails from "../../../../components/Forms/FormCatalogDetails";
import {fetchDetails, fetchGenerations} from "../../../../htttp/razboroAPI";



interface DetailListProps{
    details: ICar[];
    generations: IGenerations[];
}

interface IUseState{
    sort: string;
    query: string;
}


const Index: React.FC<DetailListProps> = ({details, generations}) => {
    const router = useRouter()
    const {brand, model} = router.query;
    const [filter, setFilter] = useState<IUseState>({sort: '', query: ''});
    const sortedAndSearchedModels = useSearchProduct(details, filter.sort, filter.query);
    const link = useRef(null)
    const [visible, setVisible] = useState(false)

    const [detail, setDetail] = useState<string>('')

    useEffect(()=> {
        if(sortedAndSearchedModels.length===0){
            setDetail(filter.query)
        }
    }, [sortedAndSearchedModels])

    return (
        <>
            <CatalogLayout classContainer={'container' + ' ' + detailsClasses.body}>
                <div className={classes.catalog_wrapper}>
                    <div className={classes.catalog_wrapper_header}>
                        <div className={modelsClasses.catalog_step_two}>
                            Выберите запчасть для
                        </div>
                        <div style={{display: "flex"}}>
                            <div onClick={()=>router.push(CATALOG_ROUTE)} className={modelsClasses.brandBlock}>
                                {brand}
                                <Close/>
                            </div>
                            <div onClick={()=>router.push(CATALOG_ROUTE + `/${brand}`)} className={modelsClasses.brandBlock}>
                                {model}
                                <Close/>
                            </div>
                        </div>

                        <Search filter={filter} setFilter={setFilter}/>

                    </div>
                    <div className={'flexColumn marginTopBottom'}>
                        <Button
                            onClick={()=>setVisible(true)}
                            className={sortedAndSearchedModels.length===0 ? btnClasses.filled :btnClasses.blank_text_blue}>
                            запросить деталь
                        </Button>
                    </div>

                    <Slider description={'В наличии запчасти на поколения:'} descriptionSize={14} setWidth={link} numberItems={generations.length}>
                        {generations.map(element=>
                            <div className={cardClasses.Card_style_flex} ref={link} key={Date.now() + uuidv4()}>
                                <Generation  generation={element}/>
                            </div>
                        )}
                    </Slider>

                    <DetailsResult brand={brand} model={model} sortedAndSearchedModels={sortedAndSearchedModels}/>
                    <Modal visible={visible} setVisible={()=>setVisible(false)}>
                        <FormCatalogDetails brand={String(brand)} model={String(model)} detailInput={detail}/>
                    </Modal>
                </div>

            </CatalogLayout>
        </>
    );
};


export const getServerSideProps: GetServerSideProps  = async (context) => {
    let param1: string | string[]  = '';
    let param2: string | string[]  = '';
    if(context.params){
        const {brand,model} = context.params
        param1=String(brand);
        param2=String(model);
    }
    const details = await fetchDetails(param1, param2)
    const generations = await fetchGenerations(param2)

    // Pass data to the page via props
    return { props: { details, generations } }

};

export default Index;