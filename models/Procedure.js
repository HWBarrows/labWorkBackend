import mongoose from "mongoose";

const { Schema, model } = mongoose

const required = true
const trim = true
const unique = true

const doSchema = new Schema({
    do : { type: String, required, trim, unique},
    how: [{type: String, trim}]
}, {_id: false})

const procedureSchema = new Schema({
    heading :     { type: String, required, trim, unique},
    author:       { type: String, required, trim},
    purpose:      { type: String, trim},
    scope:        { type: String, trim},
    steps:        { type: Array, required} ,
    materials:    [{type: String, trim}],
    definitions:  [{type: String, trim}]
})

const Procedure = model("procedure", procedureSchema)

export default Procedure