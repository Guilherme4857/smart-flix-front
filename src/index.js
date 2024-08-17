import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import App from './App';
import { Container } from 'react-bootstrap';
import { NavBar } from "./Components/NavBar.jsx"
import { NotificationsProvider } from 'reapop'
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<>
		<NavBar/>
		<NotificationsProvider>
			<Container className=' d-flex justify-content-center mt-3'>
				<App />
			</Container>
		</NotificationsProvider>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
