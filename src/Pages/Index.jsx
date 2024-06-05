import Header from "../components/Header";

const Index = () => (
    <main>
        
        <section className="h-100">

            <div className="row">
                <div className="text-black col-md-6">
                    <div id="headerDiv">
                        <Header/>
                    </div>
                    
                    
                    <div className="px-xl-5 ms-4 mt-3">
                        <span className="h1 fw-bold mb-0">TRILHA DAS ÁRVORES</span>
                        <p className="fa-2x pt-3 fs-4 text-secondary">
                            O projeto Trilha das Árvores busca desenvolver uma ferramenta
                            para aproximar a comunidade da cidade de Piracicaba ao campus da ESALQ,
                            unidade da USP que contém um área de preservação ambiental e árvores
                            características dos biomas brasileiros através da Corrida de Orientação.
                        </p>
                    </div>
                </div>

                {/* <!-- <div className="col-md-0 col-lg-6 px-0">
                    <img src="/assets/img/flamboyant-laranja-esalq.jpg"
                        alt="Login" className="img-fluid object-fit-sm-fill w-100 vh-100" style="object-fit: cover; object-position: left;">
                </div> --> */}
                <div className="col-md-0 col-lg-6 px-0 d-none d-xl-block">
                    <img src="/flamboyant-laranja-esalq.jpg" alt="Login" className="w-100 vh-100"
                        /*style="object-fit: cover; object-position: left;"*//>

                    <div className="toast-container position-fixed bottom-0 end-0 p-3">
                        <div className="img-esalq bg-white p-4 d-sm-block">
                            <img src="/logos/esalq.png" className="w-100 rounded me-2" alt="..."/>
                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div className="img-esalq bg-white p-4 d-sm-block">
                    <img src="/assets/logos/esalq.png" className="w-100 rounded me-2" alt="...">
                    <div className="toast-header">
                    </div>
                </div>
            </div> --> */}


        </section>


          {/* <!-- <label>Esqueceu a senha?</label>
          <button type="submit" form="login-form" value="submit">Enviar</button> --> */}

      </main>
      )


export default Index;