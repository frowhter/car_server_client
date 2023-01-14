import React, {memo} from 'react';
import {IProduct} from "../../types/product";
import Card from "../UI/Cards/Card";
import cardClasses from  '../UI/Cards/Cards.module.scss'
import Button from "../UI/Buttons/Button";
import btnClasses from '../UI/Buttons/Button.module.scss'
import notPhoto from '../../assets/not_photo.png'
import Image from "next/image";
import classes from './productsResults.module.scss'

interface IProductsItemProps{
    product: IProduct;
    onClickBtn: ()=> void;
}

const ProductsItem: React.FC<IProductsItemProps> = memo(({product, onClickBtn}) => {
    return (
            <Card className={cardClasses.Card_style_white}>
                <div onMouseDown={(e)=> e.preventDefault()} style={{height: 185}}>
                    <Image style={{width: '100%', height: '100%'}} src={notPhoto} alt={'photo'}/>
                </div>
                <div className={classes.productItemName}>
                    {product.name}
                </div>
                <div className={classes.productItemPrice}>
                    {product.price} ₽
                </div>
                <Button onClick={onClickBtn} className={btnClasses.blank_text_blue}>
                    уточнить
                </Button>
            </Card>
    );
});

export default ProductsItem;