import mongoose from "mongoose";
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;

const backLogDataCovidSchema =  new Schema({
    title : {type : String},
    description : {
        type : String
    }
},
{
    timestamps : true
});

autoIncrement.initialize(mongoose.connection);
backLogDataCovidSchema.plugin(autoIncrement.plugin,  {
    model: 'backLogDataCovidSchema',
    field: '_id',
    startAt: 1,
    incrementBy: 1
  });

export const BackLog = mongoose.model("log", backLogDataCovidSchema);
