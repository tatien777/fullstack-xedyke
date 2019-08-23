const _ = require("lodash");
const validator = require("validator");
const { User } = require("../../Models/User");
/* email
khac rong  + valid + unique */

/* password 
> 8 + confirm passowrd === password */

/* DOb 
khac rong + valid(date)
*/

const validatePostInput = async data => {
  // data {email,pass,DOB..} lay tu params of api
  let errors = {};
  data.email = _.get(data, "email", ""); // ~ data.email ? data.email : ""
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.DOB = _.get(data,'DOB',"")
  data.userType = _.get(data,'userType',"")
  data.phone = _.get(data,'phone',"")
  //   console.log(data.email,'>>>')
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "Email exist";
  }
  // password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password has at least 8 characters";
  } else {
    if (validator.isEmpty(data.password2)) {
      errors.password2 = "ConFirm password is required";
    } else if (!validator.equals(data.password, data.password2)) {
      errors.password2 = "Confirm password must match";
    }
  }
  // DOB 
  if(_.isEmpty(data.DOB)){
      errors.date = "Date is required"
  }
  // UserType 
  if(_.isEmpty(data.userType)){
      errors.date = "User type is required"
  } else if (!validator.equals(data.userType,'driver') && !validator.equals(data.userType,"passenger") && !validator.equals(data.userType,"admin")){
      errors.userType = "User type is not valid "
  }
  // phone 
  if(_.isEmpty(data.phone)){
      errors.phone = "Phone is required"
  } else if (!validator.isLength(data.phone,{min:10,max:10})){
      errors.phone = "Phone is 10 numbers "
  }
  return {
    isValid: _.isEmpty(errors), // true {pass het tat ca validate },false (k pass it nhat 1 field)
    errors // {email: email da ton tai, password: phai it nhat 8 ky tu}
  };
};

module.exports = {
  validatePostInput
};
