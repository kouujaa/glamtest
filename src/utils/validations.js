import * as Yup from 'yup'
// import moment from 'moment'
/* tslint:disable */
const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
/* tslint:enable */
// eslint-disable-next-line
var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
// eslint-disable-line

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})

export const LandingPageSchema = Yup.object().shape({
  email: Yup.string().email('Required').required('Required')
})

export const userSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Required')
    .required('Required'),
  userName: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  // hairType: Yup.string().required('Required'),
  // lashTech: Yup.string().required('Required'),
  // preferredHairStyle: Yup.string().required('Required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required')
})

export const stylistSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Required')
    .required('Required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  salonName: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  salonAddress: Yup.string().required('Required'),
  instagramName: Yup.string().required('Required'),
  //FreeLancer: Yup.string().required('Required'),
  facebookName: Yup.string().optional(),
  website: Yup.string()
    .matches(expression, 'Web Url should be valid')
    .optional(),
  //pricePoints: Yup.string().required('Required'),
  startTime: Yup.string().required('Required'),
  endTime: Yup.string().required('Required'),
  businessType: Yup.string().required('Required'),
  //hairstyleServices: Yup.string().required('Required'),
  //makeupArtist: Yup.string().required('Required'),
  //nailTech: Yup.string().required('Required'),
  //hairType: Yup.string().required('Required'),
  //lashTech: Yup.string().required('Required'),
  userName: Yup.string().required('Required'),
})

export const adminSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Required')
    .required('Required'),
  userName: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required')
})

export const HairStylistSchema = Yup.object().shape({
  // image: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  subtitle: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
})

export const MakeupArtistSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  subtitle: Yup.string().required('Required'),
  description: Yup.string().required('Required')
})

export const NailTechSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  subtitle: Yup.string().required('Required'),
  description: Yup.string().required('Required')
})

export const HairTypeSchema = Yup.object().shape({
  // image: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  subtitle: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
})

export const LashTechSchema = Yup.object().shape({
  // image: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  subtitle: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
})

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Required')
    .required('Required')
})

export const EditUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Required')
    .required('Required'),
  userName: Yup.string().required('Required'),
  hairType: Yup.string().required('Required'),
  preferredHairStyle: Yup.string().required('Required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required')
})

export const EditStylistSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Required')
    .required('Required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  salonName: Yup.string().required('Required'),
  salonAddress: Yup.string().required('Required'),
  instagramName: Yup.string().required('Required'),
  facebookName: Yup.string().optional(),
  website: Yup.string()
    .matches(expression, 'Web Url should be valid')
    .optional(),
  //pricePoints: Yup.string().required('Required'),
  //startTime: Yup.string().required('Required'),
  //endTime: Yup.string().required('Required'),
  // mondayStartTime: Yup.string().required('Required'),
  // mondayEndTime: Yup.string().required('Required'),
  // tuesdayStartTime: Yup.string().required('Required'),
  // tuesdayEndTime: Yup.string().required('Required'),
  // wednesdayStartTime: Yup.string().required('Required'),
  // wednesdayEndTime: Yup.string().required('Required'),
  // thursdayStartTime: Yup.string().required('Required'),
  // thursdayEndTime: Yup.string().required('Required'),
  // fridayStartTime: Yup.string().required('Required'),
  // fridayEndTime: Yup.string().required('Required'),
  // saturdayStartTime: Yup.string().required('Required'),
  // saturdayEndTime: Yup.string().required('Required'),
  // sundayStartTime: Yup.string().required('Required'),
  // sundayEndTime: Yup.string().required('Required'),
  hairstyleServices: Yup.string().required('Required'),
  hairType: Yup.string().required('Required'),
  userName: Yup.string().required('Required'),
})

export const SalonServiceSchema = Yup.object().shape({
  serviceName: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
})