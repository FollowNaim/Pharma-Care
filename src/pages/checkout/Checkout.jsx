import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function Checkout() {
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const axiosSecure = useAxiosSecure();
  const {
    data: carts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/carts/${user?.email}`);
      return data;
    },
  });
  useEffect(() => {
    const price = carts?.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    setTotalPrice(price);
    const quantity = carts?.reduce((acc, cur) => acc + cur.quantity, 0);
    setTotalQuantity(quantity);
  }, [carts]);
  if (isLoading || !carts.length) return <Spinner />;
  return (
    <div>
      <div className="container px-4 max-w-3xl my-10 mx-auto flex flex-col md:flex-row  h-full w-full gap-8 items-center">
        <div
          className="w-full flex-1
         bg-muted px-4 py-8 rounded-md"
        >
          <h4 className="text-2xl font-bold">${totalPrice}</h4>
          <div className="mt-6 flex flex-col gap-3">
            {carts.map((cart) => (
              <div key={cart._id} className="flex justify-between items-center">
                <p>{cart.name}</p>
                <p>${cart.price}</p>
              </div>
            ))}
            <div className="flex justify-between items-center border-t-2 border-dashed pt-3 mt-3">
              <p>{"Total"}</p>
              <p>${totalPrice}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex-1">
          <div>
            <h2 className="text-2xl font-bold">Make a payment</h2>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              refetch={refetch}
              carts={carts}
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
