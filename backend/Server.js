const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/verifyToken');
const authRoutes = require('./routes/AuthRoutes');
const police = require('./routes/PoliceRoutes');
const Driver = require('./routes/DriverRoutes');
const Vehicle = require('./routes/VehicleRoute');
const MotorTraffic = require('./routes/MotorTrafficRoute');
const Revenue = require('./routes/RevenueRoutes');
const Insurance = require('./routes/InsuranceRoutes');
const Fine = require('./routes/FineRoutes');
const Requestss = require('./routes/RequestRouter');
const paypal = require('paypal-rest-sdk');
const Employee = require('./routes/EmployeeRoute');
const cron = require('node-cron');
const moment = require('moment-timezone');
const VehicleAcceptance = require('./models/AcceptedVehicleRequest');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Initialize HTTP server from Express app
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",  // Adjust this to match your front-end URL for security
        methods: ["GET", "POST"]
    }
});

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(bodyParser.json());

paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});



const deleteExpiredRecords = async () => {
  const today = moment().tz('Asia/Colombo').startOf('day').toDate();
  try {
    const result = await VehicleAcceptance.deleteMany({
      expiryDate: { $lt: today }
    });
    console.log(`Deleted ${result.deletedCount} expired records.`);
  } catch (error) {
    console.error('Error deleting expired records:', error);
  }
};

cron.schedule('0 0 * * *', deleteExpiredRecords, {
  scheduled: true,
  timezone: "Asia/Colombo"
});

app.use('/api/auth', authRoutes);
app.use('/api/police', verifyToken, police);
app.use('/api/drivers', verifyToken, Driver);
app.use('/api/vehicle', verifyToken, Vehicle);
app.use('/api/motortraffic', verifyToken, MotorTraffic);
app.use('/api/revenue', verifyToken, Revenue);
app.use('/api/insurance', verifyToken, Insurance);
app.use('/api/fine', verifyToken, Fine);
app.use('/api/requestss', verifyToken, Requestss);
app.use('/api/employee', verifyToken, Employee);



io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('update_license_request', (data) => {
    console.log('Update License Request Received:', data);
    // Broadcast this message to all clients (including the sender)
    io.emit('update_license_request', data);
  });


  io.on('connection', (socket) => {
    socket.on('payment_successful', (data) => {
      // Broadcast this event to all clients
      io.emit('enable_expir_button', { nic: data.nic });
    });
  });


  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('send_to_driver', ({ nic, message }) => {
    console.log(`Message received for NIC ${nic}:`, message);
    // Emit the message only to sockets in the specified NIC room
    io.to(nic).emit('message_from_admin', message);
  });

  socket.on('send_message_to_vehicle_owner', ({ engineno, message }) => {
    console.log(`Message to vehicle no ${ engineno}:`, message);
    // Emit to all clients, or use rooms to target a specific client
    io.emit('receive_message',  message);
  });




  socket.on('enable_exp_update', ({ nic }) => {
    console.log(`Enable Exp Update received for NIC: ${nic}`);
    // Emit this to all clients (or you can target a specific room if clients join rooms based on NIC)
    io.emit('enable_exp_button', { nic });
  });
  socket.on('enable_exp_revenueupdate', ({ engineno }) => {
    console.log(`Enable Exp Update received for vehicle no: ${engineno}`);
    // Emit this to all clients (or you can target a specific room if clients join rooms based on NIC)
    io.emit('enable_exp_revenuebutton', { engineno });
  });


  socket.on('send_update_request', ({engineno}) => {
    console.log(`Update Request Received for Vehicle No: ${engineno}`);
    // You can now emit this to all clients or to a specific room
    io.emit('update_request_received', { engineno });
  });

 


  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});





server.listen(port, () => {
  console.log(`Server with WebSocket is running on port ${port}`);
});
