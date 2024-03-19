import { useEffect, useState } from "react";
import '../Styling/filter.css'
import { getFID } from "web-vitals";
import { getFilteredProductList } from "../services/product";



function ProductFilter()
{

    const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minDiscount, setMinDiscount] = useState('');
  const [sort, setSort] = useState('');

  


  const handleFilterApply= async ()=>{

     const response= await getFilteredProductList(category,minPrice,maxPrice,minDiscount,sort)
     console.log(response)
  }



  return (
    <div className="product-filter">
      <h2>Filter Products</h2>
      <div className="filter-item">
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div className="filter-item">
        <label>Min Price:</label>
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div className="filter-item">
        <label>Max Price:</label>
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      <div className="filter-item">
        <label>Min Discount:</label>
        <input type="number" value={minDiscount} onChange={(e) => setMinDiscount(e.target.value)} />
      </div>
      <div className="filter-item">
        <label>Sort By:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>
      <button className="filter-button" onClick={handleFilterApply}>
        Apply Filters
      </button>
    </div>
  )




}

export default ProductFilter