import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../UserContext';  // Adjust the path as needed

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { userRole} = useContext(UserContext); 
  const userId = localStorage.getItem('officeid');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(userRole, userId);
    
    axios.get(`http://localhost:5000/api/motortraffic/${userRole}/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUserDetails(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to fetch user details');
      setLoading(false);
    });
  }, [userRole, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Profile</h1>
      <p><strong>Full Name:</strong> {userDetails.fullname}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Address:</strong> {userDetails.address}</p>
      <p><strong>Office Location:</strong> {userDetails.officelocation}</p>
      <p><strong>Phone Number:</strong> {userDetails.phoneno}</p>
      <p><strong>Role:</strong> {userDetails.role}</p>
    </div>
  );
};

export default UserProfile;
