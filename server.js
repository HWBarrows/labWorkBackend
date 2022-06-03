import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from './lib/database.js'
import procedureRouter from './controllers/procedureRouter.js'
import createError from 'http-errors'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
connect()


app.get("/", (req, res)=> {
    res.send("Welcome to the info")
})

app.use("/procedures", procedureRouter)

app.use((req, res, next) => {
    next(
        createError(404, `Resource ${req.method} ${req.url} not found`)
    )
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: error.message || "Something went wrong"
    })
})


const port = process.env.PORT
app.listen(port, ()=> console.log(`Party on http://localhost:${port}`))