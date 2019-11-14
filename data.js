const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema(
    {
       
        img:
            {data: Buffer, contentType: String}
       
    }
)
module.exports = mongoose.model("Data", DataSchema);