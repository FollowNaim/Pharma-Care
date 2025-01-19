import freeShipping from "@/assets/features/free.png";
import days from "@/assets/features/30-days.png";
import secure from "@/assets/features/secure.png";
function Features() {
  return (
    <div className="mb-10 mt-20">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">Why We are Diffrent</h2>
          <p className="text-muted-foreground mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, vel.
          </p>
        </div>
        <div className="border-2 border-border border-dashed rounded-md flex flex-col md:flex-row items-center">
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-dashed flex-1 p-4">
            <img className="w-12 h-12" src={freeShipping} alt="" />
            <h4 className="text-lg font-bold mt-4">Free Shipping</h4>
            <p className="text-muted-foreground mt-2">
              Sed perspicia unde omnis iste nat error voluptate accus
            </p>
          </div>
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-dashed flex-1 p-4">
            <img className="w-12 h-12" src={days} alt="" />
            <h4 className="text-lg font-bold mt-4">30 Days Money Back</h4>
            <p className="text-muted-foreground mt-2">
              Sed perspicia unde omnis iste nat error voluptate accus
            </p>
          </div>
          <div className="border-r flex-1 p-4">
            <img className="w-12 h-12" src={secure} alt="" />
            <h4 className="text-lg font-bold mt-4">100% Secure</h4>
            <p className="text-muted-foreground mt-2">
              Sed perspicia unde omnis iste nat error voluptate accus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
