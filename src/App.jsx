/* eslint-disable */


import Form from "./form/Form";
import MultiStepForm from "./multistepForm/MultiStepForm";
import DynamicForm from "./fieldArray/DynamicForm";
import { FormProvider, useForm } from 'react-hook-form'

import "./App.css";

export default function App() {
  const methods = useForm()
  console.log('render');
  return (
    <div className="container">
      {/* <Form/> */}
      <DynamicForm/>
      
       {/* <FormProvider {...methods}>
        <MultiStepForm/>
      </FormProvider> */}
    </div>
  );
}
