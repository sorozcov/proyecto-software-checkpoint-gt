import { firebaseFirestore, firebaseAuth, firebase } from '.';


const db = firebaseFirestore;
const collection = "branches";

//Funcion para obtener Branches de Firebase
export const getBranches = async() => {
    try {
        const branches = await db.collection(collection).get();

        let branchesArray = [];
        await branches.docs.forEach(branch => {
            branchesArray.push(branch.data());
        });
        let branchesNormalizer = {};
        let branchById = {};
        branchNormalizer['order'] = branchesArray.map((branch) => { branch.branchId })
        branchesArray.map((branch) => { branchById[branch.branchId] = branch })
        branchNormalizer['byId'] = branchById;
        branchesArrayNormalizer['array'] = branchesArray;
        return { branches: branchesNormalizer, error: null };
    } catch (error) {
        return { branches: null, error }
    }
}

//Funcion para crear o hacer update de un Branch
//Si es nuevo enviar branchId=null o no enviar
export const updateBranch = async({ branchId, branchName, location }) => {
    try {

        let branchDoc = null;
        let isNew = branchId == null;
        if (isNew) {
            branchDoc = await firebaseFirestore.collection(collection).doc();
            branchId = branchDoc.id;
        } else {
            branchDoc = await firebase.firestore().collection(collection).doc(branchId);
            branchId = branchDoc.id;
        }


        let dateModified = new Date();
        dateModified = dateModified.getTime();
        let branchInfo = {
            branchId,
            branchName,
            location,
            dateModified
        };
        if (isNew) {
            await branchDoc.set(branchInfo);
        } else {

            await branchDoc.update(branchInfo);
        }
        return { branch: branchDoc.data(), error: null, errorMessage: null }

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo guardar la categoría."
        return { errorMessage: errorMessage, error, branch: null }
    }

}

//Funcion para eliminar un Branch.
export const deleteBranch = async({ branchId }) => {
    try {

        let branchDoc = await firebaseFirestore.collection(collection).doc(branchId);
        branchDoc = await branchDoc.delete();
        return { branchId, error: null, errorMessage: null }
    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar la categoría."
        return { errorMessage, error, branchId: null }
    }

}