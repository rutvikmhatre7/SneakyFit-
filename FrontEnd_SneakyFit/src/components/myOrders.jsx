import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orders";
import '../Styling/orderTable.css'

function MyOrders() {

  const orderId=sessionStorage.getItem("orderId");

  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    loadOrders()
  },[])

   const loadOrders=async ()=>{

    const response= await getUserOrders()
    setOrders(response.data)
   }


  return (
    <div className="order-table-container">
    <table className="order-table">
      <thead>
        <tr>
          <th>ORDER ID</th>
          <th>ORDER DATE</th>
          <th>DELIVERY DATE</th>
          <th>SHIPPING ADDRESS</th>
          <th>PAYMENT DETAILS</th>
          <th>ORDER STATUS</th>
          <th>TOTAL ITEMS</th>
          <th>TOTAL PRICE</th>
          <th>TOTAL DISCOUNTED PRICE</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.orderDate}</td>
            <td>{order.deliveryDate}</td>
            <td>
              <div>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </div>
              <div>
              {order.shippingAddress.streetAddress} {order.shippingAddress.city} {order.shippingAddress.state}
              </div>
              <div>
              {order.shippingAddress.zipCode} {order.shippingAddress.mobile}
              </div>
            </td>
            <td>{order.paymentDetails.status}</td>
            <td>{order.orderStatus}</td>
            <td>{order.totalItems}</td>
            <td>{order.totalPrice}</td>
            <td>{order.totalDiscountedPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
   
  )
}

export default MyOrders
