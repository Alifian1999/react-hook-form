/* eslint-disable */
import './form.css'
import {useForm} from 'react-hook-form'
import { useEffect, useState } from 'react'

const Form = () => {
  const [state, setState] = useState(undefined)

  const {register, handleSubmit, formState: {errors}, watch, reset, resetField, getValues} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: {
      username: '',
      password: '',
      pet: ''
    }
  })

  const handleReset = () => {
    // reset();
    resetField('username')
  }

  const onClickSubmit = (data) => {
    setState(data)
    console.log(data)
  };
  
  console.log('getValues', getValues());
  return (
    <div>
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit(onClickSubmit)} className='form-container'>
        <div>
          <input type='text' placeholder='username' {...register('username', {required: {value: true, message: 'Input fields username harus di isi'}})}/>
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <input placeholder='password' {...register('password', {required: {value: true, message: 'Input ini harus di isi'}})}/>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <select placeholder='please select' {...register('pet', {required: {value: true, message: 'pet select tidak boleh kosong'}})}>
            <option value="" hidden>Please Select...</option>
            {optionsData.map((val) =>
              <option key={val} value={val}>{val}</option>
            )}
          </select>
          {errors.pet && <span>{errors.pet.message}</span>}
        </div>

        <div className='container-button'>
          <p onClick={handleReset}>Reset Fields</p>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>

      <div>{JSON.stringify(state)}</div>
    </div>
  )
}

const optionsData = [
  'cat', 'dog', 'lion'
]

export default Form