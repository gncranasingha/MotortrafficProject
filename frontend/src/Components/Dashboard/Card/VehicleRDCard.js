
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const VehicleRDCard = () => {

 

  return (
    <div>
    <div className="row">
      <div className="col-md-4">
        <div className="card" style={{ backgroundColor: 'lightblue' }}>
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >V</h5>
                <div className="d-flex align-items-center">
                <DirectionsCarIcon style={{ fontSize: 46, color: 'red' }} />

                    <p className="card-text" style={{ fontSize: '30px' }} >40</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
      <div className="card" style={{ backgroundColor: 'lightgreen' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >D</h5>
                <div className="d-flex align-items-center">
                <GroupAddIcon style={{ fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >40</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
      <div className="card" style={{ backgroundColor: 'lightyellow' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >E</h5>
                <div className="d-flex align-items-center">
                <PersonIcon style={{  fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >40</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VehicleRDCard;
