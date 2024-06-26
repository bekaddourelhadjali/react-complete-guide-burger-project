import React,{Component} from "react";
import Aux from '../../hoc/Auxx/Auxx';  
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
            constructor () {
                super();
                this.reqInterceptor = axios.interceptors.request.use(req=>{
                    // console.log(req);
                    this.setState({error: null});
                    return req;
                });
                this.resInterceptor = axios.interceptors.response.use(res=> {
                    // console.log(res);
                    return res;
                },error =>{
                    
                    this.setState({error: error});
                });
            }
            state = {
                error: null
            }
            
            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }
             
            errorConfirmedHandler = () => {
                this.setState({error: null});
            }

            render(){
                return (
                    <Aux>
                        <Modal show={this.state.error} modalClicked={this.errorConfirmedHandler} >
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
                );
            }
        }
}

export default withErrorHandler;