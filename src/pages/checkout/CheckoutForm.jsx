import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

function CheckoutForm({ totalPrice, carts, refetch }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    getPaymentIntent();
  }, [user]);
  const getPaymentIntent = async () => {
    try {
      if (carts.length) {
        const { data } = await axios.post("/create-payment-intent", {
          email: user.email,
        });
        setClientSecret(data.client_secret);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card) return;
    const { error } = stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("err for creating payment method", error);
    }
    try {
      const data = await toast.promise(
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
      const cartsObj = carts.map((cart) => {
        return { medicineId: cart.medicineId, quantity: cart.quantity };
      });
      const medicine = {
        transactionId: data.paymentIntent.payment_method,
        email: user.email,
        name: user.displayName,
        medicines: cartsObj,
      };
      await axios.post("/orders", medicine);
      await axios.delete(`/carts/clear/${user.email}`);
      navigate(`/invoice/${data.paymentIntent.payment_method}`);
      refetch();
    } catch (err) {
      console.log(err);
    }
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
          <Button
            disabled={!stripe || !carts.length}
            className="mt-4"
            size="lg"
            type="submit"
          >
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
