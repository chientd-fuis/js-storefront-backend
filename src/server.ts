import { Request, Response } from 'express'
import express from "express";
import authencationApi from './handlers/authencationHandler'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.json())

authencationApi(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
