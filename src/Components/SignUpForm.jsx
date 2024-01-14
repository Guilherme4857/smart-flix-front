import { Button, Card, Form } from "react-bootstrap"
import { initialSignUp, schema } from '../Validations/SignUpFormValidations'

import Api from '../api/Api'
import { joiResolver } from '@hookform/resolvers/joi'
import { roles } from "../Constants/SignUpFormConstants"
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"

export default function SignUpForm({ notify, activeRole = false }) {
	const { register, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(schema), defaultValues: {...initialSignUp}})
    const navigate = useNavigate()

    
    useEffect(() => {
        document.getElementById("roleSelect").hidden = !activeRole
        
        if(!activeRole)
            setValue("role", "Student")
    }, [ activeRole, setValue ])
    
    const onSubmit = async data => {
		const signUpController = new Api({ controller: "authentication/sign-up" })

		try {
			await signUpController.post({ data: data })	
            
            navigate("/login")
		} catch (error) {
			if(signUpController.isInternalError)
				notify({ message: "Erro interno ao cadastrar plano", status: "error" })
		}
	}
    
    return (
        <Card className="card-form shadow px-n6 pt-5 pb-5 m-6">
            <Card.Body className="d-flex justify-content-center">
                <Form className="class-category-form" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Text>
                        <div className="d-flex justify-content-center">
                            <h1>Registrar Usuário</h1>
                        </div>
                    </Form.Text>

                    <Form.Group className="mb-3 mt-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control {...register("name")} name="name" type="text" placeholder="Nome" />
                        {errors.name?.message && <Form.Text>{errors.name?.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control {...register("email")} name="email" type="email" placeholder="E-mail" />
                        {errors.email?.message && <Form.Text>{errors.email?.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group id="roleSelect" className="mb-3" controlId="role" >
                        <Form.Label>Função</Form.Label>
                        <Form.Select {...register("role")} name="role" type="text">
                            <option>Selecione...</option>
                            {
                                roles.map(role => (
                                    <option key={ role.name } value={ role.name }>{ role.text }</option>
                                ))
                            }
                        </Form.Select>
                        {errors.role?.message && <Form.Text>{errors.role?.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control {...register("password")} name="password" type="password" placeholder="Senha" />
                        {errors.password?.message && <Form.Text>{errors.password?.message}</Form.Text>}
                    </Form.Group>			
                    
                    <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label>Confirmar Senha</Form.Label>
                        <Form.Control {...register("confirmPassword")} name="confirmPassword" type="password" placeholder="Confirmar Senha" />
                        {errors.confirmPassword?.message && <Form.Text>{errors.confirmPassword?.message}</Form.Text>}
                    </Form.Group>
                    
                    <Button variant="outline-success" type="submit">
                        Cadastrar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
