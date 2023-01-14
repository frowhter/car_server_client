import React, {useContext, useRef, useState} from 'react';
import {IProduct} from "../../types/product";
import ProductsItem from "./productsItem";
import classes from './productsResults.module.scss';
import {useProducts} from "../../hooks/useProducts";
import {v4 as uuidv4} from "uuid";
import Slider from "../UI/slider/slider";
import Modal from "../UI/modals/modal";
import FormSectionCall from "../Forms/FormSectionCall";
import {useRouter} from "next/router";
import {transliterateRussian} from "../../handlers/translate";
import {sendMailSelections} from "../../htttp/razboroAPI";


interface IProductsListProps{
    products: IProduct[]
}

const ProductsList: React.FC<IProductsListProps> = ({products}) => {
    const destructuredProducts = useProducts(products, 8)
    const link = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState<boolean>(false)

    const [product, setProduct] = useState<string>('')

    const router = useRouter();
    const {brand, model} = router.query;
    const detail = transliterateRussian(router.query.detail)

    const sendForm = (phone: string)=> {
        const formData = new FormData()
        formData.append('page', window.location.href)
        formData.append('phone', phone)
        formData.append('brand', String(brand))
        formData.append('model', String(model))
        formData.append('details', String(detail))
        formData.append('product', product)
        sendMailSelections(formData).then(message => alert(message))
    }

    const onClick = (element)=> {
        setProduct(element)
        setVisible(true)
    }

    return (
        <>
            <div className={classes.product_container}>
                <Slider sliderPagination={true} setWidth={link} numberItems={destructuredProducts.length}>
                {destructuredProducts.map((element, index)=>
                    <div ref={destructuredProducts.length-1===index?link: null} className={classes.containerProductsSlid + ' ' + 'heightFitContent'} key={Date.now() + uuidv4()}>
                            {element.map(subElement =>
                                <ProductsItem onClickBtn={()=> onClick(subElement.name)} key={Date.now() + uuidv4()} product={subElement} />
                            )}
                    </div>
                )}
                </Slider>
                <Modal visible={visible} setVisible={()=>setVisible(false)}>
                    <FormSectionCall sendForm={sendForm}/>
                </Modal>
            </div>
        </>
    );
};

export default ProductsList;