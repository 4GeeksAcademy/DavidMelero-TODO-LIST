import { string } from "prop-types";
import React, { useState, useEffect } from "react";
import { Alert } from "./Alert.jsx";

export const TodoList = () => {
    //1.Js
    const getList = async () => {
        const uri = 'https://playground.4geeks.com/todo/users'
        const options = {
            method: 'GET'
        }
        const response = await fetch(uri, options)
        console.log(response)

        if (!response.ok) {
            // Trato el error para que me diga el estado. y se hace diciendo que si no es ok. O sea que si no es un 200
            console.log('error:',response.ok, response.status, response.statusText);
          
            return // siempre hay que poner el return siempre para que salga de la función y no siga ejecutandose. Si lo quitamos se sigue ejectuando el if, y pasa al siguiente comprobante. 
        }
        console.log('si no pongo el return, yo me estoy');
        console.log(response);
        const data = await response.json()
        console.log(data);
    }

    useEffect(() => {
        getList();
    }
        , [])



    const [task, setTask] = useState('')
    const [list, setList] = useState(['manzana', 'pera', 'platano', 'kiwi'])
    const [showAlert, setShowAlert] = useState(false)


    const numberPattern = /^[0-9]+$/

    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.trim() !== '' && !numberPattern.test(task)) {
            setList([...list, task]); //En esta lógica le digo que si task no tiene espacios y es diferente a un string vacío, me retorne el setList con el array lista y me añada la tarea
            setTask('')
        } else {
            setShowAlert(true)
            setTask('')
        }
    }
    const handleDelet = (item) => {
        setList(list.filter((element) => element !== item))
        alert('borrado con exito')
        console.log(item);
    }

    const handleTask = (e) => {

        setTask(e.target.value)
    }


    return (
        <>
            {/* <Alert/> */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="exampleInputEmail1" className="form-label text-center">Tarea</label>
                    <input type="text" placeholder="introduce tu tarea..." className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={task}
                        onChange={handleTask}
                    />
                </div>
                <h3 className="mt-2">Lista de tareas</h3>
                <ul className="list-group">
                    {list.map((item, id) => <li key={id} className="list-group-item text-center fw-semibold d-flex justify-content-between">
                        {item}
                        <span onClick={() => handleDelet(item)} className="text-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </span>
                    </li>)}
                    <li className="list-group-item text-end bg-light-subtle fw-light footer-list">
                        {list.length} items
                    </li>
                </ul>
                <button onClick={handleSubmit} type="button" className="btn btn-success mt-2">Success</button>
            </form>

            {/* {showAlert && <Alert message="Por favor, introduce una tarea válida que no consista solo en números." />} */}

        </>
    )
}