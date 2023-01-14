import React, {memo} from 'react';
import classes from "./Pagination.module.scss";
import Button from "../Buttons/Button";
import btnClasses from '../Buttons/Button.module.scss'


interface IPaginationItemProps{
    children: React.ReactNode;
    active: boolean;

    onClick: ()=>void;
}
const PaginationItem: React.FC<IPaginationItemProps> = memo(({children, active, onClick}) => {
    return (
        <Button onClick={onClick} className={active ? btnClasses.filled + ' ' + btnClasses.padding : btnClasses.blank_text_blue+ ' ' + btnClasses.padding}>
            {children}
        </Button>
    );
});

export default PaginationItem;