import { Button, Card, Form } from "react-bootstrap"

export default function LoginForm() {
  return (
    <Card style={{ width: '70rem' } } className="shadow p-5 m-5">
        <Card.Body className="d-flex justify-content-center">            
            <Form className="login-form">
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="checkbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Card.Body>
    </Card>
  )
}
