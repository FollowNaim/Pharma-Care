import BestDeal from "@/components/home/BestDeal";
import Category from "@/components/home/Category";
import DiscountCards from "@/components/home/DiscountCards";
import Features from "@/components/home/Features";
import TopSold from "@/components/home/TopSold";
import BannerSliders from "@/components/sliders/BannerSliders";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Home() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/public/categories");
      return data;
    },
  });
  return (
    <div>
      <BannerSliders />
      <div className="container my-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold pb-3">Our Categories</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
            laboriosam natus porro illum quia beatae quam vitae libero sunt
            dolorum! Dicta
          </p>
        </div>
        <div
          className="grid
         grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4"
        >
          {categories.slice(0, 6)?.map((item) => (
            <Category item={item} key={item.category} />
          ))}
        </div>
        <div>
          <TopSold />
        </div>
        <div>
          <Features />
        </div>
        <div>
          <DiscountCards />
        </div>
        <BestDeal />
      </div>
    </div>
  );
}

export default Home;
