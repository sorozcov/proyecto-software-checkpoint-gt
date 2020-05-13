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

        branchesNormalizer['order'] = branchesArray.map(branch => branch.id)
        branchesArray.map((branch) => { branchById[branch.id] = branch })
        branchesNormalizer['byId'] = branchById;
        branchesNormalizer['array'] = branchesArray;

        return { branches: branchesNormalizer, error: null };

    } catch (error) {
        return { branches: null, error }
    }
}

//Funcion para crear o hacer update de un Branch
//Si es nuevo enviar id=null o no enviar
export const updateBranch = async({ id, name, location }) => {
    try {

        let branchDoc = null;
        let isNew = id == null;
        if (isNew) {
            branchDoc = await firebaseFirestore.collection(collection).doc();
            id = branchDoc.id;
        } else {
            branchDoc = await firebaseFirestore.collection(collection).doc(id);
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
        return { errorMessage, error, branch: null }
    }
}

//Funcion para eliminar un Branch.
export const deleteBranch = async({ id }) => {
    try {
        let branchDoc = await firebaseFirestore.collection(collection).doc(id);
        branchDoc = await branchDoc.delete();

        return { id, error: null, errorMessage: null };

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo eliminar la sucursal."

        return { errorMessage, error, id: null };
    }
}