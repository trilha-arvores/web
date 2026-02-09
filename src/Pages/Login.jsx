import {useRef, useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import Header from "../components/Header";
import ImageBg from "../components/ImageBg";

import axios from '../api/axios';


const Login = () => {

    const {auth, setAuth} = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, confirmPassword])

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validateEmail(username)) {
            setErrMsg('Por favor, insira um email válido (ex: seu.email@provedor.com)');
            errRef.current.focus();
            return;
        }

        if (password !== confirmPassword) {
            setErrMsg('As senhas não correspondem');
            errRef.current.focus();
            return;
        }

        if (password.length < 6) {
            setErrMsg('A senha deve ter pelo menos 6 caracteres');
            errRef.current.focus();
            return;
        }

        try{
            const response = await axios.post('/admin/register',
                JSON.stringify({username, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                }
            );

            setErrMsg('Usuário registrado com sucesso! Agora faça login.');
            setTimeout(() => {
                setIsLogin(true);
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            }, 1500);
        } catch(err){
            if(!err?.response){
                setErrMsg('Sem Resposta do Servidor');
            }
            else if(err.response?.status === 409){
                setErrMsg('Este email já está registrado');
            }
            else if(err.response?.status === 400){
                setErrMsg(err.response?.data?.message || 'Preencha todos os campos corretamente');
            }
            else{
                setErrMsg('Falha ao registrar usuário');
            }

            errRef.current.focus();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateEmail(username)) {
            setErrMsg('Por favor, insira um email válido (ex: seu.email@provedor.com)');
            errRef.current.focus();
            return;
        }
        
        if (isLogin) {
            try{
                const response = await axios.post('/admin/login',
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
                    setErrMsg(err.response?.data?.message || 'Email ou senha incorretos');
                }
                else{
                    setErrMsg('LogIn Falhou');
                }

                errRef.current.focus();
            }
        } else {
            handleRegister(e);
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
                                <span className="h1 fw-bold mb-0">
                                    {isLogin ? 'Login Administração' : 'Cadastro de Usuário'}
                                </span>
                            </div>

                            <div className="h-custom-2 px-xl-5 ms-xl-4 mt-xl-5 pt-5 pt-xl-0 mt-xl-n5">

                                <form onSubmit={handleSubmit}>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="input-username">Email</label>
                                        <input 
                                            type="email" 
                                            id="input-username" 
                                            className="form-control"
                                            ref={userRef}
                                            placeholder="seu.email@provedor.com"
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
                                    </div>

                                    {!isLogin && (
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <label className="form-label" htmlFor="input-confirm-password">
                                                Confirmar Senha
                                            </label>
                                            <div className="input-group">
                                                <input 
                                                    type={showConfirmPassword ? "text" : "password"} 
                                                    id="input-confirm-password" 
                                                    className="form-control"
                                                    placeholder="Confirme sua senha" 
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    value={confirmPassword}
                                                    required
                                                />
                                                <button className="input-group-text"
                                                    type='button'
                                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                >
                                                    {showConfirmPassword?
                                                        <BsEye className="btn-interactice"/>: 
                                                        <BsEyeSlash className="btn-interactice"/>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {isLogin && (
                                        <label className="mt-3 w-100 text-secondary text-end form-label clickable">
                                            Esqueceu a senha?
                                        </label>
                                    )}

                                    <p ref={errRef} 
                                    className={errMsg ? "invalid-feedback d-block text": ""} 
                                    aria-live='assertive'>
                                        {errMsg}
                                    </p>
                                    

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <button data-mdb-button-init data-mdb-ripple-init
                                            className="btn btn-dark w-100" type="submit">
                                            {isLogin ? 'Entrar' : 'Registrar'}
                                        </button>
                                    </div>

                                    <div className="text-center mt-4">
                                        <p className="text-secondary">
                                            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                                            <span 
                                                className="clickable fw-bold text-decoration-underline"
                                                onClick={() => {
                                                    setIsLogin(!isLogin);
                                                    setUsername('');
                                                    setPassword('');
                                                    setConfirmPassword('');
                                                    setErrMsg('');
                                                }}
                                                style={{cursor: 'pointer'}}
                                            >
                                                {isLogin ? 'Cadastre-se aqui' : 'Faça login aqui'}
                                            </span>
                                        </p>
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