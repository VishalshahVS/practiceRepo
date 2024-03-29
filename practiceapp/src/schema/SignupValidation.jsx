import * as Yup from 'yup';

const SignupValidation = Yup.object().shape({
  /*  firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'), */



  obj:Yup.object().shape({
      innerObj:Yup.object().shape({
          names:Yup.array()
            .when('numbers',{
            is:(numbers) => !numbers || numbers.length < 1,
            then: () => Yup.array().min(1,"Required").required("Required")
          }),
          numbers:Yup.array()
            .when('names',{
            is:(names) => !names || names.length < 1,
            then:() => Yup.array().min(1,"Required").required("Required")
          })         
      },['names','numbers'])
  })

})

  /*       Yup.object().shape({                                                                                 
    'email': Yup.string()                                                                        
                .when('mobile', {                                                    
                is: (mobile) => !mobile || mobile.length === 0,                      
                then: Yup.string()                                                   
                .required('At least one of the fields is required'),                 
                            }),                                                                  
    'mobile': Yup.string()                                                                       
                .when('email', {                                                     
                is: (email) => !email || email.length === 0,                         
                then: Yup.string()
                .required('At least one of the fields is required')
                })                                                                   
}, ['email', 'mobile'])  */





/*   'names': Yup.string()
    .when('numbers', {
      is: (numbers) => !numbers || numbers.length === 0,
      then:()=> Yup.string().required("Required"),

    }),
  'numbers': Yup.string()
    .when('names', {
      is: (names) => !names || names.length === 0,
      then:()=> Yup.string().required("Required"),
    })
}, ['names', 'numbers']) */


export default SignupValidation