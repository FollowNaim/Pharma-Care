import { Link } from "react-router-dom";
import { Button } from "../ui/button";
function Slide({ image, title, subtitle }) {
  return (
    <div className="container bg-cover bg-center object-cover bg-no-repeat px-4 md:px-8 py-10 bg-blend-overlay flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex flex-1 flex-col items-start mt-10 md:mt-0 gap-4">
        <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold">
          {title}
        </h2>
        <p className="text-black/60 max-w-md">{subtitle}</p>
        <Link to={"/shop"}>
          <Button className="mt-4 bg-black text-white" size="lg">
            Buy Now
          </Button>
        </Link>
      </div>
      <div className="flex-1 flex justify-end">
        <img
          className="w-full md:w-96 h-40 md:h-96 object-cover"
          src={image}
          alt=""
        />
      </div>
    </div>
  );
}

export default Slide;
