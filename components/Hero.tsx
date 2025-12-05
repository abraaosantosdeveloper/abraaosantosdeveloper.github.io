import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__container container">
        <div className="hero__content">
          <span className="hero__greeting">Olá! Meu nome é</span>
          <h1 className="hero__title">
            Abraão Santos
            <span className="wave">👋</span>
          </h1>
          <p className="hero__description">
            Desenvolvedor Full Stack apaixonado por criar experiências web incríveis e funcionais
          </p>
          <div className="hero__buttons">
            <a href="#projects" className="btn btn--primary">Ver Projetos</a>
            <a href="#contact" className="btn btn--secondary">Entre em Contato</a>
          </div>
        </div>
        <div className="hero__image">
          <div style={{ 
            width: '340px', 
            height: '340px', 
            borderRadius: '50%', 
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 5px 30px rgba(0, 0, 0, 0.37)'
          }}>
            <Image 
              src="/img/profile.jpg" 
              alt="Abraão Santos"
              width={340}
              height={340}
              style={{ objectFit: 'cover'}}
              priority
            />
          </div>
        </div>
      </div>
      <div className="scroll-down">
        <a href="#about">
          <i className='bx bx-mouse'></i>
          <span>Role para baixo</span>
        </a>
      </div>
    </section>
  );
}
