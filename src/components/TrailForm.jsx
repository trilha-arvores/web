import MapTrees from "./MapTrees";
import {useState, useEffect, useRef} from 'react';
import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';
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


export default function TrailForm(props) {
    
    const [trailName, setTrailName] = useState('');
    const [inputArvore, setInputArvore] = useState('');
    const [listaArvores, setListaArvores] = useState(['4', '3', '7']);

    const popoverRef = useRef();

    useEffect(() => {
        Array.from(document.querySelectorAll('div[data-bs-toggle="popover"]'))
          .forEach(popoverNode => new Popover(popoverNode))
    })

    useEffect(() => {
        if(props.trail !== null){
            setTrailName(props.trail.name);
        }
        else{
            setTrailName('');
        }

        console.log(listaArvores);
    }, [props])
    

    useEffect(() => {
        console.log(listaArvores);
    }, [listaArvores])
    

    const adicionarArvore = () => {
        // validar se arvore existe no banco
        setListaArvores((prevListaArvores) => {
            return [...prevListaArvores, inputArvore];
        });
        // console.log('arvore adicionada');
        // console.log(listaArvores);
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
                        <h5 className="modal-title" id="staticBackdropLabel">Adicionar nova trilha</h5>
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
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row align-items-center">
                                <div className="col-md-7">
                                    <MapTrees trees={listaArvores}/>
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="new_tree" className="form-label">Digite o <b>Numero Identificador</b> da nova árvore</label>
                                    <div className="input-group"> 
                                        <input 
                                            className="form-control" 
                                            accept="image/png, image/jpeg"
                                            type="text" 
                                            name="new_tree" 
                                            id="new_tree"
                                            onChange={(e) => setInputArvore(e.target.value)}
                                            value={inputArvore}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={adicionarArvore}
                                            className="btn"
                                        >
                                            Adicionar Arvore
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
                                            {listaArvores.map((id) => (
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
                            <button type="button" className="btn btn-primary" onClick={printLista}>Salvar Mudanças</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }