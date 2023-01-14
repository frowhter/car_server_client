import React, {useState} from 'react';
import classes from '../styles/Home.module.scss';
import Navbar from "../components/UI/Navbar/Navbar";
import CallIcon from "@mui/icons-material/Call";
import FormSelection from "../components/Forms/FormSelection";
import Button from "../components/UI/Buttons/Button";
import classesBtn from '../components/UI/Buttons/Button.module.scss'
import {East} from "@mui/icons-material";
import MainLayout from "../layouts/MainLayout";
import {useRouter} from "next/router";
import Reviews from "../components/reviews/reviews";
import {GetServerSideProps} from "next";
import {IReviews} from "../types/reviews";
import {CATALOG_ROUTE} from "../consts";
import CarBanner from "../components/banners/carBanner";
import {ICar} from "../types/cars";
import {fetchBrand, fetchReviews} from "../htttp/razboroAPI";
import Modal from "../components/UI/modals/modal";
import FormCall from "../components/Forms/FormCall";


interface IProductsProps{
    reviews: IReviews[];
    brands: ICar[];
}


const Index: React.FC<IProductsProps> = ({reviews, brands}) => {
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false)
    return (
        <>
            <MainLayout>
                <div className={classes.header}>
                    <div className={'container'}>
                        <Navbar/>
                        <div className={classes.header_content}>
                            <div className={classes.header_content_body}>
                                <div className={classes.header_content_text}>
                                    <div className={classes.header_content_title + ' title'}>
                                        Новые и бу автозапчасти по лучшим ценам в Уфе
                                    </div>
                                    <ul className={classes.header_content_content}>
                                        <li>– Запросите интересующие вас запчасти в Уфе</li>
                                        <li>– Мы выставим минимальные цены</li>
                                        <li>– При встрече заключим договор</li>
                                        <li>– Привезем запчасти в срок</li>
                                    </ul>

                                    <Button onClick={() => router.push(CATALOG_ROUTE)} className={classesBtn.filled + ' ' + classesBtn.filledHover + ' ' + classes.btnHeaderCatalog}>
                                        каталог запчастей
                                    </Button>


                                    <Button onClick={()=>setVisible(true)} className={classesBtn.filled + ' ' + classesBtn.filledHover + ' ' + classes.btnHeaderCall + ' ' + classes.width}>
                                        <CallIcon/>Нажмите и мы перезвоним
                                    </Button>



                                </div>
                                <CarBanner/>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal visible={visible} setVisible={()=> setVisible(false)}>
                    <FormCall/>
                </Modal>
                <FormSelection brands={brands}/>
                <Reviews reviews={reviews}/>
                <div className={classes.latest}>
                    <div className={'container'}>
                        <div className={classes.latest_top}>
                            <div className={'title'}>
                                Последние поступления
                            </div>
                            <Button onClick={() => router.push('/catalog/')} className={classesBtn.blank_text_blue}>
                                Смотреть весь каталог
                                <East/>
                            </Button>
                        </div>
                    </div>
                </div>

            </MainLayout>

        </>

    );
};


export const getServerSideProps: GetServerSideProps  = async (context) => {
    const reviews = await fetchReviews()

    const brands = await fetchBrand()

    // Pass data to the page via props
    return { props: { reviews, brands } }

};


export default Index;