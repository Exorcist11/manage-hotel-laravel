import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function App() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const images = [
        "nature-1.jpg",
        "nature-2.jpg",
        "nature-3.jpg",
        "nature-4.jpg",
        "nature-5.jpg",
        "nature-6.jpg",
        "nature-7.jpg",
        "nature-8.jpg",
        "nature-9.jpg",
        "nature-10.jpg",
    ];

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : null}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`https://swiperjs.com/demos/images/${image}`}
                            alt={`Nature Image ${index + 1}`}
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
           
        </>
    );
}
