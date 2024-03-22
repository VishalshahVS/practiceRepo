import { useFormik } from 'formik';
import React, { useEffect } from 'react'


function PracticeForm() {


    // FORMIK STARTED
    const initialValues = {
        NoOfAttendees: 0,
        DateTime: { Date: '', Time: '' },
        InitialLocation: 'In Clinic',
        Attendees: [],
        flags: [
            { flag: true },
            { flag: true },
            { flag: true },
            { flag: true },
            { flag: true },
            { flag: true },
        ]
    }
    const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues
    });
    // FORMIK ENDED


    //ARRAY FOR MAP
    const AttendeesCount = [1, 2, 3, 4, 5, 6]


    //ONCHANGE HANDLERS STARTED
    const handleNumberOfAttendees = (e) => {
        setFieldValue(values.NoOfAttendees = Number(e.target.value))
        const AttendeesToPush = [];
        for (let i = 0; i < e.target.value; i++) {
            AttendeesToPush.push({
                location: true,
                IVDrip: [],
                VitaminShots: [],
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
        setFieldValue(values.Attendees[index].location = (!values.Attendees[index].location))
    }

    const showIVDripTherapy = (e, Attendee) => {
        setFieldValue(values.flags[Attendee - 1].flag = true)
    }

    const showVitaminShotsTherapy = (e, Attendee) => {
        setFieldValue(values.flags[Attendee - 1].flag = false)
    }
    //ON CHANGE HANDLERS ENDED


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
                                                <div className='serviceCategories '>
                                                    {

                                                        values.Attendees[index].location ?
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    name={"IV Drip Therapy" + values}
                                                                    onClick={(e) => showIVDripTherapy(e, Attendee)}
                                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                                    IV Drip Therapy
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    name={"Vitamin Shots" + values}
                                                                    onClick={(e) => showVitaminShotsTherapy(e, Attendee)}
                                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                                    Vitamin Shots
                                                                </button>
                                                            </>
                                                            :
                                                            ''
                                                    }
                                                    <div>
                                                        {
                                                            (values.Attendees[index].location && values.flags[index].flag) ?

                                                                <>
                                                                    {/* IV DRIP SERVICES */}
                                                                    <div className='serviceIVDrip flex gap-4 my-4'>
                                                                        <div class="flex items-center mb-4">
                                                                            <input
                                                                                type="checkbox"
                                                                                value=" MiniBoost GBP 85"
                                                                                onChange={(e)=> {console.log(e.target.value)}}
                                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            />
                                                                            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                MiniBoost GBP 85
                                                                            </label>
                                                                        </div>
                                                                        <div class="flex items-center mb-4">
                                                                            <input
                                                                                type="checkbox"
                                                                                value=" MiniBoost GBP 85"
                                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            />
                                                                            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                MiniBoost GBP 85
                                                                            </label>
                                                                        </div>
                                                                        <div class="flex items-center mb-4">
                                                                            <input
                                                                                type="checkbox"
                                                                                value=" MiniBoost GBP 85"
                                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            />
                                                                            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                MiniBoost GBP 85
                                                                            </label>
                                                                        </div>
                                                                        <div class="flex items-center mb-4">
                                                                            <input
                                                                                type="checkbox"
                                                                                value=" MiniBoost GBP 85"
                                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            />
                                                                            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                MiniBoost GBP 85
                                                                            </label>
                                                                        </div>
                                                                        <div class="flex items-center mb-4">
                                                                            <input
                                                                                type="checkbox"
                                                                                value=" MiniBoost GBP 85"
                                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            />
                                                                            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                MiniBoost GBP 85
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                values.Attendees[index].location ?
                                                                    <>
                                                                        {/* VITAMIN SERVICES */}
                                                                        <div className='serviceVitamin flex gap-4 my-4'>
                                                                            <div class="flex items-center mb-4">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value="SlimBoost GBP 85"
                                                                                    onChange={(e) => {console.log(e.target.value)}}
                                                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />
                                                                                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                    SlimBoost GBP 85
                                                                                </label>
                                                                            </div>
                                                                            <div class="flex items-center mb-4">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value="SlimBoost GBP 85"
                                                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />
                                                                                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                    SlimBoost GBP 85
                                                                                </label>
                                                                            </div>
                                                                            <div class="flex items-center mb-4">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value="SlimBoost GBP 85"
                                                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />
                                                                                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                    SlimBoost GBP 85
                                                                                </label>
                                                                            </div>
                                                                            <div class="flex items-center mb-4">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value="SlimBoost GBP 85"
                                                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />
                                                                                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                    SlimBoost GBP 85
                                                                                </label>
                                                                            </div>
                                                                            <div class="flex items-center mb-4">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value="SlimBoost GBP 85"
                                                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                />
                                                                                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                    SlimBoost GBP 85
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        })}


                                    </>



                                    {/* ENTER YOUR CONTACT DETAILS  */}
                                    <>
                                        <p className='text-xl font-semibold'> Enter your Contact Details </p>

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
                hi
            </div>
            {/* BOOKINGS DISPLAY ENDED*/}

        </div>

        /* MASTER DIV ENDED */


    )
}

export default PracticeForm