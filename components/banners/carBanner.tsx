import React from 'react';
import Image from "next/image";
import car from '../../assets/promo/car.png'
import svg1 from '../../assets/promo/1.svg';
import svg2 from '../../assets/promo/2.svg';
import svg3 from '../../assets/promo/3.svg';
import promo1 from '../../assets/promo/promo-1.png';
import promo2 from '../../assets/promo/promo2.png';
import promo3 from '../../assets/promo/promo-3.png';
import classes from './carBanner.module.scss';

const CarBanner = () => {
    return (
        <>
            <div className={classes.promo__inner}>
                <div className={classes.promo__car}>
                    <Image src={car} alt={'car'} className={"promo__car-image"}/>
                        <div className={classes.promo__car__circle + ' ' + classes.promo__car__circle1}>
                            <div className={classes.promo__car__circleMini}>
                                <Image src={svg1} className={classes.promo__lines1} alt="line" />
                                    <div className={classes.message + ' ' + classes.message1}>
                                        <div className={classes.messageInner}>
                                            <Image src={promo1} alt="ava"/>
                                                <div className={classes.messageName}>Alex56</div>
                                        </div>
                                        <div className={classes.messageInner}>
                                            <div className="message-description">Капот</div>
                                            <div className={classes.messagePrice}>7 000 ₽</div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className={classes.promo__car__circle + ' ' + classes.promo__car__circle2}>
                            <div className={classes.promo__car__circleMini}>
                                <Image src={svg2} className={classes.promo__lines2} alt="line"/>
                            </div>
                            <div className={classes.message + ' ' + classes.message2}>
                                <div className={classes.messageInner}>
                                    <Image src={promo2} alt="ava"/>
                                        <div className={classes.messageName}>Autoshop_1</div>
                                </div>
                                <div className={classes.messageInner}>
                                    <div className="message-description">Дверь</div>
                                    <div className={classes.messagePrice}>12 000 ₽</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.promo__car__circle + ' ' + classes.promo__car__circle3}>
                            <div className={classes.promo__car__circleMini}>
                                <Image src={svg3} className={classes.promo__lines3} alt="line"/>
                            </div>
                            <div className={classes.message + ' ' + classes.message3}>
                                <div className={classes.messageInner}>
                                    <Image src={promo3} alt="ava"/>
                                        <div className={classes.messageName}>Nikolay_53</div>
                                </div>
                                <div className={classes.messageInner}>
                                    <div className="message-description">Бампер</div>
                                    <div className={classes.messagePrice}>5 500 ₽</div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default CarBanner;