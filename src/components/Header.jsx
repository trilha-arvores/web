// import "./Header.css";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand">
        <div className="container-fluid">
            <img src="/logos/trilha.png" alt=""/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#meuId"
                aria-controls="meuId" aria-expanded="false">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="meuId">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* <a className="nav-link active" aria-current="page" href="index.html"> */}
                            <Link className='nav-link active' to="/">Home</Link>
                        {/* </a> */}
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link active' to="/">Aplicativo</Link>
                        {/* <a className="nav-link" href="/pages/mobile/index.html">Aplicativo</a> */}
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link active' to="/login">Administração</Link>
                        {/* <a className="nav-link" href="login.html">Administração</a> */}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}