/* -------------------------------------------------------------------------- */
/*                        Functions for Users Firebase                        */
/* -------------------------------------------------------------------------- */


import { firebaseFirestore } from '.';

const db = firebaseFirestore;

export const getUsers= async () =>{
  try{
    const users = await db.collection('users').get();

    let usersArray = [];
    await users.docs.forEach(user => {
        usersArray.push(user.data());
    });

    let usersNormalizer = {};
    let userById = {};

    usersNormalizer['order'] = usersArray.map(user => user.uid)
    usersArray.map((user) => {userById[user.uid] = user})
    usersNormalizer['byId'] = userById;
    usersNormalizer['array'] = usersArray;

    return {users:usersNormalizer,error:null};
  } catch(error){
    return {
      users: null,
      error
    }
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
