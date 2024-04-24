import React from "react";
import { Login } from "./Login";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div style={{margin: '0 auto', width: '50%'}}>
		<Login/>
		</div>
	);
};

export default Home;
