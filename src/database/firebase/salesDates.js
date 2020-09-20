import { firebaseFirestore } from '.';


const db = firebaseFirestore;
const collection = "salesByDate";
import moment from "moment";


//Function to create all documents by date
export const createDatesDocuments = async({ startDate=null,endDate=null }) => {
    try {
        if(startDate==null){
            startDate=moment(new Date())
        }
        if(endDate==null){
            endDate=moment(new Date(2020, 11, 31))
        }
        let currentDate=startDate
        
        //Create hours dicts for each date in firebase
        let hoursDict = {}
        for(let j=0;j<24;j++){
            hoursDict[j]={
                total:0,
            }
        }
        //Days to create
        const days = endDate.diff(startDate, 'days')
        //docSaleDoc to save information
        let dateSaleDoc = null;
        //Create each date needed from start date to end date
        for(let i=0;i<days+1;i++){
            
            dateSaleDoc = firebaseFirestore.collection(collection).doc(currentDate.format("YYYY-MM-DD"));
            id = dateSaleDoc.id;
            currentDate=currentDate.add(1, 'days');
            let saleDayInfo = {
                id:id,
                date: new Date(currentDate.year(),currentDate.month(),currentDate.date()-1,12,0,0),
                month:currentDate.month(),
                year:currentDate.year(),
                dayOfWeek: currentDate.day(),
                byTime:hoursDict,
                byBranch:{
                    total:0,
                },
                byWaiter:{
                    total:0,
                },
                totalWithInvoice:0,
                totalWithoutInvoice:0,
                total:0,
                products:[],
            };
            let docExists = (await dateSaleDoc.get()).exists
            if(docExists){
                await dateSaleDoc.update(saleDayInfo);
            }else{
                await dateSaleDoc.set(saleDayInfo);
            }
            
        } 

        return { success: true, error: null, errorMessage: null }

    } catch (error) {
        console.log("ERROR" + error.toString());
        let errorMessage = "No se pudo guardar las fechas."

        return {
            errorMessage,
            error,
            success: false
        };
    }
}