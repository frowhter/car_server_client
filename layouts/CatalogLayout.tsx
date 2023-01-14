import React from 'react';
import Navbar from "../components/UI/Navbar/Navbar";
import classes from '../styles/Catalog.module.scss';



interface LayoutProps {
    children?: React.ReactNode;
    classContainer: string;
}
const CatalogLayout: React.FC<LayoutProps> = ({children, classContainer}) => {
    return (
        <>
            <div className={classes.catalog_container + ' ' + classContainer}>
                <div className={classContainer}>
                    <Navbar/>
                    {children}
                </div>
            </div>
        </>
    );
};

export default CatalogLayout;