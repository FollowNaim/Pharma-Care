import img1 from "@/assets/discount/discount1.jpg";
function DiscountCard() {
  return (
    <div className="cursor-grab">
      <div className="relative">
        <img
          className="bg-cover h-full bg-no-repeat object-cover "
          src={img1}
          alt=""
        />
      </div>
      <div className="absolute w-full top-10 left-0 p-4 text-center">
        <p className="text-muted-foreground mb-2">Covid 19</p>
        <h2 className="text-3xl font-bold">Hand Mask</h2>
        <div className="absolute top-28 left-6 size-20 rounded-full bg-blue-600 flex flex-col justify-center items-center text-white">
          <p className="font-medium">20%</p>
          <p className="text-sm text-white/70">OFF</p>
        </div>
      </div>
    </div>
  );
}

export default DiscountCard;
