export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <div className="footer__brand">
            <h3>
              <i className='bx bx-code-alt'></i>
              Abraão.dev
            </h3>
            <p>Desenvolvedor Full Stack</p>
          </div>

          <div className="footer__links">
            <div className="footer__group">
              <h4>Navegação</h4>
              <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#projects">Projetos</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>

            <div className="footer__group">
              <h4>Social</h4>
              <ul>
                <li>
                  <a href="https://github.com/abraaosantosdeveloper" target="_blank" rel="noopener noreferrer">
                    <i className='bx bxl-github'></i> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/abraaosantosdev/" target="_blank" rel="noopener noreferrer">
                    <i className='bx bxl-linkedin'></i> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Abraão Santos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
