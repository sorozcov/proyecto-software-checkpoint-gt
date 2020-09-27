/* -------------------------------------------------------------------------- */
/*                        Functions for Suscribing Firebase                    */
/* -------------------------------------------------------------------------- */

import { suscribeBranches,unsuscribeBranches } from './branches';
import { suscribeCategories,unsuscribeCategories } from './categories';
import { suscribeUsers,unsuscribeUsers } from './users';
import { suscribeProducts,unsuscribeProducts } from './products';
import { suscribeOrders,unsuscribeOrders } from './orders';



//Funcion para obtener Products de Firebase
export const suscribeToFirebase= async () =>{
    console.log("suscribed")
    await unsuscribeToFirebase()
    await suscribeProducts();
    await suscribeUsers();
    await suscribeCategories();
    await suscribeBranches();
    await suscribeOrders();
    return await true
}

export const unsuscribeToFirebase= async () =>{
    await unsuscribeProducts();
    await unsuscribeUsers();
    await unsuscribeCategories();
    await unsuscribeBranches();
    await unsuscribeOrders();
}