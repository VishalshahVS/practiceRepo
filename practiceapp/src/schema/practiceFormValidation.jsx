import * as Yup from 'yup';

const PracticeFormValidation = Yup.object().shape({
  /*     firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'), */

  // NoOfAttendees:Yup.string().required('Required'),
  // Date:Yup.date().required('Required'),


  //NO-OF-ATTENDEES , INITIAL-LOCATION , DATE-TIME STARTED
  NoOfAttendees: Yup.string().required('Required'),
  InitialLocation: Yup.string().required('Required'),
  DateTime: Yup.object().shape({
    Date: Yup.date().required('Required'),
    Time: Yup.string().required('Required')
  }),
  //NO-OF-ATTENDEES , INITIAL-LOCATION , DATE-TIME ENDED

  //SERVICES STARTED
  Attendees: Yup.array().of(
    Yup.object().shape({

      service: Yup.object().shape({

        'IVDrip': Yup.array()
          .when('VitaminShots', {
            is: (VitaminShots) => !VitaminShots || VitaminShots.length < 1,
            then: () => Yup.array().min(1, "Required").required(),
            otherwise: () => Yup.array().notRequired()
          }),
        'VitaminShots': Yup.array()
          .when('IVDrip', {
            is: (IVDrip) => !IVDrip || IVDrip.length < 1,
            then: () => Yup.array().min(1, "Required").required(),
            otherwise: () => Yup.array().notRequired()
          }),

      }, ['IVDrip', 'VitaminShots']),


      //not working
      /* personalDetails: Yup.object().shape({

        contactNumber:Yup.string()
            .when('contactNumber',{
            is: (exists) => !!exists,
            then:() => Yup.string().required()
        })

        }, ['contactNumber','contactNumber']), */

      //

      personalDetails: Yup.object().shape({
        contactNumber: Yup.string().test('field-exists', 'Field does not exist in the array', function(value) {
          const array1 = ['value1', 'value2', 'value3']; // Your first array
          const array2 = ['value2', 'value4', 'value6']; // Your second array
      
          // Check if value exists in array1 but not in array2
          if (array1.includes(value) && !array2.includes(value)) {
            return true; // Field exists in array1 and not in array2
          }
      
          return false; // Field does not meet the condition
        }),
        contactNumber: Yup.number().when('$exists', {
          is: (val) => val !== '' && val !== null,
          then: () => Yup.string().required(),
          otherwise: () => Yup.string().nullable(true),
        }),
      }),
      /* personalDetails: Yup.object().shape({
        contactNumber: Yup.string().when('$exists', {
          is:(exist) => !!exist, // Condition for applying the validation
          then: ()=> Yup.string().required('Contact number is required'),
          otherwise:()=> Yup.string(),
        }),
      }, ['contactNumber','contactNumber']), */

    }),

  ),
  //SERVICES ENDED


  //CONTACT-DETAILS STARTED 



  //CONTACT-DETAILS ENDED



});



export default PracticeFormValidation