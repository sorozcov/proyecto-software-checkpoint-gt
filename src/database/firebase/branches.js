import { firebaseFirestore } from '.';
import * as actions from '../../logic/actions/branches';
import {store} from '../../../App'

import * as selectors from '../../logic/reducers';
const db = firebaseFirestore;
const collection = "branches";


//Función para obtener Branches de Firebase
export const getBranches = async() => {
    try {
        const branches = await db.collection(collection).get();
        let branchesArray = [];
        branches.docs.forEach(branch => {
            branchesArray.push(branch.data());
        });
        let branchesNormalizer = {};
        let branchById = {};

        branchesNormalizer['order'] = branchesArray.map(branch => branch.id)
        branchesArray.map((branch) => { branchById[branch.id] = branch })
        branchesNormalizer['byId'] = branchById;
        branchesNormalizer['array'] = branchesArray;

        return { branches: branchesNormalizer, error: null };

    } catch (error) {
        return { branches: null, error }
    }
}

//Función para crear o hacer update de un Branch
//Si es nuevo enviar id=null o no enviar
export const updateBranch = async({ id, name, location }) => {
    try {
        let branchDoc = null;
        let isNew = id == null;

        if (isNew) {
            branchDoc = firebaseFirestore.collection(collection).doc();
            id = branchDoc.id;
        } else {
            branchDoc = firebaseFirestore.collection(collection).doc(id);
            id = branchDoc.id;
        }


        // let dateModified = new Date();
        // dateModified = dateModified.getTime();
        let branchInfo = {
            id,
            name,
            location,
        };

        if (isNew) {
            await branchDoc.set(branchInfo);
        } else {
            await branchDoc.update(branchInfo);
        }

        return { branch: branchInfo, error: null, errorMessage: null }

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo guardar la sucursal."

        return {
            errorMessage,
            error,
            branch: null
        };
    }
}

//Función para eliminar un Branch.
export const deleteBranch = async({ id }) => {
    try {
        let branchDoc = firebaseFirestore.collection(collection).doc(id);
        branchDoc = await branchDoc.delete();

        return {
            id,
            error: null,
            errorMessage: null
        };

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar la sucursal."

        return {
            errorMessage,
            error,
            id: null
        };
    }
}

//Suscribe to branches changes
export const suscribeBranches = async ()=>{
    db.collection(collection)
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    // 
                    let id=change.doc.id;
                    let docSaved = selectors.getBranch(store.getState(),id)
                    console.log(docSaved)
                    if(docSaved!==null && docSaved!==undefined){
                      console.log("Retrieve branch again.")
                    } else{
                      console.log("New branch: ", change.doc.data());
                      store.dispatch(actions.completeAddingBranch({...change.doc.data(),id:change.doc.id}))
                    }
                   

                }
                if (change.type === "modified") {
                    store.dispatch(actions.completeUpdatingBranch({...change.doc.data(),id:change.doc.id}))
                    // console.log("Modified branche: ", change.doc.data());
                }
                if (change.type === "removed") {
                    store.dispatch(actions.completeRemovingBranch(change.doc.id))
                    // console.log(change.doc.id)
                    // console.log("Removed branche: ", change.doc.data());
                }
            });
        });
}

//Unsuscribe to branches changes
export const unsuscribeBranches = async ()=>{
  db.collection(collection)
    .onSnapshot(function(snapshot) {
       //Nothing
    });
}