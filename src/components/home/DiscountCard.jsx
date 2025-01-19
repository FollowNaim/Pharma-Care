function DiscountCard({ item }) {
  return (
    <div className="cursor-grab">
      <div>
        <div
          className="bg-cover h-96 bg-no-repeat object-cover "
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
      </div>
      <div className="absolute w-full top-10 left-0 p-4 text-center">
        <p className="text-black/60 mb-2">{item.category}</p>
        <h2 className="text-3xl text-black font-bold">{item.name}</h2>
        <div className="absolute top-28 left-6 size-20 rounded-full bg-orange-600 flex flex-col justify-center items-center text-white">
          <p className="font-medium">{item.discount}%</p>
          <p className="text-sm text-white/70">OFF</p>
        </div>
      </div>
    </div>
  );
}

export default DiscountCard;
