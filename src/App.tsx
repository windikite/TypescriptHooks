import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Counter from './components/Counter';
import ShoppingCart from './components/ShoppingCart';


function App() {
  return (
    <div className="App">
      <Counter />
      <ShoppingCart />
    </div>
  );
}

export default App;
