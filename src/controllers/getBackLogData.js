import { BackLog } from "../models/backLog";

export const getBacklogData = async(req, res) => {
    try{
        const findBacklog = await BackLog.find();
        res.send({
            status : "success",
            data : findBacklog
        })
    }catch(error){
        res.status(500).send({
            status :"error",
            message : error.message
        })
    }
}