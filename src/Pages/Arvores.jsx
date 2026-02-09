import { useState, useEffect, useCallback, useRef } from 'react';
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js';
import Header from "../components/Header";
import DivLine from "../components/DivLine"; 
import Loading from "../components/Loading";
import TreeForm from "../components/TreeForm";
import DelTreeForm from "../components/DelTreeForm"; 

import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const GET_TREES_URL = '/admin/trees';

const Arvores = () => {
    const { auth } = useAuth();

    const [trees, setTrees] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const [loading, setLoading] = useState(false);

    const [inputTree, setInputTree] = useState(null);
    const [modalClass, setModalClass] = useState({});
    const [delModalClass, setDelModalClass] = useState({});
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('name');

    // Inicializa o Modal do Bootstrap
    useEffect(() => {
        const modalElement = document.getElementById('modal_arvore');
        if (modalElement) {
            setModalClass(Modal.getOrCreateInstance(modalElement));
        }
        
        const delModalElement = document.getElementById('del_tree_modal');
        if (delModalElement) {
            setDelModalClass(Modal.getOrCreateInstance(delModalElement));
        }
    }, []);

    // Função de busca de dados
    const fetchLista = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_TREES_URL, {
                headers: { Authorization: auth.accessToken }
            });
            
            let data = response.data;
            if (!Array.isArray(data)) {
                 // Tenta achar a lista se ela vier dentro de um objeto { data: [...] }
                 data = data.data || data.results || [];
                 if(!Array.isArray(data)) data = []; 
            }
            setTrees(data);
            setErrMsg('');

        } catch (err) {
            console.error("Erro ao buscar árvores:", err);
            if (!err?.response) {
                setErrMsg('Sem Resposta do Servidor.');
            } else if (err.response?.status === 401) {
                setErrMsg('Não Autorizado. Faça login novamente.');
            } else {
                setErrMsg('Erro ao carregar lista de árvores.');
            }
            errRef.current?.focus();
        } finally {
            setLoading(false);
        }
    }, [auth.accessToken]);

    useEffect(() => {
        fetchLista();
    }, [fetchLista]);

    const filteredTrees = Array.isArray(trees) ? trees.filter((tree) => {
        if (!tree) return false;

        const searchValue = searchTerm.toLowerCase();
        
        // Função auxiliar para evitar erro de .toLowerCase() em null/undefined
        const safeStr = (str) => (str ? String(str).toLowerCase() : '');

        if (filterBy === 'name') {
            return safeStr(tree.name).includes(searchValue) || safeStr(tree.sci_name).includes(searchValue);
        } else if (filterBy === 'esalqId') {
            return safeStr(tree.esalq_id).includes(searchValue);
        } else if (filterBy === 'loc') {
            return safeStr(tree.loc).includes(searchValue);
        }
        return true;
    }) : [];

    // Funções do Modal
    const abrirModal = (tree = null) => {
        setInputTree(tree);
        if (modalClass.show) modalClass.show();
    }

    const fecharModal = () => {
        if (modalClass.hide) modalClass.hide();
    }

    const abrirDelModal = (tree = null) => {
        setInputTree(tree);
        if (delModalClass.show) delModalClass.show();
    }

    const fecharDelModal = () => {
        if (delModalClass.hide) delModalClass.hide();
    }

    // Componentes de UI auxiliares
    const LoadingRow = () => (
        <tr className="table-row bg-white">
            <td colSpan="8" className='p-0 rounded h-auto bg-transparent'>
                <Loading className="h-auto position-static" />
            </td>
        </tr>
    );

    const ErroRow = () => (
        <tr className={!errMsg ? "d-none" : "table-row"}>
            <td colSpan="8" className='p-3' ref={errRef}>
                <p className="text-danger fw-bold mb-0">{errMsg}</p>
            </td>
        </tr>
    );

    const EmptyRow = () => (
        <tr className={filteredTrees.length === 0 && !loading && !errMsg ? "table-row" : "d-none"}>
            <td colSpan="8" className="text-center p-4 text-muted">
                {searchTerm ? 'Nenhuma árvore encontrada com os critérios de pesquisa.' : 'Nenhuma árvore cadastrada.'}
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

                {/* Seção de Pesquisa e Filtros */}
                <div className="row mb-4">
                    <div className="col-md-8 mb-3 mb-md-0">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisar por nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                        >
                            <option value="name">Filtrar por Nome</option>
                            <option value="esalqId">Filtrar por ID ESALQ</option>
                            <option value="loc">Filtrar por Localização</option>
                        </select>
                    </div>
                </div>

                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover bg-white mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="ps-4">ID</th>
                                <th scope="col">Esalq ID</th>
                                <th scope="col">Nome Popular</th>
                                <th scope="col">Nome Científico</th>
                                <th scope="col">Localização</th>
                                <th scope="col">Latitude</th>
                                <th scope="col">Longitude</th>
                                <th scope="col" className="text-end pe-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ErroRow />
                            {loading ? <LoadingRow /> : filteredTrees.map((tree) => (
                                <tr key={tree.id || Math.random()} className="table-row">
                                    <td className="ps-4 fw-bold text-secondary">#{tree.id}</td>
                                    <td><span className="badge bg-success">{tree.esalq_id}</span></td>
                                    <td className="fw-bold">{tree.name}</td>
                                    <td className="fst-italic text-muted">{tree.sci_name || '-'}</td>
                                    <td>{tree.loc || '-'}</td>
                                    <td><small className="text-muted">{typeof tree.latitude === 'number' ? tree.latitude.toFixed(4) : (tree.latitude || '-')}</small></td>
                                    <td><small className="text-muted">{typeof tree.longitude === 'number' ? tree.longitude.toFixed(4) : (tree.longitude || '-')}</small></td>
                                    <td className="text-end pe-4">
                                        <button 
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => abrirModal(tree)}
                                            title="Editar"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <EmptyRow />
                        </tbody>
                    </table>
                </div>

                {/* Contador de árvores */}
                <div className="mt-3 text-muted">
                    <small>Total: {filteredTrees.length} árvore(s)</small>
                </div>
            </main>

            {/* Modal de Formulário */}
            <TreeForm 
                tree={inputTree} 
                modalFunc={fecharModal} 
                reloadList={fetchLista}
                abrirDelModal={abrirDelModal}
            />

            {/* Modal de Deletar Árvore */}
            <DelTreeForm 
                tree={inputTree} 
                modalFunc={fecharDelModal} 
                reloadList={fetchLista} 
            />
        </section>
    );
}

export default Arvores;