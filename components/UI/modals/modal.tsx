import React from 'react';
import classes from './modal.module.scss'
import {Close} from "@mui/icons-material";


interface IModalProps{
    children: React.ReactNode;
    visible: boolean;
    setVisible: ()=>void;
}

const Modal: React.FC<IModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [classes.modal];
    if(visible){
        rootClasses.push(classes.active)
    }

    return (
        <>
            <div className={rootClasses.join(' ')} onClick={setVisible}>
                <div className={'flexColumn'}>
                    <div className={classes.modalClose}><Close/></div>
                    <div className={classes.modalContent} onClick={(e)=> e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;