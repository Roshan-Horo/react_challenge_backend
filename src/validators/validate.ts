import validate, { ValidationError } from 'jsonschema'
import {  CREATE_CHALLENGE, CREATE_USER} from '../utils/apiTypeConstants'

// Schema validators
import { createUserSchema, createChallengeSchema } from './requestSchema';

const Validator = validate.Validator;
let v = new Validator();

type reqType = {
  type: string,
  validateData: {}
}

type resultResType = {
  status: boolean,
  msg: string,
  error?: ValidationError[]
}

// check validation result and crete response object
function createResultObj(validationResult: validate.ValidatorResult): resultResType {
  if(validationResult.errors.length > 0){

    console.log(`Total ${validationResult.errors.length} Errors`)
  
    validationResult.errors?.map(( err, index) => {
      console.log(`Error ${index + 1} : ${err}`)
    })
  
    return {
      status: false,
      msg: 'Request Object Invalid',
      error: validationResult.errors
    };
  }else{
    return {
      status: true,
      msg: 'Request Object Validated successfully'
    };
  }
}


export const validateRequest = ({ type, validateData} : reqType): resultResType => {

  switch(type){

    case CREATE_USER: return createResultObj(v.validate(validateData, createUserSchema));

    case CREATE_CHALLENGE: return createResultObj(v.validate(validateData, createChallengeSchema));

    default: return {
      status: false,
      msg: 'Request Type Not Matched'
    }
  }

}