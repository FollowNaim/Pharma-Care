import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper React components
import sliderbg from "@/assets/sliders/slide-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Spinner from "../spinner/Spinner";
import "./BannerSliders.css";
import Slide from "./Slide";
function BannerSliders() {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["home-banners"],
    queryFn: async () => {
      const { data } = await axios.get("/banners");
      const filtered = data.filter((item) => item.status === "added");
      return filtered;
    },
  });
  if (isLoading) return <Spinner />;
  return (
    <div id="bannerslider" style={{ backgroundImage: `url('${sliderbg}')` }}>
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
        {banners.map((medicine) => (
          <SwiperSlide key={medicine._id}>
            <Slide
              image={medicine.image}
              title={medicine.medicineName}
              subtitle={medicine.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerSliders;
