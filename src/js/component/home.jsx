import React from "react";
import { Login } from "./Login";
import { TodoList } from "./TodoList";
import { TitleTodoList } from "./TitleTodoList";



//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="container-fluid form-body relative " style={{ height: '100vh', margin: 0 }}>
			<div className="form p-2" style={{ margin: '0 auto', width: '50%', height: '70%',  }}>
				{/* <Login /> */}
				<TitleTodoList/>
				<TodoList/>

			</div>
		</div>
	);
};



export default Home;
