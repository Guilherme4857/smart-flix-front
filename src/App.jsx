import './styles/App.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ClassCategoryForm from './Components/ClassCategoryForm';
import LoginForm from './Components/LoginForm';
import PlanForm from './Components/PlanForm';
import { useEffect } from 'react';

export default function App() {
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
					<Route path="/" element={<Navigate to={"/login"}/>}/>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/plan-enroll" element={<PlanForm/>}/>
					<Route path="/class-category-enroll" element={<ClassCategoryForm/>}/>
				</Routes>
			</Router>
		</>
	);
}
