import { firebase, firebaseFirestore } from '.';

import moment from "moment";
import omit from 'lodash/omit';
import forEach from 'lodash/map';

import { store } from '../../../App';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/reports';

const db = firebaseFirestore;
const collection = "salesByDate";

// función para obtener ventas de Firebase según las fechas ingresadas
export const getSalesReportByDates = async( initial, final, groupBy = false) => {
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

        if (groupBy) {
            let groupedW = {
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

            let groupedM = {
                0: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0,
                },
                1: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                2: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                3: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                4: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                5: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                6: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                7: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                8: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                9: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                10: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                11: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
            }
            
            let groupedH = {
                12: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0,
                },
                13: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                14: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                15: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                16: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                17: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                18: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                19: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                20: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                21: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                22: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
                23: {
                    total: 0,
                    totalWithoutTip: 0,
                    count: 0
                },
            }

            const days = ['Sábado', 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

            salesArray.map(sale => {
                // grouping by weekday
                groupedW[sale.dayOfWeek.toString()].total = groupedW[sale.dayOfWeek.toString()].total + sale.total;
                groupedW[sale.dayOfWeek.toString()].totalWithoutTip = groupedW[sale.dayOfWeek.toString()].totalWithoutTip + sale.totalWithoutTip;
                groupedW[sale.dayOfWeek.toString()].count = groupedW[sale.dayOfWeek.toString()].count + 1;

                // grouping by month
                groupedM[sale.month.toString()].total = groupedM[sale.month.toString()].total + sale.total;
                groupedM[sale.month.toString()].totalWithoutTip = groupedM[sale.month.toString()].totalWithoutTip + sale.totalWithoutTip;
                groupedM[sale.month.toString()].count = groupedM[sale.month.toString()].count + 1;

                //grouping by hour
                forEach(sale.byTime, function(value, key) {
                    if (key > 11){
                        groupedH[key] = value
                    }
                })
            })
            
            const normalizer = {
                'WEEKDAY': {
                    sales: groupedW,
                    identifiers: days,
                },
                'MONTH': {
                    sales: groupedM,
                    identifiers: months,
                },
                'HOUR': {
                    sales: groupedH,
                    identifiers: hours,
                }
            }

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
export const getSalesReportByBranches = async( initial, final) => {
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

// función para obtener ventas de Firebase según las fechas ingresadas agrupadas por usuario
export const getSalesReportByUsers = async( initial, final) => {
    try {
        let initial_date = new Date(initial);
        let final_date = new Date(final);
        initial_date.setUTCHours(-18,0,0);
        final_date.setUTCHours(-18,0,0);

        const sales = await db.collection(collection).where("date", ">=", initial_date).where("date", "<=", final_date).get();

        let salesArray = [];
        sales.docs.forEach(sale => {
            salesArray.push(omit(sale.data(), ['products', 'byTime', 'byBranch']));
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
    };
};
    
export const getMostSoldProducts = async(initial, final) => {
    try {
        let initial_date = new Date(initial);
        let final_date = new Date(final);
        initial_date.setUTCHours(-18,0,0);
        final_date.setUTCHours(-18,0,0);

        const sales = await db.collection(collection).where("date", ">=", initial_date).where("date", "<=", final_date).get();

        let salesArray = [];
        sales.docs.forEach(sale => {
            if(sale.data().products.length > 0) {
                salesArray.push(omit(sale.data(), ['byBranch', 'byTime', 'byWaiter']));
            };
        });

        let commonProducts = {
            order: [],
            byId: [],
        };
        
        salesArray[0].products.map( day => {
          if(commonProducts.order.includes(day.productName)) {
              commonProducts.byId.map(obj => {
                if(obj.name === day.productName) {
                    obj['quantity']  = obj.quantity + day.quantity;
                };
            });

          } else {
            commonProducts.order.push(day.productName);
            commonProducts.byId.push({
                name: day.productName,
                  quantity: day.quantity,
            });
          };
        });

        return {
            report: commonProducts,
            error: null,
        };
        
    } catch (error) {
        return {
            report: null,
            error,
        };
    };
};


