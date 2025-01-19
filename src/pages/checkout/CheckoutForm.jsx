import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

function CheckoutForm({ totalPrice, totalQuantity, carts, refetch }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    getPaymentIntent();
  }, [user, carts]);
  const getPaymentIntent = async () => {
    try {
      if (carts.length) {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          email: user?.email,
        });
        setClientSecret(data.client_secret);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    setIsDisabled(true);
    e.preventDefault();
    const card = elements.getElement(CardElement);
    if (!stripe || !elements || !card || !clientSecret) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: user.displayName || "N/A",
        email: user.email,
      },
    });
    if (error) {
      console.log("err for creating payment method", error);
      toast.error("Invalid card details. Please check and try again.");
      setIsDisabled(false);
      return;
    }

    try {
      const { paymentIntent, error: confirmError } = await toast.promise(
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
      if (confirmError) {
        console.log("error on confirm payment", confirmError);
        toast.error("Payment could not be completed. Please try again.");
        setIsDisabled(false);
        return;
      }
      const cartsObj = carts.map((cart) => {
        return {
          medicineId: cart.medicineId,
          quantity: cart.quantity,
          seller: {
            name: cart.seller.name,
            email: cart.seller.email,
          },
        };
      });
      const medicine = {
        transactionId: paymentIntent.payment_method,
        email: user.email,
        name: user.displayName,
        medicines: cartsObj,
        totalPrice,
        totalQuantity,
      };
      await axiosSecure.post("/orders", medicine);
      await axiosSecure.delete(`/carts/clear/${user.email}`);
      navigate(`/invoice/${paymentIntent.payment_method}`);
      refetch();
    } catch (err) {
      console.log(err);
    } finally {
      setIsDisabled(false);
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
        <Label>Enter your card details</Label>
        <CardElement className="" options={cardStyle} />
        <div className="flex items-center gap-4">
          <Button
            disabled={!stripe || !carts.length || !clientSecret}
            className="mt-4"
            size="lg"
            type="submit"
          >
            <IoMdLock /> Pay ${totalPrice}
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
