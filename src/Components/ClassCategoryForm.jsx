import '../styles/ClassCategoryForm.css'

import { Button, Card, Form, Image } from 'react-bootstrap'
import { intialClassCategory, schema } from '../Validations/ClassCategoryFormValidations'

import Api from '../api/Api'
import bodyBuilder from '../icons/bodybuilding.png'
import dance from '../icons/dance.png'
import fight from '../icons/fight.png'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'

export default function ClassCategoryForm({ notify }) {
	const classTypes = [bodyBuilder, dance, fight]

	const {register, handleSubmit, formState: { errors }, } = useForm({ resolver: joiResolver(schema), defaultValues: {...intialClassCategory}})

    const onSubmit = async data => {
		const classCategoriesController = new Api({ controller: "class-categories" })

		try {
			await classCategoriesController.post({data: data})	
		
		} catch (error) {
			if(classCategoriesController.isInternalError)
				notify({ message: "Erro interno ao cadastrar plano", status: "error" })
		}
	}

    return (
        <Card className="card-form shadow px-n6 pt-5 pb-5 m-6">
            <Card.Body className="d-flex justify-content-center">
				<Form className="class-category-form" onSubmit={handleSubmit(onSubmit)}>
					<Form.Text>
						<div className="d-flex justify-content-center">
							<h1>Cadastrar Categoria de Aula</h1>
						</div>
					</Form.Text>

					<Form.Group className="mb-3 mt-3" controlId="name">
						<Form.Label>Nome</Form.Label>
						<Form.Control {...register("name")} name="name" type="text" placeholder="Nome" />
						{errors.name?.message && <Form.Text>{errors.name?.message}</Form.Text>}
					</Form.Group>

					<Form.Group className="mb-3" controlId="teacher">
						<Form.Label>Professor</Form.Label>
						<Form.Control {...register("teacher")} name="teacher" type="text" placeholder="Nome do professor" />
						{errors.teacher?.message && <Form.Text>{errors.teacher?.message}</Form.Text>}
					</Form.Group>

					<Form.Group className="mb-4" controlId="description">
						<Form.Label>Descrição</Form.Label>
						<Form.Control {...register("description")} name="description" as="textarea" type="text" placeholder="Descrição" />
						{errors.description?.message && <Form.Text>{errors.description?.message}</Form.Text>}
					</Form.Group>			
					
					<Form.Label className="mb-4"> Ícone: </Form.Label>

					<Form.Group className='mb-3' controlId='icon'>
						{
							classTypes.map(classType => {
								return (
									<div key={classType} className="form-check mb-2">
										<Form.Label as={Image} src={classType} width="30" />
										<input {...register("icon")} value = {classType} className="form-check-input" type="radio" name="icon" />
									</div>						
								)
							})
						}
						{errors.icon?.message && <Form.Text>{errors.icon?.message}</Form.Text>}
					</Form.Group>
					
					<Button variant="outline-success" type="submit">
						Cadastrar
					</Button>
				</Form>
			</Card.Body>
		</Card>
	)
}
