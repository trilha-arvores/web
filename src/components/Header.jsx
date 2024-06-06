import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
            <img src="/logos/trilha.png" className='logo d-none d-md-block' alt=""/>
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false">
                <span className="navbar-toggler-icon navbar-dark"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className='nav-link fw-bold' activeclassname="active" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link fw-bold' activeclassname="active" to="/trilhas">Aplicativo</NavLink>
                    </li>
                    <li className="nav-item">
                        {/* <NavLink className='nav-link' to="/login">Administração</NavLink> */}
                        <NavLink className='nav-link fw-bold' activeclassname="active" to="/login">Administração</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}