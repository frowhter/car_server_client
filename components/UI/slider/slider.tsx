import React, {useEffect, useRef, useState} from 'react';
import classes from "../../reviews/reviews.module.scss";
import {East, KeyboardBackspace} from "@mui/icons-material";
import btnClasses from '../Buttons/Button.module.scss';
import Button from "../Buttons/Button";
import ButtonsPagination from "../pagination/ButtonsPagination/buttonsPagination";

interface ISliderProps{
    description?: string;
    descriptionSize?: number;
    children: React.ReactNode;
    setWidth:  React.MutableRefObject<HTMLDivElement>;
    numberItems?: number;
    sliderPagination?: boolean | false;

}



const Slider: React.FC<ISliderProps> = ({children, description, descriptionSize, setWidth,numberItems,sliderPagination}) => {
    const sliderContainer = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);
    const sliderTrack = useRef<HTMLDivElement>(null);
    const prevBtn = useRef<HTMLButtonElement>(null);
    const nextBtn = useRef<HTMLButtonElement>(null);
    const [page, setPage] = useState<number>(0);


    useEffect(()=> {
        let width = setWidth?.current?.offsetWidth;

        if (sliderPagination){
            slider.current.scrollIntoView()
            if (sliderTrack.current.style.height && page===numberItems-1){
                let h = sliderTrack.current.style
                h.height=setWidth?.current?.offsetHeight + 'px';
            }else {
                let h = sliderTrack.current.style
                h.height='auto'
            }
        }
        let End = (page)*(width);
        sliderTrack.current.style.transform = `translateX(${-End}px)`
    }, [page])

    useEffect(() => {
        let positionStart = 0;
        let positionX1 = 0;
        let positionX2 =0;
        let positionEnd = 0;
        let mapSwipe = 0;




        const MouseDown = (e: MouseEvent) => {
            sliderTrack.current.style.transition= '0s';
            let width = setWidth?.current?.offsetWidth ;
            let widthSliderTrack = +width * numberItems;

            positionStart = positionX1 = e.clientX;
            const MouseMove = (ev: MouseEvent) => {
                positionX2 = positionX1 - ev.clientX
                positionX1 = ev.clientX
                let positionCurrent = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0]
                sliderTrack.current.style.transform = `translateX(${positionCurrent-positionX2}px)`
            }

            const MouseEnd = () => {
                positionEnd = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0];
                let index = Math.round(Math.abs(positionEnd)/(width))
                let End = index*(width);
                sliderTrack.current.style.transition= '1s';
                if(positionEnd>0){
                    sliderTrack.current.style.transform = `translateX(${0}px)`
                    setPage(0)
                }else if (positionEnd<-slider.current.offsetWidth * ((widthSliderTrack/+slider.current.offsetWidth) -1) ){
                    sliderTrack.current.style.transform = `translateX(${-(widthSliderTrack-slider.current.offsetWidth)}px)`

                    setPage(numberItems-1)
                }else{
                    sliderTrack.current.style.transform = `translateX(${-End}px)`
                    setPage(index)
                }


                document.removeEventListener('mousemove', MouseMove)
                document.removeEventListener('mouseup', MouseEnd)
            }
            document.addEventListener('mousemove', MouseMove)
            document.addEventListener('mouseup', MouseEnd)

        }
        const TouchStart = (e: TouchEvent) => {
            sliderTrack.current.style.transition= '0s';
            let width = setWidth?.current?.offsetWidth ;
            let widthSliderTrack = +width * numberItems;

            positionStart = positionX1 = e.touches[0].clientX;
            const TouchMove = (ev: TouchEvent) => {
                positionX2 = positionX1 - ev.touches[0].clientX
                positionX1 = ev.touches[0].clientX
                let positionCurrent = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0]
                sliderTrack.current.style.transform = `translateX(${positionCurrent-positionX2}px)`
            }

            const TouchEnd = () => {
                positionEnd = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0];
                let index = Math.round(Math.abs(positionEnd)/(width))
                let End = index*(width);
                sliderTrack.current.style.transition= '1s';
                if(positionEnd>0){
                    sliderTrack.current.style.transform = `translateX(${0}px)`
                    setPage(0)
                }else if (positionEnd<-slider.current.offsetWidth * ((widthSliderTrack/+slider.current.offsetWidth) -1) ){
                    sliderTrack.current.style.transform = `translateX(${-(widthSliderTrack-slider.current.offsetWidth)}px)`
                    setPage(numberItems-1)
                }else{
                    sliderTrack.current.style.transform = `translateX(${-End}px)`
                    setPage(index)
                }

                document.removeEventListener('touchmove', TouchMove)
                document.removeEventListener('touchend', TouchEnd)
            }
            document.addEventListener('touchmove', TouchMove)
            document.addEventListener('touchend', TouchEnd)

        }

        const nextSlide = ()=>{

            sliderTrack.current.style.transition= '1s';
            let width = setWidth?.current?.offsetWidth;
            let widthSliderTrack = +width * numberItems;
            let position = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0];
            let positionNext = position-width;
            sliderTrack.current.style.transform = `translateX(${positionNext}px)`;
            position = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0];
            prevBtn.current.disabled = false;
            if (position<=-slider.current.offsetWidth * ((widthSliderTrack/+slider.current.offsetWidth) -1)){
                sliderTrack.current.style.transform = `translateX(${-(widthSliderTrack-slider.current.offsetWidth)}px)`;
                setPage(numberItems-1)
            }else {
                setPage(page+1)
            }

        }
        const prevSlide = ()=>{
            sliderTrack.current.style.transition= '1s';
            let width = setWidth?.current?.offsetWidth;
            let position = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0];
            let positionPrev = position+width;
            sliderTrack.current.style.transform = `translateX(${positionPrev}px)`;
            position = + sliderTrack.current.style.transform.match(/[-0-9.]+(?=px)/)[0];
            nextBtn.current.disabled = false;
            if (position >= 0){
                sliderTrack.current.style.transform = `translateX(${0}px)`;
                setPage(0)
            }else {
                let a= page-1
                setPage(a)
            }
        }


        window.addEventListener('resize', ()=>{
            if (sliderTrack.current && sliderPagination){
                let width = setWidth.current.offsetWidth;
                let End = page*(width);
                console.log(page)
                sliderTrack.current.style.transition= '0.05s';
                sliderTrack.current.style.transform = `translateX(${-End}px)`
                let h = sliderTrack.current.style
                if(page===numberItems-1){
                    h.height=setWidth?.current?.offsetHeight + 'px';
                }else {
                    h.height='auto'
                }
            }
        })


        const setWidthSlider = () => {
            mapSwipe = slider.current?.offsetWidth;
        }

        document.addEventListener('click', setWidthSlider)
        nextBtn.current.addEventListener('click', nextSlide)
        prevBtn.current.addEventListener('click', prevSlide)
        slider.current.addEventListener('mousedown', MouseDown)
        slider.current.addEventListener('touchstart', TouchStart)

        return () => {
            window.removeEventListener('resize', ()=>{})
            document.removeEventListener('click', setWidthSlider)
            nextBtn.current?.removeEventListener('click', nextSlide)
            prevBtn.current?.removeEventListener('click', prevSlide)
            slider.current?.removeEventListener('mousedown', MouseDown)
            slider.current?.removeEventListener('touchstart', TouchStart)
        }
    },[page])




    return (
        <>
            <div ref={sliderContainer} className={'container'}>
                {sliderPagination
                    ?
                    <>
                        <div ref={slider}  className={classes.reviews}>
                            <div ref={sliderTrack} style={page===numberItems-1?{transform: 'translateX(0)', height: `auto`}:{transform: 'translateX(0)', height: `auto`}} className={classes.swiper}>

                                {children}

                            </div>
                        </div>
                        <div className={classes.reviewsBottom}>
                            <div  className={classes.reviewButtons}>
                                <Button className={page===0 ? 'opacityZero' : btnClasses.blank_text_blue + ' ' + btnClasses.padding} disabled={page===0} reference={prevBtn} >
                                    <KeyboardBackspace/>
                                </Button>
                                <ButtonsPagination currentPage={page} setItem={setPage} totalCount={numberItems} limit={1}/>
                                <Button disabled={page===numberItems-1} className={page===numberItems-1 ? 'opacityZero' : btnClasses.blank_text_blue + ' ' + btnClasses.padding} reference={nextBtn} >
                                    <East/>
                                </Button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className={classes.reviewsTop}>
                            {description
                                ?
                                <div className={'title'} style={{fontSize: descriptionSize}}>
                                    {description}
                                </div>
                                :
                                <>
                                </>
                            }
                            {numberItems-1===0
                                ?<div style={{display: "none"}} className={classes.reviewButtons}>
                                    <Button className={btnClasses.blank_text_blue + ' ' + btnClasses.padding} disabled={page===0} reference={prevBtn} >
                                        <KeyboardBackspace/>
                                    </Button>
                                    <Button disabled={page===numberItems-1} className={btnClasses.blank_text_blue + ' ' + btnClasses.padding} reference={nextBtn} >
                                        <East/>
                                    </Button>
                                </div>
                                :<div className={classes.reviewButtons}>
                                    <Button className={btnClasses.blank_text_blue + ' ' + btnClasses.padding} disabled={page===0} reference={prevBtn} >
                                        <KeyboardBackspace/>
                                    </Button>
                                    <Button disabled={page===numberItems-1} className={btnClasses.blank_text_blue + ' ' + btnClasses.padding} reference={nextBtn} >
                                        <East/>
                                    </Button>
                                </div>
                            }

                        </div>
                        <div ref={slider}  className={classes.reviews}>
                            <div ref={sliderTrack} style={{transform: 'translateX(0)'}} className={classes.swiper}>

                                {children}

                            </div>
                        </div>
                    </>

                }
            </div>
        </>
    );
};

export default Slider;