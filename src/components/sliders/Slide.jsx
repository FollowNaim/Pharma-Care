import { Button } from "../ui/button";
function Slide({ image, title, subtitle }) {
  return (
    <div className="bg-cover bg-center object-cover bg-no-repeat px-8 py-10 bg-blend-overlay flex justify-between items-center">
      <div className="flex flex-1 flex-col items-start gap-4">
        <h2 className="text-black text-5xl font-bold">{title}</h2>
        <p className="text-black/60 max-w-md">{subtitle}</p>
        <Button className="mt-4 bg-black text-white" size="lg">
          Buy Now
        </Button>
      </div>
      <div className="flex-1 flex justify-end">
        <img className="w-96 h-96 object-cover" src={image} alt="" />
      </div>
    </div>
  );
}

export default Slide;
