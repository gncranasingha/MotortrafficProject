import React from 'react';

const AdminPanel = () => {
  return (
    <div className="mt-5" style={{paddingLeft:'20vh'}} >
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card" style={{ width: '40%', height: '42vh' }}>
            <img
              src="https://ecard.enter-media.org/upload/iblock/fc3/fc35b12dab2d73760faa599af8399b0f.jpg"
              className="card-img-top"
              alt="Card Image"
              style={{ height: '100%', objectFit: 'cover' }}
            />
            <div className="card-body">
              <a href="/login/police" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                Police Admin
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card" style={{ width: '40%', height: '42vh' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/Single_Color_Flag_-_FFFF00.svg"
              className="card-img-top"
              alt="Card Image"
              style={{ height: '100%', objectFit: 'cover' }}
            />
            <div className="card-body">
              <a href="/login/vehiclerd" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                MotorTraffic Admin
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-6" style={{paddingTop:'20px'}} >
          <div className="card" style={{ width: '40%', height: '42vh' }}>
            <img
              src="https://t4.ftcdn.net/jpg/02/71/55/53/360_F_271555343_fgGlraeSZpzyWBYfMRPYyPjFf9eWYgY4.jpg"
              className="card-img-top"
              alt="Card Image"
              style={{ height: '100%', objectFit: 'cover' }}
            />
            <div className="card-body">
              <a href="/login/revenuelrd" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                Revenue Admin
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mb-6" style={{paddingTop:'20px'}}>
          <div className="card" style={{ width: '40%', height: '42vh' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBPxGEmtzn6Wf53h2YmzF8TBtojMZTsYJKQ&usqp=CAU"
              className="card-img-top"
              alt="Card Image"
              style={{ height: '100%', objectFit: 'cover' }}
            />
            <div className="card-body">
              <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                Insurance Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
