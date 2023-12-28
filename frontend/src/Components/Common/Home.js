import React from 'react';

const Home = () => {
  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-8">
          <div className="card" style={{ width: '100%', minWidth: '200px', marginBottom: '20px' }}>
            <img
              src="https://st4.depositphotos.com/24244980/26779/i/450/depositphotos_267798854-stock-photo-employees-red-brush-abstract-background.jpg"
              className="card-img-top"
              alt="Card Image"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <a href="/employeepanel" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                Employee
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-8" style={{ marginLeft: '80px' }}>
          <div className="card" style={{ width: '100%', minWidth: '200px', marginBottom: '20px' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOcPv5gl0htCApaTRCW2qjD3Ks5YqxInAGiuomxkKsvbjSnd09HuRC7RBJOlZPvnbC1s&usqp=CAU"
              className="card-img-top"
              alt="Card Image"
              style={{ height: '500px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <a href="/adminpanel" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
