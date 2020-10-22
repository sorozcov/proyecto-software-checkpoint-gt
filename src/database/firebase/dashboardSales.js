import { firebase, firebaseFirestore } from '.';

import moment from "moment";
import omit from 'lodash/omit';

import { store } from '../../../App';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';

const db = firebaseFirestore;
const collection = "salesByDate";

//Función para obtener información del reporte del dashboard del day
export const getDashboardReport = async() => {
    try {
        let todayDate = new Date();
        todayDate.setHours(0,0,0);
        let docId=moment(todayDate).format("YYYY-MM-DD")
        let salesDocData = await db.collection(collection).doc(docId).get();
        salesDocData = await salesDocData.data()
        return {
            report: salesDocData,
            error: null,
        };

    } catch (error) {
        console.log(error)
        return {
            report: null,
            error,
        };
    }
};
