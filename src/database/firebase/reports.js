import { firebase, firebaseFirestore } from '.';

import moment from "moment";
import omit from 'lodash/omit';

import { store } from '../../../App';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';

const db = firebaseFirestore;
const collection = "salesByDate";

// función para obtener ventas de Firebase según las fechas ingresadas
export const getSalesReportByDates = async( initial, final, groupBy = 'NONE') => {
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

        if (groupBy === 'WEEKDAY') {
            let grouped = {
                0: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0,
                },
                1: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                2: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                3: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                4: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                5: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                6: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
            }
            const days = ['Sábado', 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

            salesArray.map(sale => {
                grouped[sale.dayOfWeek.toString()].total = grouped[sale.dayOfWeek.toString()].total + sale.total
                grouped[sale.dayOfWeek.toString()].totalWithoutTip = grouped[sale.dayOfWeek.toString()].totalWithoutTip + sale.totalWithoutTip
                grouped[sale.dayOfWeek.toString()].count = grouped[sale.dayOfWeek.toString()].count + 1
            })
            
            const normalizer = {
                sales: grouped,
                identifiers: days,
            }

            console.log("GROUP")
            console.log(normalizer)

            return {
                report: normalizer,
                error: null,
            }
        }
        if (groupBy === 'MONTH') {
            let grouped = {
                0: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0,
                },
                1: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                2: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                3: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                4: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                5: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                6: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                7: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                8: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                9: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                10: {
                    total: 0,
                    totalWithoutTip:0,
                    count: 0
                },
                11: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
            }
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

            salesArray.map(sale => {
                grouped[sale.month.toString()].total = grouped[sale.month.toString()].total + sale.total
                grouped[sale.month.toString()].totalWithoutTip = grouped[sale.month.toString()].totalWithoutTip + sale.totalWithoutTip
                grouped[sale.month.toString()].count = grouped[sale.month.toString()].count + 1
            })
            
            const normalizer = {
                sales: grouped,
                identifiers: months,
            }

            console.log("GROUP")
            console.log(normalizer)

            return {
                report: normalizer,
                error: null,
            }
        }

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

// función para obtener ventas de Firebase según las fechas ingresadas agrupadas por branch
export const getSalesReportByBranches = async( initial, final, groupBy = 'DAY') => {
    try {
        let initial_date = new Date(initial);
        let final_date = new Date(final);
        initial_date.setUTCHours(-18,0,0);
        final_date.setUTCHours(-18,0,0);

        const sales = await db.collection(collection).where("date", ">=", initial_date).where("date", "<=", final_date).get();

        let salesArray = [];
        sales.docs.forEach(sale => {
            salesArray.push(omit(sale.data(), ['products', 'byTime', 'byWaiter']));
        });

        return {
            report: salesArray,
            error: null,
        };

    } catch (error) {
        return {
            report: null,
            error,
        };
    }
};
