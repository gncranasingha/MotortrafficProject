const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    if (!formData.nic || formData.nic.trim() === "") {
      console.error("NIC is required");
      return;
    }
    if (!img) {
      console.error("Image is required");
      return;
    }
  
    
    const imgRef = ref(imageDb, `images/${formData.nic}`);
    
    try {
     
      const snapshot = await uploadBytes(imgRef, img);
      console.log('Image uploaded successfully!', snapshot);
  
      
      const imageUrl = await getDownloadURL(imgRef);
      console.log('File available at', imageUrl);
  
     
      const completeFormData = { ...formData, imageUrl };
  
      const token = localStorage.getItem("token");
      const endpoint = isUpdateMode 
        ? `http://localhost:5000/api/drivers/update/${formData._id}` 
        : 'http://localhost:5000/api/drivers/register/driversregistration';
  
      
      await axios({
        method: isUpdateMode ? 'put' : 'post',
        url: endpoint,
        data: completeFormData,
        headers: { Authorization: token }
      });
  
      console.log(isUpdateMode ? "Driver updated successfully" : "Driver added successfully");
      window.alert(isUpdateMode ? "Driver updated successfully" : "Driver added successfully");
  
     
      if (!isUpdateMode) {
        setUserData({
          nic: '',
          email: '',
          fullname: '',
          address: '',
          officelocation: officeLocation,
          bloodtype: '',
          phoneno: '',
          birthday: '',
          issuedate: '',
          expdate: '',
        });
        setimg(null);
      }
  
      
      history.push(`/${userRole}/${officeLocation}/dashboard`);
      
    } catch (error) {
      console.error("Error during form submission:", error);
      window.alert("Error during form submission. Please try again.");
    }
  };
  