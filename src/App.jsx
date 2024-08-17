import './styles/App.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NotificationsSystem, { bootstrapTheme, setUpNotifications, useNotifications } from 'reapop'
import { useEffect, useState } from 'react';

import ClassCategoryForm from './Components/ClassCategoryForm';
import { default as EmployeeSigupForm } from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';
import PlanForm from './Components/PlanForm';

export default function App() {
	const [userToken, changeToken] = useState(localStorage.getItem("userToken"))
	const { notifications, dismissNotification, notify } = useNotifications()
	
	setUpNotifications({ defaultProps: { position: 'bottom-right', dismissAfter: 5000 } })

	useEffect(() =>{
		switch (window.location.pathname) {
			case "/plan-enroll":
				break;
			
			case "/class-category-enroll":
				break
			
			case "/employee-signup":
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
							<Route path="/employee-home" element={<Navigate to={"/login"}/>}/>
							<Route path="/login" element={<LoginForm changeToken={ changeToken } notify={ notify }/>}/>
							<Route path="/employee-signup" element={<EmployeeSigupForm notify={ notify } activeRole={ true }/>}/>
						</>)
					}
					{
						userToken && (
						<>
							<Route path="/plan-enroll" element={<PlanForm notify={ notify }/>}/>
							<Route path="/class-category-enroll" element={<ClassCategoryForm notify={ notify }/>}/>
						</>)
					}
				</Routes>
			</Router>

			<NotificationsSystem
				notifications={ notifications }
				dismissNotification={ (id) => dismissNotification(id) }
				theme={ bootstrapTheme }
			/>
		</>
	);
}
