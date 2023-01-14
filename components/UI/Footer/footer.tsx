import React from 'react';
import FormCall from "../../Forms/FormCall";
import Image from "next/image";
import footer from "../../../assets/footer.svg";

const Footer = () => {
    return (
        <>
            <div className={'footer'}>

                <FormCall/>
                <div className={'container'}>
                    <div className={"copy"}>© 2022 razboro.ru</div>
                </div>
                <Image className={'footerSvg'} src={footer} alt={'footer'}/>
            </div>
        </>
    );
};

export default Footer;