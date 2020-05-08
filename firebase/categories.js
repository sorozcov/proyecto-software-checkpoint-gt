/* -------------------------------------------------------------------------- */
/*                  Functions for Product Categories Firebase                 */
/* -------------------------------------------------------------------------- */


import { firebase } from '.';

export const getProductCategories= async() =>{
    const productCategories = await firebase.firestore().collection('productCategories').orderBy("name", "desc").get();
    let productCategories = [];
    productCategories.docs.forEach(category => {
        productCategories.push(category.data());
    });
    return productCategories;

}


