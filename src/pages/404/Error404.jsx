import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import errorsvg from "/errorsvg.svg";
function Error404() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl font-medium text-center">
        Opps! Sorry <br /> we cant find this page.
      </h2>
      <img className="w-64" src={errorsvg} alt="" />
      <Link to={"/"}>
        <Button size="lg" className="mt-8">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

export default Error404;
