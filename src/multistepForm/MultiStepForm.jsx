/* eslint-disable */
import './multiStepForm.css'
import {useFormContext} from "react-hook-form";
import { useState } from "react";
import isValidEmail from '../utilities/emailHelpers';


const GenerateFirstForm = ({submitData, setStep, step}) => {
  const {register, handleSubmit, formState: {errors, isValid}, watch} = useFormContext();
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <h4>First Form</h4>
      <input {...register('username', {required: true, minLength: 5})}/>
      {errors.username && <span>Username must be more than 5 characters</span>}
      <input {...register('fullname', {required: true, minLength: 5})}/>
      {errors.fullname && <span>Fullname must be more than 5 characters</span>}
      <GenerateButtonPrevNext isValid={isValid} setStep={setStep} step={step}/>
    </form>
  )
}


const GenerateSecondForm = ({submitData, setStep, step}) => {
  const {register, handleSubmit, formState: {errors, isValid}} = useFormContext()
  return (
    <form  onSubmit={handleSubmit(submitData)}>
      <h4>Second From</h4>
      <input {...register('password', {required: true, minLength: 5})}/>
      {errors.password && <span>Password must be more than 5 characters</span>}
      <GenerateButtonPrevNext isValid={isValid} setStep={setStep} step={step}/>
    </form>
  )
}

const GenerateThirdForm = ({submitData, setStep, step}) => {
  const {register, handleSubmit, formState: {errors, isValid}} = useFormContext();
  const handleEmailValidation = email => {

    const isValid = isValidEmail(email);

    const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log(isValid ? "Valid" : "Invalid");
    }

    return isValid;
  };

  return (
    <form  onSubmit={handleSubmit(submitData)}>
      <h4>Third Form</h4>
      <input type="string" {...register('email', {required: true, validate: handleEmailValidation})}/>
      {errors.email && <span>Email Error</span>}
      <GenerateButtonPrevNext isValid={isValid} setStep={setStep} step={step}/>
    </form>
  )
}

const GenerateForthForm = ({submitData, setStep, step}) => {
  const {register, handleSubmit, formState: {errors, isValid}, reset} = useFormContext()
  return (
    <form  onSubmit={handleSubmit(submitData)}>
      <h4>Fourth Form</h4>
      <input type="number" {...register('age', {required: true, min: 10})}/>
      {errors.age && <span>Age must be higher than 10</span>}
      <p style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => reset(() => [alert('success reset inputs'), setStep(1)])}>Reset</p>
      <GenerateButtonPrevNext isValid={isValid} setStep={setStep} step={step}/>
    </form>
  )
}

const GenerateButtonPrevNext = ({ setStep, step, isValid }) => {

  const handlePrevNext = (type, setStep, step, isValid) => {
    if (type === 'next' && step < 4 && isValid) {
      setStep((prevPage) => prevPage + 1)
    }
  
    if (type === 'prev' && step > 1) {
      setStep((prevPage) => prevPage - 1)
    }
  }
  return (
    <div style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
      <button type="button" onClick={() =>handlePrevNext('prev', setStep, step, isValid)}>Prev</button>
      <button type='submit' onClick={() =>handlePrevNext('next', setStep, step, isValid)}>{step !== 4 ? 'Next' : 'Submit'}</button>
    </div>
  )
}

const GenerateForm = ({setData, setStep, step}) => { // eslint-disable-line
  const submitData = (data) => setData(data);
  switch (step) {
    case 1:
      return <GenerateFirstForm submitData={submitData} setStep={setStep} step={step}/>
    case 2:
      return <GenerateSecondForm submitData={submitData} setStep={setStep} step={step}/>
    case 3:
      return <GenerateThirdForm submitData={submitData} setStep={setStep} step={step}/>
    case 4:
      return <GenerateForthForm submitData={submitData} setStep={setStep} step={step}/>
    default:
      break;
  }
}

const MultiStepForm = () => {
  const [data, setData] = useState()
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Multipage form</h2>
        <GenerateForm setData={setData} step={step} setStep={setStep}/>
        <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default MultiStepForm