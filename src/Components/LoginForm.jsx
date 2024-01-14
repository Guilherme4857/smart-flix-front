import "../styles/LoginForm.css"

import { Button, Card, Form, Nav } from "react-bootstrap"
import { intialLogin, schema } from '../Validations/LoginFormValidations'

import Api from '../api/Api'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginForm({ changeToken, notify }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(schema), defaultValues: { ...intialLogin } })
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    
    const onSubmit = async data => {
        const planController = new Api({ controller: "authentication/login" })

        try {

            await planController.post({ data: data }).then(response => {
                localStorage.setItem("userToken", response.data.token)
    
                changeToken(response.data.token)  
            })
            
            navigate("/plan-enroll")
        } catch (error) {
            if(planController.isInternalError)
            {
                setMessage(null)
                
                notify({message: "Erro interno ao fazer login", status: "error"})
            }
            else
                setMessage(error.response.data.message)
        }
	}
    
  return (
    <Card className="shadow p-5  card-login-form login-form-margin">
        <Card.Body className="d-flex justify-content-center">            
            <Form className="login-form" onSubmit={ handleSubmit(onSubmit) }>
                {message !== null && <Form.Text>{message}</Form.Text>}
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control { ...register("email") } name="email" type="email" placeholder="Email" />
                    {errors.email?.message && <Form.Text>{ errors.email?.message }</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control { ...register("password") } name="password" type="password" placeholder="Senha" />
                    {errors.password?.message && <Form.Text>{ errors.password?.message }</Form.Text>}
                </Form.Group>
                
                <Form.Text>
                    <Nav.Link href="/employee-signup">Registre-se</Nav.Link>
                </Form.Text>
                
                <Button variant="primary mt-5" type="submit">
                    Entrar
                </Button>
            </Form>
        </Card.Body>
    </Card>
  )
}
