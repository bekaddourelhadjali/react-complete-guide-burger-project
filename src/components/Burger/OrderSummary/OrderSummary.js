import React from 'react';
import Aux from '../../../hoc/Auxx/Auxx';  
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
     const ingredientsSummary = Object.keys(props.ingredients).map(
            (ingKey) =>  
            (<li key={ingKey}>
            <span key={ingKey} style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
            </li>)
     );
     return <Aux>
        <h3>Your Order </h3>
        <p>Delicious Burger with the following ingredients:</p>
        <ul>
            {ingredientsSummary}
        </ul>  
        <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
        <p>Continue To Checkout</p>
        <Button btnType="Danger" clicked={props.puchasedCancelled} >Cancel</Button>
        <Button btnType="Success" clicked={props.purchaseContinued} >Continue</Button>
     </Aux>
};

export default orderSummary;