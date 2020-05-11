/* -------------------------------------------------------------------------- */
/*                        Functions for Users Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebaseFirestore } from '.';

export const getUsers= async () =>{
  try{
    const users = await db.collection('users').get();

    let usersArray = [];
    await users.docs.forEach(user => {
        usersArray.push(user.data());
    });
    let usersNormalizer = {};
    let userById ={};
    userNormalizer['byOrder']=usersArray.map((user)=>{user.uid})
    usersArray.map((user)=>{userById[user.uid]=user})
    userNormalizer['byId']=userById;
    usersArrayNormalizer['array']=usersArray;
    return {users:usersNormalizer,error:null};
  }catch{
    return {users:null,error}
  }
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
