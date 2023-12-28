import React from 'react'

const EmployeePanel = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="card" style={{ width: '18rem' }}>
            
            <img
              src="https://ecard.enter-media.org/upload/iblock/fc3/fc35b12dab2d73760faa599af8399b0f.jpg"
              className="card-img-top"
              alt="Card Image"
            />
            <div className="card-body">
             
              <a href="/login/policeofficer" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Police Officer</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="card" style={{ width: '18rem' }}>
            
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/Single_Color_Flag_-_FFFF00.svg"
              className="card-img-top"
              alt="Card Image"
            />
            <div className="card-body">
              
              <a href="/login/mtdemployee" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Motor Traffic Employee </a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="card" style={{ width: '18rem' }}>
            
            <img
              src="https://t4.ftcdn.net/jpg/02/71/55/53/360_F_271555343_fgGlraeSZpzyWBYfMRPYyPjFf9eWYgY4.jpg"
              className="card-img-top"
              alt="Card Image"
            />
            <div className="card-body">
              
              <a href="/login/revenuelrdemployee" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Revenue Employee</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="card" style={{ width: '18rem' }}>
            
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBPxGEmtzn6Wf53h2YmzF8TBtojMZTsYJKQ&usqp=CAU"
              className="card-img-top"
              alt="Card Image"
            />
            <div className="card-body">
              
              <a href="/login/employee" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Insurance Employee</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default EmployeePanel