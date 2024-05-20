import React, {Component} from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';  

class Orders extends Component {

    state = {
        orders: [],
        loading:true
    }

    componentDidMount (){
        axios.get('orders.json').then(res => {
            console.log(res);
            const fetchedOrders = [];
            for (let key in res.data ){
                fetchedOrders.push({
                    id:key,
                    ...res.data[key]
                });
            }
            this.setState({
                orders: fetchedOrders,
                loading:false
            })
        }
        ).catch(err => {
            this.setState({ 
                loading:false
            });
        } );
    }

    render(){
        let orders = <Spinner/>;
        if(!this.loading){
            orders = this.state.orders.map(order =>
                <Order key={order.id} ingredients={order.ingredients} price={order.price} /> );
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default WithErrorHandler(Orders,axios);