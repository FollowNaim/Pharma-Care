import img1 from "@/assets/top-sold/b-01.jpg";
import img2 from "@/assets/top-sold/b-02.jpg";
import img3 from "@/assets/top-sold/b-03.jpg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
function TopSold() {
  return (
    <div className="mt-20 mb-10 container px-4  ">
      <div className="max-w-xl mx-auto text-center my-10">
        <h2 className="text-3xl font-bold">
          <span className="text-blue-600">Top Sell</span> Products
        </h2>
        <p className="text-muted-foreground mt-3">
          Discover customer favorites that everyone loves! Handpicked for their
          quality and value, these products are tried, trusted, and top-rated.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div
          className="col-span-12 md:col-span-8 py-32 bg-no-repeat bg-cover px-8"
          style={{ backgroundImage: `url('${img1}')` }}
        >
          <div>
            <h4 className="text-xl">Aloe Vera</h4>
            <h2 className="text-6xl font-bold py-3 font-montserrat">
              Hair Oil
            </h2>
            <p className="max-w-xl">
              Nourish and revitalize your hair with the natural goodness of aloe
              vera. Infused with essential nutrients to strengthen and hydrate,
              leaving your hair smooth and healthy.
            </p>
            <Link to={"/shop"}>
              <Button size="lg" className="mt-6">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 grid grid-cols-1 items-stretch gap-4">
          <div
            className="bg-no-repeat bg-cover p-4 flex flex-col justify-center"
            style={{ backgroundImage: `url('${img2}')` }}
          >
            <h4 className="text-xl">Cosmetics</h4>
            <h2 className="text-3xl font-bold py-2">Body Lotion</h2>
            <p className="mt-4 border-b-2 w-fit border-blue-600">Shop Now +</p>
          </div>
          <div
            className="bg-no-repeat bg-cover p-4 flex flex-col justify-center"
            style={{ backgroundImage: `url('${img3}')` }}
          >
            <h4 className="text-xl">Senitizer</h4>
            <h2 className="text-3xl font-bold py-2">Temperature</h2>
            <p className="mt-4 border-b-2 w-fit border-blue-600">Shop Now +</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSold;
