import React from 'react'
import { useFormik } from 'formik';
function FirstComponent() {




    const calculateDuration = () => {
        /* const date1 = new Date('01/01/2024')
        const date2 = new Date('01/03/2024')
        const ms = date2.getTime() - date1.getTime()
        const hour = 1000 * 60 * 60
        const min = 1000 * 60
        const sec = 1000
        console.log("Hour: ", (ms / hour))
        console.log("Minute: ", (ms / min))
        console.log("Minute: ", (ms / sec)) */
    }


    const initialValues = {
        startTIme:'',
        endTime:''
    }
    const { values, } = useFormik({
        initialValues,

    })
    return (
        <>
            <p className='text-4xl font-semiBold text-center my-2'>
                Calculate Duration
            </p>

            <div className='container  w-[60%] mx-auto my-6'>
                <input
                    type='date'
                     />
                <br />
                <div>
                    <input type='date' />
                </div>
                <br />
                <div>

                </div>

                <br /><br />
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={calculateDuration}
                >
                    Calculate Duration
                </button>
            </div>
        </>

    )
}

export default FirstComponent