import React, {memo} from 'react';
import Pagination from "../Pagination";
import PaginationItem from "../PaginationItem";
import classes from '../Pagination.module.scss'

interface IProductContainerProps{
    totalCount: number;
    limit: number;
    setItem: (i:number)=>void
    currentPage: number;
}

const ButtonsPagination: React.FC<IProductContainerProps> = memo(({totalCount, limit, setItem, currentPage}) => {

    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i)
    }
    return (
        <>
            <Pagination>
                {pages.map(page =>
                    <PaginationItem
                        key={page}
                        active={page===currentPage}
                        onClick={()=> {
                            setItem(page)
                        }}
                    >
                        {page+1}
                    </PaginationItem>
                )}
            </Pagination>
        </>
    );
});

export default ButtonsPagination;