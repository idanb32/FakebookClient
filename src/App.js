import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Register from "./Views/Register/Register";
import MainView from './Views/MainView/MainView';
import AddPost from './Componenets/AddPost/AddPost';
import './App.css';

const App = () => {
  return (<div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainView></MainView>} />
        <Route path='/SignUp' element={<Register></Register>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
