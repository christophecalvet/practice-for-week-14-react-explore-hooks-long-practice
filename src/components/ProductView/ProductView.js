import React from 'react';
import {useState,useEffect} from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  // TODO: Replace with state variable
 // const sideOpen = true;
  const [sideOpen, setSideOpen] = useState(()=>{
        if(localStorage.getItem('sideOpen') === "false"){
          return false
        }
        return true
  }
    );
  const [selectedProduct, setSelectedProduct] = useState();



    // Open side panel when product is selected
    useEffect(() => {
      console.log(`selectedProduct CHANGED TO`, selectedProduct);
      if (selectedProduct){setSideOpen(true);}


  }, [selectedProduct]);

  // Deselect product when side panel is closed
  useEffect(() => {
      console.log(`sideOpen CHANGED TO`, sideOpen);
      if (!sideOpen){
          setSelectedProduct();}
          localStorage.setItem('sideOpen', sideOpen) //bonus
  }, [sideOpen]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={selectedProduct && selectedProduct.id === item.id}  //Added for part 2
             // onClick={() => console.log('SELECT PRODUCT', item)}
             onClick={() => setSelectedProduct(item)}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
//onClick={() => console.log('TOGGLE SIDE PANEL')}
          onClick={() => setSideOpen(!sideOpen)}
               >
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails product={selectedProduct} visible={sideOpen} />
      </div>
    </div>
  );
}
console.log("product view")
export default ProductView;
