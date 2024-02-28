import React from 'react';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url('https://img.freepik.com/premium-vector/hologram-hud-ui-style-background_115579-831.jpg?size=626&ext=jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  };

  const transparentCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  };

  return (
    <div style={backgroundStyle}>
     <div className="container mt-5">
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="text-center mb-4">Choose Your Role</h2>
            <p className="lead text-center" style={{ color: 'white' }}>
              Select whether you are an employee or an admin to get started.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div
              className="card shadow p-3 mb-5 rounded text-dark"
              style={{ ...transparentCardStyle }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/470/470199.png"
                  alt="Employee"
                  style={{
                    maxWidth: '50%',
                    maxHeight: '50%',
                    borderRadius: '10px',
                    marginBottom: '20px',
                  }}
                />
                <div className="mt-auto">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => {
                      // Handle click logic or navigation
                      window.location.href = '/employeepanel';
                    }}
                    style={{
                      padding: '5px 150px',
                     
                      fontWeight: 'bold',
                      fontSize: '2.5rem',
                    }}
                  >
                    Employee
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div
              className="card shadow p-3 mb-5 rounded text-dark"
              style={{ ...transparentCardStyle }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1869/1869679.png"
                  alt="Admin"
                  style={{
                    maxWidth: '50%',
                    maxHeight: '50%',
                    borderRadius: '10px',
                    marginBottom: '20px',
                  }}
                />
                <div className="mt-auto">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => {
                      // Handle click logic or navigation
                      window.location.href = '/adminpanel';
                    }}
                    style={{
                      padding: '5px 150px',
                      fontWeight: 'bold',
                      fontSize: '2.5rem',
                    }}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
