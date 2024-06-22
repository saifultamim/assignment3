import express from 'express'
import authRoute from './modules/auth/auth.route'
import userRoute from './modules/user/user.route'
import bikeRoute from './modules/bike/bike.route'
import rentalRoute from './modules/rental/rental.route'
import errorHandaler from './modules/utilities/ErrrorHandaler/error'
import notFound from './modules/utilities/notFound/notFound'
const app = express()
app.use(express.json())


app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/bikes',bikeRoute)
app.use('/api/rentals',rentalRoute)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(errorHandaler)
app.use(notFound)
export default app