import Header from "../components/Header";

const Trilhas = () => (
    
    <body className="bg-cinza">
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container">
                {/* <h2 className="navbar-brand ms-4">Lista de Trilhas</h2> */}
                <Header/>
                <form className="d-flex" role="search">
                    <div className="input-group me-4">
                        <input id="search-input" className="form-control" type="search" placeholder="Search..." aria-label="Search"/>
                        <span id="search-btn" className="input-group-text bg-white">
                            <i className="bi bi-search btn-interactice"></i>
                        </span>
                    </div>
                    <button className="btn btn-outline-success w-100" type="submit">Adicionar nova trilha</button>
                </form>
            </div>
        </nav>
        <main className="container">

            <div className="container-fluid line mt-3 mb-4"></div>
            
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="table-head" scope="col"></th>
                    <th className="table-head" scope="col">Nome</th>
                    <th className="table-head" scope="col">Número de arvores</th>
                    <th className="table-head" scope="col">Distância (km)</th>
                    <th className="table-head" scope="col">Data de criação</th>
                    <th className="table-head" scope="col"></th>
                    <th className="table-head" scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr className="table-row bg-white trilha_round">
                    <th scope="row">
                        <img src="/trees/a1.jpg" className="rounded img_lista" alt="Trilha dos flamboyant"  /*style="width: 6rem;"*//>
                    </th>
                    <td className="align-middle">Rota dos flamboyant</td>
                    <td className="align-middle">7</td>
                    <td className="align-middle">4.5</td>
                    <td className="align-middle">08-Dec,2021</td>
                    <td className="align-middle"><i className="bi bi-pencil color-txt-musgo btn-interactice edit"></i></td>
                    <td className="align-middle"><i className="bi bi-trash color-txt-musgo btn-interactice remove"></i></td>
                </tr>
                <tr className="table-row bg-white rounded mb-3">
                    <th scope="row">
                        <img src="/trees/a2.jpg" className="rounded img_lista" alt="Trilha dos Ipes"  /*style="width: 6rem;"*//>
                    </th>
                    <td className="align-middle">Caminho dos Ipês</td>
                    <td className="align-middle">5</td>
                    <td className="align-middle">3.8</td>
                    <td className="align-middle">08-Dec,2021</td>
                    <td className="align-middle"><i className="bi bi-pencil color-txt-musgo"></i></td>
                    <td className="align-middle"><i className="bi bi-trash color-txt-musgo"></i></td>
                </tr>
                <tr className="table-row bg-white rounded mb-3">
                    <th scope="row">
                        <img src="/trees/a3.jpg" className="rounded img_lista" alt="Trilha das Acacias"  /*style="width: 6rem;"*//>
                    </th>
                    <td className="align-middle">Trilha das Acácias</td>
                    <td className="align-middle">3</td>
                    <td className="align-middle">1.8</td>
                    <td className="align-middle">08-Dec,2021</td>
                    <td className="align-middle"><i className="bi bi-pencil color-txt-musgo"></i></td>
                    <td className="align-middle"><i className="bi bi-trash color-txt-musgo"></i></td>
                </tr>
                <tr className="table-row bg-white rounded mb-3">
                    <th scope="row">
                        <img src="/trees/a4.jpg" className="rounded img_lista" alt="Trilha das Jabuticabeiras"  /*style="width: 6rem;"*//>
                    </th>
                    <td className="align-middle">Trilha das Jabuticabeiras</td>
                    <td className="align-middle">8</td>
                    <td className="align-middle">2,0</td>
                    <td className="align-middle">08-Dec,2021</td>
                    <td className="align-middle"><i className="bi bi-pencil color-txt-musgo"></i></td>
                    <td className="align-middle"><i className="bi bi-trash color-txt-musgo"></i></td>
                </tr>
                <tr className="table-row bg-white rounded mb-3">
                    <th scope="row">
                        <img src="/trees/a5.jpg" className="rounded img_lista" alt="Trilha dos flamboyant"  /*style="width: 6rem;"*//>
                    </th>
                    <td className="align-middle">Passeio das Aroeiras</td>
                    <td className="align-middle">3</td>
                    <td className="align-middle">0,5</td>
                    <td className="align-middle">08-Dec,2021</td>
                    <td className="align-middle"><i className="bi bi-pencil color-txt-musgo"></i></td>
                    <td className="align-middle"><i className="bi bi-trash color-txt-musgo"></i></td>
                </tr>
                <tr className="table-row bg-white rounded mb-3">
                    <th scope="row">
                        <img src="/trees/a6.jpg" className="rounded img_lista" alt="Trilha dos flamboyant"  /*style="width: 6rem;"*//>
                    </th>
                    <td className="align-middle">Trilha das Figueiras</td>
                    <td className="align-middle">10</td>
                    <td className="align-middle">3.3</td>
                    <td className="align-middle">08-Dec,2021</td>
                    <td className="align-middle"><i className="bi bi-pencil color-txt-musgo"></i></td>
                    <td className="align-middle"><i className="bi bi-trash color-txt-musgo"></i></td>
                </tr>
                <tr className="table-row bg-white rounded mb-3">
                    <th scope="row">
                        <img src="/trees/a7.jpg" className="rounded img_lista" alt="Trilha dos flamboyant"  /*style="width: 6rem;"*//>
                    </th>
                    <td className="align-middle">Passeio das Extremosas</td>
                    <td className="align-middle">7</td>
                    <td className="align-middle">1.8</td>
                    <td className="align-middle">08-Dec,2021</td>
                    <td className="align-middle"><i className="bi bi-pencil color-txt-musgo"></i></td>
                    <td className="align-middle"><i className="bi bi-trash color-txt-musgo"></i></td>
                </tr>
                </tbody>
            </table>
        </main>
    </body>
      )


export default Trilhas;