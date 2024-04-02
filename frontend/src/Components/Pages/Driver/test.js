const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check required fields
    if (!formData.nic || formData.nic.trim() === "") {
      console.error("NIC is required");
      return;
    }
    if (!img) {
      console.error("Image is required");
      return;
    }
  
    // Use NIC as the image name for uploading
    const imgRef = ref(imageDb, `images/${formData.nic}`);
    
    try {
      // Upload the image first
      const snapshot = await uploadBytes(imgRef, img);
      console.log('Image uploaded successfully!', snapshot);
  
      // Optionally, retrieve the file URL after the upload
      const imageUrl = await getDownloadURL(imgRef);
      console.log('File available at', imageUrl);
  
      // Add the image URL to the form data
      const completeFormData = { ...formData, imageUrl };
  
      const token = localStorage.getItem("token");
      const endpoint = isUpdateMode 
        ? `http://localhost:5000/api/drivers/update/${formData._id}` 
        : 'http://localhost:5000/api/drivers/register/driversregistration';
  
      // Now submit the complete form data including the image URL to your backend
      await axios({
        method: isUpdateMode ? 'put' : 'post',
        url: endpoint,
        data: completeFormData,
        headers: { Authorization: token }
      });
  
      console.log(isUpdateMode ? "Driver updated successfully" : "Driver added successfully");
      window.alert(isUpdateMode ? "Driver updated successfully" : "Driver added successfully");
  
      // Reset the form fields or redirect as needed after successful submission
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
        setimg(null); // Reset image state
      }
  
      // Optional: Redirect or update UI
      history.push(`/${userRole}/${officeLocation}/dashboard`);
      
    } catch (error) {
      console.error("Error during form submission:", error);
      window.alert("Error during form submission. Please try again.");
    }
  };
  