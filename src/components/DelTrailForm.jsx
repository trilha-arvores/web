import {useState, useEffect, useRef} from 'react';
import { BsXCircle } from "react-icons/bs";
import Loading from './Loading';

import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const GET_TRAIL_URL = '/admin/trail/';


export default function DelTrailForm(props) {
    const {auth} = useAuth();
    
    const [trailName, setTrailName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const errRef = useRef();

    useEffect(() => {
        if(props.trail !== null){
            setTrailName(props.trail.name);
        }
        else{
            setTrailName('');
        }
    }, [props])


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
    
        try {
            const response = await axios.delete(GET_TRAIL_URL+props.trail.id, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            
            props.reloadTrails();
            props.modalFunc();
        } catch (err) {
            if(!err?.response){
                setErrMsg('Sem Resposta do Servidor');
            }
            else if(err.response?.status === 401){
                setErrMsg('Não Autorizado, recarregue a página e tente novamente.');
            }
            else{
                setErrMsg('Não foi possível deletar esta trilha, recarregue a página e tente novamente.');
            }
                    
            errRef.current.focus();
        }
        finally{
            setLoading(false);
        }
        
    }

    return (
        <div className="modal fade" 
        id="del_modal_trilha" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabIndex="-1" 
        aria-labelledby="delBackdropLabel" 
        aria-hidden="true"
        ref={props.ref}>
            <div className="modal-dialog text-center modal-confirm modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="icon-box">
                            <BsXCircle/>
                        </div>
                        <h4 className="modal-title" id="delBackdropLabel">Você tem certeza?</h4>
                        <div className="modal-body">
                            <p>Você realmente quer apagar a trilha "{trailName}"? Esse procedimento não pode ser desfeito.</p>
                        </div>
                        
                        <p ref={errRef} 
                            className={errMsg ? "invalid-feedback d-block text": ""} 
                            aria-live='assertive'>
                                {errMsg}
                        </p>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={handleSubmit}>Deletar</button>
                        </div>
                    </form>
                    {loading? <Loading />: ''}
                </div>
            </div>
        </div>
    );
}