const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/verifyToken')
const authRoutes = require('./routes/AuthRoutes')

const police = require('./routes/PoliceRoutes')
const Driver = require('./routes/DriverRoutes')
const Vehicle = require('./routes/VehicleRoute')
const MotorTraffic = require('./routes/MotorTrafficRoute')
const Revenue = require('./routes/RevenueRoutes')
const Insurance = require('./routes/InsuranceRoutes')
const Fine = require('./routes/FineRoutes')
const Requestss = require('./routes/RequestRouter')


dotenv.config();
const app = express();
const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration




app.use('/api/auth', authRoutes);
app.use('/api/police', verifyToken, police );
app.use('/api/drivers', verifyToken, Driver );
app.use('/api/vehicle', verifyToken, Vehicle );
app.use('/api/motortraffic', verifyToken, MotorTraffic );
app.use('/api/revenue', verifyToken, Revenue );
app.use('/api/insurance', verifyToken, Insurance );
app.use('/api/fine', verifyToken, Fine );
app.use('/api/requestss', verifyToken, Requestss );


app.listen(port, () => {
  console.log('Server is running on port', port);
});