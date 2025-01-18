import { Link } from "react-router-dom";

function Category({ item }) {
  return (
    <Link to={`/shop/${item.category}`}>
      <div
        className="bg-cover bg-no-repeat object-cover p-4 bg-black/60 bg-blend-overlay text-white rounded-md"
        style={{ backgroundImage: `url('${item.image}')` }}
      >
        <h2 className="text-2xl font-semibold">{item.category}</h2>
        <p className="text-white/60 pt-2">Medicine : {item.count}</p>
      </div>
    </Link>
  );
}

export default Category;
