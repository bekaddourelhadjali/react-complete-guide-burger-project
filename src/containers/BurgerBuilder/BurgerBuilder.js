import React, { Component } from 'react'; 
import Aux from '../../hoc/Auxx/Auxx';  
import withNavigation from '../../hoc/withNavigation/withNavigation';  
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';  
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
            salad: 0.4,
            bacon: 0.5,
            cheese: 0.3,
            meat: 1.2
}

class BurgerBuilder extends Component {   
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable : false,
        purchasing : false,
        loading: false,
        error:false

    }
    componentDidMount(){
        axios.get('/ingredients.json')
       .then(response => {
        this.setState({ingredients : response.data});
        // this.setPurchasesableState(response.data);
 
       }).catch(error => this.setState({error: error}));
    }

    setPurchasesableState = (ingredients) =>{
        const sum  = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum,el) => sum + el ,0);

        this.setState({purchasable : sum > 0 });
    } 

    addIngredientHandler = (type) => {
        const newIngQuantity = this.state.ingredients[type] + 1;
        const olDIngredients = {...this.state.ingredients};
        const newtTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        olDIngredients[type] = newIngQuantity;
        this.setState({
            ingredients : olDIngredients,
            totalPrice : newtTotalPrice
        });
        this.setPurchasesableState(olDIngredients);
    }
    
    removeIngredientHandler = (type) => {
        const newIngQuantity = this.state.ingredients[type]>=1  ? this.state.ingredients[type] - 1 : 0;
        const olDIngredients = {...this.state.ingredients};
        const newtTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type]>=0 ? this.state.totalPrice - INGREDIENT_PRICES[type] : 0;
        olDIngredients[type] = newIngQuantity;
        this.setState({
            ingredients : olDIngredients,
            totalPrice : newtTotalPrice
        });
        this.setPurchasesableState(olDIngredients);
    }
    
    purchaseHandler  = () => {
        this.setState({purchasing : true});
    }
    
    purchaseCancelHandler  = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler  = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push(encodeURIComponent("price") + '=' + encodeURIComponent(this.state.totalPrice));
        const queryString = '?' + queryParams.join('&');
        this.props.navigate({
                pathname:"/checkout",
                search: queryString
            });
    }

    render() {

        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger =   this.state.error ? <p>Ingredients Cannot be loaded!</p> : <Spinner />;

        if(this.state.ingredients){
            burger = (<Aux>
                        <Burger ingredients={this.state.ingredients}/>    
                        <BuildControls 
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabledInfo={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            />
                    </Aux>);

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                puchasedCancelled={this.purchaseCancelHandler} 
                price={this.state.totalPrice}
                purchaseContinued={this.purchaseContinueHandler}
                />;
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withNavigation(WithErrorHandler(BurgerBuilder,axios));