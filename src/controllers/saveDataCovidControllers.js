import { DataCovid } from '../models/dataCovid';
import { BackLog } from '../models/backLog';
import { NewDataCovid } from '../models/newPointDataCovid';
import axios from 'axios';

export const getDataCovid = async (req, res) => {
    try {
        const getDataCovid = await DataCovid.find();
        const getNewDataCovid = await NewDataCovid.find();
        res.send({
            status : "success",
            data : getDataCovid,
            updated : getNewDataCovid
        })        
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : error.message
        })
    }
}

export const updateDataCovids = async (req, res) => {
    try {
        const findDataCovidInDb  = await DataCovid.find();
        const config = {
            headers : {
                'content-type' : "aplication/json"
            }
        }
        //get data from api 
        const getDataCovid = await axios.get(process.env.LINK_API, config);
        const dataCovid =  getDataCovid.data.update.penambahan;
        /*
        if found covid data in database update data
        if cant covid data in database create new data
        */ 
        if(findDataCovidInDb.length === 0){
            const createDataCovid = await new DataCovid({
                jumlah_positif : dataCovid.jumlah_positif ,
                jumlah_meninggal : dataCovid.jumlah_meninggal,
                jumlah_sembuh : dataCovid.jumlah_sembuh,
                jumlah_dirawat : dataCovid.jumlah_dirawat,
                tanggal : dataCovid.tanggal,
            }).save();
            const insertToBackLog = await new BackLog({
                title : "create data covids",
                description : "menambahkan data covid ke database",
            }).save();
            res.send({
                status : "success",
                message : "create data success",
                data : createDataCovid,
                log : insertToBackLog
            });
        }else{
            const createDataCovid = await DataCovid.findByIdAndUpdate(findDataCovidInDb[0]._id,{
                jumlah_positif : dataCovid.jumlah_positif ,
                jumlah_meninggal : dataCovid.jumlah_meninggal,
                jumlah_sembuh : dataCovid.jumlah_sembuh,
                jumlah_dirawat : dataCovid.jumlah_dirawat,
                tanggal : dataCovid.tanggal,
            });
            
            /*
            for check the same data api with data in db
            if data are changes create data in new point, if not, skip, 
            */ 
            const updateDataIfChangesJumlahPositif = findDataCovidInDb[0].jumlah_positif === dataCovid.jumlah_positif ? null : await new NewDataCovid({ 
                jumlah_positif : dataCovid.jumlah_positif ,
                jumlah_meninggal : dataCovid.jumlah_meninggal,
                jumlah_sembuh : dataCovid.jumlah_sembuh,
                jumlah_dirawat : dataCovid.jumlah_dirawat,
                tanggal : dataCovid.tanggal,
            }).save();

            const updateDataIfChangesJumlahMeninggal = findDataCovidInDb[0].jumlah_meninggal === dataCovid.jumlah_meninggal ? null : await new NewDataCovid({ 
                jumlah_positif : dataCovid.jumlah_positif ,
                jumlah_meninggal : dataCovid.jumlah_meninggal,
                jumlah_sembuh : dataCovid.jumlah_sembuh,
                jumlah_dirawat : dataCovid.jumlah_dirawat,
                tanggal : dataCovid.tanggal,
            }).save();
            const updateDataIfChangeJumlahSembuh = findDataCovidInDb[0].jumlah_sembuh === dataCovid.jumlah_sembuh ? null : await new NewDataCovid({ 
                jumlah_positif : dataCovid.jumlah_positif ,
                jumlah_meninggal : dataCovid.jumlah_meninggal,
                jumlah_sembuh : dataCovid.jumlah_sembuh,
                jumlah_dirawat : dataCovid.jumlah_dirawat,
                tanggal : dataCovid.tanggal,
            }).save();
            const updateDataIfChangeJumlahDirawat = findDataCovidInDb[0].jumlah_dirawat === dataCovid.jumlah_dirawat ? null : await new NewDataCovid({ 
                jumlah_positif : dataCovid.jumlah_positif ,
                jumlah_meninggal : dataCovid.jumlah_meninggal,
                jumlah_sembuh : dataCovid.jumlah_sembuh,
                jumlah_dirawat : dataCovid.jumlah_dirawat,
                tanggal : dataCovid.tanggal,
            }).save();

            const insertToBackLog = await new BackLog({
                title : "update data covids",
                description : `update data covid`,
            }).save();

            res.send({
                status : 'success',
                message : "update data success",
                data : createDataCovid,
            })
        }  
    } catch (error) {
        res.status(500).send({
            status : "error",
            message : error.message
        })
    }
}

