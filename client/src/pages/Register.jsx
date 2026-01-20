import React from 'react'
import { useState } from 'react'

export const Register = () => {
  const [formData, setFormData] = useState({
    name:"",
    phone:"",
    time:"",
    role:""
  });

  return (
    <>

    <h1>Register as Patient</h1>
    <div>
      <div>
    <label>Full Name </label>
    <input type='text'/>
      </div>
      <div>

    <label for='phone'>Phone </label>
    <input type='number' id='phone' maxLength="15"/>
      </div>
      <div>
    <label for='time'>Time </label>
<select id="time" name="time">
  <option value="6-9AM">6-9AM</option>
  <option value="9AM-12PM">9AM-12PM</option>
  <option value="12-3PM">12-3PM</option>
  <option value="3-6PM">3-6PM</option>
  <option value="6-9PM">6-9PM</option>
  <option value="9PM-12AM">9PM-12AM</option>
  <option value="12AM-3AM">12AM-3AM</option>
  <option value="3-6AM">3-6AM</option>

</select>
      </div>  
      <div>
    <label>Date </label>
    <input type='date'/>
      </div>
        <div>
    <label>Register as </label>
    <input type='radio' id='doctor' name='register_as' value={'doctor'}/>
    <label for='doctor'>
      Doctor
    </label>
     <input type='radio' id='patient' name='register_as' value={'patient'}/>
    <label for='patient'>
      Patient
    </label>
      </div>
    </div>
    </>
  )
}
