import MapTrees from "./MapTrees";
import {useState, useEffect, useRef} from 'react';
import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';
import { BsXCircle, BsPlusLg } from "react-icons/bs";
import {
    DndContext, 
    closestCenter,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    horizontalListSortingStrategy,
    arrayMove
  } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

import axios from '../api/axios';
import useAuth from "../hooks/useAuth";

const GET_TRAIL_URL = '/admin/trail/';
const CREATE_TRAIL_URL = '/admin/create'

export default function TrailForm(props) {
    const {auth} = useAuth();
    
    const [typeForm, setTypeForm] = useState('create');
    const [trailName, setTrailName] = useState('');
    const [trailImage, setTrailImage] = useState({});
    const [inputArvore, setInputArvore] = useState('');
    const [listaArvores, setListaArvores] = useState([]);

    const popoverRef = useRef();

    useEffect(() => {
        
        Array.from(document.querySelectorAll('div[data-bs-toggle="popover"]'))
          .forEach(popoverNode => new Popover(popoverNode))
    })

    useEffect(() => {
        const fetchTrilha = async () => {
            try {
                const response = await axios.get(GET_TRAIL_URL+props.trail.id, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                return Object.values(response.data.trees).map(item => item.esalq_id.toString());
            } catch (err) {
                console.log("ERROU!!!");
                return [];
            }

        };

        const updateTrailInfo = async () => {
            if(props.trail !== null){
                setTrailName(props.trail.name);
                setTypeForm('edit');
                const arvores = await fetchTrilha();
                setListaArvores(arvores);
            }
            else{
                setTrailName('');
                setTypeForm('create');
                setListaArvores([]);
            }
        }

        updateTrailInfo();
    }, [props])
    

    useEffect(() => {
        console.log(listaArvores);
    }, [listaArvores])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(typeForm == "create"){
            try{
                console.log(JSON.stringify({
                    name: trailName, 
                    n_trees: listaArvores.length, 
                    trees: listaArvores,
                    file: trailImage
                }))
                const response = await axios.post(CREATE_TRAIL_URL,
                    JSON.stringify({
                        name: trailName, 
                        n_trees: listaArvores.length, 
                        trees: listaArvores,
                        file: trailImage
                    }),
                    {
                        headers: {'Content-Type': 'application/json',
                                    Authorization: auth.accessToken}
                    }
                );

                console.log(response);
                
                props.reloadTrails();
                props.modalFunc();
            } catch(err){
                console.log(err);
    
                // errRef.current.focus();
            }

        }
        
        // try{
        //     const response = await axios.post(LOGIN_URL,
        //         JSON.stringify({username, password}),
        //         {
        //             headers: {'Content-Type': 'application/json'},
        //             // withCredentials: true
        //         }
        //     );

        //     const accessToken = response?.data;
        //     setAuth({username, password, accessToken});
        //     setUsername('');
        //     setPassword('');
        //     navigate('/trilhas', {replace: true})
        // } catch(err){
        //     if(!err?.response){
        //         setErrMsg('Sem Resposta do Servido');
        //     }
        //     else if(err.response?.status === 400){
        //         setErrMsg('Não Autorizado');
        //     }
        //     else{
        //         setErrMsg('LogIn Falhou');
        //     }

        //     errRef.current.focus();
        // }

    }
    

    const adicionarArvore = () => {

        const input = inputArvore;
        if (!isNaN(input) && input.trim() !== '') {
            // validar se arvore existe no banco
            setListaArvores((prevListaArvores) => {
                return [...prevListaArvores, inputArvore];
            });
            setInputArvore('');
        }
        else{
            console.log("ajeita isso");
            setInputArvore('');
        }

    }
    
    const removerArvore = () => {
        setListaArvores((prevListaArvores) => {
            return prevListaArvores.filter(arvore => arvore !== inputArvore);
        });

        setInputArvore('');

    }

    const printLista = () => {
        console.log(listaArvores);
    }

    const handleDragEnd = (e) => {
        if (!e.over) return;
    
        if (e.active.id !== e.over.id) {
            setListaArvores((listaArvores) => {
            const oldIdx = listaArvores.indexOf(e.active.id.toString());
            const newIdx = listaArvores.indexOf(e.over.id.toString());
            return arrayMove(listaArvores, oldIdx, newIdx);
          });
        }
    };

    return (
        <div className="modal fade" 
        id="modal_trilha" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabIndex="-1" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true"
        ref={props.ref}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{typeForm=='create'?"Adicionar nova trilha":`Atualizar Trilha "${trailName}"` }</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="nome_trilha" className="form-label">Adicione o nome da Trilha</label>
                                    <input 
                                        className="form-control" 
                                        type="text"
                                        placeholder="Nome da Trilha" 
                                        id="nome_trilha"
                                        onChange={(e) => setTrailName(e.target.value)}
                                        value={trailName}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="imagem_trilha" className="form-label">Adicione uma imagem para a Trilha</label>
                                    <input 
                                        className="form-control" 
                                        accept="image/png, image/jpeg"
                                        type="file" 
                                        name="imagem_trilha" 
                                        id="imagem_trilha"
                                        onChange={(e) => setTrailImage(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row align-items-center">
                                <div className="col-md-7">
                                    <MapTrees trees={listaArvores}/>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="new_tree" className="form-label">Digite o <b>Numero Identificador</b> da árvore</label>
                                    <div className="input-group"> 
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            name="new_tree" 
                                            id="new_tree"
                                            onChange={(e) => setInputArvore(e.target.value)}
                                            value={inputArvore}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={adicionarArvore}
                                            className="btn btn-success"
                                        >
                                            <BsPlusLg/>
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={removerArvore}
                                            className="btn btn-danger"
                                        >
                                            <BsXCircle/>
                                        </button>
                                    </div>  
                                    
                                    <section className="d-flex align-items-end">
                                        <div
                                            ref={popoverRef}
                                            data-bs-container="body" 
                                            data-bs-toggle="popover" 
                                            data-bs-placement="bottom" 
                                            title=""
                                            data-bs-content="O Número Indicador da árvore é aquele que aparece como Número da Placa quando você usa o QrCode."
                                            className="tutorial-arvores ms-auto"
                                        >
                                            O que é o Número Identificador
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <ul className="list-group list-group-horizontal-md">
                                        <SortableContext 
                                            items={listaArvores}
                                            strategy={horizontalListSortingStrategy}
                                        >
                                            {
                                            listaArvores.map((id) => (
                                                <SortableItem key={id}>
                                                    {id}
                                                </SortableItem>
                                            ))}
                                        </SortableContext>
                                    </ul>
                                </DndContext>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>{typeForm=='create'?"Criar Trilha":"Salvar Mudanças"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }