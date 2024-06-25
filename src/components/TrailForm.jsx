import MapTrees from "./MapTrees";
import {useState, useEffect, useRef} from 'react';
import { Popover, Modal } from 'bootstrap/dist/js/bootstrap.esm.min.js';
import { BsXCircle, BsPlusLg } from "react-icons/bs";
import Loading from "../components/Loading";
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
const CREATE_TRAIL_URL = '/admin/create';
const GET_TREE_URL = '/admin/esalqid/';
const UPDATE_TRAIL_URL = '/admin/trail/'

export default function TrailForm(props) {
    const {auth} = useAuth();
    
    const [typeForm, setTypeForm] = useState('create');
    const [trailName, setTrailName] = useState('');

    const [trailImage, setTrailImage] = useState({});
    const [trailImageUrl, setTrailImageUrl] = useState('');
    const [trailImageValue, setTrailImageValue] = useState('');
    const [trailMap, setTrailMap] = useState({});
    const [trailMapUrl, setTrailMapUrl] = useState('');
    const [trailMapValue, setTrailMapValue] = useState('');

    const [inputArvore, setInputArvore] = useState('');
    const [listaArvores, setListaArvores] = useState([]);
    const [treeInfo, setTreeInfo] = useState({});

    const [errMsg, setErrMsg] = useState('');
    const [treeErrMsg, setTreeErrMsg] = useState('');
    const errRef = useRef();
    const treeErrRef = useRef();

    const [loading, setLoading] = useState(false);
    const [loadedInfo, setLoadedInfo] = useState(true);

    const [imageModalClass, setImageModalClass] = useState({});
    const [modalUrlImage, setModalUrlImage] = useState('');

    const popoverRef = useRef();

    useEffect(() => {
        
        Array.from(document.querySelectorAll('div[data-bs-toggle="popover"]'))
          .forEach(popoverNode => new Popover(popoverNode));
          
          setImageModalClass(Modal.getOrCreateInstance('#imageModal'));
    })

    useEffect(() => {

        const fetchTrilha = async () => {
            setLoadedInfo(false);
            try {
                const response = await axios.get(GET_TRAIL_URL+props.trail.id, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                setLoadedInfo(true);
                setTreeInfo(response.data.trees);
                return Object.values(response.data.trees).map(item => item.esalq_id.toString());
            } catch (err) {
                if(!err?.response){
                    setErrMsg('Sem Resposta do Servidor.');
                }
                else if(err.response?.status === 401){
                    setErrMsg('Não Autorizado, recarregue a página e tente novamente.');
                }
                else{
                    setErrMsg('Não foi possível carregar as informações da trilha.');
                }

                setLoadedInfo(false);
                errRef.current.focus();
                
                setTreeInfo({});
                return [];
            }

        };

        const updateTrailInfo = async () => {
            setLoading(true);
            if(props.trail !== null){
                setTrailName(props.trail.name);
                setTypeForm('edit');
                setTrailImageUrl(props.trail.thumb_img);
                setTrailMapUrl(props.trail.map_img);
                const arvores = await fetchTrilha();
                setListaArvores(arvores);
            }
            else{
                setLoadedInfo(true);
                setTrailName('');
                setTypeForm('create');
                setListaArvores([]);
                setTreeInfo({});
                setTrailImageUrl('');
                setTrailMapUrl('');
            }
            setTrailImage({});
            setTrailImageValue('');
            setTrailMap({});
            setTrailMapValue('');
            setErrMsg('');
            setLoading(false);
        }

        if(props.modal._isShown)
            updateTrailInfo();
        
    }, [props.trail])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(trailName == ''){
            setErrMsg('Nome não pode estar vazio.');
            errRef.current.focus();
            return ;
        }
            
        if(listaArvores.length == 0){
            setErrMsg('Por favor insira árvores na trilha.');
            errRef.current.focus();
            return ;
        }

        if(typeForm == "create"){

            if(trailImageValue == ''){
                setErrMsg('Por favor insira a imagem da trilha.');
                errRef.current.focus();
                return ;
            }
            
            if(trailMapValue == ''){
                setErrMsg('Por favor insira o mapa da trilha.');
                errRef.current.focus();
                return ;
            }

            setErrMsg('');

            try{
                const formData = new FormData();
                formData.append('name', trailName);
                formData.append('trees', JSON.stringify(listaArvores));
                formData.append('thumb_img', trailImage);
                formData.append('map_img', trailMap);
                const response = await axios.post(CREATE_TRAIL_URL,
                    formData,
                    {
                        headers: {'Content-Type': 'multipart/form-data',
                                    Authorization: auth.accessToken}
                    }
                );
                
                props.reloadTrails();
                props.modalFunc();
            } catch(err){
                if(!err?.response){
                    setErrMsg('Sem Resposta do Servidor.');
                }
                else if(err.response?.status === 400){
                    setErrMsg('Por favor insira árvores na trilha.');
                }
                else if(err.response?.status === 401){
                    setErrMsg('Não Autorizado, recarregue a página e tente novamente.');
                }
                else{
                    setErrMsg('Não foi possível criar trilha.');
                }
    
                errRef.current.focus();
            }
            finally{
                setLoading(false);
            }

        }
        else{

            setErrMsg('');
            setLoading(true);

            try{
                const formData = new FormData();
                formData.append('name', trailName);
                formData.append('trees', JSON.stringify(listaArvores));
                formData.append('thumb_img', trailImage);
                formData.append('map_img', trailMap);
                const response = await axios.patch(UPDATE_TRAIL_URL+props.trail.id,
                    formData,
                    {
                        headers: {'Content-Type': 'multipart/form-data',
                                    Authorization: auth.accessToken}
                    }
                );
                
                props.reloadTrails();
                props.modalFunc();
            } catch(err){
                if(!err?.response){
                    setErrMsg('Sem Resposta do Servidor.');
                }
                else if(err.response?.status === 401){
                    setErrMsg('Não Autorizado, recarregue a página e tente novamente.');
                }
                else{
                    setErrMsg('Não foi possível atualizar trilha.');
                }
    
                errRef.current.focus();
            }
            finally{
                setLoading(false);
            }

        }

    }
    

    const adicionarArvore = async (e) => {
        setTreeErrMsg('');
        const input = inputArvore;
        if (!isNaN(input) && input.trim() !== '') {
            if(listaArvores.includes(input)){
                setTreeErrMsg('A árvore já está na trilha.');
                setInputArvore('');
                treeErrRef.current.focus();
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get(GET_TREE_URL+input, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });

                if(response.data.latitude == null){
                    setErrMsg('Árvore não existe na base de dados.');
                    errRef.current.focus();
                    return;
                }

                setTreeInfo(prevTreeInfo => ({
                    ...prevTreeInfo,
                    [Object.keys(prevTreeInfo).length]: response.data
                }));

                setListaArvores((prevListaArvores) => {
                    return [...prevListaArvores, input];
                });
            } catch (err) {
                if(!err?.response){
                    setErrMsg('Sem Resposta do Servidor.');
                }
                else if(err.response?.status === 401){
                    setErrMsg('Não Autorizado, recarregue a página e tente novamente.');
                }
                else if(err.response?.status == 404){
                    setErrMsg('Árvore não existe na base de dados.');
                }
                else{
                    setErrMsg('Virificação da árvore falou.');
                }

                errRef.current.focus();
            } finally {
                setLoading(false);
                setInputArvore('');
            }
        }
        else{
            setTreeErrMsg('O número identificador precisa ser um número.');
            setInputArvore('');
            treeErrRef.current.focus();
        }

    }
    
    const removerArvore = () => {
        setListaArvores((prevListaArvores) => {
            return prevListaArvores.filter(arvore => arvore !== inputArvore);
        });

        setInputArvore('');

    }

    const updateTrailImage = (e) => {
        setTrailImage(e.target.files[0]);
        setTrailImageValue(e.target.value);
    }

    const updateTrailMap = (e) => {
        setTrailMap(e.target.files[0]);
        setTrailMapValue(e.target.value);
    }

    const openImageModal = () => {

        setModalUrlImage(trailImageUrl);

        imageModalClass.toggle();
    }

    const openMapModal = () => {

        setModalUrlImage(trailMapUrl);

        imageModalClass.toggle();
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
        <>
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
                                    <div className="col-md-12 mb-3 form-floating">
                                        <input 
                                            className="form-control" 
                                            type="text"
                                            placeholder="Nome da Trilha" 
                                            id="nome_trilha"
                                            onChange={(e) => setTrailName(e.target.value)}
                                            value={trailName}
                                            disabled={!loadedInfo}
                                        />
                                        <label htmlFor="nome_trilha" className="form-label ms-2 z-1">Nome da Trilha</label>
                                    </div>
                                    <div className="col-md-6 mb-3 bnt-normal">
                                        <label htmlFor="imagem_trilha" className="form-label ms-2">Imagem da Trilha</label>
                                        {typeForm == 'edit'?
                                        <button type="button" className="btn btn-secondary image-btn mb-2" onClick={openImageModal}>
                                            Ver imagem
                                        </button>
                                        :
                                        <></>}
                                        <input 
                                            className="form-control" 
                                            accept="image/png, image/jpeg"
                                            type="file" 
                                            name="imagem_trilha" 
                                            id="imagem_trilha"
                                            onChange={updateTrailImage}
                                            value={trailImageValue}
                                            disabled={!loadedInfo}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3 bnt-normal">
                                        <label htmlFor="mapa_trilha" className="form-label ms-2">Mapa da Trilha</label>
                                        {typeForm == 'edit'?
                                        <button type="button" className="btn btn-secondary image-btn mb-2" onClick={openMapModal}>
                                            Ver mapa
                                        </button>
                                        :
                                        <></>}
                                        <input 
                                            className="form-control" 
                                            accept="image/png, image/jpeg"
                                            type="file" 
                                            name="mapa_trilha" 
                                            id="mapa_trilha"
                                            onChange={updateTrailMap}
                                            value={trailMapValue}
                                            disabled={!loadedInfo}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row align-items-center">
                                    <div className="col-md-7">
                                        <MapTrees trees={treeInfo} order={listaArvores}/>
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
                                                disabled={!loadedInfo}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={adicionarArvore}
                                                className="btn btn-success z-1"
                                            >
                                                <BsPlusLg/>
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={removerArvore}
                                                className="btn btn-danger z-1"
                                            >
                                                <BsXCircle/>
                                            </button>
                                        </div>
                                        <p ref={treeErrRef} 
                                            className={treeErrMsg ? "invalid-feedback d-block text": ""} 
                                            aria-live='assertive'>
                                                {treeErrMsg}
                                        </p>
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
                                <p ref={errRef} 
                                    className={errMsg ? "invalid-feedback d-block text": ""} 
                                    aria-live='assertive'>
                                        {errMsg}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>{typeForm=='create'?"Criar Trilha":"Salvar Mudanças"}</button>
                            </div>
                        </form>
                    </div>
                    {loading? <Loading/>: <></>}
                </div>
            </div>
            <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="imageModalLabel">{trailName}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src={modalUrlImage} className="w-100" alt="thumbnail da trilha" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }