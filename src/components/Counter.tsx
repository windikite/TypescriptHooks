import React, {useState} from 'react';
import { Button } from 'react-bootstrap';

interface CounterState {
    count: number;
}

const Counter: React.FC = () => {
    const [counter, setCounter] = useState({count: 0} as CounterState);
    const increment = () => {
        setCounter((prevState) => ({
            ...prevState,
            count: (prevState.count) + 1
        }))
    }

    const decrement = () => {
        if(counter.count && counter.count > 0){
            setCounter((prevState) => ({
                ...prevState,
                count: (prevState.count) - 1
            }))
        }
    }

    const reset = () => {
        setCounter((prevState) => ({
            ...prevState,
            count: 0
        }))
    }

    return (
        <div className=' bg bg-dark mt-3 pt-2 pb-2 w-25 mx-auto rounded'>
            <Button variant='secondary' disabled>Count: {counter.count}</Button>
            <div className='d-flex flex-row justify-content-center'>
                <Button variant='success' onClick={increment}>+</Button>
                <Button variant='primary' onClick={decrement}>-</Button>
                <Button variant='danger' onClick={reset}>Reset</Button>
            </div>
        </div>
    )
}

export default Counter;