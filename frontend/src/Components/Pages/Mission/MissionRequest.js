import React, { useState, useEffect , useRef} from 'react';
import io from 'socket.io-client';
import config from '../../../config';

const MissionRequest = () => {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');
    const [vehicleNoToSend, setVehicleNoToSend] = useState('');
    const [socket, setSocket] = useState(null);


  useEffect(() => {
    const newSocket = io(config.API_URL); 
    setSocket(newSocket);

    
     newSocket.on('update_request_received', (data) => {
      setRequests(prevRequests => [...prevRequests, data]);
    });

    return () => {
        newSocket.close();
      };
  }, []);

  const sendMessageToVehicleOwner = () => {
   
    if (socket && vehicleNoToSend && message) {
        socket.emit('send_message_to_vehicle_owner', {engineno: vehicleNoToSend, message });
        setMessage('');  
      }
  };

  return (
    <div>
      <h1>Revenue License Update Requests</h1>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            Vehicle No: {request.engineno} - Request received
          </li>
        ))}
      </ul>
      <div>
      <input
          type="text"
          value={vehicleNoToSend}
          onChange={(e) => setVehicleNoToSend(e.target.value)}
          placeholder="NIC to send message to"
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message to send"
        />
        <button onClick={sendMessageToVehicleOwner}>Send Message</button>
      </div>
    </div>
  );
};

export default MissionRequest;
