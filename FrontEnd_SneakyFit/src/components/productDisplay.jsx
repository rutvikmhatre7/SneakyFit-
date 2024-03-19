import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getProductDetails, getProductRatings, getReviewsOfProduct } from "../services/productDisplayPage";

import '../Styling/common.css'
import { createReview } from "../services/review";

import { addThisItemTocart } from "../services/cart";

function ProductDisplay()
{

   const params=useParams();
   const productId=params.productId;

   const[productImage,setProductImage]=useState()
   const[productTitle,setProductTitle]=useState('')
   const[productDescription,setProductDescription]=useState('')
   const[ratingData,setRatings]=useState('')
   const [productSize,setProductSize]=useState([])
   const[reviews,setReviews]=useState([])

   const navigate=useNavigate()

   const[text,setText]=useState('')


   useEffect(()=>{

    loadProductDetails()
    loadReviewDetails()
    loadRatingDetails()

   },[])

   const loadProductDetails=async ()=>{
    const response= await getProductDetails(productId)

    setProductImage(response.data.imageUrl)
    setProductTitle(response.data.title)
    setProductDescription(response.data.description)
    setProductSize(response.data.sizes)
    console.log("product_Size_Boi ",productSize)
   }

   const loadReviewDetails=async ()=>{
    const response=await getReviewsOfProduct(productId)
    console.log(response)
    setReviews(response.data)

   }

   const loadRatingDetails=async ()=>{
     const response=await getProductRatings(productId)
     setRatings(response.data.ratings)
     console.log("ratings= ",response.data)
   }

   const addReview=()=>{

     loadReview()
       
   }

   const loadReview=async()=>{
    const response= await createReview(productId,text)
    loadReviewDetails()
    setText('')
   }

   const addItemTocart=()=>{
       loadMan()
   }

   const loadMan=async ()=>{
    const quantity=1;
    const response= await addThisItemTocart(productId,quantity)
   }
   
   const move =()=>{
     navigate('/product-gallery')
   }

    

    return(

        <div>
            <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', backgroundColor: '' }}  className="mine">
           <div className="image-container">
               <img src={productImage} alt="Image Description" />
           </div>
        
      </div>
      <div style={{ width: '50%', backgroundColor: 'lightcyan' }}>
        <div  className="mine">
            <h2>TITLE:</h2>
            {productTitle}
        </div>
        <hr></hr>
        <div  className="mine">
            <h2>DESCRIPTION:</h2>
            {productDescription}
        </div>
        <hr></hr>
        <div  className="mine"><h2>RATINGS:</h2>
            {ratingData}/5
         
        </div>
        <hr></hr>
        <div className="mine">
            <h2>Sizes:</h2>
            {
                productSize.map((bhai)=>{
                    return(
                        <div>{bhai.name}</div>
                    )
                })
            }
            
        </div>
        <hr></hr>
        <div  className="mine">
            <h2>REVIEWS:</h2>
            {
                reviews.map((rev)=>{
                    return(
                        <div>-{rev.review}</div>
                    )
                })
            }
            <hr></hr>

      <div>
        <button className="btn btn-success" onClick={()=>addItemTocart()}>Add To Cart</button>
        <label style={{width:30}}> </label>
        <button className="btn btn-warning" onClick={()=>move()}>Back To HomePage</button>
      </div>
        </div>
      </div>
    </div>

    <br></br>
    <br></br>
     <div>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} cols={60} placeholder="Enter Your Review..." style={{backgroundColor: 'lightyellow'}} >
        </textarea>
    </div>  
    <div>
        <button className="btn btn-info" onClick={()=>addReview()}> Submit Review</button>
        
    </div>  


        </div>


    )




}

export default ProductDisplay