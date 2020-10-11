import { firebase, firebaseFirestore } from '.';

import moment from "moment";
import omit from 'lodash/omit';

import { store } from '../../../App';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';

const db = firebaseFirestore;
const collection = "salesByDate";

// función para obtener ventas de Firebase según las fechas ingresadas
export const getSalesReportByDates = async( initial, final, groupBy = 'DAY') => {
    try {
        let initial_date = new Date(initial);
        let final_date = new Date(final);
        initial_date.setUTCHours(-18,0,0);
        final_date.setUTCHours(-18,0,0);

        const sales = await db.collection(collection).where("date", ">=", initial_date).where("date", "<=", final_date).get();

        let salesArray = [];
        sales.docs.forEach(sale => {
            salesArray.push(sale.data());
        });

        let salesNormalizer = {};
        let saleById = {};
        let reportInfo = {
            periodTotal: 0,
            periodTotalTip	: 0,
            periodTotalWithInvoice: 0,
            periodTotalWithoutInvoice: 0,
            periodTotalWithoutTip: 0,
        };

        salesNormalizer['sale'] = salesArray.map(sale => sale.id);
        salesArray.map(sale => {
            saleById[sale.id] = omit(sale, ['byBranch', 'byTime', 'byWaiter']);
            reportInfo['periodTotal'] = reportInfo['periodTotal'] + sale.total;
            reportInfo['periodTotalTip'] = reportInfo['periodTotalTip'] + sale.totalTip;
            reportInfo['periodTotalWithInvoice'] = reportInfo['periodTotalWithInvoice'] + sale.totalWithInvoice;
            reportInfo['periodTotalWithoutInvoice'] = reportInfo['periodTotalWithoutInvoice'] + sale.totalWithoutInvoice;
            reportInfo['periodTotalWithoutTip'] = reportInfo['periodTotalWithoutTip'] + sale.totalWithoutTip;
            }
        );
        salesNormalizer['saleById'] = saleById;
        salesNormalizer['reportData'] = reportInfo;

        return {
            report: salesNormalizer,
            error: null,
        };

    } catch (error) {
        return {
            report: null,
            error,
        };
    }
};
