import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

const newPointDataCovidSchema =  new Schema({
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
newPointDataCovidSchema.plugin(autoIncrement.plugin,  {
    model: 'newPointDataCovidSchema',
    field: '_id',
    startAt: 1,
    incrementBy: 1
  });

export const NewDataCovid = mongoose.model("newPointData", newPointDataCovidSchema);
