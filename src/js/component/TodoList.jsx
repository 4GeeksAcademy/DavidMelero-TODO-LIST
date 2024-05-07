import React, { useState, useEffect } from "react";

export const TodoList = () => {
    //1.Js
    const host = 'https://playground.4geeks.com/todo';
    const user = 'davidApi'

    const getTodos = async () => {
        const uri = `${host}/users/${user}`
        const options = {
            //por defecto si no le pongo nada en este objeto, me hace un GET
            method: 'GET'
        }
        const response = await fetch(uri, options)
        console.log(response)

        if (!response.ok) {
            // Trato el error para que me diga el estado. y se hace diciendo que si no es ok. O sea que si no es un 200
            console.log('error:', response.ok, response.status, response.statusText);

            return // siempre hay que poner el return siempre para que salga de la función y no siga ejecutandose. Si lo quitamos se sigue ejectuando el if, y pasa al siguiente comprobante. 
        }
        // console.log('si no pongo el return, yo me estoy');
        console.log(response);
        const data = await response.json()
        console.log('data de David : ', data.todos);
        setList(data.todos)
    }

    useEffect(() => {
        getTodos();
    }
        , [])



    const [task, setTask] = useState('')
    const [list, setList] = useState([])
    const [edit, setEdit] = useState(false)
    const [currentTodo, setCurrentTodo] = useState({})

    const numberPattern = /^[0-9]+$/

    const handleAddTodo = (e) => {
        e.preventDefault()
        if (task.trim() !== '' && !numberPattern.test(task)) {
            //creo un objeto con los dos parámetros que tengo que añadir. El label será task, que es lo que le paso al input de "introduce tu tarea"
            const newTodo = {
                label: task,
                is_done: false
            }
            addTodos(newTodo)
            // setList([...list, task]); //En esta lógica le digo que si task no tiene espacios y es diferente a un string vacío, me retorne el setList con el array lista y me añada la tarea
            setTask('')
        } else {
            setTask('')
        }
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        const dataToSend = {
            label: currentTodo.label,
            is_done: currentTodo.is_done
        }
        const uri = `${host}/todos/${currentTodo.id}`
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options)

        if(!response.ok){
            console.log('error...',response.status, response.statusText)
            return
        }
        const data = await response.json()
        console.log('respuesta del put', data);
        getTodos()
        setCurrentTodo({})
        setEdit(false)
    }

    const editTask = (item) => {
        setCurrentTodo(item)
        setEdit(true)
        console.log(item);
    }

    const addTodos = async (todo) => {
        const uri = ` ${host}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(todo)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            console.log('error : ', response.ok, response.status, response.statusText)
            return
        }
        const data = await response.json()
        console.log('data:', data);
        setTask('')
        getTodos()
    }


    const handleDelet = async (item) => {
        console.log(item);
        const uri = `${host}/todos/${item.id}`;
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(uri, options)

        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return
        }
        // const data = await response.json()
        getTodos()
    }

    const handleTask = (e) => {
        setTask(e.target.value)
    }


    return (
        <div>
            {edit ?
                <form onSubmit={handleEdit}>
                    <label htmlFor="exampleInputEmail1" className="form-label text-center text-success ">Editar tarea</label>
                    <input type="text" placeholder="Edita la tarea..." className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={currentTodo.label} // Controlo el valor del input que es igual a una clave que está dentro de un objeto. (label, dentro de currentTodo)
                        onChange={(event) => setCurrentTodo({ ...currentTodo, label: event.target.value })} />  {/* Aquí le digo agregame todas las claves dentro del currentTodo (isDone, label, id) y la clave lable la modificas por este valor */}
                    <div className="mb-1 form-check mt-2">
                        <input type="checkbox" className="form-check-input " id="exampleCheck1" 
                         checked={currentTodo.is_done}
                         onChange= {(event)=>setCurrentTodo({...currentTodo, is_done: event.target.checked})} 
                        />
                        <label className="form-check-label text-white" htmlFor="exampleCheck1">completed</label>
                            
                    </div>
                    <button type="submit" className="btn btn-warning">Submit</button>
                </form>

                :

                <form onSubmit={handleAddTodo}>
                    <label htmlFor="exampleInputEmail1" className="form-label text-center">Tarea</label>
                    <input type="text" placeholder="introduce tu tarea..." className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={task}
                        onChange={handleTask} />
                </form>
            }

            <h3 className="mt-2">Lista de tareas</h3>
            <ul className="list-group">
                {list.map((item, id) => <li key={id} className="list-group-item text-center fw-semibold d-flex justify-content-between hidden-icon">
                    <div>
                        {item.is_done ? <i className="text-success me-2 fas fa-thumbs-up"></i> : <i className="text-danger me-2 fas fa-ban"></i>}
                        {item.label}
                    </div>
                    <div>
                        <span onClick={() => editTask(item)} className="me-2"><i className="fas fa-edit text-success "></i></span>
                        <span onClick={() => handleDelet(item)} className="text-danger fas fa-trash text-danger"></span>
                    </div>
                </li>)}
                <li className="list-group-item text-end bg-light-subtle fw-light footer-list">
                    {list.length} items
                </li>
            </ul>
            <button onClick={handleAddTodo} type="button" className="btn btn-success mt-2">Success</button>
        </div>
    )
}