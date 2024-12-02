import React, { useReducer, useState } from "react"
import shoppingCartReducer from "../hooks/ShoppingCartReducer"
import Item from "../models/Item.model";
import { Form, Button } from "react-bootstrap";

interface Errors {
    [key: string]: string
}

const ShoppingCart: React.FC = () => {
    const [cart, dispatch] = useReducer(shoppingCartReducer, {items: []})
    const [item, setItem] = useState({id: 0, name: '', price: 0} as Item);
    const [errorMessages, setErrorMessages] = useState<Errors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: name === "price" ? parseFloat(value) : value
        }))
    };

    const validateForm = () => {
        const errors: Errors = {};
        if(!item.name) errors.name = 'Item name is required';
        if(!item.price || item.price <= 0) errors.price = 'Item price is required';
        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
    }

    const addItem = () => {
        const newItem: Item = { id: Date.now(), name: item.name, price: item.price};
        dispatch({type: 'ADD_ITEM', payload: newItem});
        setItem({id: 0, name: '', price: 0});
    }

    const removeItem = (itemId: number) => {
        dispatch({type: 'REMOVE_ITEM', payload: itemId})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        addItem();
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        required
                        name="name"
                        type="text"
                        placeholder="Enter item name"
                        value={item.name}
                        onChange={handleChange}
                        isInvalid={!!errorMessages.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessages.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Item Price</Form.Label>
                    <Form.Control
                        required
                        name="price"
                        type="number"
                        placeholder="Enter item price"
                        value={item.price}
                        onChange={handleChange}
                        isInvalid={!!errorMessages.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessages.price}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Add To Cart</Button>
            </Form>

            <ul>
                {cart.items.map(item => (
                    <li key={item.id}>
                        {item.name}{' '}
                        <Button variant="danger" onClick={() => removeItem(item.id)}>Remove</Button>
                    </li>
                ))}
            </ul>

            <h2>Total: {cart.items.map(x => {return x.price}).reduce((a, n) => a + n, 0)}</h2>
        </div>
    )
}

export default ShoppingCart;