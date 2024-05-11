import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const RequestView = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [nicToSend, setNicToSend] = useState('');  
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    
    const newSocket = io('http://172.20.10.6:5000'); 
    setSocket(newSocket);

    newSocket.on('update_license_request', (data) => {
      setRequests(prevRequests => [...prevRequests, data]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handlePassButtonClick = (nic) => {
    if (socket) {
      socket.emit('enable_exp_update', { nic });
      console.log(`Requested to enable Exp Update for NIC: ${nic}`);
    }
  };

  const sendMessageToDriver = () => {
    if (socket && nicToSend && message) {
      socket.emit('send_to_driver', { nic: nicToSend, message });
      setMessage('');  
    }
  };

  return (
    <div>
      <h1>License Update Requests</h1>
      <ul>
      {requests.map((request, index) => (
        <li key={index}>
          NIC: {request.nic} - Request received
          <button onClick={() => handlePassButtonClick(request.nic)}>Pass</button>
        </li>
      ))}
      </ul>
      <div>
        <input
          type="text"
          value={nicToSend}
          onChange={(e) => setNicToSend(e.target.value)}
          placeholder="NIC to send message to"
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message to send to driver"
          style={{ marginRight: '10px' }}
        />
        <button onClick={sendMessageToDriver}>Send Message</button>
      </div>
    </div>
  );
};

export default RequestView;
