'use client'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from "swiper/modules";

import 'swiper/scss';
import 'swiper/scss/autoplay';

import {FC} from "react";
import {Planet} from "@/types/Planet";

import './PlanetSlider.scss'

interface Props {
    planetSliders: Planet[];
}

export const PlanetSlider: FC<Props> = ({planetSliders}) => {
    return (
        <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{delay: 3000}}
            className="slider"
        >
            {planetSliders.map(planet => {
                const {id, title, image, temperature} = planet;

                return (
                    <SwiperSlide className="slide" key={id}>
                        <img className="slide__img" src={image} alt={title}/>

                        <p className="slide__text slide__text--temperature">{temperature}</p>

                        <p className="slide__text">{title}</p>

                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}