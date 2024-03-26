import { useFormik, validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react'


function PracticeForm() {
    
    
    // FORMIK STARTED
    const initialValues = {
        NoOfAttendees: 0,
        DateTime: { Date: '', Time: '' },
        InitialLocation: 'In Clinic',
        Attendees: [],
        flags: [
            { IVDrip: true, VitaminShots: false },
            { IVDrip: true, VitaminShots: false },
            { IVDrip: true, VitaminShots: false },
            { IVDrip: true, VitaminShots: false },
            { IVDrip: true, VitaminShots: false },
            { IVDrip: true, VitaminShots: false },
        ],
        personalDetails: [
            { name: '', email: '', contactNumber: '', DOB: '' },
            { name: '', DOB: '' },
            { name: '', DOB: '' },
            { name: '', DOB: '' },
            { name: '', DOB: '' },
            { name: '', DOB: '' },
        ]
        
        
    }
    const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues
    });
    // FORMIK ENDED
    
    //GBP Total
    const [totalGBP, setTotalGBP] = useState(0);

    //ARRAY FOR MAP
    const AttendeesCount = [1, 2, 3, 4, 5, 6]
    const AttendeesCountForContact = [1, 2, 3, 4, 5, 6]
    const AttendeesCountForBookings = [1, 2, 3, 4, 5, 6]



    //ONCHANGE HANDLERS STARTED
    const handleNumberOfAttendees = (e) => {
        setFieldValue(values.NoOfAttendees = Number(e.target.value))
        const AttendeesToPush = [];
        for (let i = 0; i < e.target.value; i++) {
            AttendeesToPush.push({
                location: true,
                service: {
                    IVDrip: [],
                    VitaminShots: []
                },
                Details: []
            })
        }
        setFieldValue(values.Attendees = AttendeesToPush)
    }

    const handleLocation = (e) => {
        setFieldValue(values.InitialLocation = e.target.value)

    }
    const handleDate = (e) => {
        setFieldValue(values.DateTime.Date = e.target.value)
    }
    const handleTime = (e) => {
        setFieldValue(values.DateTime.Time = e.target.value)
    }

    const handleCheck = (e, index) => {
        console.log(index,"&&&&&")
        setFieldValue(values.Attendees[index].location = (!values.Attendees[index].location))
        setFieldValue(values.Attendees.map((value) => value.service.IVDrip = []))
        setFieldValue(values.Attendees.map((value) => value.service.VitaminShots = []))
        
    }

    const showIVDripTherapy = (e, index) => {
        setFieldValue(values.flags[index].IVDrip = true)
        setFieldValue(values.flags[index].VitaminShots = false)
    }

    const showVitaminShotsTherapy = (e, index) => {
        setFieldValue(values.flags[index].VitaminShots = true)
        setFieldValue(values.flags[index].IVDrip = false)
    }



    const [checked, setChecked] = useState(false)
    const handleIVDrip = (e, index, items) => {
        const GBP = Number(...items.price.match(/\d+/g))
        setChecked(!checked)
        if (e.target.checked) {
            setFieldValue(values.Attendees[index].service.IVDrip.push({ service: items.service, price: items.price }))
           
        }
        else {
            setFieldValue(values.Attendees[index].service.IVDrip = values.Attendees[index].service?.IVDrip.filter((element) => element.service !== items.service))
        }
    }
    const handleVitaminShots = (e, index, items) => {
        const GBP = Number(items.price.slice(-2))
        if (e.target.checked) {
            setFieldValue(values.Attendees[index].service.VitaminShots.push({ service: items.service, price: items.price }))
        }
        else {
            setFieldValue(values.Attendees[index].service.VitaminShots = values.Attendees[index].service?.VitaminShots.filter((element) => element.service !== items.service))
        }
    }

    //ON CHANGE HANDLERS ENDED


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



    //REMOVE SERVICES---- HERE INDEX SPECIFIES ATTENDEE   
    const removeIVDrip = (e, i, index, items) => {
        const GBP = Number(...items.price.match(/\d+/g))
        setTotalGBP(totalGBP - GBP)
        setFieldValue(values.Attendees[index].service.IVDrip = values.Attendees[index].service.IVDrip.filter((i) => i !== items))
    }
    const removeVitaminShot = (e, i, index, items) => {
        setFieldValue(values.Attendees[index].service.VitaminShots = values.Attendees[index].service.VitaminShots.filter((j) => j !== items))
    }

    //CALCULATE GBP
    const calculateGBP = () =>{
    
        const IVDrip = [];
        const VitaminShots = [];

        values.Attendees.map( (attendee) =>  attendee.service.IVDrip.map((items)=> IVDrip.push(Number(...items.price.match(/\d+/g)))) )
        values.Attendees.map( (attendee) =>  attendee.service.VitaminShots.map((items)=> VitaminShots.push(Number (...items.price.match(/\d+/g)))) )
        
        
            
            var totalGBPOfIVDrip = IVDrip.reduce((firstElem,secondElem) => {
                return firstElem + secondElem
            },0);
    
            var totalGBPOfVitaminDrip = VitaminShots.reduce((firstElem,secondElem) => {
                return firstElem + secondElem
            },0)

            setTotalGBP(totalGBPOfIVDrip + totalGBPOfVitaminDrip)
    }
    useEffect(()=>{
    
            const IVDrip = [];
            const VitaminShots = [];
    
            values.Attendees.map( (attendee) =>  attendee.service.IVDrip.map((items)=> IVDrip.push(Number(...items.price.match(/\d+/g)))) )
            values.Attendees.map( (attendee) =>  attendee.service.VitaminShots.map((items)=> VitaminShots.push(Number (...items.price.match(/\d+/g)))) )
            
            
                
                var totalGBPOfIVDrip = IVDrip.reduce((firstElem,secondElem) => {
                    return firstElem + secondElem
                },0);
        
                var totalGBPOfVitaminDrip = VitaminShots.reduce((firstElem,secondElem) => {
                    return firstElem + secondElem
                },0)
    
                setTotalGBP(totalGBPOfIVDrip + totalGBPOfVitaminDrip)
    
        
    })


    console.log(values)
    return (

        /* MASTER DIV STARTED */
        <div className='container flex border w-full h-[60%] mx-auto my-10'>


            {/* FORM STARTED */}
            <div className='container border w-[55%] ms-8'>
                <form onSubmit={handleSubmit} >

                    {/* NO.OF ATTENDEES */}
                    <>
                        <div className='NoOfAttendees mb-4'>
                            <h1 className='font-Bold text-2xl'>No. of Attendees</h1>
                        </div>

                        <div className='flex gap-2'>
                            {
                                AttendeesCount.map((values, index) => {
                                    return <div className='radioButtonGroup' key={index}>

                                        {index + 1}
                                        <input
                                            type="radio"
                                            name="NoOfAttendees"
                                            value={index + 1}
                                            // onChange={(e) => handleNumberOfAttendees(e)}
                                            onChange={(e) => handleNumberOfAttendees(e)}
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        />
                                    </div>
                                })
                            }
                        </div>
                    </>

                    {/* INITIAL LOCATION */}
                    <>
                        <div className=' mt-8 mb-2'>
                            <h1 className='font-Bold text-2xl'> In Clinic or at Home</h1>
                        </div>

                        <div className='location '>
                            <div className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    value='In Clinic'
                                    onChange={(e) => handleLocation(e)}
                                    name="InitialLocation"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="InitialLocation" className="ms-2 text-sm font-semibold text-xl text-gray-900 dark:text-gray-300">In Clinic</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio"
                                    value='At Home'
                                    onChange={(e) => handleLocation(e)}
                                    name="InitialLocation"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="InitialLocation" className="ms-2 text-sm font-semibold text-xl text-gray-900 dark:text-gray-300">At Home</label>
                            </div>
                        </div>
                    </>

                    {/* DATE AND TIME */}
                    <>
                        <div className=' mt-8 mb-2'>
                            <h1 className='font-Bold text-2xl'>Date and Time</h1>
                        </div>

                        <div className='dateTime flex gap-8'>
                            <input
                                type="date"
                                name="DateTime"
                                onChange={(e) => handleDate(e)}
                            />
                            <input
                                type="time"
                                name="DateTime"
                                onChange={(e) => handleTime(e)} />

                        </div>
                    </>

                    <>
                        {

                            values.NoOfAttendees > 0 ?
                                <div>
                                    {/* SELECT YOUR SERVICES  */}
                                    <>

                                        <h1 className='text-2xl mt-8 mb-4'>Select Your Services</h1>

                                        {AttendeesCount.splice(0, values.NoOfAttendees).map((Attendee, index) => {
                                            return <div className='container border mb-8'>

                                                {/* NAME OF ATTENDEE */}
                                                <h1 className='text-semibold font-xl'>Attendee {Attendee}</h1>
                                                <label class="inline-flex items-center mb-5 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="check"
                                                        defaultChecked
                                                        onChange={(e) => handleCheck(e, index)}
                                                        className="sr-only peer"
                                                    />
                                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{values.InitialLocation}</span>
                                                </label>

                                                {/* CATEGORY OF SERVICE */}
                                                {

                                                    values.Attendees[index].location ?
                                                        <div className='serviceCategories '>

                                                            <button
                                                                type="button"
                                                                name={"IV Drip Therapy" + values}
                                                                onClick={(e) => showIVDripTherapy(e, index)}
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                                IV Drip Therapy
                                                            </button>
                                                            <button
                                                                type="button"
                                                                name={"Vitamin Shots" + values}
                                                                onClick={(e) => showVitaminShotsTherapy(e, index)}
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                                Vitamin Shots
                                                            </button>


                                                            <div>


                                                                <div className='serviceIVDrip flex gap-4 my-4'>
                                                                    {
                                                                        services[0].IVDrip.map((items) => {
                                                                            return <div className="flex items-center mb-4" >

                                                                                <input
                                                                                    type="checkbox"
                                                                                    value={items.service + items.price}
                                                                                    onChange={(e) => handleIVDrip(e, index, items)}
                                                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />
                                                                                <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                    {items.service + items.price}
                                                                                </label>

                                                                            </div>
                                                                        })

                                                                    }
                                                                </div>



                                                                <div className='serviceVitamin flex gap-4 my-4'>
                                                                    {

                                                                        services[1].VitaminShots.map((items, i) => {
                                                                            return <div className="flex items-center mb-4"  >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value={items.service + items.price}
                                                                                    onChange={(e) => handleVitaminShots(e, index, items)}
                                                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />
                                                                                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                    {items.service + items.price}
                                                                                </label>
                                                                            </div>
                                                                        })
                                                                    }

                                                                </div>


                                                            </div>

                                                        </div>
                                                        :
                                                        ''
                                                }
                                            </div>
                                        })}


                                    </>



                                    {/* ENTER YOUR CONTACT DETAILS  */}
                                    <>
                                        <p className='text-xl font-semibold my-8'> Enter your Contact Details </p>
                                        {
                                            AttendeesCountForContact.splice(0, values.NoOfAttendees).map((Attendee, index) => {
                                                return <div className='contactDetails p-8'>
                                                    <h1 className='text-semibold font-xl'>Attendee {Attendee}</h1>
                                                    <input
                                                        type='text'
                                                        name={`personalDetails[${index}].name`}
                                                        value={values.personalDetails[index].name}
                                                        placeholder='Enter Name'
                                                        onChange={handleChange}
                                                    />
                                                    <br />
                                                    {
                                                        index < 1 ?
                                                            <>
                                                                <input
                                                                    type='email'
                                                                    name={`personalDetails[${index}].email`}
                                                                    value={values.personalDetails[index].email}
                                                                    onChange={handleChange}
                                                                    placeholder='Enter Email'

                                                                />
                                                                <br />
                                                                <input
                                                                    type='tel'
                                                                    name={`personalDetails[${index}].contactNumber`}
                                                                    value={values.personalDetails[index].contactNumber}
                                                                    placeholder='Enter Contact Number'
                                                                    onChange={handleChange}
                                                                />
                                                                <br />
                                                            </>
                                                            :
                                                            ''
                                                    }
                                                    <input
                                                        type='date'
                                                        name={`personalDetails[${index}].DOB`}
                                                        value={values.personalDetails[index].DOB}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            })
                                        }
                                    </>
                                </div>
                                :
                                ''
                        }
                    </>

                    {/* ANY COMMENTS          */}
                    <textarea value="Add Your Comments here" rows={10} cols={30} className='w-[40%] my-8' />
                </form>
            </div>
            {/* FORM ENDED */}



            {/* BOOKINGS DISPLAY STARTED*/}
            <div className='border mx-8 w-[35%]'>
                {
                    AttendeesCountForBookings.splice(0, values.NoOfAttendees).map((value, index) => {
                        return <>
                            {
                                values.Attendees[index].location ?
                                    <div>
                                        <p className='text-xl font-medium'>Attendee {value}</p>
                                        <div className='services'>
                                            {
                                                values.Attendees[index].service.IVDrip.map((items, i) =>
                                                    <>
                                                        <div className='text-medium font-medium flex justify-between '>
                                                            <p>{items.service}</p>
                                                            <p>{items.price}</p>
                                                        </div>
                                                        <div
                                                            className='flex underline cursor-pointer justify-items-end'
                                                            onClick={(e) => removeIVDrip(e, i, index, items)}>
                                                            Remove
                                                        </div>
                                                    </>
                                                )
                                            }
                                            {
                                                values.Attendees[index].service.VitaminShots.map((items, i) =>
                                                    <>
                                                        <div className='text-medium font-medium flex justify-between '>
                                                            <p>{items.service}</p>
                                                            <p>{items.price}</p>
                                                        </div>
                                                        <div
                                                            className='underline cursor-pointer'
                                                            onClick={(e) => removeVitaminShot(e, i, index, items)}>
                                                            Remove
                                                        </div>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>

                                    :
                                    ''
                            }
                        </>
                    })
                }
                {
                    totalGBP > 0 ?
                    <div className='flex justify-between'>
                        <p className='text-lg font-semibold mt-8'>Total </p>
                        <p className='text-lg font-semibold mt-8'>GBP {totalGBP}</p>
                    </div>
                    :
                    ''
                }
            </div>
            {/* BOOKINGS DISPLAY ENDED*/}

        </div>

        /* MASTER DIV ENDED */


    )
}

export default PracticeForm