/* eslint-disable */

import './dynamicForm.css'
import { useState, useEffect } from 'react'
import {useForm, useFieldArray} from 'react-hook-form'


const DynamicForm = () => {
  const [state, setState] = useState(undefined)

  const {register, handleSubmit, formState: {errors}, watch, reset, resetField, control} = useForm({
    mode: 'onSubmit',
    shouldFocusError: true,
    reValidateMode: 'onChange',
    defaultValues: {
      dynamicForm: [{name: '', amount: '', age: 0}]
    }
  })

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'dynamicForm'
  })


  // console.log('getValue', getValues());
  // console.log(watch('username'));
  // const {register, handleSubmit, formState: {errors}} = useForm({
  //   mode: 'onChange',
  //   shouldFocusError: true,
  //   reValidateMode: 'onSubmit'
  // })

  

  const handleRemove = (index) => {
    remove(index)
  }

  const handleReset = () => {
    console.log('testt');
    reset({dynamicForm: [{amount: 0, name: ''}]});
    // resetField('username')
  }

  const onClickSubmit = (data) => {
    setState(data)
    console.log(data)
  };
  
  return (
    <div>
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit(onClickSubmit)} className='form-container'>
        {fields.map((item, index) => (
          <section key={item.id}>
            <div>
              <input type='text'  {...register(`dynamicForm.${index}.name`)} />
              <input type='number' {...register(`dynamicForm.${index}.amount`)}/>
              <input type='number' {...register(`dynamicForm.${index}.age`)}/>
            </div>
            <button type='button' onClick={() => handleRemove(index)}>Remove</button>
          </section>
        ))}
        <button type="button" onClick={() => append({ name: "bill",amount: 10, age: 1 })}>
          append
        </button>
        <input type='button' value='reset fields' onClick={handleReset}/>
        <input type="submit" />
      </form>
      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

const optionsData = [
  'cat', 'dog', 'lion'
]

export default DynamicForm