import axios from "axios";
import cron from 'node-cron';

const updateEveryDay = async () => {
        const config = {
            headers : {
                'content-type' : "aplication/json"
            }
        }
         const url = `${process.env.HOST}:${process.env.PORT}/api/v1/data/covid/update`;
         const updateDataCovid = await axios.post(url, {}, config);
         console.log("data success update", updateDataCovid.data.data);
         console.log("data url", url);
}

const startCron = cron.schedule('* 59 23 * * *', () =>  {
   return updateEveryDay();
});

export default startCron;


