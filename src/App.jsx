// import logo from './logo.svg';
import './App.css';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Index from './Pages/Index';
import Login from './Pages/Login';
import Trilhas from './Pages/Trilhas';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Index/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/trilhas" element={<Trilhas/>} />
            </Routes>
        </Router>
    </div>
)

export default App;
