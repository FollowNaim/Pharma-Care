import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import slide1 from "@/assets/sliders/slide1.jpeg";
import slide2 from "@/assets/sliders/slide2.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BannerSliders.css";
import Slide from "./Slide";
function BannerSliders() {
  return (
    <div id="bannerslider">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={slide1}
            title={"Lab Hand Sanitizer"}
            subtitle={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sint reiciendis dignissimos, voluptate labore providen corporis sequi"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={slide2}
            title={"Napa Extra Sanitizer"}
            subtitle={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sint reiciendis dignissimos, voluptate labore providen corporis sequi"
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default BannerSliders;
