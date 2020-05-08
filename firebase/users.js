/* -------------------------------------------------------------------------- */
/*                        Functions for Users Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebaseFirestore } from '.';

export const getUsers= async () =>{
  
    const users = await firebaseFirestore.collection('users').get();
 
    let usersArray = [];
    await users.docs.forEach(category => {
         usersArray.push(category.data());
    });
    return usersArray;

}
