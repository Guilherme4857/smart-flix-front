import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

import { useState } from 'react';

export function NavBar() {
    const [ show, setShow ] = useState(false)
    
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    
    const handleLogout = () => {
        localStorage.removeItem("userToken")
        window.location.replace("/login")
    }

    return (
        <Container>
            <Navbar expand="xl" bg="rgba(0, 0, 0, 0.268)" data-bs-theme="dark">
                <Button variant="rgba(0, 0, 0, 0.268)" onClick={handleShow}>
                    <span class="navbar-toggler-icon"></span>
                </Button>
                
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                        <Nav.Link onClick={ handleLogout }>Sair</Nav.Link>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav.Link href="/plan-enroll">Cadastrar Plano</Nav.Link>
                        <Nav.Link href="/class-category-enroll">Cadastrar Categoria de Aula</Nav.Link>
                    </Offcanvas.Body>
                </Offcanvas>
            </Navbar>
        </Container>
    )
}
