'use client'

import {Swiper, SwiperSlide} from 'swiper/react';

import styles from './BannerSlider.module.scss';
import {Autoplay} from "swiper/modules";

import 'swiper/scss';
import 'swiper/scss/autoplay';
import {Banner} from "@/types/Banner";
import Image from "next/image";
import {FC} from "react";

interface Props {
    bannerList: Banner[];
}


export const BannerSlider: FC<Props> = ({bannerList}) => {

    return (
        <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{delay: 4000}}
        className={styles.slider}
        >
            {bannerList.map(banner => (
                <SwiperSlide key={banner.id}>
                    <Image src={banner.image} alt='Rick and Morty' fill/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}