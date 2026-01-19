import Header from "../components/Header";
import DivLine from "../components/DivLine";
import uspImg from "../images/USP-sustentavel.png";

const Sobre = () => {
  const membros = [
    { nome: "Simone do Rocio Senger de Souza", papel: "Professora Orientadora, ICMC-USP" },
    { nome: "Luciana Duque Silva", papel: "Professora Orientadora, ESALQ-USP" },
    { nome: "Jefferson Lordello Polizel", papel: "Co-orientador, ESALQ-USP" },
    { nome: "João Victor de Almeida", papel: "Membro Desenvolvedor, EESC/ICMC - USP" },
    { nome: "Vitor Amorim Fróis", papel: "Membro Desenvolvedor, ICMC - USP" },
    { nome: "Yvis Freire Silva Santos", papel: "Membro Desenvolvedor, ICMC - USP" },
    { nome: "Davi Fagundes Ferreira", papel: "Membro Desenvolvedor, ICMC - USP" },
    { nome: "Pedro Rossi", papel: "Membro Desenvolvedor, ICMC - USP" },
    { nome: "Miller Matheus Lima", papel: "Membro Desenvolvedor, ICMC - USP" },
  ];

  return (
    <section className="bg-cinza">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          <Header />
        </div>
      </nav>

      <main className="container py-5">
        <DivLine />

        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="mb-4">Sobre o projeto</h1>
            <p className="lead">
              Este projeto, fruto de uma parceria entre representantes da USP São Carlos e a ESALQ,
              visa integrar a comunidade com o campus de Piracicaba. Nosso objetivo é valorizar a mata
              rica e singular do local, transformando-a em um recurso para promover a saúde e o bem-estar.
            </p>

            <h3 className="mt-4">Integrantes</h3>
            <ul className="list-unstyled">
              {membros.map((m, i) => (
                <li key={i} className="mb-2">
                  <strong>{m.nome}</strong> — <span className="text-muted">{m.papel}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4 text-center">
            <img
              src={uspImg}
              alt="Sobre o projeto"
              className="img-fluid sobre-image"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Sobre;