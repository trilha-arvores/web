import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './static/css/main.scss';

import Index from './pages/Index';
import Login from './pages/Login';
import Trilhas from './pages/Trilhas';
import RequireAuth from './components/RequireAuth';

import {Routes, Route} from "react-router-dom";

const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/login" element={<Login/>} />
            <Route element={<RequireAuth/>}>
                <Route path="/trilhas" element={<Trilhas/>} />
            </Route>
        </Routes>
    </div>
)

export default App;
