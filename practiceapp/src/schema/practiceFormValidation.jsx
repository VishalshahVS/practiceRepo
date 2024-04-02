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

      personalDetails: Yup.object().shape({
        DOB:Yup.date().required("Required"),
        name:Yup.string().required("Required"),
        email:Yup.string().test("email-validation","Required",(value,ctx) => {
          // console.log(ctx,"ctx",ctx.from[0].value?.hasOwnProperty('email'),)
          if(ctx.from[0].value?.hasOwnProperty('email') ) return  value?.length > 0
          else return true
        }),


        contactNumber:Yup.string().test("email-validation","Required",(value,ctx) => {
          // console.log(ctx,"ctx")
          if(ctx.from[0].value?.hasOwnProperty('contactNumber')) return   value?.length > 0
          else return true
        })
      

      })

      

    }),

  ),
  

  

});


 







export default PracticeFormValidation