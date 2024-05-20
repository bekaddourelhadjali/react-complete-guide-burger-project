import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',
        },
        loading:false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: this.state.name,
                address: {
                    street: this.state.street,
                    zipCode: this.state.postalCode,
                    country: 'Test Country'
                },
                email: this.state.email,
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.json',order)
            .then(response => {console.log(response); this.props.navigate('/'); })
            .catch(error => {console.log(error);this.setState({loading:false}); });
    }
    render(){
        let form = <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name"/>
                <input className={classes.Input} type="text" name="email" placeholder="your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="your street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="your Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>;
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default  ContactData;