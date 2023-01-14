import React, {useEffect, useState} from 'react';
import Button from "../UI/Buttons/Button";
import style from '../UI/Buttons/Button.module.scss'
import classes from "./Form.module.scss";
import man from '../../assets/man.png'
import Image from "next/image";
import Input from "../UI/inputs/Input";
import {ICar} from "../../types/cars";
import {IGenerations} from "../../types/generations";
import {IProduct} from "../../types/product";
import Modal from "../UI/modals/modal";
import AutoCompleteSearch from "../UI/AutoComplete/AutoCompleteSearch";
import FormSectionCall from "./FormSectionCall";
import {fetchDetails, fetchGenerations, fetchModels, sendMailSelections} from "../../htttp/razboroAPI";

interface IFormSelectionProps{
    brands: ICar[];
}

const FormSelection: React.FC<IFormSelectionProps> = ({brands}) => {

    const [brandSelect, setBrandSelect] = useState<string[]>([])

    const [models, setModels] = useState<ICar[]>([])
    const [modelSelect, setModelSelect] = useState<string[]>([])

    const [generations, setGenerations] = useState<IGenerations[]>([])
    const [generationSelect, setGenerationSelect] = useState<string[]>([])

    const [details, setDetails] = useState<IProduct[]>([])
    const [detailsSelect, setDetailsSelect] = useState<string[]>([])

    const [visible, setVisible] = useState(false)


    useEffect(() => {
        if(brandSelect.join()!=='') {
            fetchModels(String(brandSelect)).then(models => setModels(models))
        }
    }, [brandSelect])

    useEffect(() => {
        if(modelSelect.join()!=='') {
            fetchGenerations(String(modelSelect)).then(generations => setGenerations(generations))
            fetchDetails(String(brandSelect), String(modelSelect)).then(details => setDetails(details))
        }
    }, [modelSelect])


    const sendForm = (phone: string)=> {
        const formData = new FormData()
        formData.append('page', window.location.href)
        formData.append('phone', phone)
        formData.append('brand', brandSelect.join())
        formData.append('model', modelSelect.join())
        formData.append('generation', generationSelect.join())
        formData.append('details', detailsSelect.join(', '))
        sendMailSelections(formData).then(message => alert(message))

    }


    return (

        <div className={classes.selection}>

            <div className={classes.selectionImage}>
                <Image style={{maxWidth: '100%', height: 'auto'}} src={man} alt="man"/>
            </div>

            <div style={{maxWidth: '560px'}} className={classes.formSelectBody + ' ' + 'container'}>
                <form className={classes.formContainer} onSubmit={event => event.preventDefault()}>
                    <div className={'title'}>
                        Подберите мне запчасти
                    </div>
                    <AutoCompleteSearch many={false} data={brands} propertyName={'name'} disabled={false} placeholder={'Бренд'} setSubData={setBrandSelect}/>

                    <div className={classes.selection_items_model}>
                        <AutoCompleteSearch many={false} data={models} propertyName={'name'} disabled={brandSelect.join()===''} placeholder={'Модель'} setSubData={setModelSelect}/>

                        <AutoCompleteSearch many={false} data={generations} propertyName={'pokolenie'} disabled={modelSelect.join()===''} placeholder={'Поколение'} setSubData={setGenerationSelect}/>
                    </div>

                    <div className={classes.selection_items_item}>
                        <Input maxLength={17} placeholder={'VIN автомобиля'}/>
                    </div>

                    <AutoCompleteSearch many={true} data={details} propertyName={'name'} disabled={modelSelect.join()===''} placeholder={'Укажите необходимые запчасти'} setSubData={setDetailsSelect}/>
                </form>
                <Button disabled={brandSelect.length===0 || modelSelect.length===0 || detailsSelect.length===0} onClick={()=>setVisible(true)} width={'100%'}  className={style.filled + ' ' + 'marginTop'}>
                    подобрать
                </Button>
            </div>

            <Modal visible={visible} setVisible={()=>setVisible(false)}>
               <FormSectionCall sendForm={sendForm}/>
            </Modal>

        </div>

    );
};

export default FormSelection;