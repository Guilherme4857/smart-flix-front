import '../styles/ItemBox.css'

import { Button, Card } from "react-bootstrap"

export default function ItemBox({ itens, onButtonClick }) {
    var listKey = 0
    
    return (
        <Card id="itemBox" className="pt-4 ps-5 mb-4 scroll static-card shadow">
            <Card.Body>
                <ul key={listKey++} className="list-inline mb-0 pb-0 ">
                {
                    itens.map(item => {
                        return (
                            <li key={ item.id } className="list-inline-item me-4 mb-3">
                                <Button 
                                    id={item.name}
                                    value={ item.id } 
                                    className="rounded-pill" 
                                    variant="secondary" 
                                    onClick={ onButtonClick }
                                >
                                    { item.name }
                                    <i className="fas fa-xmark ms-1"></i>
                                </Button>
                            </li>
                        )}
                    )
                }
                </ul>
            </Card.Body>
        </Card>
    )
}
