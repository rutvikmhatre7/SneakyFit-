import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generatePaymentLink } from "../services/payment";
import '../Styling/common.css'

function Payment()
{
    const params=useParams();
    const orderId=params.orderId

    sessionStorage.setItem("orderId",orderId);

    const [payment_link_url,setLink]=useState('')

    const [payment_link_id,setId]=useState('')

    const param=useParams();


    useEffect(()=>{
        generateLink()

        
    },[])

    useEffect(()=>{
      //disp()

      const searchParams=new URLSearchParams(window.location.search)
      const razorpayId=searchParams.get('razorpay_payment_id')
      console.log("razorPayId =",razorpayId)
       
    },[payment_link_url])

    const generateLink= async ()=>{
        const response= await generatePaymentLink(orderId)
        console.log(response.data)
        setLink(response.data.payment_link_url,'_blank')
        //disp()


    
    }
   
    const disp=()=>{
        if(payment_link_url!=="")
        window.open(payment_link_url)
       }
    


    return(
        <div>
            <div className="payment-container">
      <div className="payment-content">
        <h1>Payment In Progress</h1>
        <div className="loader"></div>
        <p>Please wait while we process your payment...</p>
      </div>
    </div>

            {disp()}
            
        </div>
    )




}

export default Payment;