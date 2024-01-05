import "../styles/PlanForm.css"

import { Button, Card, Form } from 'react-bootstrap'
import { intialPlan, schema } from '../Validations/PlanFormValidations'
import { useEffect, useState } from 'react'

import Api from '../api/Api'
import ArrayExtension from '../extensions/ArrayExtension'
import ItemBox from './ItemBox'
import SearchList from './SearchList'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'

export default function PlanForm() {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({ resolver: joiResolver(schema), defaultValues: { ...intialPlan } })
    register("classCategoriesIds")
    
    const [ categoriesFinded, setCategoriesFinded ] = useState([])
    const [ searchInput, setSearchInput ] = useState("")
    const [ selectedCategoriesIds, setSelectedCategoriesIds ] = useState(new ArrayExtension())
    const [ classCategories, setClassCategories] = useState(new ArrayExtension())
    
    useEffect(() =>{
        const classCategoriesController = new Api({ controller: "class-categories" })
        
        const getClassCategories = async () => {
            const response = await classCategoriesController.get()            
            
            if(response !== undefined)
            {
                const array = new ArrayExtension(...response.data)
                setClassCategories(array)   
            }
        }
        
        getClassCategories()
    }, [])

    const handleSearch = e => {
        const { value } = e.target
        setSearchInput(value)
        if(value !== '')
        {
            setCategoriesFinded(
                classCategories.filter(category => {
                var categoryString = ""
                
                for(var prop in category)
                    if(category[prop] !== "" && category[prop] !== undefined)
                        categoryString += category[prop].toString().toLowerCase() + ' '
                
                return !selectedCategoriesIds.includes(category.id) && categoryString.trim().match(
                    RegExp(value.toLowerCase().split(" ").filter(word => word !== "").join("|"), "gim"))
            }))
        }
        else
            setCategoriesFinded([])
    }
    
    const handleCategoryClick = e => {
        e.preventDefault()
        const {value} = e.target
        setSearchInput("")
        setCategoriesFinded([])
        
        const itens = selectedCategoriesIds.copy()
        itens.push(parseInt(value))
        
        setSelectedCategoriesIds(itens)
        setValue("classCategoriesIds", [...itens])
    }

    const handleUnselectButton = e => {
        e.preventDefault()
        const { value } = e.target
        const itens = selectedCategoriesIds.filter(_ => _ !== parseInt(value))
        
        setSelectedCategoriesIds(itens)
        setValue("classCategoriesIds", [...itens])
    }
    
    const onSubmit = async data => {
        const planController = new Api({ controller: "plans" })
        
        setSearchInput("")
        setCategoriesFinded([])
        await planController.post({ data: data })

        setSelectedCategoriesIds(new ArrayExtension())
		reset(intialPlan)
	}

    return (
        <Card className="card-form shadow p-5 m-5">
            <Card.Body className="d-flex justify-content-center">
                <Form className="plan-form" onSubmit={ handleSubmit(onSubmit) }>
                    <Form.Text>
                        <div className="d-flex justify-content-center">
                            <h1>Cadastrar Plano</h1>
                        </div>
                    </Form.Text>

                    <Form.Group className="mb-3 mt-4" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control { ...register("name") } name="name" type="text" placeholder="Nome" />
                        {errors.name?.message && <Form.Text>{ errors.name?.message }</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="monthlyValue">
                        <Form.Label>Valor mensal</Form.Label>
                        <Form.Control { ...register("monthlyValue") } name="monthlyValue" type="text" placeholder="Valor mensal" />
                        {errors.monthlyValue?.message && <Form.Text>{ errors.monthlyValue?.message }</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="classTotal">
                        <Form.Label>Total de aulas</Form.Label>
                        <Form.Control { ...register("classTotal") } name="classTotal" type="text" placeholder="Total de aulas" />
                        {errors.classTotal?.message && <Form.Text>{ errors.classTotal?.message }</Form.Text>}
                    </Form.Group>			
                    
                    <Form.Group className="mb-4">
                        <Form.Label className="mb-0" > Selecione categorias de aula: </Form.Label>
                        <Form.Control value={ searchInput } type="search" onChange={ handleSearch } />
                        {errors.classCategoriesIds?.message && <Form.Text>{ errors.classCategoriesIds?.message }</Form.Text>}
                        <SearchList
                            itensFinded={ categoriesFinded }
                            handleItemClick={ handleCategoryClick }
                        />
                    </Form.Group>
                    
                    <ItemBox
                        itens={ classCategories.filter(_ => selectedCategoriesIds.includes(_.id)) }
                        lineLength={ 6 }
                        onButtonClick={ handleUnselectButton }
                    />

                    <Button variant="outline-success" className='mb-4' type="submit" >
                        Cadastrar
                    </Button>
                </Form>                
            </Card.Body>
        </Card>
	)
}
