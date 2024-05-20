import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Routes, Route} from 'react-router-dom';
import withNavigation from '../../hoc/withNavigation/withNavigation';  
import ContactData from './ContactData/ContactData';  

class Checkout extends Component {

    state={
        ingredients : null,
        totalPrice:0
    }

    componentWillMount(){
        let price = 0;
        let olDIngredients = [];
        // console.log(Array.from(this.props.searchParams.entries())); 
        olDIngredients.cheese= +this.props.searchParams.get("cheese");
        olDIngredients.salad= +this.props.searchParams.get("salad");
        olDIngredients.meat= +this.props.searchParams.get("meat");
        olDIngredients.bacon= +this.props.searchParams.get("bacon");
        price = +this.props.searchParams.get("price");
        this.setState({ingredients : olDIngredients, totalPrice:price});
    }

    checkoutCancelledHandler = () => {
        this.props.navigate("/");
    }

    checkoutContinuedHandler = () => {
        this.props.navigate("/checkout/contact-data");
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler} 
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Routes>
                    <Route path="/contact-data" 
                    element={<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props} />}/>
                   
                </Routes>
            </div>
        )
    }
}

export default withNavigation(Checkout);