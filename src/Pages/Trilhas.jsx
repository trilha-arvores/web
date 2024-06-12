import trailsData from "../data/trails";
import { useState, useEffect } from 'react';
import {Modal} from 'bootstrap/dist/js/bootstrap.esm.min.js';

import Header from "../components/Header";
import RowTrilha from "../components/RowTrilha";
import DivLine from "../components/DivLine";
import TrailForm from "../components/TrailForm";

const Trilhas = () => {


    const [trails, setTrail] = useState(trailsData);

    const [inputTrail, setInputTrail] = useState(null);
    
    const [modalClass, setModalClass] = useState({});

    
    useEffect(() => {
        setModalClass(new Modal(document.getElementById('modal_trilha')));
    }, [])

    const abrirModal = (trail) => {
        setInputTrail(trail);
        modalClass.toggle();
    }

    
    return (
        <section className="bg-cinza">
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container flex-row-reverse flex-md-row">
                    <Header/>
                    <form className="d-flex" role="search">
                        <input id="search-input" className="form-control me-4" type="search" placeholder="Search..." aria-label="Search"/>
                        <button 
                            className="d-none d-md-block btn btn-outline-success w-100" 
                            type="button"
                            onClick={() => {abrirModal(null)}}
                        >
                            Adicionar nova trilha
                        </button>
                    </form>
                </div>
            </nav>
            <main className="container">

                <DivLine/>
                
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th className="table-head" scope="col"></th>
                        <th className="table-head" scope="col">Nome</th>
                        <th className="table-head" scope="col">Número de arvores</th>
                        <th className="table-head" scope="col">Distância</th>
                        <th className="table-head" scope="col">Data de criação</th>
                        <th className="table-head" scope="col"></th>
                        <th className="table-head" scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {trails.map(function (trail, index) {
                            return (
                                <RowTrilha 
                                    trail={trail}
                                    key={index}
                                    modalFunc={abrirModal}
                                />
                            );
                        })}
                    
                    </tbody>
                </table>
            </main>
            <TrailForm trail={inputTrail}/>
        </section>
    );
}


export default Trilhas;