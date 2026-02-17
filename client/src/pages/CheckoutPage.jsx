import React, { useState } from "react";

import { useNavigate } from "react-router-dom";



const CheckoutPage = () => {
    
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  console.log("CheckoutPage", cart);
  return (
    <>
      <div>checkoutpage</div>
    </>
  );
};

export default CheckoutPage;