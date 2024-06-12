import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './static/css/main.scss';

import Index from './pages/Index';
import Login from './pages/Login';
import Trilhas from './pages/Trilhas';

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
