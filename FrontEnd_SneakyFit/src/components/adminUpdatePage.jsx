import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProductDetails } from "../services/productDisplayPage"
import { UpdateBetaJi } from "../services/adminAllProducts"



function AdminUpdatePage(){


    const params=useParams()
    const productId=params.productId
    const navigate=useNavigate()

    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')


    useEffect(()=>{
        loadSpecificProduct()
    },[])

    const loadSpecificProduct=async()=>{
        const response=await getProductDetails(productId)
        setTitle(response.data.title)
        setDescription(response.data.description)
    }

    const updateBro=async ()=>{
        const response= await UpdateBetaJi(productId,title,description)

    }

    const moveBoy=()=>{
        navigate('/admin-homepage')
    }


    return(
        <div className="product-form">
      <h2>Update Product: {title}</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
   
      {/* Add other input fields here */}
      <button className="btn btn-success" onClick={()=>updateBro()}>Save Changes</button>
      <label style={{width:30}}></label>
      <button  className="btn btn-warning" onClick={()=>moveBoy()}>Back To HomePage</button>
    </div>
    )







}

export default AdminUpdatePage