import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getProductList, getSearchedProductsList } from '../services/product'
import { constants } from '../utils/constants'
import { addThisItemTocart } from '../services/cart'


import '../Styling/common.css'
import { useNavigate } from 'react-router-dom'

function ProductGallery() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate=useNavigate()

  useEffect(() => {
    // get the list of products from server
    loadProducts();
    
  }, [])

  useEffect(()=>{

    searchProduct()
  },[searchTerm])

  const loadProducts = async () => {
    const response = await getProductList()
    //console.log(response['status']);
    if (response.status == 200) {
      setProducts(response.data)
    } else {
      toast.error('Error while calling get /product api')
    }
  }

  const addToCart=(productId,quantity,size)=>{
     const firstQty=1
    addThisitem(productId,firstQty)


  }

  const addThisitem=async(productId,firstQty)=>{
    const response= await addThisItemTocart(productId,firstQty)

  }

  const filterProducts=(prodName)=>{

    console.log(prodName);


  }

  const searchProduct = async ()=>{

    const response=await getSearchedProductsList(searchTerm);

    setProducts(response.data)

  }

  const handleSearch = () => {

    console.log(searchTerm)

    searchProduct()
  
  };


  const productDisplay=(productId)=>{

    navigate('/product-display/'+productId)

  }

  return (
    <div>

<div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
      
      <h1 style={{ textAlign: 'center', margin: 10 }}>Product Gallery</h1>

     
      <div>

<div class="form-check">
<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked onClick={()=>filterProducts('Nike')}></input>
<label className="form-check-label" for="flexRadioDefault2">
Nike
</label>
</div>

<div class="form-check">
<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
<label className="form-check-label" for="flexRadioDefault2">
Adidas
</label>
</div>
</div>
  

      
      {/*gallery div start*/}
      <div className='row' style={{ marginTop: 50 }}>
        {products.map((product) => {
          return (
            <div className='col-md-3'>
              <div className={'card mine'} onClick={()=>productDisplay(product.id)}>
                <img
                  src={product['imageUrl']}
                  style={{ height: 200 }}
                  alt=''
                /> 
                <div className='card-body'>
                  <h5 className='card-title'>{product['title']}</h5>  
                  <div className='card-text'>
                    <div>₹ {product.discountedPrice}</div>
                    <hr></hr>
                    <div>Available Stock:{product.quantity}</div>
                    <div>Color:{product.color}</div>
                    
                    <div>
                      {
                        product.sizes.map((each)=>{
                          return(
                            <h2>{each.name}</h2>

                          )
                        })
                      }
                    </div>
                    <div>
                    <button type="button" className="btn btn-success" onClick={()=>addToCart(product.id,product.quantity,product.size)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/*gallery div end*/}
       

    </div>
  )
}

export default ProductGallery
