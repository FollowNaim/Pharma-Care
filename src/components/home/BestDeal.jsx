import bgBanner from "@/assets/best-deal/bg.jpg";
import covid from "@/assets/best-deal/covid.png";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Button } from "../ui/button";

function BestDeal() {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center my-10"
      style={{ backgroundImage: `url('${bgBanner}')` }}
    >
      <div className="container py-10 px-4 grid grid-cols-1 md:grid-cols-2 justify-between gap-4">
        <div>
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-medium">Best Deal Of This Month!</h4>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold">Covid -19 Vaccine</h2>
            <p className="py-3">$190</p>
            <Button size="lg" className="mt-2">
              Buy Now
            </Button>
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
