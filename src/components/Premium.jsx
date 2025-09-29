import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);
  const verifyPremiumUser = async () => {
    const res = await axios.get(`${BASE_URL}/premoum/verify`, {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      `${BASE_URL}/payment/create`,
      { membershipType: type },
      {
        withCredentials: true,
      }
    );
    const { amount, keyId, currency, notes, orderId } = order.data;

    // Open Razorpay Checkout
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Dev Tinder",
      description: "Connect to other devs",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: `${notes.firstName} ${notes.lastName}`,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      //calledn whenever payment dialog is closed
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div>"You are already a premium user"</div>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connect requests per day</li>
            <li> - Blue tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("silver")}
          >
            Buy silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinite connect requests per day</li>
            <li> - Blue tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleBuyClick("gold")}
          >
            Buy gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
