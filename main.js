const express = require('express')
const app = express()
const dotenv = require("dotenv")
const morgan = require('morgan')

dotenv.config({ path: '.env' })

const RoutesCryptoETH = require('./routes/routerEth')
const RoutesCryptoBTC = require('./routes/routerBtc')
const UserAccountRoutes = require('./routes/user-account')
const connectDB = require('./database/mongo')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use('/ethereum', RoutesCryptoETH)
app.use('/bitcoin', RoutesCryptoBTC)
app.use('/user', UserAccountRoutes)

app.use(morgan('tiny'))

connectDB()

const port = 3000
app.listen(port, () => {
    console.log(`App is running at localhost:${port}`)
  })
