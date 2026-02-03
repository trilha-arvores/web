import { useState, useEffect, useCallback, useRef } from 'react';
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js';
import Header from "../components/Header";
import DivLine from "../components/DivLine"; 
import Loading from "../components/Loading";
import TreeForm from "../components/TreeForm"; 

import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const GET_TREES_URL = '/admin/trees'; // Analisar backend

const Arvores = () => {
    const { auth } = useAuth();

    const [trees, setTrees] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const [loading, setLoading] = useState(false);

    // Estado para controle da edição/criação
    const [inputTree, setInputTree] = useState(null);
    const [modalClass, setModalClass] = useState({});

    // Inicializa o Modal do Bootstrap
    useEffect(() => {
        const modalElement = document.getElementById('modal_arvore');
        if (modalElement) {
            setModalClass(Modal.getOrCreateInstance(modalElement));
        }
    }, []);

    // Função de busca de dados
    const fetchLista = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_TREES_URL, {
                headers: { Authorization: auth.accessToken } // Seu padrão de auth
            });
            setTrees(response.data);
            setErrMsg('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem Resposta do Servidor.');
            } else if (err.response?.status === 401) {
                setErrMsg('Não Autorizado. Faça login novamente.');
            } else {
                setErrMsg('Erro ao carregar lista de árvores.');
            }
        } finally {
            setLoading(false);
        }
    }, [auth.accessToken]);

    useEffect(() => {
        fetchLista();
    }, [fetchLista]);

    // Funções do Modal
    const abrirModal = (tree = null) => {
        setInputTree(tree);
        if (modalClass.show) modalClass.show();
    }

    const fecharModal = () => {
        if (modalClass.hide) modalClass.hide();
    }

    // Componentes de UI auxiliares (iguais ao Trilhas.jsx)
    const LoadingRow = () => (
        <tr className="table-row bg-white">
            <td colSpan="6" className='p-0 rounded h-auto bg-transparent'>
                <Loading className="h-auto position-static" />
            </td>
        </tr>
    );

    const ErroRow = () => (
        <tr className={!errMsg ? "d-none" : "table-row"}>
            <td colSpan="6" className='p-3 text-danger text-center fw-bold'>
                <p ref={errRef}>{errMsg}</p>
            </td>
        </tr>
    );

    return (
        <section className="bg-cinza">
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container flex-row-reverse flex-md-row">
                    <Header />
                    <div className="d-flex align-items-center w-auto">
                        <button 
                            className="btn btn-outline-success w-100 fw-bold" 
                            type="button"
                            onClick={() => abrirModal(null)}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Nova Árvore
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container">
                <DivLine />
                
                <h3 className="my-3 text-secondary">Gerenciar Árvores</h3>

                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover bg-white mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="ps-4">ID</th>
                                <th scope="col">Esalq ID</th>
                                <th scope="col">Nome Popular</th>
                                <th scope="col">Nome Científico</th>
                                <th scope="col">Localização</th>
                                <th scope="col" className="text-end pe-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ErroRow />
                            {loading ? <LoadingRow /> : trees.map((tree) => (
                                <tr key={tree.id} className="table-row">
                                    <td className="ps-4 fw-bold text-secondary">#{tree.id}</td>
                                    <td><span className="badge bg-success">{tree.esalq_id}</span></td>
                                    <td className="fw-bold">{tree.name}</td>
                                    <td className="fst-italic text-muted">{tree.sci_name}</td>
                                    <td>{tree.loc || '-'}</td>
                                    <td className="text-end pe-4">
                                        <button 
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => abrirModal(tree)}
                                            title="Editar"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && trees.length === 0 && !errMsg && (
                                <tr>
                                    <td colSpan="6" className="text-center p-4 text-muted">
                                        Nenhuma árvore cadastrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal de Formulário */}
            <TreeForm 
                tree={inputTree} 
                modalFunc={fecharModal} 
                reloadList={fetchLista} 
            />
        </section>
    );
}

export default Arvores;