import cat1 from "@/assets/category/cat1.jpg";
function Category() {
  return (
    <div
      className="bg-cover bg-no-repeat object-cover p-4 bg-black/60 bg-blend-overlay text-white rounded-md"
      style={{ backgroundImage: `url('${cat1}')` }}
    >
      <h2 className="text-2xl font-semibold">Medicines</h2>
      <p className="text-white/60 pt-2">Medicine : 0</p>
    </div>
  );
}

export default Category;
