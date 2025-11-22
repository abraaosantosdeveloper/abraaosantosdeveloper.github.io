export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="projects__container container">
        <div className="section__header">
          <span className="section__subtitle">Meu Trabalho</span>
          <h2 className="section__title">Projetos Recentes</h2>
        </div>

        <div className="projects__content">
          {/* EasyWeather Project */}
          <article className="project__card">
            <div className="project__image">
              <i className='bx bx-cloud'></i>
            </div>
            <div className="project__data">
              <h3 className="project__title">EasyWeather</h3>
              <p className="project__description">
                Aplicação de previsão do tempo que utiliza APIs para fornecer dados meteorológicos 
                em tempo real de qualquer cidade do mundo.
              </p>
              <div className="project__tags">
                <span className="tag">HTML</span>
                <span className="tag">CSS</span>
                <span className="tag">JavaScript</span>
                <span className="tag">API</span>
              </div>
              <div className="project__buttons">
                <a href="https://abraaosantosdeveloper.github.io/easy-weather" target="_blank" rel="noopener noreferrer" className="btn btn--small btn--primary">
                  <i className='bx bx-link-external'></i>
                  Acessar
                </a>
                <a href="https://github.com/abraaosantosdeveloper/easy-weather" target="_blank" rel="noopener noreferrer" className="btn btn--small btn--secondary">
                  <i className='bx bxl-github'></i>
                  Código
                </a>
              </div>
            </div>
          </article>

          {/* Oasis App Project */}
          <article className="project__card">
            <div className="project__image">
              <i className='bx bx-leaf'></i>
            </div>
            <div className="project__data">
              <h3 className="project__title">Oasis App</h3>
              <p className="project__description">
                Aplicação completa para rastreamento de hábitos e bem-estar pessoal, 
                com sistema de autenticação e dashboard interativo.
              </p>
              <div className="project__tags">
                <span className="tag">JavaScript</span>
                <span className="tag">Python</span>
                <span className="tag">Flask</span>
                <span className="tag">PostgreSQL</span>
              </div>
              <div className="project__buttons">
                <a href="https://abraaosantosdeveloper.github.io/oasis_app/landing.html" target="_blank" rel="noopener noreferrer" className="btn btn--small btn--primary">
                  <i className='bx bx-link-external'></i>
                  Acessar
                </a>
                <a href="https://github.com/abraaosantosdeveloper/oasis_app" target="_blank" rel="noopener noreferrer" className="btn btn--small btn--secondary">
                  <i className='bx bxl-github'></i>
                  Código
                </a>
              </div>
            </div>
          </article>

          {/* Coming Soon Project */}
          <article className="project__card project__card--coming">
            <div className="project__image">
              <i className='bx bx-rocket'></i>
            </div>
            <div className="project__data">
              <h3 className="project__title">Em Breve</h3>
              <p className="project__description">
                Novos projetos incríveis estão a caminho! Fique ligado para ver 
                as próximas soluções que estou desenvolvendo.
              </p>
              <div className="project__tags">
                <span className="tag">???</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
