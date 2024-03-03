import Header from './components/Header';
import Meals from './components/Meals';
import { CardContextProvider } from './store/CardContext';
function App() {
  return (
    <CardContextProvider>
      <Header />
      <Meals />
    </CardContextProvider>
  );
}

export default App;
