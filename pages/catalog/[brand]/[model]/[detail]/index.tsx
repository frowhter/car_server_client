import React, {useState} from 'react';
import CatalogLayout from "../../../../../layouts/CatalogLayout";
import Reviews from "../../../../../components/reviews/reviews";
import classes from '../../../../../styles/CatalogProductsPage.module.scss';
import Footer from "../../../../../components/UI/Footer/footer";
import {useRouter} from "next/router";
import {NavigateNext} from "@mui/icons-material";
import Button from "../../../../../components/UI/Buttons/Button";
import btnClasses from '../../../../../components/UI/Buttons/Button.module.scss'
import {GetServerSideProps} from "next";
import {IReviews} from "../../../../../types/reviews";
import ProductsResults from "../../../../../components/productsResults/productsResults";
import {IProduct} from "../../../../../types/product";
import {CATALOG_ROUTE} from "../../../../../consts";
import FeaturesBanner from "../../../../../components/banners/featuresBanner";
import {useMinWithMax} from "../../../../../hooks/useProducts";
import {IGenerations} from "../../../../../types/generations";
import Modal from "../../../../../components/UI/modals/modal";
import FormSectionCall from "../../../../../components/Forms/FormSectionCall";
import {transliterateRussian} from "../../../../../handlers/translate";
import {fetchGenerations, fetchProducts, fetchReviews, sendMailSelections} from "../../../../../htttp/razboroAPI";

interface IProductsProps{
    reviews: IReviews[];
    products: IProduct[];
    generations: IGenerations[];
}
const Index: React.FC<IProductsProps> = ({reviews, products, generations}) => {
    const router = useRouter();
    const {brand, model} = router.query;
    const detail = transliterateRussian(router.query.detail)

    const [minPrice, maxPrice] = useMinWithMax(products)
    const [visible, setVisible] = useState<boolean>(false)


    const sendForm = (phone: string)=> {
        const formData = new FormData()
        formData.append('page', window.location.href)
        formData.append('phone', phone)
        formData.append('brand', String(brand))
        formData.append('model', String(model))
        formData.append('details', String(detail))
        sendMailSelections(formData).then(message => alert(message))

    }
    return (
        <>
            <CatalogLayout classContainer={classes.mainContainer}>
                <div className={classes.container}>
                    <div className={'container'}>
                        <div className={classes.navigate}>
                            <div onClick={()=> router.push(CATALOG_ROUTE)} className={classes.navigate_item}>
                                Каталог
                                <NavigateNext/>
                            </div>
                            <div onClick={()=> router.push(CATALOG_ROUTE + `/${brand}`)} className={classes.navigate_item}>
                                {brand}
                                <NavigateNext/>
                            </div>
                            <div onClick={()=> router.push(CATALOG_ROUTE + `/${brand}/${model}`)} className={classes.navigate_item}>
                                {model}
                                <NavigateNext/>
                            </div>
                            <div className={classes.active}>
                                {detail}
                            </div>
                        </div>
                        <div className={classes.priceBanner}>
                            <div className={classes.priceBanner_item_left}>
                                <div>{brand}</div>
                                <div>{model}</div>
                                <div>{detail}</div>
                            </div>
                            <div className={classes.priceBanner_item_right}>
                                <div className={classes.priceBanner_item_right_items}>
                                    <div className={classes.priceBanner_item_right_items_price}>
                                        от {minPrice} до {maxPrice} руб.*
                                    </div>
                                    <Button onClick={()=> setVisible(true)} className={btnClasses.filled}>уточнить цену</Button>
                                </div>
                                <span>* Зависит от производителя и состояния запчасти</span>
                            </div>

                        </div>
                    </div>
                    <Modal visible={visible} setVisible={()=> setVisible(false)}>
                        <FormSectionCall sendForm={sendForm}/>
                    </Modal>
                    <ProductsResults products={products} generations={generations}/>
                    <FeaturesBanner/>
                    <Reviews reviews={reviews}/>
                    <Footer/>
                </div>
            </CatalogLayout>
        </>
    );
};
export const getServerSideProps: GetServerSideProps  = async (context) => {

    let param1: string | string[]  = '';
    let param2: string | string[]  = '';
    let param3: string | string[]  = '';
    if(context.params){
        const {brand,model, detail} = context.params
        param1=String(brand);
        param2=String(model);
        param3=String(transliterateRussian(detail));
    }

    const reviews = await fetchReviews()

    const products = await fetchProducts(param1, param2, param3)

    const generations = await fetchGenerations(param2)

    // Pass data to the page via props
    return { props: { reviews, products, generations} }

};
export default Index;