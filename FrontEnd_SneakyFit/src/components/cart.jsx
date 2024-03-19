import { useEffect, useState } from "react"
import { deleteCartItemController, getEachCartItem, getUserCart, updateCartItem } from "../services/cart";
import { useNavigate } from "react-router-dom";



function Cart() {

  const[cartItems,setCartItems]=useState({
    id:'',
    totalPrice:'',
    totalItem:'',

  });

  const[eachItem,setEachItem]=useState([]);

  const navigate=useNavigate();

  const token=sessionStorage.getItem("token");

  const[count,setCount]=useState(0);

 

  useEffect(()=>{
    loadUserCart(token);
    loadeachCartItem(token)
    
  },[])

//   useEffect(()=>{
//     loadeachCartItem(token)
//     loadUserCart(token);
    
//   },[eachItem])

 
  const loadUserCart=async (token)=>{
    const response= await getUserCart(token)

    if(response!=null)
    {
      console.log(response.data)
      setCartItems(response.data)
    }
    
  
  }

  const loadeachCartItem=async (token)=>{
       const response= await getEachCartItem(token);
       if(response!=null)
       {
           setEachItem(response.data);
          
       }
  }

  const increase=(quantity,id)=>{
    const x=quantity + 1;
      updateQuantity(id,x,token)
    
  }

  const decrease=(quantity,id)=>{
    const x=quantity - 1;
    updateQuantity(id,x,token)
  }

  const updateQuantity= async (id,x,token)=>{
    const response= await updateCartItem(id,x,token);
    
        
        loadeachCartItem(token)
        loadUserCart(token);
    
    
  }

  const changePage=()=>{
      navigate('/order-page')
  }

  const deleteCartItem=(CartItemId)=>{
     
    deleteThisItem(CartItemId);

  }
  const deleteThisItem=async (CartItemId)=>{
    const response= await deleteCartItemController(CartItemId)
     loadeachCartItem(token);
  }


  return (
    <div className="container table-bordered" style={{backgroundColor:"lightgrey",}}>
            
            <div>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ITEM</th>
                            <th>ITEM NAME</th>
                            <th></th>
                            <th>QTY</th>
                            <th></th>
                            <th>PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eachItem.map((each)=>{
                                return(
                                    <tr>
                                        <td>{each.id}</td>
                                    <td>
                                        <img style={{height:100,width:150}} src={each.imageUrl}></img>
                                    </td>
                                    <td>
                                        <h2>{each.title}</h2>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" id={each.id} onClick={()=> decrease(each.quantity,each.id)} >-</button>
                                    </td>
                                    <td>
                                        <input type="text" disabled value={each.quantity} ></input>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" id={each.id} onClick={()=> increase(each.quantity,each.id)}>+</button>
                                    </td>
                                    <td>
                                        {each.price}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>deleteCartItem(each.id)}>Delete</button>
                                    </td>
                                </tr>

                                );     
                            })
                            
                        }
                        
                        
                    </tbody>
                </table>
                
            </div>



            <div>
            
            Total:{cartItems.totalPrice}
            </div>
            <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" onClick={()=>changePage()}>Proceed to Pay</button></div>

        </div>
  )
}

export default Cart
