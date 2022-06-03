import express from 'express'
import Procedure from '../models/Procedure.js'
import createError from 'http-errors'

const procedureRouter = express.Router()



procedureRouter
.get("/", async (req, res, next) => {
    const procedures = await Procedure.find(req.query)
    if(!procedures[0]) {
        res.send({message:"No documents have been created"})
    } else {
        res.send(procedures)
    }
    
})

.post("/", async (req, res, next) => {
    try {
        const procedure = await Procedure.create(req.body)
        res.send(procedure)
    } catch (err) {
        next(createError(400, err.message))
    }
})

.put("/", async (req, res, next)=> {
    try {
    const filter = req.body.heading
    const update = req.body

    const patchedDoc = await Procedure.findOneAndUpdate(filter, update, { new: true})
    res.send(patchedDoc)
    }catch (err) {
        next(createError(400, err.message))
    }
})

.delete("/:id", async (req, res, next) => {
    try {
        const procedure = await Procedure.findById(req.params.id)
        if (!procedure) {
            return next(createError(404, "Document not found"))
        }
        procedure.remove()
        res.send({ ok: true })
    } catch (err) {
        next(createError(400, err.message))
    }
})

export default procedureRouter