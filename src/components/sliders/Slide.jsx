import { Button } from "../ui/button";
function Slide({ image, title, subtitle }) {
  return (
    <div
      className="bg-cover bg-center object-cover bg-no-repeat px-8 py-28 bg-black/70 bg-blend-overlay"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-white text-5xl font-bold">{title}</h2>
        <p className="text-white/60 max-w-md">{subtitle}</p>
        <Button className="mt-4 bg-white text-black" size="lg">
          Buy Now
        </Button>
      </div>
    </div>
  );
}

export default Slide;
