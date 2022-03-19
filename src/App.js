import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Register from "./Views/Register/Register";
import Login from "./Views/Login/Login";
import './App.css';

const App = () => {
  return (<div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>} />
        <Route path='/SignUp' element={<Register></Register>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
