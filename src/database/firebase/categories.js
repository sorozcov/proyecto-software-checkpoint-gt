/* -------------------------------------------------------------------------- */
/*                        Functions for Categories Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebase, firebaseFirestore } from '.';



const db = firebaseFirestore;
const collection = "categories";

//Funcion para obtener Categories de Firebase
export const getCategories= async () =>{
    try{
        const categories = await db.collection(collection).get();
    
        let categoriesArray = [];
        await categories.docs.forEach(category => {
            categoriesArray.push(category.data());
        });

        let categoriesNormalizer = {};
        let categoryById ={};
        
        categoriesNormalizer['order'] = categoriesArray.map(category => category.categoryId)
        categoriesArray.map((category) => {categoryById[category.categoryId] = category})
        categoriesNormalizer['byId'] = categoryById;
        categoriesNormalizer['array'] = categoriesArray;
        
        return {
          categories: categoriesNormalizer,
          error: null
        };
    }catch(error){
        return {
          categories: null,
          error,
        }
    }
}

// Funcion para crear o hacer update de un Category
// Si es nuevo enviar categoryId=null o no enviar
export const updateCategory = async ({categoryId,categoryName})=>{
    try {
        let categoryDoc = null;
        let isNew = categoryId==null;
        if(isNew){
          categoryDoc = await firebaseFirestore.collection(collection).doc();
          categoryId = categoryDoc.id;
        } else {
          categoryDoc = await firebase.firestore().collection(collection).doc(categoryId);
          categoryId = categoryDoc.id;
        }
  
 
        let dateModified = new Date();
        dateModified = dateModified.getTime();
        
        let categoryInfo = {
            categoryId: categoryId, 
            categoryName: categoryName,
            dateModified:dateModified
        };

        if(isNew){
          await categoryDoc.set(categoryInfo);
        } else {
          await categoryDoc.update(categoryInfo);
        }

        return { 
            category: categoryInfo,
            error:null,
            errorMessage:null
        }
  
    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo guardar la categoría."
        return {
            errorMessage: errorMessage,
            error, 
            category: null
        };
    }
}

//Funcion para eliminar una categoria.
export const deleteCategory = async ({categoryId})=>{
    try {

        let categoryDoc = await firebaseFirestore.collection(collection).doc(categoryId);
        categoryDoc = await categoryDoc.delete();
        return { 
          categoryId: categoryId,
          error: null,
          errorMessage: null
        };
      } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar la categoría."
        return {
          errorMessage: errorMessage,
          error,
          categoryId: null
        };
      }

}


 