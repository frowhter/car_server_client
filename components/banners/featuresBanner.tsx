import React from 'react';
import classes from './featuresBanner.module.scss'
import Image from "next/image";
import details from '../../assets/details.svg';
import price from '../../assets/price.svg';
import contract from '../../assets/contract.svg';
import delivery from '../../assets/delivery.svg';
import Button from "../UI/Buttons/Button";
import btnClasses from '../UI/Buttons/Button.module.scss'

const FeaturesBanner = () => {
    return (
        <>
            <div className={classes.featuresBody + ' ' + 'container'}>

                <div className={classes.featuresLeft}>
                    <div className={classes.featuresLeftItem}>
                        <div className={classes.img}>
                            <Image src={details} alt={'details'}/>
                        </div>
                        <div>
                            Запросите интересующие вас запчасти
                        </div>
                    </div>
                    <div className={classes.featuresLeftItem}>
                        <div className={classes.img}>
                            <Image src={price} alt={'price'}/>
                        </div>
                        <div>
                            Мы выставим минимальные цены
                        </div>
                    </div>
                    <div className={classes.featuresLeftItem}>
                        <div className={classes.img}>
                            <Image src={contract} alt={'contract'}/>
                        </div>
                        <div>
                            При встрече заключим договор
                        </div>
                    </div>
                    <div className={classes.featuresLeftItem}>
                        <div className={classes.img}>
                            <Image src={delivery} alt={'delivery'}/>
                        </div>
                        <div>
                            Привезем запчасти в срок
                        </div>
                    </div>
                </div>

                <div className={classes.featuresRight}>
                    <div className={'title'}>
                        Новые и бу автозапчасти по лучшим ценам в Уфе
                    </div>
                    <div>
                        У нас несколько складов по России, сотрудничаем с большим кол-вом авторазборок и поставщиков. В наличии всегда много вариантов, которые отличаются производителями, состоянием, цветами, ценами. Есть оригинальные запчасти и аналоги, новые и бу.
                    </div>
                    <Button className={btnClasses.filled}>
                        подобрать запчасти
                    </Button>
                </div>

            </div>
        </>
    );
};

export default FeaturesBanner;