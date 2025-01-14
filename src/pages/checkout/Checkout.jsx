import { useAuth } from "@/hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiTwotoneDollar } from "react-icons/ai";
import { CiWallet } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function Checkout() {
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const { data: carts = [], refetch } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`/carts/${user?.email}`);
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
  return (
    <div>
      <div className="container px-4 max-w-3xl my-10 mx-auto flex flex-col justify-center items-center h-full w-full">
        <div className="w-full max-w-[500px]">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Pay With Wallet <CiWallet />
          </h2>
          <div className="mt-4 flex items-center gap-8">
            <p className="flex items-center gap-3">
              <FaCartShopping className="font-bold" size={20} />{" "}
              <span className="text-muted-foreground">{carts.length}</span>
            </p>
            <p className="flex items-center gap-3">
              <AiTwotoneDollar className="font-bold" size={20} />{" "}
              <span className="text-muted-foreground">{totalPrice}</span>
            </p>
          </div>
        </div>
        <div className="w-full">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              refetch={refetch}
              carts={carts}
              totalPrice={totalPrice}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
