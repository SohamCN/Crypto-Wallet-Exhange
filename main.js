import express from 'express'
const app = express()
import dotenv from "dotenv"
import morgan from 'morgan'

dotenv.config({ path: 'config.env' })

import Routes from './routes/router.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/crypto', Routes)
app.use(morgan('tiny'))

const port = 5000
app.listen(port, () => {
    console.log(`App is running at localhost:${port}`)
  })
