import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Checkout.css";
import toast from "react-hot-toast";

function CheckoutForm({ totalPrice }) {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    getPaymentIntent();
  }, [user]);
  const getPaymentIntent = async () => {
    try {
      const { data } = await axios.post("/create-payment-intent", {
        email: user.email,
      });
      setClientSecret(data.client_secret);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(clientSecret);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card) return;
    const { error, paymentMethod } = stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("err for creating payment method", error);
    } else {
      console.log("paymentMethod", paymentMethod);
    }
    toast.promise(
      stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName || "N/A",
            email: user.email,
          },
        },
      }),
      {
        loading: "Payment Processing...",
        success: <b>Payment successfull!</b>,
        error: <b>Could not payment.</b>,
      }
    );
  };
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
        // border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <div className="w-full">
      <form id="stripElements" onSubmit={handleSubmit}>
        <CardElement className="" options={cardStyle} />
        <div className="flex items-center gap-4">
          <Button disabled={!stripe} className="mt-4" size="lg" type="submit">
            Pay <IoMdLock /> ${totalPrice}
          </Button>
          <Link to={"/shop/cart"}>
            <Button variant="outline" size="lg" className="mt-4" type="button">
              <FaShoppingCart /> Go Cart
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
