import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DiscountCard from "./DiscountCard";
function DiscountCards() {
  return (
    <div className="my-20 px-4">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-semibold">Grab Your Discount Now!</h2>
        <p className="text-muted-foreground py-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, enim.
          Magnam, cumque sequi non iusto nihil tempore consectetur natus
          doloremque sapiente, in ipsum{" "}
        </p>
      </div>
      <div className="container">
        <Swiper
          grabCursor={true}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
          <SwiperSlide>
            <DiscountCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default DiscountCards;
