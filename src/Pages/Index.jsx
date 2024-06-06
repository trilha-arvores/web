import Header from "../components/Header";
import ImageBg from "../components/ImageBg";

const Index = () => (
    <main>
        
        <div className="container-fluid">

            <div className="row vh-100">
                <div className="text-black col-md-6">
                    <div id="headerDiv">
                        <Header/>
                    </div>
                    
                    <div className="px-xl-5 ms-4 mt-3">
                        <span className="h1 fw-bold mb-0">TRILHA DAS ÁRVORES</span>
                        <p className="pt-3 fs-4 text-secondary">
                            O projeto Trilha das Árvores busca desenvolver uma ferramenta
                            para aproximar a comunidade da cidade de Piracicaba ao campus da ESALQ,
                            unidade da USP que contém um área de preservação ambiental e árvores
                            características dos biomas brasileiros através da Corrida de Orientação.
                        </p>
                    </div>
                </div>
                
                <ImageBg/>
            </div>
        </div>
      </main>
      )


export default Index;