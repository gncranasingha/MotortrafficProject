import React from 'react';

const AdminPanel = () => {
  const backgroundStyle = {
    backgroundImage: `url('https://img.freepik.com/premium-vector/hologram-hud-ui-style-background_115579-831.jpg?size=626&ext=jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
      // Set the container height to 100% of the viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  };

  const transparentCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the alpha value for transparency
  };
 
  return (
    <div style={backgroundStyle}>
      <div className="container mt-1">
        <div className="row">
          <div className="col-12 ">
            <h2 className="text-center mb-4">Choose Your Role</h2>
            <p className="lead text-center" style={{ color: 'white' }}>Select whether you are in the Police, Mototraffic, Revenue Department or an Insurance company to get started.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div className="card shadow p-3 mb-5 rounded text-dark" style={{ ...transparentCardStyle }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/470/470199.png" alt="Employee" style={{ maxWidth: '20%', maxHeight: '20%', borderRadius: '10px', marginBottom: '20px' }} />
                <div className="mt-auto">
                  <a href="/login/police" className="btn btn-primary btn-lg" role="button" aria-pressed="true" style={{ width: '400px', height: '50px', paddingTop: "10px", fontWeight: 'bold', fontSize: '1.5rem' }}>
                  Police Admin
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div className="card shadow p-3 mb-5 rounded text-dark" style={{ ...transparentCardStyle }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/1869/1869679.png" alt="Admin" style={{ maxWidth: '20%', maxHeight: '20%', borderRadius: '10px', marginBottom: '20px' }} />
                <div className="mt-auto">
                  <a href="/login/vehiclerd" className="btn btn-primary btn-lg" role="button" aria-pressed="true" style={{ width: '400px', height: '50px', paddingTop: "10px", fontWeight: 'bold', fontSize: '1.5rem' }}>
                  MotorTraffic Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12  mb-2">
            <div className="card shadow p-3 mb-5 rounded text-dark" style={{ ...transparentCardStyle }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/1869/1869679.png" alt="Admin" style={{ maxWidth: '20%', maxHeight: '20%', borderRadius: '10px', marginBottom: '20px' }} />
                <div className="mt-auto">
                  <a href="/login/revenuelrd" className="btn btn-primary btn-lg" role="button" aria-pressed="true" style={{ width: '400px', height: '50px', paddingTop: "10px", fontWeight: 'bold', fontSize: '1.5rem' }}>
                  Revenue Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
            <div className="card shadow p-3 mb-5 rounded text-dark" style={{ ...transparentCardStyle }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/1869/1869679.png" alt="Admin" style={{ maxWidth: '20%', maxHeight: '20%', borderRadius: '10px', marginBottom: '20px' }} />
                <div className="mt-auto">
                  <a href="/login/insurancecompany" className="btn btn-primary btn-lg" role="button" aria-pressed="true" style={{ width: '400px', height: '50px', paddingTop: "10px", fontWeight: 'bold', fontSize: '1.5rem' }}>
                  Insurance Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
