import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DiscountCard from "./DiscountCard";
function DiscountCards() {
  const { data: cards = [] } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const { data } = await axios.get("/banners/discounted");
      return data;
    },
  });
  return (
    <div className="my-20 px-4">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl font-semibold">
          Grab Your <span className="text-blue-600">Discount Now!</span>
        </h2>
        <p className="text-muted-foreground py-3">
          Act Fast! Unlock Exclusive Discounts and Save Big on Your Favorite
          Essentials Today!
        </p>
      </div>
      <div className="container">
        <Swiper
          grabCursor={true}
          slidesPerView={1}
          breakpoints={{
            720: {
              slidesPerView: "2",
            },
            1080: {
              slidesPerView: "3",
            },
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 1000, pauseOnMouseEnter: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {cards.map((item) => (
            <SwiperSlide key={item._id}>
              <DiscountCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default DiscountCards;
