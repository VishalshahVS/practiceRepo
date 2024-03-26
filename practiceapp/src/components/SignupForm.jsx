import React, { useState } from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  const {values,handlechange,setFieldValue} = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      checkBoxData: [
        { checkBox: '' },
        { checkBox: '' },
        { checkBox: '' },
        { checkBox: '' },
      ],
      flags: [
        {IVDrip:false},
        {VitaminShots:false},
      ]
      
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  //SERVICES DATA
  const services = [
    {
      IVDrip: [
        { service: 'Miniboost ', price: 'GBP 85' },
        { service: 'Hydromax ', price: 'GBP 109' },
        { service: 'Ultraviv ', price: 'GBP 149' },
        { service: 'Megaboost ', price: ' GBP 209' },
        { service: 'Vitaglow ', price: ' GBP 209' },
        { service: 'Royal Flush ', price: ' GBP 359' },
        { service: 'HELIIX ', price: 'GBP 699' },
      ]
    },
    {
      VitaminShots: [
        { service: 'B12 Family ', price: 'GBP 35' },
        { service: 'Slimboost ', price: 'GBP 45' },
        { service: 'Biotin ', price: 'GBP 49' },
        { service: 'CoQ10+ ', price: 'GBP 55' },
      ]
    }
  ]

  const [flagIvDrip, setFlagIvDrip] = useState(true)
  const [flagVitaminShots, setflagVitaminShots] = useState(false)

  const handleIVDrip = () => {
    setFlagIvDrip(true)
    setflagVitaminShots(false)
  }
  
  const handleVitaminShots = () => {
    setflagVitaminShots(true)
    setFlagIvDrip(false)
  }

  

  const handleFirstName = (e) =>{
    console.log("Fname :",e.target.value , "Status:",e.target.checked )
    setFieldValue(values.firstName = e.target.value)
    setFieldValue(values.flags[0].IVDrip = true)
    
  }
  const handleLastName = (e) =>{
    console.log("Lname :",e.target.value , "Status:",e.target.checked )  
    setFieldValue(values.lastName = e.target.value)
    setFieldValue(values.flags[1].VitaminShots = true)

  }
/* 
  const flags = [
    {IVDrip:false},
    {VitaminShots:false},
  ] */
  return (
    <form >
      <div className='flex gap-4 justify-center align-center '>
        <div
          className='cursor:pointer'
          onClick={handleIVDrip}
        >
          IVDrip
        </div>
        <div
          className='cursor:pointer'
          onClick={handleVitaminShots}>
          VitaminShots
        </div>
      </div>
      <div className='flex justify-center align-center'>
        {
          flagIvDrip ?
           
          <>
              First Name:
              <input 
                type="checkbox" 
                name="firstName" 
                defaultChecked={values.flags[0].IVDrip}
                id="fname"
                value="Vishal "
                onChange={(e) => handleFirstName(e) }/>
          </>
          :
          ''
        }
        
        {
          flagVitaminShots ?

          <>
          Last Name:
          <input 
            type="checkbox" 
            name="lastName" 
            defaultChecked= {values.flags[1].VitaminShots}
            id="lname"
            value="Shah"
            onChange={(e) => handleLastName(e)}/>
      </>
      :
      ''
        }
      </div>
    </form>
  );
};

export default SignupForm