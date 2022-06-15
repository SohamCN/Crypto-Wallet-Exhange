const express = require('express')
const app = express()
const dotenv = require("dotenv")
const morgan = require('morgan')

dotenv.config({ path: 'config.env' })

const Routes = require( './routes/router.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/crypto', Routes)
app.use(morgan('tiny'))

const port = 5000
app.listen(port, () => {
    console.log(`App is running at localhost:${port}`)
  })
