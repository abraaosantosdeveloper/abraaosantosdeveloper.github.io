import Image from 'next/image';

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="about__container container">
        <div className="section__header">
          <span className="section__subtitle">Conheça mais</span>
          <h2 className="section__title">Sobre Mim</h2>
        </div>

        <div className="about__content">
          <div className="about__image">
            <div className="about__blob">
              <Image 
                src="/img/profile-about.jpg" 
                alt="Abraão Santos"
                width={400}
                height={400}
                className="about__img"
                unoptimized
              />
            </div>
          </div>

          <div className="about__data">
            <p className="about__description">
              Desenvolvedor Full Stack com experiência em criar soluções web modernas e responsivas. 
              Apaixonado por transformar ideias em produtos digitais que fazem a diferença na vida das pessoas.
            </p>

            <div className="about__skills">
              <div className="skill">
                <i className='bx bxl-html5'></i>
                <span>HTML5</span>
              </div>
              <div className="skill">
                <i className='bx bxl-css3'></i>
                <span>CSS3</span>
              </div>
              <div className="skill">
                <i className='bx bxl-javascript'></i>
                <span>JavaScript</span>
              </div>
              <div className="skill">
                <i className='bx bxl-react'></i>
                <span>React</span>
              </div>
              <div className="skill">
                <i className='bx bxl-nodejs'></i>
                <span>Node.js</span>
              </div>
              <div className="skill">
                <i className='bx bxl-python'></i>
                <span>Python</span>
              </div>
              <div className="skill">
                <i className='bx bxl-git'></i>
                <span>Git</span>
              </div>
              <div className="skill">
                <i className='bx bxl-github'></i>
                <span>GitHub</span>
              </div>
              <div className="skill">
                <i className='bx bxl-postgresql'></i>
                <span>PostgreSQL</span>
              </div>
              <div className="skill">
                <i className='bx bxs-data'></i>
                <span>MySQL</span>
              </div>
              <div className="skill">
                <Image src="/azure.png" alt="Azure" width={24} height={24} />
                <span>Azure</span>
              </div>
              <div className="skill">
                <i className='bx bxl-java'></i>
                <span>Java</span>
              </div>
              <div className="skill">
                <i className='bx bxl-spring-boot'></i>
                <span>Spring Boot</span>
              </div>
              <div className="skill">
                <i className='bx bxl-c-plus-plus'></i>
                <span>C/C++</span>
              </div>
            </div>

            <div className="about__info">
              <div className="info__item">
                <i className='bx bx-code-curly'></i>
                <div>
                  <h3>2+</h3>
                  <span>Anos de Experiência</span>
                </div>
              </div>
              <div className="info__item">
                <i className='bx bx-briefcase'></i>
                <div>
                  <h3>10+</h3>
                  <span>Projetos Concluídos</span>
                </div>
              </div>
            </div>

            <a href="#contact" className="btn btn--primary">Entre em Contato</a>
          </div>
        </div>
      </div>
    </section>
  );
}
