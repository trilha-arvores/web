import { useState, useEffect, useRef } from 'react';
import Loading from "../components/Loading";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const CREATE_TREE_URL = '/admin/tree';
const UPDATE_TREE_URL = '/admin/tree/';

export default function TreeForm(props) {
    const { auth } = useAuth();
    
    // Estados dos campos
    const [esalqId, setEsalqId] = useState('');
    const [name, setName] = useState('');
    const [sciName, setSciName] = useState('');
    const [loc, setLoc] = useState('');
    const [height, setHeight] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [photo, setPhoto] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const errRef = useRef();

    // Preenche o formulário se for edição
    useEffect(() => {
        if (props.tree) {
            setEsalqId(props.tree.esalq_id || '');
            setName(props.tree.name || '');
            setSciName(props.tree.sci_name || '');
            setLoc(props.tree.loc || '');
            setHeight(props.tree.height || '');
            setLatitude(props.tree.latitude || '');
            setLongitude(props.tree.longitude || '');
            setPhoto(props.tree.photo || '');
        } else {
            // Limpa se for criação
            setEsalqId('');
            setName('');
            setSciName('');
            setLoc('');
            setHeight('');
            setLatitude('');
            setLongitude('');
            setPhoto('');
        }
        setErrMsg('');
        setSuccessMsg('');
    }, [props.tree]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica Frontend - campos obrigatórios
        if (!esalqId || !name || !sciName || !loc || !latitude || !longitude) {
            setErrMsg('Preencha todos os campos obrigatórios (*).');
            errRef.current?.focus();
            return;
        }

        // Validar que latitude e longitude são números válidos
        const latNum = parseFloat(latitude);
        const lonNum = parseFloat(longitude);
        if (isNaN(latNum) || isNaN(lonNum)) {
            setErrMsg('Latitude e longitude devem ser números válidos.');
            errRef.current?.focus();
            return;
        }

        setLoading(true);
        const payload = {
            esalq_id: parseInt(esalqId),
            name,
            sci_name: sciName,
            loc,
            height: height ? parseFloat(height) : null,
            latitude: latNum,
            longitude: lonNum,
            photo: photo || null
        };

        try {
            if (props.tree) {
                // Edição (PATCH)
                await axios.patch(UPDATE_TREE_URL + props.tree.id, payload, {
                    headers: { 
                        Authorization: auth.accessToken,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                // Criação (POST)
                await axios.post(CREATE_TREE_URL, payload, {
                    headers: {
                        Authorization: auth.accessToken,
                        'Content-Type': 'application/json'
                    }
                });
            }
            
            setSuccessMsg(props.tree ? 'Árvore atualizada com sucesso!' : 'Árvore criada com sucesso!');
            setTimeout(() => {
                props.reloadList(); // Atualiza a tabela
                props.modalFunc();  // Fecha o modal
            }, 1500);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta do servidor.');
            } else if (err.response?.status === 409) {
                setErrMsg('Uma árvore com este esalq_id já existe.');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response?.data?.message || 'Erro ao salvar árvore. Verifique os dados.');
            } else {
                setErrMsg('Erro ao salvar árvore.');
            }
            errRef.current?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        if (props.abrirDelModal) {
            props.abrirDelModal(props.tree);
        }
    };

    return (
        <div className="modal fade" id="modal_arvore" tabIndex="-1" aria-hidden="true" data-bs-backdrop="static">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {props.tree ? `Editar Árvore #${props.tree.id}` : "Nova Árvore"}
                        </h5>
                        <button type="button" className="btn-close" onClick={props.modalFunc} aria-label="Close"></button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {errMsg && (
                                <div ref={errRef} className="alert alert-danger" role="alert">
                                    {errMsg}
                                </div>
                            )}
                            {successMsg && (
                                <div className="alert alert-success" role="alert">
                                    {successMsg}
                                </div>
                            )}

                            <div className="row g-3">
                                {/* Campos Obrigatórios */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Esalq ID <span className="text-danger">*</span></label>
                                    <input 
                                        type="number" className="form-control" 
                                        value={esalqId} onChange={e => setEsalqId(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Nome Popular <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" className="form-control" 
                                        value={name} onChange={e => setName(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-bold">Nome Científico <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" className="form-control fst-italic" 
                                        value={sciName} onChange={e => setSciName(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-bold">Localização <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" className="form-control" 
                                        value={loc} onChange={e => setLoc(e.target.value)} 
                                        required
                                        placeholder="Ex: Próximo ao portão"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Latitude <span className="text-danger">*</span></label>
                                    <input 
                                        type="number" step="0.0001" className="form-control" 
                                        value={latitude} onChange={e => setLatitude(e.target.value)} 
                                        required
                                        placeholder="Ex: -22.7149"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Longitude <span className="text-danger">*</span></label>
                                    <input 
                                        type="number" step="0.0001" className="form-control" 
                                        value={longitude} onChange={e => setLongitude(e.target.value)} 
                                        required
                                        placeholder="Ex: -47.6203"
                                    />
                                </div>

                                {/* Campos Opcionais */}
                                <div className="col-12"><hr className="text-muted" /></div>
                                
                                <div className="col-md-6">
                                    <label className="form-label">Altura (metros)</label>
                                    <input 
                                        type="number" step="0.1" className="form-control" 
                                        value={height} onChange={e => setHeight(e.target.value)} 
                                        placeholder="Ex: 15.5"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">URL da Foto</label>
                                    <input 
                                        type="text" className="form-control" 
                                        value={photo} onChange={e => setPhoto(e.target.value)} 
                                        placeholder="http://..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-secondary" onClick={props.modalFunc}>Cancelar</button>
                            {props.tree && (
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    {loading ? 'Deletando...' : 'Deletar Árvore'}
                                </button>
                            )}
                            <button type="submit" className="btn btn-success fw-bold" disabled={loading}>
                                {loading ? 'Salvando...' : 'Salvar Dados'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}