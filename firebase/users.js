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

export const createUser= async (user) =>{
  
    const newUser = firebaseFirestore.collection('users').doc();
    const uid = newUser.id; 
    newUser.set(user);
    return id;
}

export const editUser= async (user) =>{
  
    const newUser = firebaseFirestore.collection('users').doc(user.userid);
    newUser.update(user);
    return true;
}
