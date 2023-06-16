import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckOut from "./CheckOut";
import { useParams } from "react-router-dom";
//import useCart from "../../hooks/useCart";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
   // const [cart] = useCart();
    //const total = cart.reduce((sum,item)=>sum+item.price,0)
    
  //  const price = parseFloat(total.toFixed(2))
 // const price = 60;
  const {price} = useParams();

    return (
        <div className="mt-5 w-1/2 mx-auto">
            
            <Elements stripe = {stripePromise}>
                <CheckOut price={price}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;