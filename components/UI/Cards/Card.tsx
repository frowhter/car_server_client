import React, {memo} from 'react';
import classes from './Cards.module.scss'

interface GroupProperties {
    children?: React.ReactNode;
    className?: string;

    width?: number
    refLink?: React.MutableRefObject<HTMLDivElement>


}
const Card: React.FC<GroupProperties> = memo(({children, className, width, refLink}) => {
    return (
        <div ref={refLink} style={{width: width}} className={classes.Card + ' ' + className}>
            {children}
        </div>
    );
});

export default Card;