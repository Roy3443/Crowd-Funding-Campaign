import React from 'react'
import Button from 'react-bootstrap/Button';

const MyButton = ({text, type}) => {
    return(
        <Button type={type} variant="outline-success">{text}</Button>
    )
}
export default MyButton;