import Header from "../components/Header";

const Login = () => (
    <main>
        <section className="vh-100">
            <div className="container-fluid"/>
                <div className="row">
                    <div className="align-items-center col-sm-6 text-black">
                        <div id="headerDiv">
                            <Header/>
                        </div>

                        <div>
                            <div className="px-xl-5 ms-xl-4 mt-xl-5 pt-5 pt-xl-0">
                                <i className="fas fa-crow fa-2x" /*style="color: #709085;"*/></i>
                                <span className="h1 fw-bold mb-0">TRILHA DAS ÁRVORES</span>
                                <p className="fas fa-crow fa-2x d-none d-lg-block text-secondary">Login da administração do
                                    aplicativo Trilha
                                    das Árvores, utilizado na ESAQL para
                                    gerenciar percursos e informações relacionadas às trilhas existentes.</p>

                            </div>

                            <div className="h-custom-2 px-xl-5 ms-xl-4 mt-xl-5 pt-5 pt-xl-0 mt-xl-n5">

                                <form /*style="width: 23rem; max-width: 80%;"*/>

                                    {/* <!-- <h3 className="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Login Administrador</h3> --> */}

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" for="input-email">Usuário</label>
                                        <input type="email" id="input-email" className="form-control is-valid"
                                            placeholder="Digite seu usuário" />
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" for="input-password">Senha</label>
                                        <div className="input-group">
                                            <input type="password" id="input-password" className="form-control"
                                                placeholder="Digite sua senha" />
                                            <btn className="input-group-text bg-white"
                                                id="validationTooltipUsernamePrepend">
                                                <i className="bi bi-eye-slash btn-interactice"></i>
                                            </btn>
                                        </div>
                                    </div>

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <button data-mdb-button-init data-mdb-ripple-init
                                            className="color-musgo btn btn-dark" type="button">
                                            Entrar</button>
                                    </div>

                                </form>
                            </div>
                        </div>


                    </div>
                    <div className="col-md-0 col-lg-6 px-0 d-none d-xl-block">
                        <img src="flamboyant-laranja-esalq.jpg" alt="Login image" className="w-100 vh-100"
                            /*style="object-fit: cover; object-position: left;"*//>

                        <div className="toast-container position-fixed bottom-0 end-0 p-3">
                            <div className="img-esalq bg-white p-4 d-sm-block">
                                <img src="/logos/esalq.png" className="w-100 rounded me-2" alt="..."/>
                                <div className="toast-header">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>


        {/* <!-- <label>Esqueceu a senha?</label>
        <button type="submit" form="login-form" value="submit">Enviar</button> --> */}

    </main>
      )


export default Login;