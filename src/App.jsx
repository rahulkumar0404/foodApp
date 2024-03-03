import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { CardContextProvider } from './store/CardContext';
import { UserProgressContextProvider } from './store/UserProgressContext';
function App() {
  return (
    <UserProgressContextProvider>
      <CardContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CardContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
