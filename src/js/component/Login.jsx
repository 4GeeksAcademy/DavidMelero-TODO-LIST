import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkedMe, setCheckedMe] = useState(false);
  const [select, setSelect] = useState('')

  const handleEmail = (element) => {
    setEmail(element.target.value.trim())
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleCheckedMe = element => setCheckedMe(element.target.checked)

  const handleCancel = () => {
    setEmail('')
    setPassword('')
    setCheckedMe(false)
    setSelect('')
  }

  const handelSubmit = (e) => {
    e.preventDefault()

    const dataToSend = {
      correo: email,
      contraseña: password,
      terminos: checkedMe,
      options : select
    }
    console.log(dataToSend);
    handleCancel()
    console.log(dataToSend);

  }

  return (
    <div>
      <form>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmail} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePassword} />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={checkedMe} onChange={handleCheckedMe} />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>

        <select className="form-select form-select-sm" aria-label="Small select example" value={select} onChange={(element) =>  setSelect(element.target.value)}>
          <option defaultValue>Select One</option>
          <option value="1">Teacher</option>
          <option value="2">Father</option>
          <option value="3">Sister</option>
        </select>

        <button type="submit" className="btn btn-primary mt-2" onClick={handelSubmit}>Submit</button>
        <button type="submit" className="btn btn-danger ms-3 mt-2" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}




































































// import React, { useState } from 'react';

// export const Login = () => {
//   const [email, setEmail] = useState('test@test.com')
//   const [password, setPassword] = useState('')
//   const [check, setCheck] = useState(false);
//   const [type, setType] = useState(1)

//   const handleEmail = (event) => {
//     setEmail(event.target.value)
//     // console.log(event.target);
//     console.log(event.target.value);
//   }

//   //arrow function reducida al máximo
//   const handlePassword = e => setPassword(e.target.value)

//   // arrow function 
//   const handleCheck = (event) => {
//     setCheck(event.target.checked)
//   }

//   // Ahra lo que hago es que cada vez que presione cancel, se vuelva a vaciar los datos y no se queden en la página
//   const handleReset = () => {
//     setEmail('')
//     setPassword('')
//     setCheck(false)
//   }


//   // Manejar el submit del formulario
//   const handleSubmit = (event) => {
//     event.preventDefault() //1. Siempre tiene que ir como primera linea del handle del submmit

//     // Aquí almaceno los datos que luego con la lógica vamo a ver que hago con ella 
//     const dataToSend = {
//       email: email,
//       password: password,
//       accept: check
//     }
//     console.log(dataToSend);

//     // Llamo a la funcion handleReset para que si se envía, se vacíen también los datos. Esto es une ejemplo de como invocar a una función y no tener que volver a escribirla
//     handleReset()
//   }




//   return (
//     <div>
//       <form className='mt-3' onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
//             value={email} onChange={handleEmail} />
//           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//           <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePassword} />
//         </div>
//         <div className="mb-3 form-check">
//           <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={check} onChange={handleCheck} />
//           <label className="form-check-label" htmlFor="exampleCheck1">Aceptar condiciones</label>
//         </div>
//         <select className="form-select" aria-label="Default select example" 
//         //En este caso, la funcion de onchange la defino como una función anónima directamente dentro de las {} (aunque lo podría hacer fuera también). y le paso los mismos valores porque es un input
//         value={type} onChange={(event) => setType(event.target.value)}>
//           <option defaultValue>Open this select menu</option>
//           <option value="1">User</option>
//           <option value="2">Teacher</option>
//           <option value="3">Admin</option>
//         </select>
//         <button type="submit" className="btn btn-primary me-2 mt-3">Submit</button>
//         <button type='reset' className='btn btn-danger mt-3' onClick={handleReset}>Cancel</button>
//       </form>
//     </div>
//   )
// }
