import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

const dataCovidSchema =  new Schema({
    jumlah_positif: { type : Number },
    jumlah_meninggal:{ type : Number },
    jumlah_sembuh: { type : Number },
    jumlah_dirawat: { type : Number },
    tanggal: { type : String },
},
{
    timestamps : true
});

autoIncrement.initialize(mongoose.connection);
dataCovidSchema.plugin(autoIncrement.plugin,  {
    model: 'dataCovidSchema',
    field: '_id',
    startAt: 1,
    incrementBy: 1
  });

export const DataCovid = mongoose.model("dataCovids", dataCovidSchema);
