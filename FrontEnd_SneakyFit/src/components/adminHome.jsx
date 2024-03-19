import { useEffect, useState } from "react"
import { delProduct, loadProducts } from "../services/adminAllProducts"
import { useNavigate } from "react-router-dom"




function AdminHome()
{
    const navigate=useNavigate()
    const[products,setProducts]=useState([])
    var count=1

    useEffect(()=>{
        loadAllProducts()
    },[])
    

   const loadAllProducts=async ()=>{

    const response= await loadProducts()

    setProducts(response.data)
   }

   const deleteThis= async (productId)=>{
     
    const response= await delProduct(productId);

    loadAllProducts()

   }

   const addNewProduct=()=>{

    navigate('/admin-addProduct')
   }

   const updateChanges=(productId)=>{

    navigate('/admin-updateProduct/'+productId)

   }

   const allOrders=()=>{

    navigate('/admin-order-status')
    
   }



return(
    <div>
        <table className={'table table-bordered table table-responsive'}>
            <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Product</th>
                    <th>Product Name</th>
                    <th>Stock Qty</th>
                    <th>UPDATE</th>
                    <th>DELTE</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((each)=>{
                        return(
                            <tr>
                                <td>{count++}</td>
                                <td>
                                   <img style={{height:100,width:150}} src={each.imageUrl}></img>
                                </td>
                                <td>
                                    <h2>{each.title}</h2>
                                </td>
                                <td>
                                    <h2>{each.quantity}</h2>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={()=>updateChanges(each.id)}>UPDATE</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>deleteThis(each.id)} >DELETE</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
        <button className="btn btn-success" onClick={()=>addNewProduct()}>+Add New Item</button>
        <label style={{width:670}}></label>
        <button className="btn btn-info" onClick={()=>allOrders()}>Order Status</button>
    </div>
);



    



}

export default AdminHome