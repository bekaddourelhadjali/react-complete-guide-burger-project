import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Routes, Route} from 'react-router-dom';

function App() {
 
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/checkout/*"  element={<Checkout/>} />
          <Route path="/orders"  element={<Orders/>} />
          <Route path="/"  element={<BurgerBuilder/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
