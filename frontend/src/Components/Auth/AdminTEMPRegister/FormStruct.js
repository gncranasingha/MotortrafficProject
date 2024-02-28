const policeFields = [
    
    {name:'officeid', label: 'Office Id', type: 'text'},
    {name:'id', label: 'NIC', type: 'text'},
    { name: 'fullname', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email'},
    //{ name: 'password', label: 'Password', type: 'password' },
    { name: 'address', label: 'Address', type: 'text' },
   
    { name: 'phoneno', label: 'Phone number', type: 'number' },

    
  ];
  
  const VRDEmployeeFields = [
    {name:'officeid', label: 'Office Id', type: 'text'},
    {name:'id', label: 'NIC', type: 'text'},
    { name: 'fullname', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'address', label: 'Address', type: 'text' },
   
    { name: 'phoneno', label: 'Phone number', type: 'number' },
  ];

 

  const RRDEmployeeFields = [
    {name:'officeid', label: 'Office Id', type: 'text'},
    {name:'id', label: 'NIC', type: 'text'},
    { name: 'fullname', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'address', label: 'Address', type: 'text' },
   
    { name: 'phoneno', label: 'Phone number', type: 'number' },
  ];


  const FineFields = [
    
    {name:'fineid', label: 'Fine ID', type: 'number'},
    {name:'id', label: 'NIC', type: 'text'},
    {name:'DLNo', label: 'Driving License No', type: 'number'},
    { name: 'fullname', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'phoneno', label: 'Phone number', type: 'number' },
    { name: 'vehicleno', label: 'Vehicle NO', type: 'text' },
    { name: 'natureoffence', label: 'Nature Of Offence', type: 'text' },
    { name: 'court', label: 'Court', type: 'text' },
    { name: 'courtdate', label: 'Court Date', type: 'date' },
    { name: 'issuingofficer', label: 'Issuing Officer', type: 'text' },
    { name: 'rank', label: 'Rank', type: 'text' },
    { name: 'offenceplace', label: 'Place', type: 'text' },
    { name: 'dateoffence', label: 'Date of Offence', type: 'date' },
    { name: 'timenow', label: 'Time Now', type: 'time' },
   
    
    //vehicle class to drive
    
    //offence with total amount of fine
  ];
  const LisanceStatus = [
    { value: 'new', label: 'New Lisence' },
    { value: 'old', label: 'Old Lisence' },
   
   
  ]

  const NewClass = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'B1', label: 'B1' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'CE', label: 'CE' },
    { value: 'G', label: 'DG' },
    { value: 'J', label: 'J' },
  ]
  const OldClass = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'F', label: 'F' },
    { value: 'G', label: 'G' },
   
  ]

  const FineTypes = [
    { value: 'identificationplates', label: 'Identification Plates' },
    { value: 'notcarryingrl', label: 'Not Carrying R.L' },
    { value: 'drivingaspecialpurposevehicleswithoutalicense', label: 'Driving Special Purpose Vehicles without a license' },
    { value: 'nothavingalicensetodriveaspecificclassofvehicles', label: 'Not having a License to drive a specific class of vehicles' },
    { value: 'notcarryingdl', label: 'Not Carrying D.L' },
    { value: 'nothavinganinstructorslicense', label: 'Not having a instructors License' },
   
  ]

  const Dlocations = [
    { value: 'rajanganaya', label: 'Rajanganaya' },
    { value: 'galgamuwa', label: 'Galgamuwa' },
    { value: 'thalawa', label: 'talawa' },
    { value: 'nochchiyagama', label: 'Nochchiyagama' },
    { value: 'anuradhapura', label: 'Anuradhapura' },
    { value: 'saliyawewa', label: 'Saliyawewa' },
    
  ];

  const Plocations = [
    { value: 'rajanganaya', label: 'Rajanganaya' },
    { value: 'galgamuwa', label: 'Galgamuwa' },
    { value: 'thalawa', label: 'talawa' },
    { value: 'nochchiyagama', label: 'Nochchiyagama' },
    { value: 'anuradhapura', label: 'Anuradhapura' },
    { value: 'saliyawewa', label: 'Saliyawewa' },
    
  ];

  const Rlocations = [
    { value: 'rajanganaya', label: 'Rajanganaya' },
    { value: 'galgamuwa', label: 'Galgamuwa' },
    { value: 'thalawa', label: 'talawa' },
    { value: 'nochchiyagama', label: 'Nochchiyagama' },
    { value: 'anuradhapura', label: 'Anuradhapura' },
    { value: 'saliyawewa', label: 'Saliyawewa' },
    
  ];
  //vehicle registration department location
 
  const Vlocations = [
    { value: 'rajanganaya', label: 'Rajanganaya' },
    { value: 'galgamuwa', label: 'Galgamuwa' },
    { value: 'thalawa', label: 'talawa' },
    { value: 'nochchiyagama', label: 'Nochchiyagama' },
    { value: 'anuradhapura', label: 'Anuradhapura' },
    { value: 'saliyawewa', label: 'Saliyawewa' },
    
  ];
  //motor traffic depatment role
  const MTERole = [
    { value: 'dregistrationdepartment', label: 'Driver Registration' },
    { value: 'vregistrationdepartment', label: 'Vehicle Registration' },
   
  ];

  const PRole = [
    { value: 'police', label: 'Police Officer Registration' }, 
  ];

  const inputval = [
    { type:'text', name:'officeid', placeholder:'Office ID' },
    { type:'email', name:'email', placeholder:'Email' },
    { type:'password', name:'password', placeholder:'Password' },
  ]

  //Driverregistration
  const DriverFields = [
    {name:'fullname', label: 'Full Name', type: 'text'},
    { name: 'nic', label: 'NIC', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'phoneno', label: 'Phone number', type: 'number' },
    { name:'email',label:'email', type:'email' },
    { name: 'birthday', label: 'Birth Day', type: 'date' },
    { name: 'issuedate', label: 'Issue Date', type: 'date' },
    { name: 'expdate', label: 'Expire Date', type: 'date' },
    
  ];
  const Bloodtype = [
    { value: 'a+', label: 'A+' },
    { value: 'a-', label: 'A-' },
    { value: 'b+', label: 'B+' },
    { value: 'b-', label: 'B-' },
    { value: 'o+', label: 'O+' },
    { value: 'o-', label: 'O-' },
    { value: 'ab+', label: 'AB+' },
    { value: 'ab-', label: 'AB+' },
   
  ]

  //vehicleregistration
  const VehicleFields = [
    {name:'chassisno', label: 'Chassis No', type: 'text'},
    {name:'engineno', label: 'ENgine No', type: 'text'},
    {name:'seatingcapacity', label: 'Ceating Capacity', type: 'number'},
    { name: 'ownerfullname', label: 'Owner Full Name', type: 'text' },
    { name: 'nic', label: 'NIC', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'phoneno', label: 'Phone number', type: 'number' },
  ];

  const VehicleClass = [
    { value: 'motorcycle', label: 'Motor Cycle' },
    { value: 'threeweel', label: 'Three Weel' },
    { value: 'car', label: 'Car' },
    { value: 'jeep', label: 'Jeep' },
    { value: 'bus', label: 'Bus' },
    { value: 'trackter', label: 'Trackter' },
  ]
  
  const VehicleTaxationClass = [
    { value: 'motorcycle', label: 'Motor Cycle' },
    { value: 'threeweel', label: 'Three Weel' },
    { value: 'car', label: 'Car' },
    { value: 'jeep', label: 'Jeep' },
    { value: 'bus', label: 'Bus' },
    { value: 'trackter', label: 'Trackter' },
  ]
  const VehicleProvince = [
    { value: 'north', label: 'North Province' },
    { value: 'northcentr', label: 'North Center Province' },
    { value: 'western', label: 'Western Province' },
    { value: 'uva', label: 'Uva Province' },
    { value: 'south', label: 'South Province' },
    { value: 'sabaragamuwa', label: 'Sabaragamuwa Province' },
    { value: 'central', label: 'Central Province' },
    { value: 'eastern', label: 'Eastern Province' },
  ]
  const Vehicleorigincountry = [
    { value: 'srilanka', label: 'Sri Lanka' },
    { value: 'german', label: 'German' },
    { value: 'japan', label: 'Japan' },
    { value: 'india', label: 'India' },
    { value: 'america', label: 'America' },
    
  ]
  const VehicleColor = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'blue' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
   
  ]
  const VehicleCylinderCapacity = [
    { value: '120', label: '120 CC' },
    { value: '150', label: '150 CC' },
    { value: '230', label: '230 CC' },
    { value: '320', label: '320 CC' },
    { value: '450', label: '450 CC' },
    { value: '1000', label: '1000 CC' },
   
  ]
 
  const VehicleStatus = [
    { value: 'brandnew', label: 'Brand New' },
    { value: 'secondhand', label: 'Second Hand' },
   
  ]
  const VehicleFuelType = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'desol', label: 'Desol' },
   
  ]

  //vehicle model

  const BikeModel = [
    { value: 'platina', label: 'PLATINA' },
    { value: 'boxer', label: 'BOXER' },
    { value: 'discovry', label: 'DISCOVRY' },
    { value: 'hero', label: 'Hero' },
    { value: 'tvs', label: 'TVS' },
    { value: 'suzuki', label: 'suzuki' },
    { value: 'yamaha', label: 'Yamaha' },
  ]
  const weelModel = [
    { value: 'bajaj', label: 'BAJAJ' },
    { value: 'mahindra', label: 'MAHINDRA' },
    { value: 'atul', label: 'ATUL' },
    { value: 'aptera', label: 'APTERA' },
    { value: 'carver', label: 'CARVER' },
    { value: 'elio', label: 'ELIO' },
    { value: 'lohia', label: 'LOHIO' },
  ]

  const CarModel = [
    { value: 'benz', label: 'BENZ' },
    { value: 'bmw', label: 'BMW' },
    { value: 'toyota', label: 'TOYOTA' },
    { value: 'nissan', label: 'NISSAN' },
    { value: 'tesla', label: 'TESLA' },
    { value: 'fiat', label: 'FIAT' },
    { value: 'ford', label: 'FORD' },
  ]
  
  const JeepModel = [
    { value: 'wrangler', label: 'Wrangler' },
    { value: 'cherokee', label: 'cherokee' },
    { value: 'renegade', label: 'Renegade' },
    { value: 'cj', label: 'CJ' },
    { value: 'patriot', label: 'Patriot' },
    { value: 'liberty', label: 'Liberty' },
    { value: 'willysmb', label: 'Willys MB' },
  ]


  
  export {policeFields, VRDEmployeeFields, RRDEmployeeFields, Plocations, Vlocations, Dlocations, Rlocations 
    ,MTERole, PRole, inputval, VehicleFields,  VehicleClass, VehicleStatus, BikeModel,  VehicleColor
    ,VehicleProvince, VehicleCylinderCapacity, VehicleTaxationClass, VehicleFuelType, Vehicleorigincountry
    ,weelModel, CarModel ,JeepModel, DriverFields, Bloodtype, FineFields, LisanceStatus, NewClass, OldClass };