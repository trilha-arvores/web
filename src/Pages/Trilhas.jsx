import { useState, useEffect, useCallback, useRef } from 'react';
import {Modal} from 'bootstrap/dist/js/bootstrap.esm.min.js';

import Header from "../components/Header";
import RowTrilha from "../components/RowTrilha";
import DivLine from "../components/DivLine";
import TrailForm from "../components/TrailForm";
import DelTrailForm from "../components/DelTrailForm";
import Loading from "../components/Loading";

import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const GET_TRAILS_URL = '/admin/trails';

const Trilhas = () => {
    const {auth} = useAuth();

    const [trails, setTrail] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const [loading, setLoading] = useState(false);

    const [inputTrail, setInputTrail] = useState(null);
    
    const [modalClass, setModalClass] = useState({});
    const [delModalClass, setDelModalClass] = useState({});

    const fetchLista = useCallback(async () => {

        setLoading(true);

        try {
            const response = await axios.get(GET_TRAILS_URL, {
                headers: {
                //   Authorization: `Bearer ${auth.accessToken}`
                    Authorization: auth.accessToken
                }
            });
            setTrail(response.data);
        } catch (err) {
            if(!err?.response){
                setErrMsg('Sem Resposta do Servidor.');
            }
            else if(err.response?.status === 401){
                setErrMsg('Não Autorizado, recarregue a página e tente novamente.');
            }
            else{
                setErrMsg('Não foi possível carregar as trilhas, recarregue a página e tente novamente.');
            }

            errRef.current.focus();
        } finally {
            setLoading(false);
        }

    }, [auth.accessToken]);
    
    useEffect(() => {
    
        fetchLista();
        
        setModalClass(Modal.getOrCreateInstance('#modal_trilha'));
        setDelModalClass(Modal.getOrCreateInstance('#del_modal_trilha'));
    }, [fetchLista])

    const abrirModal = (trail) => {
        setInputTrail(trail);
        modalClass.toggle();
    }

    const fecharModal = () => {
        modalClass.toggle();
    }

    const abrirDelModal = (trail) => {
        setInputTrail(trail);
        delModalClass.toggle();
    }

    const fecharDelModal = () => {
        delModalClass.toggle();
    }

    const LoadingTrilhas = () => (
        <tr className="table-row bg-white trilha_round">
            <td colSpan="7" className='p-0 rounded h-auto bg-transparent'>
                <Loading className="h-auto position-static"/>
            </td>
        </tr>
    );
    
    const ErroTrilhas = () => (
        <tr className={!errMsg?"table-row trilha_round d-none":"table-row trilha_round"}>
            <td colSpan="7" className='p-0 h-auto bg-transparent border-0'>
                    <p ref={errRef}
                        className={errMsg ? "invalid-feedback d-block text": ""} 
                        aria-live='assertive'>
                            {errMsg}
                    </p>
            </td>
        </tr>
    );
    
    return (
        <section className="bg-cinza">
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container flex-row-reverse flex-md-row">
                    <Header/>
                    <form className="d-flex" role="search">
                        {/* <input id="search-input" className="form-control me-4" type="search" placeholder="Search..." aria-label="Search"/> */}
                        <button 
                            className="d-none d-md-block btn btn-outline-success w-100" 
                            type="button"
                            onClick={() => {abrirModal(null)}}
                        >
                            Criar nova trilha
                        </button>
                    </form>
                </div>
            </nav>
            <main className="container">

                <DivLine/>
                
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th className="table-head" scope="col"></th>
                        <th className="table-head" scope="col">Nome</th>
                        <th className="table-head" scope="col">Número de arvores</th>
                        <th className="table-head" scope="col">Distância</th>
                        <th className="table-head" scope="col">Data de criação</th>
                        <th className="table-head" scope="col"></th>
                        <th className="table-head" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody className="table-body position-relative">
                        <ErroTrilhas/>
                        {loading?
                            <LoadingTrilhas/>
                        : trails.map(function (trail, index) {
                            return (
                                <RowTrilha 
                                    trail={trail}
                                    key={index}
                                    modalFunc={abrirModal}
                                    delModalFunc={abrirDelModal}
                                />
                            );
                        })}
                    
                    </tbody>
                </table>
            </main>
            <TrailForm trail={inputTrail} modalFunc={fecharModal} reloadTrails={fetchLista} modal={modalClass}/>
            <DelTrailForm trail={inputTrail} modalFunc={fecharDelModal} reloadTrails={fetchLista}/>
        </section>
    );
}


export default Trilhas;