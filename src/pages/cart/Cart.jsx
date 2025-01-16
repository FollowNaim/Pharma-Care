import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdLock } from "react-icons/io";

import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [totalPrice, setTotalPrice] = useState(0);
  const { data: carts = [], refetch } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/carts/${user.email}`);
      return data;
    },
  });
  useEffect(() => {
    const price = carts?.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    setTotalPrice(price);
  }, [carts]);
  const handleIncrement = async (id) => {
    await axiosSecure.patch(`/carts/${id}`);
    refetch();
  };
  const handleDecrement = async (id) => {
    await axiosSecure.patch(`/carts/${id}?decrement=true`);
    refetch();
  };
  const handleClearCart = async () => {
    await toast.promise(axiosSecure.delete(`/carts/clear/${user.email}`), {
      loading: "Clearing the cart ...",
      success: <b>Cleared successfull!</b>,
      error: <b>Could not clear.</b>,
    });
    refetch();
  };
  return (
    <div className="my-10">
      <div className="container px-4">
        <div>
          <h4 className="text-center font-bold text-2xl">
            Your cart has ({carts.length}) items
          </h4>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carts.map((item, i) => (
                <TableRow key={item._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    <img
                      src={item.image}
                      className="w-20 h-14 object-cover"
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{"Tablet"}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <span
                        className="bg-muted size-8 text-xl flex justify-center items-center rounded-full cursor-pointer"
                        onClick={() => handleIncrement(item._id)}
                      >
                        +
                      </span>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-muted size-8 text-xl flex justify-center items-center rounded-full cursor-pointer disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        onClick={() => handleDecrement(item._id)}
                      >
                        -
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.price * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between w-full border-t pt-6">
            <div>
              <Button
                disabled={!carts.length}
                onClick={handleClearCart}
                size="lg"
                variant="outline"
              >
                Clear Cart
              </Button>
            </div>
            <div className="flex items-center gap-8">
              <p>Grand Total :</p>
              <p>${totalPrice}</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => navigate("/cart/checkout")}
              disabled={!carts.length}
              size="lg"
            >
              Checkout <IoMdLock /> ${totalPrice}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
