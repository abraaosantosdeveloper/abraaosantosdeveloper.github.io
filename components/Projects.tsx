'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Project = {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  appUrl?: string;
  repoUrl?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: 'Blabry',
    description:
      'Uma rede social pensada para quem deseja estar por dentro, e não somente postar. De uma vaga perdida, a projeto pessoal e processo de aprendizagem.',
    icon: 'bx-chat',
    tags: ['Node', 'React', 'SSE', 'WebSockets'],
    appUrl: 'https://blabry.com.br/',
    repoUrl: 'https://github.com/abraaosantosdeveloper/blabry/',
    isNew: true,
  },
  {
    title: 'EasyWeather',
    description: 'Previsão do tempo com dados de qualquer cidade em tempo real.',
    icon: 'bx-cloud',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    appUrl: 'https://abraaosantosdeveloper.github.io/easy-weather',
    repoUrl: 'https://github.com/abraaosantosdeveloper/easy-weather',
  },
  {
    title: 'Oasis App',
    description: 'Plataforma de hábitos e bem-estar com dashboard e autenticação.',
    icon: 'bx-leaf',
    tags: ['JavaScript', 'Python', 'Flask', 'PostgreSQL'],
    appUrl: 'https://abraaosantosdeveloper.github.io/oasis_app/landing.html',
    repoUrl: 'https://github.com/abraaosantosdeveloper/oasis_app',
  },
  {
    title: 'Quick List',
    description: 'Lista de tarefas direta com persistência local no navegador.',
    icon: 'bx-list-check',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    appUrl: 'https://abraaosantosdeveloper.github.io/quick-list/',
    repoUrl: 'https://github.com/abraaosantosdeveloper/quick-list',
  },
  {
    title: 'Rotina em Pauta',
    description: 'Aplicação de organização diária com foco em produtividade pessoal.',
    icon: 'bx-calendar-check',
    tags: ['HTML', 'CSS', 'JavaScript', 'Produtividade'],
    appUrl: 'https://abraaosantosdeveloper.github.io/rotina-em-pauta/',
    repoUrl: 'https://github.com/abraaosantosdeveloper/rotina-em-pauta/',
  },
  {
    title: 'Em Breve',
    description: 'Novos projetos estão em desenvolvimento e serão publicados em breve.',
    icon: 'bx-rocket',
    tags: ['???'],
    isComingSoon: true,
  },
];

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [pageStartIndexes, setPageStartIndexes] = useState<number[]>([0]);

  const getCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.querySelectorAll<HTMLElement>('.project__card'));
  }, []);

  const updateCarouselState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = getCards();
    if (cards.length === 0) return;

    const nextPageStartIndexes = [0];
    let currentPageStart = 0;
    for (let index = 1; index < cards.length; index += 1) {
      const pageStartCard = cards[currentPageStart];
      const currentCard = cards[index];
      const currentCardRightEdge = currentCard.offsetLeft + currentCard.offsetWidth;
      const pageWidth = currentCardRightEdge - pageStartCard.offsetLeft;

      if (pageWidth > track.clientWidth + 1) {
        nextPageStartIndexes.push(index);
        currentPageStart = index;
      }
    }

    setPageStartIndexes((prevPageStartIndexes) => {
      if (
        prevPageStartIndexes.length === nextPageStartIndexes.length &&
        prevPageStartIndexes.every((value, index) => value === nextPageStartIndexes[index])
      ) {
        return prevPageStartIndexes;
      }
      return nextPageStartIndexes;
    });

    let nextPage = 0;
    let closest = Number.POSITIVE_INFINITY;
    for (let pageIndex = 0; pageIndex < nextPageStartIndexes.length; pageIndex += 1) {
      const pageStartIndex = nextPageStartIndexes[pageIndex];
      const distance = Math.abs(track.scrollLeft - cards[pageStartIndex].offsetLeft);
      if (distance < closest) {
        closest = distance;
        nextPage = pageIndex;
      }
    }

    setActivePage(nextPage);
  }, [getCards]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => updateCarouselState();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateCarouselState]);

  const canGoPrev = activePage > 0;
  const canGoNext = activePage < pageStartIndexes.length - 1;

  const scrollToPage = useCallback((pageIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = getCards();
    const targetCard = cards[pageStartIndexes[pageIndex]];
    if (!targetCard) return;
    track.scrollTo({
      left: targetCard.offsetLeft,
      behavior: 'smooth',
    });
  }, [getCards, pageStartIndexes]);

  const projectDots = useMemo(
    () =>
      pageStartIndexes.map((_, pageIndex) => (
        <button
          key={`page-${pageIndex + 1}-dot`}
          type="button"
          className={`project__dot${activePage === pageIndex ? ' project__dot--active' : ''}`}
          aria-label={`Ir para página ${pageIndex + 1} dos projetos`}
          onClick={() => scrollToPage(pageIndex)}
          aria-current={activePage === pageIndex ? 'true' : undefined}
        />
      )),
    [activePage, pageStartIndexes, scrollToPage]
  );

  return (
    <section className="projects section" id="projects">
      <div className="projects__container container">
        <div className="section__header">
          <span className="section__subtitle">Meu Trabalho</span>
          <h2 className="section__title">Projetos Recentes</h2>
        </div>

        <div className="projects__carousel">
          <button
            type="button"
            className="projects__nav projects__nav--prev"
            aria-label="Projeto anterior"
            onClick={() => scrollToPage(Math.max(0, activePage - 1))}
            disabled={!canGoPrev}
          >
            <i className="bx bx-chevron-left"></i>
          </button>

          <div className="projects__content" ref={trackRef}>
            {projects.map((project) => (
              <article
                key={project.title}
                className={`project__card${project.isComingSoon ? ' project__card--coming' : ''}`}
              >
                <div className="project__image">
                  <i className={`bx ${project.icon}`}></i>
                </div>
                <div className="project__data">
                  {project.isNew ? <span className="project__badge project__badge--pulse">Novidade</span> : null}
                  <h3 className="project__title">{project.title}</h3>
                  <p className="project__description">{project.description}</p>
                  <div className="project__tags">
                    {project.tags.map((tag) => (
                      <span key={`${project.title}-${tag}`} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.appUrl && project.repoUrl ? (
                    <div className="project__buttons">
                      <a
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--small btn--primary"
                      >
                        <i className="bx bx-link-external"></i>
                        Acessar
                      </a>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--small btn--secondary"
                      >
                        <i className="bx bxl-github"></i>
                        Código
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="projects__nav projects__nav--next"
            aria-label="Próximo projeto"
            onClick={() => scrollToPage(Math.min(pageStartIndexes.length - 1, activePage + 1))}
            disabled={!canGoNext}
          >
            <i className="bx bx-chevron-right"></i>
          </button>
        </div>

        <div className="projects__dots" aria-label="Navegação dos projetos">
          {projectDots}
        </div>
      </div>
    </section>
  );
}
