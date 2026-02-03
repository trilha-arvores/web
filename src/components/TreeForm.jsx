import { useState, useEffect, useRef } from 'react';
import Loading from "../components/Loading";
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const CREATE_TREE_URL = '/admin/trees'; // Ajuste conforme seu backend
const UPDATE_TREE_URL = '/admin/trees/'; // Ajuste conforme seu backend

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
    }, [props.tree]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica Frontend
        if (!esalqId || !name || !sciName) {
            setErrMsg('Preencha os campos obrigatórios (*).');
            return;
        }

        setLoading(true);
        const payload = {
            esalq_id: esalqId,
            name,
            sci_name: sciName,
            loc,
            height,
            latitude,
            longitude,
            photo
        };

        try {
            if (props.tree) {
                // Edição (PATCH ou PUT)
                await axios.patch(UPDATE_TREE_URL + props.tree.id, payload, {
                    headers: { Authorization: auth.accessToken }
                });
            } else {
                // Criação (POST)
                await axios.post(CREATE_TREE_URL, payload, {
                    headers: { Authorization: auth.accessToken }
                });
            }
            
            props.reloadList(); // Atualiza a tabela
            props.modalFunc();  // Fecha o modal
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta do servidor.');
            } else {
                setErrMsg('Erro ao salvar árvore. Verifique os dados.');
            }
            if(errRef.current) errRef.current.focus();
        } finally {
            setLoading(false);
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

                            <div className="row g-3">
                                {/* Campos Obrigatórios */}
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Esalq ID <span className="text-danger">*</span></label>
                                    <input 
                                        type="number" className="form-control" 
                                        value={esalqId} onChange={e => setEsalqId(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Nome Popular <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" className="form-control" 
                                        value={name} onChange={e => setName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Nome Científico <span className="text-danger">*</span></label>
                                    <input 
                                        type="text" className="form-control fst-italic" 
                                        value={sciName} onChange={e => setSciName(e.target.value)} 
                                        required 
                                    />
                                </div>

                                {/* Campos Opcionais */}
                                <div className="col-12"><hr className="text-muted"/></div>
                                
                                <div className="col-md-6">
                                    <label className="form-label">Localização (Referência)</label>
                                    <input 
                                        type="text" className="form-control" 
                                        value={loc} onChange={e => setLoc(e.target.value)} 
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

                                <div className="col-md-4">
                                    <label className="form-label">Latitude</label>
                                    <input 
                                        type="number" step="any" className="form-control" 
                                        value={latitude} onChange={e => setLatitude(e.target.value)} 
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Longitude</label>
                                    <input 
                                        type="number" step="any" className="form-control" 
                                        value={longitude} onChange={e => setLongitude(e.target.value)} 
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Altura (metros)</label>
                                    <input 
                                        type="number" step="0.01" className="form-control" 
                                        value={height} onChange={e => setHeight(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-secondary" onClick={props.modalFunc}>Cancelar</button>
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