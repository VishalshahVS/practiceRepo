import { useFormik, validateYupSchema } from 'formik';
import React, { useEffect, useState } from 'react'
import SignupValidation from '../schema/SignupValidation';


function Staging() {


    // FORMIK STARTED
    const initialValues = {
        obj: {
            innerObj: {
                names: [],
                numbers: []
            }
        }

    }
    const { values, handleSubmit, handleChange, setFieldValue, touched, errors } = useFormik({
        initialValues,
        validationSchema: SignupValidation,
        onSubmit: (value, action) => {
            console.log("submitted")
        }
    });
    // FORMIK ENDED


    const handleAdd = (e) => {
        values.obj.innerObj.names.push({ text: 'name1' })
    }

    console.log(errors, "Errors")
    console.log(values,"values")
    return (

        /* MASTER DIV STARTED */
        <div className='container flex border w-full h-[60%] mx-auto my-10'>


            {/* FORM STARTED */}
            <div className='container border w-[55%] ms-8'>
                <form onSubmit={handleSubmit} >

                    <input
                        type="text"
                        placeholder='Enter Name'

                    />
                    {
                        errors.obj?.innerObj?.names && touched.obj?.innerObj?.names ? <div>{errors.obj?.innerObj?.names}</div> : null
                    }

                    {/* <input
                        type="text"
                        placeholder='Enter Name'
                        className='mt-8'
                    /> */}
                    <br />
                    <button
                        type="button"
                        onClick={(e)=> handleAdd(e)}
                        className=" mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Add Data
                    </button>
                    <button
                        type="submit"
                        className=" mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Submit
                    </button>
                </form>
            </div>
            {/* FORM ENDED */}



        </div>

        /* MASTER DIV ENDED */


    )
}

export default Staging
