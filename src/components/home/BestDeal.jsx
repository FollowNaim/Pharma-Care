import bgBanner from "@/assets/best-deal/bg.jpg";
import covid from "@/assets/best-deal/covid.png";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function BestDeal() {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center my-10"
      style={{ backgroundImage: `url('${bgBanner}')` }}
    >
      <div className="container py-10 px-4 grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
        <div>
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-semibold ">
              <span className="text-blue-600">Best Deal</span> Of This Month!
            </h4>
            <p className="text-muted-foreground">
              Exclusive Spotlight: Don’t Miss Out on This Month’s Best Deal –
              Your Chance to Save Big on Our Featured Product!
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold">Covid -19 Vaccine</h2>
            <p className="py-3">$190</p>
            <Link to={"/shop"}>
              <Button size="lg" className="mt-2">
                Buy Now
              </Button>
            </Link>
          </div>
          <div className="items-start mt-8 w-full gap-4 hidden md:flex">
            <FlipClockCountdown to={"2025-02-17"} />
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="w-60 mx-auto md:w-96 object-cover"
            src={covid}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default BestDeal;
