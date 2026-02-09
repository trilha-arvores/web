import { useRef, useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const AddTreeForm = ({ modalFunc, reloadTrees, modal }) => {
    const { auth } = useAuth();

    const [esalqId, setEsalqId] = useState('');
    const [name, setName] = useState('');
    const [sciName, setSciName] = useState('');
    const [loc, setLoc] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [height, setHeight] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const errRef = useRef();
    const successRef = useRef();

    const clearForm = () => {
        setEsalqId('');
        setName('');
        setSciName('');
        setLoc('');
        setLatitude('');
        setLongitude('');
        setHeight('');
        setErrMsg('');
        setSuccessMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!esalqId || !name || !sciName || !loc || !latitude || !longitude) {
            setErrMsg('Por favor, preencha todos os campos obrigatórios');
            errRef.current?.focus();
            return;
        }

        try {
            const latNum = parseFloat(latitude);
            const lonNum = parseFloat(longitude);
            const heightNum = height ? parseFloat(height) : null;

            if (isNaN(latNum) || isNaN(lonNum)) {
                setErrMsg('Latitude e longitude devem ser números válidos');
                errRef.current?.focus();
                return;
            }

            const response = await axios.post(
                '/admin/tree',
                {
                    esalq_id: parseInt(esalqId),
                    name,
                    sci_name: sciName,
                    loc,
                    latitude: latNum,
                    longitude: lonNum,
                    height: heightNum,
                },
                {
                    headers: {
                        Authorization: auth.accessToken,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSuccessMsg('Árvore criada com sucesso!');
            successRef.current?.focus();
            setTimeout(() => {
                clearForm();
                modalFunc();
                reloadTrees();
            }, 1500);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem Resposta do Servidor');
            } else if (err.response?.status === 409) {
                setErrMsg('Uma árvore com este esalq_id já existe');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response?.data?.message || 'Preencha todos os campos corretamente');
            } else {
                setErrMsg('Falha ao criar árvore');
            }

            errRef.current?.focus();
        }
    };

    return (
        <div
            className="modal fade"
            id="add_tree_modal"
            tabIndex="-1"
            aria-labelledby="addTreeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addTreeModalLabel">
                            Adicionar Nova Árvore
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                clearForm();
                                modalFunc();
                            }}
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {errMsg && (
                                <div className="alert alert-danger" role="alert" ref={errRef}>
                                    {errMsg}
                                </div>
                            )}
                            {successMsg && (
                                <div className="alert alert-success" role="alert" ref={successRef}>
                                    {successMsg}
                                </div>
                            )}

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="esalqId" className="form-label">
                                        ID ESALQ <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="esalqId"
                                        placeholder="Ex: 123"
                                        value={esalqId}
                                        onChange={(e) => setEsalqId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Nome <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Ex: Ipê Roxo"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="sciName" className="form-label">
                                    Nome Científico <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sciName"
                                    placeholder="Ex: Tabebuia impetiginosa"
                                    value={sciName}
                                    onChange={(e) => setSciName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="loc" className="form-label">
                                    Localização <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="loc"
                                    placeholder="Ex: Próximo ao portão"
                                    value={loc}
                                    onChange={(e) => setLoc(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="latitude" className="form-label">
                                        Latitude <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        className="form-control"
                                        id="latitude"
                                        placeholder="Ex: -22.7149"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="longitude" className="form-label">
                                        Longitude <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        className="form-control"
                                        id="longitude"
                                        placeholder="Ex: -47.6203"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="height" className="form-label">
                                    Altura (m)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    id="height"
                                    placeholder="Ex: 15.5"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    clearForm();
                                    modalFunc();
                                }}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Adicionar Árvore
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTreeForm;
