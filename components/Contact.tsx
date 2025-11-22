'use client';

import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="contact__container container">
        <div className="section__header">
          <span className="section__subtitle">Entre em Contato</span>
          <h2 className="section__title">Vamos Trabalhar Juntos</h2>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="info__card">
              <i className='bx bx-envelope'></i>
              <div>
                <h3>Email</h3>
                <a href="mailto:abraaofilipi12@gmail.com">abraaofilipi12@gmail.com</a>
              </div>
            </div>

            <div className="info__card">
              <i className='bx bx-phone'></i>
              <div>
                <h3>Telefone</h3>
                <a href="tel:+5581994418409">+55 (81) 9 9441-8409</a>
              </div>
            </div>

            <div className="info__card">
              <i className='bx bxl-linkedin-square'></i>
              <div>
                <h3>LinkedIn</h3>
                <a href="https://www.linkedin.com/in/abraaosantosdev/" target="_blank" rel="noopener noreferrer">
                  /abraaosantosdev
                </a>
              </div>
            </div>

            <div className="info__card">
              <i className='bx bxl-github'></i>
              <div>
                <h3>GitHub</h3>
                <a href="https://github.com/abraaosantosdeveloper" target="_blank" rel="noopener noreferrer">
                  @abraaosantosdeveloper
                </a>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="text"
                name="name"
                placeholder="Seu Nome"
                required
                className="form__input"
              />
            </div>

            <div className="form__group">
              <input
                type="email"
                name="email"
                placeholder="Seu Email"
                required
                className="form__input"
              />
            </div>

            <div className="form__group">
              <textarea
                name="message"
                placeholder="Sua Mensagem"
                rows={6}
                required
                className="form__input form__textarea"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn--primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
              <i className='bx bx-send'></i>
            </button>

            {status === 'success' && (
              <div className="form__message form__message--success">
                <i className='bx bx-check-circle'></i>
                Mensagem enviada com sucesso!
              </div>
            )}

            {status === 'error' && (
              <div className="form__message form__message--error">
                <i className='bx bx-error-circle'></i>
                Erro ao enviar mensagem. Tente novamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
