import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function App({images}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
                {images?.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`http://localhost:8000${image}`}
                            alt={`Nature Image ${index + 1}`}
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
           
        </>
    );
}
