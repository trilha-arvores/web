import { useRef } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const DelTreeForm = ({ tree, modalFunc, reloadList }) => {
    const { auth } = useAuth();
    const errRef = useRef();
    
    const handleDelete = async () => {
        try {
            await axios.delete(`/admin/tree/${tree.id}`, {
                headers: {
                    Authorization: auth.accessToken,
                    'Content-Type': 'application/json'
                }
            });
            
            reloadList();
            modalFunc();
        } catch (err) {
            let errorMsg = 'Erro ao deletar árvore';
            
            if (!err?.response) {
                errorMsg = 'Sem resposta do servidor';
            } else if (err.response?.status === 400) {
                errorMsg = err.response?.data?.message || 'Não é possível deletar esta árvore (pode estar em uso em uma trilha)';
            } else if (err.response?.status === 404) {
                errorMsg = 'Árvore não encontrada';
            }
            
            if (errRef.current) {
                errRef.current.textContent = errorMsg;
            }
        }
    };

    return (
        <div 
            className="modal fade" 
            id="del_tree_modal" 
            tabIndex="-1" 
            aria-labelledby="delTreeModalLabel" 
            aria-hidden="true"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-danger text-white">
                        <h5 className="modal-title" id="delTreeModalLabel">
                            Confirmar Exclusão
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={modalFunc}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p ref={errRef} className="text-muted mb-3">
                            Tem certeza que deseja deletar a árvore <strong>{tree?.name}</strong> (ID: {tree?.id})?
                        </p>
                        <p className="text-warning small mb-0">
                            <strong>Aviso:</strong> Esta ação não pode ser desfeita!
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={modalFunc}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={handleDelete}
                        >
                            Deletar Árvore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelTreeForm;
