import './styles/App.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ClassCategoryForm from './Components/ClassCategoryForm';
import LoginForm from './Components/LoginForm';
import PlanForm from './Components/PlanForm';

export default function App() {
	const [userToken, changeToken] = useState(localStorage.getItem("userToken"))

	useEffect(() =>{		
		switch (window.location.pathname) {
			case "/plan-enroll":
				break;
			case "/class-category-enroll":
				break

			case "/login":
				break
				
			default:
				document.body.style.backgroundColor = "#ffffff"
				break;
		}
	}, [])
	
	return (
		<>
			<Router>
				<Routes>
					{
						!userToken && (
						<>
							<Route path="/" element={<Navigate to={"/login"}/>}/>
							<Route path="/plan-enroll" element={<Navigate to={"/login"}/>}/>
							<Route path="/class-category-enroll" element={<Navigate to={"/login"}/>}/>
							<Route path="/login" element={<LoginForm changeToken={changeToken}/>}/>
						</>)
					}
					{
						userToken && (
						<>
							<Route path="/plan-enroll" element={<PlanForm/>}/>
							<Route path="/class-category-enroll" element={<ClassCategoryForm/>}/>
						</>)
					}
				</Routes>
			</Router>
		</>
	);
}
