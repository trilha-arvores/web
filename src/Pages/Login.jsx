import {useRef, useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import Header from "../components/Header";
import ImageBg from "../components/ImageBg";

import axios from '../api/axios';
const LOGIN_URL = '/admin/login';


const Login = () => {

    const {auth, setAuth} = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({username, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    // withCredentials: true
                }
            );

            const accessToken = response?.data;
            setAuth({username, password, accessToken});
            setUsername('');
            setPassword('');
            navigate('/trilhas', {replace: true})
        } catch(err){
            if(!err?.response){
                setErrMsg('Sem Resposta do Servidor');
            }
            else if(err.response?.status === 400){
                setErrMsg('Não Autorizado');
            }
            else{
                setErrMsg('LogIn Falhou');
            }

            errRef.current.focus();
        }

    }

    return (
        <main>
            <div className="container-fluid">
                <div className="row vw-100">
                    <div className="mx-auto align-items-center col-sm-6 text-black">
                        <Header/>

                        <div>
                            <div className="px-xl-5 ms-xl-4 mt-xl-5 pt-5 pt-xl-0">
                                <span className="h1 fw-bold mb-0">Login Administração</span>
                                {/* <p className="d-none d-lg-block text-secondary">Login da administração do
                                    aplicativo Trilha
                                    das Árvores, utilizado na ESAQL para
                                    gerenciar percursos e informações relacionadas às trilhas existentes.</p> */}

                            </div>

                            <div className="h-custom-2 px-xl-5 ms-xl-4 mt-xl-5 pt-5 pt-xl-0 mt-xl-n5">

                                <form onSubmit={handleSubmit}>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="input-username">Usuário</label>
                                        <input 
                                            type="text" 
                                            id="input-username" 
                                            className="form-control"
                                            ref={userRef}
                                            placeholder="Digite seu usuário"
                                            autoComplete='off'
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            required
                                        />
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="input-password">Senha</label>
                                        <div className="input-group">
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                id="input-password" 
                                                className="form-control"
                                                placeholder="Digite sua senha" 
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                            />
                                            <button className="input-group-text"
                                                id="validationTooltipUsernamePrepend"
                                                type='button'
                                                onClick={
                                                    () => setShowPassword((prev) => !prev)}>
                                                
                                                {showPassword?
                                                    <BsEye className="btn-interactice"/>: 
                                                    <BsEyeSlash className="btn-interactice"/>
                                                }
                                            </button>
                                        </div>
                                        <label className="mt-3 w-100 text-secondary text-end form-label clickable">Esqueceu a senha?</label>
                                        
                                        <p ref={errRef} 
                                        className={errMsg ? "invalid-feedback d-block text": ""} 
                                        aria-live='assertive'>
                                            {errMsg}
                                        </p>
                                    </div>
                                    

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <button data-mdb-button-init data-mdb-ripple-init
                                            className="btn btn-dark w-100" type="submit">
                                            Entrar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                    <ImageBg/>
                </div>

            </div>

        </main>
    );
}


export default Login;