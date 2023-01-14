import React from 'react';
import classes from './Pagination.module.scss'

interface IPaginationProps{
    children: React.ReactNode;
}

const Pagination: React.FC<IPaginationProps> = ({children}) => {
    return (
        <div className={classes.page__wrapper}>
            {children}
        </div>
    );
};

export default Pagination;