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
        Date:Yup.string().required('Required')
  });

  export default PracticeFormValidation