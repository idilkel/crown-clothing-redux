import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;

//map threw array (above is threw object with HashTable with key and value)
// <div className="products-containers">
//   {products.map((product) => (
//     <ProductCard key={product.id} product={product} />
//   ))}
// </div>;

//Showing everything
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
