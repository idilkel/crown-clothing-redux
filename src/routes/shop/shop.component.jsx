import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

//import {} from  "./shop.styles";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

//map threw array (above is threw object with HashTable with key and value)
// <div className="products-containers">
//   {products.map((product) => (
//     <ProductCard key={product.id} product={product} />
//   ))}
// </div>;

//Showing everything
// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
// import CategoryPreview from "../../components/category-preview/category-preview.component";
//import ProductCard from "../../components/product-card/product-card.component";
//import { Fragment, useContext } from "react";

// <Fragment>
// {Object.keys(categoriesMap).map((title) => (
//   <Fragment key={title}>
//     <h2>{title}</h2>
//     <div className="products-containers">
//       {categoriesMap[title].map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//     ;
//   </Fragment>
// ))}
// </Fragment>
