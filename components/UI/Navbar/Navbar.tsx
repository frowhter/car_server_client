import React, {memo} from 'react';
import Image from "next/image";
import Logo from '../../../assets/logo.png'
import CallIcon from '@mui/icons-material/Call';
import classes from './Navbar.module.scss'
import Button from "../Buttons/Button";
import {useRouter} from "next/router";
import {CATALOG_ROUTE, HOME_ROUTE} from "../../../consts";

const Navbar = memo(() => {
    const router = useRouter();
    return (
        <div className={classes.navbar + ' ' + 'container'}>
            <div className={classes.logo}>
                <div className={'cursorPointer'} style={{width: '129px'}}>

                    <Image onClick={() => router.push(HOME_ROUTE)} style={{maxWidth: '100%', height: 'auto'}}  src={Logo} alt={'logo'}/>
                </div>
                <span>Любые запчасти по минимальным ценам с гарантией в Уфе</span>
            </div>

            <Button onClick={() => router.push(CATALOG_ROUTE)} className={classes.btnCatalog}>
                каталог запчастей
            </Button>
            <a href="tel:+79371609277" className={classes.tel}>
                <CallIcon/>
                    +7 937 160-92-77
            </a>
        </div>
    );
});

export default Navbar;