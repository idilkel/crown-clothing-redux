import { createContext, useState, useEffect } from "react";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.js";

//Used only once in the useEffect for uploading the array of the SHOP_DATA to the firestore
import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  //This useEffect is done only once for uploading the array of the SHOP_DATA to the firestore
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      //console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

// import { createContext, useState, useEffect } from "react";

// import {
//   addCollectionAndDocuments,
//   getCategoriesAndDocuments,
// } from "../utils/firebase/firebase.utils.js";

// //Used only once in the useEffect for uploading the array of the SHOP_DATA to the firestore
// import SHOP_DATA from "../shop-data.js";

// export const ProductsContext = createContext({
//   products: [],
// });

// export const ProductsProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   //This useEffect is done only once for uploading the array of the SHOP_DATA to the firestore
//   // useEffect(() => {
//   //   addCollectionAndDocuments("categories", SHOP_DATA);
//   // }, []);

//   useEffect(() => {
//     const getCategoriesMap = async () => {
//       const categoryMap = await getCategoriesAndDocuments();
//       console.log(categoryMap);
//     };
//     getCategoriesMap();
//   });
//   const value = { products };

//   return (
//     <ProductsContext.Provider value={value}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };
