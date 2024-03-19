import { useState } from "react";
import { saveProduct } from "../services/adminAllProducts";
import { useNavigate } from "react-router-dom";



function AdminAddProduct(){

    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        discountedPrice: 0,
        discountPersent: 0,
        quantity: 0,
        brand: '',
        color: '',
        imageUrl:'',
        topLavelCategory: 'Mens',
        secondLavelCategory: 'Puma',
        thirdLavelCategory: 'Sneakers'
      }
      );

      const[title,setTitle]=useState('')
      const[price,setPrice]=useState(0)
      const[description,setDescription]=useState('')
      const[imageUrl,setImageUrl]=useState('')
      const[quantity,setQuantity]=useState(0)
      const[sizes,setSizes]=useState({
        name:''
      })
      const[topLavelCategory,setTop]=useState('')
      const[secondLavelCategory,setSecond]=useState('')
      const[thirdLavelCategory,setThird]=useState('')
      const[discountedPrice,setDiscountedPrice]=useState('')

      const handleSubmit = async () => {
        
        console.log(sizes.name)
        const response= await saveProduct(title,price,description,imageUrl,quantity,topLavelCategory,secondLavelCategory,thirdLavelCategory,sizes,discountedPrice)
      };

      const handle=()=>{
        navigate('/admin-homepage')
      }



    return(
        <div className="product-form">
      <h2>Add a New Product</h2>
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
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value )}
        />
      </div>
      <div className="form-group">
        <label>discountedPrice</label>
        <input
          type="number"
          name="price"
          value={discountedPrice}
          onChange={(e) => setDiscountedPrice(e.target.value )}
        />
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Size</label>
        <input
          type="text"
          name="size"
          value={sizes.name}
          onChange={(e) => setSizes(e.target.value)}
        />
      </div>

   

  

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>TopLevelCategory</label>
        <input
          type="text"
          name="topLavelCategory"
          value={topLavelCategory}
          onChange={(e) => setTop(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>SecongLevelCategory</label>
        <input
          type="text"
          name="secondLavelCategory"
          value={secondLavelCategory}
          onChange={(e) => setSecond(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>ThirdLevelCategory</label>
        <input
          type="text"
          name="thirdLavelCategory"
          value={thirdLavelCategory}
          onChange={(e) => setThird(e.target.value)}
        />
      </div>

      {/* Add other input fields here */}
      <button onClick={handleSubmit} className="btn btn-success">Submit</button>
      <label style={{width:30}}></label>
      <button onClick={handle} className="btn btn-warning">Back To HomePage</button>
    </div>
  );
    


}

export default AdminAddProduct