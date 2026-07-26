import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// TRANSLATION DICTIONARY (PT-BR / EN)
// ==========================================================================
const translations = {
  'pt-BR': {
    about: "Sobre",
    projects: "Projetos",
    stack: "Tecnologias",
    contact: "Contato",
    backHome: "Início",
    backPortfolio: "Voltar ao Portfólio",
    current: "Em Andamento (Atual)",
    completedBadge: "Concluído (2023 — 2025)",
    role: "Desenvolvedor Fullstack",
    bio: "Desenvolvedor Fullstack com foco em criar aplicações web modernas, robustas e bem estruturadas. Formado em Desenvolvimento de Sistemas pela ETEC de Guarulhos e graduando em Engenharia de Software pela UNINTER.",
    viewProjects: "Ver Projetos",
    aboutMeLink: "Mais sobre mim",
    featuredTitle: "Projetos em Destaque",
    exploreCase: "Explorar estudo de caso",
    kickerAbout: "Trajetória",
    leadAbout: "Crio soluções web focadas na clareza do código e na utilidade para o usuário final.",
    bodyAbout: "Acredito que o bom software é aquele que resolve problemas reais sem complexidade desnecessária. Minha formação técnica pela ETEC me deu a base de lógica e banco de dados, e a graduação em Engenharia de Software me permite aprofundar em arquitetura, testes e padrões de projeto.",
    eduSystems: "Técnico em Desenvolvimento de Sistemas",
    eduSystemsDesc: "Formação focada em lógica de programação, análise estruturada de sistemas, modelagem de banco de dados relacional e desenvolvimento web básico.",
    eduEng: "Engenharia de Software",
    eduEngDesc: "Graduação focada em engenharia de requisitos, arquitetura de software, qualidade de código, padrões de projeto e metodologias ágeis.",
    kickerStack: "Stack Técnica",
    groupFrontend: "Interface & Frontend",
    groupBackend: "Servidor & Backend",
    groupTools: "Ferramentas & Infra",
    contactKicker: "Canais",
    contactLead: "Tem alguma proposta ou quer bater um papo técnico?",
    copyEmail: "Copiar E-mail",
    copied: "Copiado!",
    downloadCV: "Baixar Currículo",
    allRights: "Todos os direitos reservados.",
    
    // Case Study - Common
    statusCompleted: "Concluído (Produção)",
    challengeTitle: "O Desafio",
    featuresTitle: "Recursos Implementados",
    engTitle: "Decisões de Engenharia",
    gitHubTitle: "Código Fonte",
    
    // OrganizeLife Case
    organizeKicker: "Finanças & Rotina",
    organizeSubtitle: "Uma plataforma integrada para controle financeiro pessoal com divisão orçamentária personalizável e calendário de atividades.",
    organizeDesc: "Plataforma web integrada para finanças e rotina com divisão orçamentária personalizável. Desenvolvida com Laravel 12, React 19 e MySQL.",
    organizeChallengeText: "O maior problema encontrado em gerenciadores pessoais é a dispersão: ferramentas de finanças são separadas do calendário e tarefas cotidianas. O OrganizeLife centraliza esses fluxos, permitindo que o usuário visualize seu orçamento mensal dividido automaticamente por categorias de custo enquanto acompanha seus compromissos no mesmo painel.",
    organizeFeat1Title: "Orçamento Personalizável: ",
    organizeFeat1Desc: "O sistema calcula a divisão das receitas inseridas com porcentagens ajustáveis pelo usuário para Necessidades, Desejos e Poupança/Investimentos, dando feedback visual instantâneo do limite de gastos.",
    organizeFeat2Title: "Calendário Dinâmico: ",
    organizeFeat2Desc: "Agenda interativa para agendamento de tarefas e compromissos com priorização visual.",
    organizeFeat3Title: "Painel de Métricas: ",
    organizeFeat3Desc: "Gráficos de evolução patrimonial e categorização de despesas mensais.",
    organizeFeat4Title: "Autenticação Segura: ",
    organizeFeat4Desc: "Login tradicional e integração com Google OAuth para acesso ágil.",
    organizeEngDesc: "O projeto foi estruturado utilizando Laravel como uma API REST robusta e React como SPA (Single Page Application) cliente. A comunicação é feita via requisições assíncronas seguras com proteção CSRF ativa.",
    organizeEng1Title: "React 19 & Estado Global",
    organizeEng1Desc: "Uso do estado reativo do React para renderizar gráficos de despesas e atualizar categorias de gastos em tempo real, sem recarregar a página.",
    organizeEng2Title: "Laravel 12 REST API",
    organizeEng2Desc: "Controladores limpos, validação estrita de dados de entrada por FormRequests e segurança de dados financeiros.",
    organizeEng3Title: "MySQL Relacional",
    organizeEng3Desc: "Banco estruturado com chaves estrangeiras indexadas, garantindo integridade referencial nas transações e consultas rápidas de extratos.",
    organizeGitDesc: "O repositório completo do OrganizeLife está disponível no GitHub para auditoria técnica, contendo toda a estrutura de models, controllers e componentes React.",
    organizeGitCTA: "Ver Repositório no GitHub",

    // EtecRead Case
    etecKicker: "Catálogo Acadêmico",
    etecSubtitle: "Um sistema de busca e organização de acervo literário escolar desenvolvido para modernizar o acesso a livros didáticos.",
    etecDesc: "Catálogo literário desenvolvido para modernizar a biblioteca escolar. Desenvolvido com Laravel 11, SQLite e Alpine.js.",
    etecChallengeText: "Bibliotecas escolares muitas vezes operam com planilhas ou sistemas antigos que dificultam a pesquisa rápida de títulos pelos alunos. O EtecRead foi concebido como trabalho de conclusão de curso (TCC) para fornecer uma interface fluida, focada em dispositivos móveis, onde estudantes e professores podem buscar, reservar e classificar livros didáticos e de literatura.",
    etecFeat1Title: "Busca Instantânea por Filtros: ",
    etecFeat1Desc: "Pesquisa em tempo real de livros por título, autor, categoria ou ano de publicação.",
    etecFeat2Title: "Ficha Técnica Completa: ",
    etecFeat2Desc: "Visualização detalhada de sinopse, número de páginas, editora e status de empréstimo atual.",
    etecFeat3Title: "Painel de Administração: ",
    etecFeat3Desc: "Área administrativa para cadastro, edição e remoção de títulos, além de controle de devoluções.",
    etecFeat4Title: "Banco Local Rápido: ",
    etecFeat4Desc: "Configuração ágil usando SQLite, ideal para o escopo de servidores escolares internos.",
    etecEngDesc: "Desenvolvido com o foco na simplicidade operacional e velocidade de carregamento em redes escolares lentas, utilizando uma arquitetura monolítica leve.",
    etecEng1Title: "Laravel 11 Monólito",
    etecEng1Desc: "Rotas limpas e views Blade otimizadas para servir o HTML de forma direta e extremamente rápida.",
    etecEng2Title: "Alpine.js para Interatividade",
    etecEng2Desc: "Adição de comportamento assíncrono leve para modais de confirmação e filtros rápidos sem a sobrecarga de um framework de grande porte.",
    etecEng3Title: "SQLite Portável",
    etecEng3Desc: "Banco de dados contido em um arquivo físico local, facilitando a implantação e backups rápidos pela equipe da biblioteca.",
    etecGitDesc: "O repositório do EtecRead está disponível no GitHub para consulta técnica, contendo toda a estrutura de controllers, views Blade e a modelagem do banco de dados.",
    etecGitCTA: "Ver Repositório no GitHub",
  },
  'en': {
    about: "About",
    projects: "Projects",
    stack: "Tech",
    contact: "Contact",
    backHome: "Home",
    backPortfolio: "Back to Portfolio",
    current: "In Progress (Current)",
    completedBadge: "Completed (2023 — 2025)",
    role: "Fullstack Developer",
    bio: "Fullstack Developer focused on building modern, robust, and well-structured web applications. Graduated in Systems Development from ETEC de Guarulhos and pursuing a degree in Software Engineering at UNINTER.",
    viewProjects: "View Projects",
    aboutMeLink: "More about me",
    featuredTitle: "Featured Projects",
    exploreCase: "Explore case study",
    kickerAbout: "Journey",
    leadAbout: "I build web solutions focused on code clarity and final user utility.",
    bodyAbout: "I believe that good software is one that solves real problems without unnecessary complexity. My technical training at ETEC gave me the basis of logic and databases, and my degree in Software Engineering allows me to deepen in architecture, testing, and design patterns.",
    eduSystems: "Systems Development Technician",
    eduSystemsDesc: "Training focused on programming logic, structured systems analysis, relational database modeling, and basic web development.",
    eduEng: "Software Engineering",
    eduEngDesc: "Degree focused on requirements engineering, software architecture, code quality, design patterns, and agile methodologies.",
    kickerStack: "Tech Stack",
    groupFrontend: "Interface & Frontend",
    groupBackend: "Server & Backend",
    groupTools: "Tools & Infra",
    contactKicker: "Channels",
    contactLead: "Have a proposal or want to talk tech?",
    copyEmail: "Copy Email",
    copied: "Copied!",
    downloadCV: "Download Resume",
    allRights: "All rights reserved.",
    
    // Case Study - Common
    statusCompleted: "Completed (Production)",
    challengeTitle: "The Challenge",
    featuresTitle: "Implemented Features",
    engTitle: "Engineering Decisions",
    gitHubTitle: "Source Code",
    
    // OrganizeLife Case
    organizeKicker: "Finance & Routine",
    organizeSubtitle: "An integrated platform for personal financial control with customizable budget allocation and activity calendar.",
    organizeDesc: "Integrated web platform for finance and routine with customizable budget allocation. Developed with Laravel 12, React 19, and MySQL.",
    organizeChallengeText: "The biggest problem found in personal organizers is dispersion: finance tools are separate from calendars and daily tasks. OrganizeLife centralizes these flows, allowing the user to view their monthly budget divided automatically by cost categories while tracking their appointments in the same panel.",
    organizeFeat1Title: "Customizable Budget: ",
    organizeFeat1Desc: "The system calculates the division of entered revenues with user-adjustable percentages for Needs, Wants, and Savings/Investments, giving instant visual feedback of spending limits.",
    organizeFeat2Title: "Dynamic Calendar: ",
    organizeFeat2Desc: "Interactive calendar for task scheduling and appointments with visual prioritization.",
    organizeFeat3Title: "Metrics Panel: ",
    organizeFeat3Desc: "Charts of wealth evolution and monthly expense categorization.",
    organizeFeat4Title: "Secure Authentication: ",
    organizeFeat4Desc: "Traditional login and integration with Google OAuth for agile access.",
    organizeEngDesc: "The project was structured using Laravel as a robust REST API and React as the client SPA (Single Page Application). Communication is done via secure asynchronous requests with active CSRF protection.",
    organizeEng1Title: "React 19 & Global State",
    organizeEng1Desc: "Use of React reactive state to render expense charts and update spending categories in real time, without reloading the page.",
    organizeEng2Title: "Laravel 12 REST API",
    organizeEng2Desc: "Clean controllers, strict validation of input data by FormRequests, and security of financial data.",
    organizeEng3Title: "MySQL Relational",
    organizeEng3Desc: "Structured database with indexed foreign keys, ensuring referential integrity in transactions and fast statement queries.",
    organizeGitDesc: "The complete OrganizeLife repository is available on GitHub for technical audit, containing the entire structure of models, controllers, and React components.",
    organizeGitCTA: "View Repository on GitHub",

    // EtecRead Case
    etecKicker: "Academic Catalog",
    etecSubtitle: "A system for searching and organizing school literary collections developed to modernize access to textbooks.",
    etecDesc: "Literary catalog developed to modernize the school library. Developed with Laravel 11, SQLite, and Alpine.js.",
    etecChallengeText: "School libraries often operate with spreadsheets or legacy systems that make it difficult for students to quickly search titles. EtecRead was conceived as a course completion work (TCC) to provide a fluid, mobile-first interface where students and teachers can search, reserve, and rate textbooks and literature.",
    etecFeat1Title: "Instant Filter Search: ",
    etecFeat1Desc: "Real-time search of books by title, author, category, or year of publication.",
    etecFeat2Title: "Complete Spec Sheet: ",
    etecFeat2Desc: "Detailed view of synopsis, page count, publisher, and current loan status.",
    etecFeat3Title: "Administration Panel: ",
    etecFeat3Desc: "Admin area for registration, editing, and removal of titles, plus return control.",
    etecFeat4Title: "Fast Local Database: ",
    etecFeat4Desc: "Agile setup using SQLite, ideal for the scope of internal school servers.",
    etecEngDesc: "Developed with a focus on operational simplicity and loading speed on slow school networks, using a light monolithic architecture.",
    etecEng1Title: "Laravel 11 Monolith",
    etecEng1Desc: "Clean routes and optimized Blade views to serve HTML directly and extremely fast.",
    etecEng2Title: "Alpine.js for Interactivity",
    etecEng2Desc: "Addition of lightweight asynchronous behavior for confirmation modals and quick filters without the overhead of a large framework.",
    etecEng3Title: "Portable SQLite",
    etecEng3Desc: "Database contained in a local physical file, facilitating deployment and rapid backups by library staff.",
    etecGitDesc: "The EtecRead repository is available on GitHub for technical reference, containing the full structure of controllers, Blade views, and database modeling.",
    etecGitCTA: "View Repository on GitHub",
  }
};

// ==========================================================================
// CORE APPLICATION COMPONENT
// ==========================================================================
export default function App() {
  const [route, setRoute] = useState(() => window.location.hash || '#/');
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('nicolas-doneda-portfolio-lang');
    if (saved) return saved;
    const sysLang = navigator.language || navigator.userLanguage;
    return sysLang.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
  });

  const [activeProject, setActiveProject] = useState('organizelife');
  const [isCopied, setIsCopied] = useState(false);

  const isCaseStudy = route === '#/organizelife' || route === '#/etecread';
  const lenisRef = useRef(null);
  const prevRouteRef = useRef(route);
  const projectsSectionRef = useRef(null);

  // --- Watch Hash Routing changes ---
  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash || '#/';
      setRoute(currentHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- Sync document headers & titles ---
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    if (!isCaseStudy) {
      document.title = lang === 'pt-BR' 
        ? "Nicolas Doneda | Desenvolvedor Fullstack" 
        : "Nicolas Doneda | Fullstack Developer";
    } else if (route === '#/organizelife') {
      document.title = lang === 'pt-BR'
        ? "Case Study: OrganizeLife | Nicolas Doneda"
        : "OrganizeLife Case Study | Nicolas Doneda";
    } else if (route === '#/etecread') {
      document.title = lang === 'pt-BR'
        ? "Case Study: EtecRead | Nicolas Doneda"
        : "EtecRead Case Study | Nicolas Doneda";
    }
  }, [route, lang, isCaseStudy]);

  // --- Intelligent Page Scroll Router ---
  useEffect(() => {
    const prevWasCaseStudy = prevRouteRef.current === '#/organizelife' || prevRouteRef.current === '#/etecread';

    if (isCaseStudy || prevWasCaseStudy) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }

    const targetMap = {
      '#/about': '#about',
      '#/projects': '#projects',
      '#/stack': '#stack',
      '#/contact': '#contact'
    };
    const selector = targetMap[route];

    if (selector) {
      setTimeout(() => {
        const targetEl = document.querySelector(selector);
        if (targetEl) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetEl, { immediate: false });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else if (route === '#/' && !prevWasCaseStudy) {
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: false });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    }

    prevRouteRef.current = route;
  }, [route, isCaseStudy]);

  // --- Toggle language handler ---
  const handleLangToggle = () => {
    const nextLang = lang === 'pt-BR' ? 'en' : 'pt-BR';
    setLang(nextLang);
    localStorage.setItem('nicolas-doneda-portfolio-lang', nextLang);
  };

  // --- GSAP and Scroll animations effect ---
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    let lenis = null;
    let gsapCtx = gsap.context(() => {
      if (!reducedMotion && typeof Lenis !== 'undefined') {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        lenisRef.current = lenis;
      }

      // ScrollTrigger logic if needed for animations
    });

    return () => {
      gsapCtx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.body.classList.remove('projects-section-theme');
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, [route, isCaseStudy]);

  // --- Copy email utility ---
  const handleCopyEmail = () => {
    const email = 'nicolasdonedadev@gmail.com';
    const performCopy = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          document.body.removeChild(textarea);
          return Promise.resolve();
        } catch (err) {
          document.body.removeChild(textarea);
          return Promise.reject(err);
        }
      }
    };

    performCopy()
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Copy failed: ', err);
      });
  };

  // --- Navigation active link scroll logic ---
  const handleNavLink = (e, targetHash) => {
    e.preventDefault();
    if (window.location.hash === targetHash) {
      const targetMap = {
        '#/about': '#about',
        '#/projects': '#projects',
        '#/stack': '#stack',
        '#/contact': '#contact',
        '#/': 0
      };
      const selector = targetMap[targetHash];
      if (selector !== undefined) {
        const el = selector === 0 ? 0 : document.querySelector(selector);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el || 0, { immediate: false });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      window.location.hash = targetHash;
    }
  };

  const t = translations[lang];

  // --- Sub-View Render Map ---
  const renderView = () => {
    switch (route) {
      case '#/organizelife':
        return <OrganizeLifeCase lang={lang} t={t} />;
      case '#/etecread':
        return <EtecReadCase lang={lang} t={t} />;
      default:
        return (
          <HomeView
            lang={lang}
            t={t}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            projectsSectionRef={projectsSectionRef}
            handleNavLink={handleNavLink}
            handleCopyEmail={handleCopyEmail}
            isCopied={isCopied}
          />
        );
    }
  };

  return (
    <div className="spa-app-root">
      {/* Global Navigation Header with Custom Original SVG Monogram */}
      <header className="site-header">
        <div className="container header-container">
          <a
            href="#/"
            className="brand-logo-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/';
            }}
            aria-label="Nicolas Doneda Portfolio Home"
          >
            <svg className="brand-logo-symbol" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="var(--ink-color)"/>
              <path
                d="M 11 29 V 11 L 20.5 29 V 11 H 25.5 C 29.8 11 33 14.2 33 20 C 33 25.8 29.8 29 25.5 29 H 20.5"
                stroke="var(--bg-color)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="26.5" cy="20" r="2.2" fill="var(--accent-color)"/>
            </svg>
            <span className="brand-logo-name">Nicolas Doneda</span>
          </a>
          
          <nav className="main-nav" aria-label="Main Navigation">
            {!isCaseStudy ? (
              <>
                <a href="#/projects" onClick={(e) => handleNavLink(e, '#/projects')} className="nav-link">
                  {t.projects}
                </a>
                <a href="#/about" onClick={(e) => handleNavLink(e, '#/about')} className="nav-link">
                  {t.about}
                </a>
                <a href="#/stack" onClick={(e) => handleNavLink(e, '#/stack')} className="nav-link">
                  {t.stack}
                </a>
                <a href="#/contact" onClick={(e) => handleNavLink(e, '#/contact')} className="nav-link">
                  {t.contact}
                </a>
              </>
            ) : (
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#/';
                }}
                className="nav-link"
              >
                ← {t.backHome}
              </a>
            )}
          </nav>
          
          <div className="lang-selector">
            <button
              onClick={handleLangToggle}
              className="lang-btn"
              aria-label="Alterar idioma / Switch language"
            >
              <span className="lang-indicator">{lang === 'pt-BR' ? 'EN' : 'PT-BR'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Render the Active SPA Screen */}
      <main>{renderView()}</main>

      {/* Shared Footer (Only on Home View) */}
      {!isCaseStudy && (
        <footer className="site-footer">
          <div className="container footer-container">
            <p className="copyright">
              &copy; 2026 Nicolas Doneda. {t.allRights}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

// ==========================================================================
// VIEW: Home Screen
// ==========================================================================
function HomeView({
  t,
  activeProject,
  setActiveProject,
  projectsSectionRef,
  handleNavLink,
  handleCopyEmail,
  isCopied
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="container hero-grid">
          
          <div className="hero-text-block">
            <h1 className="hero-name">Nicolas Doneda</h1>
            <p className="hero-role">{t.role}</p>
            <p className="hero-presentation">{t.bio}</p>
            
            <div className="hero-actions">
              <a href="#/projects" onClick={(e) => handleNavLink(e, '#/projects')} className="btn-pill btn-pill-primary">
                <span>{t.viewProjects}</span>
                <svg className="btn-icon-svg" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#/about" onClick={(e) => handleNavLink(e, '#/about')} className="btn-pill btn-pill-secondary">
                <span>{t.aboutMeLink}</span>
                <svg className="btn-icon-svg" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </a>
              <a 
                href="/assets/curriculo.pdf" 
                download="Nicolas-Doneda-Curriculo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-cv"
              >
                <svg className="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>{t.downloadCV}</span>
              </a>
            </div>
          </div>

          <div className="hero-visual-block">
            <div className="profile-photo-stage">
              <div className="photo-wave photo-wave-1"></div>
              <div className="photo-wave photo-wave-2"></div>
              <div className="photo-wave photo-wave-3"></div>

              <div className="profile-photo-frame">
                <div className="profile-photo-inner">
                  <img src="/assets/images/nicolas.jpg" alt="Nicolas Doneda" className="profile-photo" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section" id="projects" ref={projectsSectionRef}>
        <div className="container projects-layout-grid">
          
          <div className="projects-info-col">
            <div className="section-header-block">
              <h2 className="section-title">{t.featuredTitle}</h2>
            </div>
            
            <div className="projects-tab-list" role="tablist">
              <button
                className={`project-tab-button ${activeProject === 'organizelife' ? 'active' : ''}`}
                onClick={() => window.location.hash = '#/organizelife'}
                onMouseEnter={() => setActiveProject('organizelife')}
                onFocus={() => setActiveProject('organizelife')}
                role="tab"
                aria-selected={activeProject === 'organizelife' ? 'true' : 'false'}
              >
                <span className="project-tab-title">OrganizeLife</span>
                <span className="project-tab-arrow" aria-hidden="true">&rarr;</span>
              </button>
              
              <button
                className={`project-tab-button ${activeProject === 'etecread' ? 'active' : ''}`}
                onClick={() => window.location.hash = '#/etecread'}
                onMouseEnter={() => setActiveProject('etecread')}
                onFocus={() => setActiveProject('etecread')}
                role="tab"
                aria-selected={activeProject === 'etecread' ? 'true' : 'false'}
              >
                <span className="project-tab-title">EtecRead</span>
                <span className="project-tab-arrow" aria-hidden="true">&rarr;</span>
              </button>
            </div>

            <div className="project-summary-box">
              <div className={`project-summary-item ${activeProject === 'organizelife' ? 'active' : ''}`}>
                <p className="project-summary-text">{t.organizeDesc}</p>
              </div>
              <div className={`project-summary-item ${activeProject === 'etecread' ? 'active' : ''}`}>
                <p className="project-summary-text">{t.etecDesc}</p>
              </div>
            </div>
          </div>

          <div className="projects-preview-col">
            <div className="project-stage-container">
              <div 
                className="project-screen-box"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.location.hash = activeProject === 'organizelife' ? '#/organizelife' : '#/etecread';
                }}
              >
                <div className={`project-image-wrapper ${activeProject === 'organizelife' ? 'active' : ''}`}>
                  <img src="/assets/images/organize-life/cover.png" alt="OrganizeLife" className="project-cover-img" />
                  <div className="project-image-overlay">
                    <div className="overlay-tags">
                      <span className="overlay-tag">Laravel 12</span>
                      <span className="overlay-tag">React 19</span>
                      <span className="overlay-tag">MySQL</span>
                    </div>
                    <span className="overlay-cta-text">{t.exploreCase} &rarr;</span>
                  </div>
                </div>

                <div className={`project-image-wrapper ${activeProject === 'etecread' ? 'active' : ''}`}>
                  <img src="/assets/images/etec-read/cover.png" alt="EtecRead" className="project-cover-img" />
                  <div className="project-image-overlay">
                    <div className="overlay-tags">
                      <span className="overlay-tag">Laravel 11</span>
                      <span className="overlay-tag">Alpine.js</span>
                      <span className="overlay-tag">SQLite</span>
                    </div>
                    <span className="overlay-cta-text">{t.exploreCase} &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section with Enhanced Formation Cards */}
      <section className="about-section" id="about">
        <div className="container section-layout-grid">
          <div className="section-header-block">
            <h2 className="section-title">{t.about}</h2>
            <p className="section-desc">{t.kickerAbout}</p>
          </div>
          
          <div className="about-details-layout">
            <p className="about-intro-lead">{t.leadAbout}</p>
            <p className="about-body-text">{t.bodyAbout}</p>

            {/* Redesigned Minimal & Elegant Education Cards */}
            <div className="education-cards-grid">
              
              <div className="edu-card-compact">
                <div className="edu-avatar">
                  <img src="/assets/images/instituicoes/image.png" alt="ETEC de Guarulhos" className="edu-institution-img" />
                </div>
                <div className="edu-info">
                  <h3 className="edu-institution-name">ETEC de Guarulhos</h3>
                  <p className="edu-course-title">{t.eduSystems}</p>
                </div>
                <div className="edu-year-badge">
                  <span>2025</span>
                </div>
              </div>

              <div className="edu-card-compact">
                <div className="edu-avatar">
                  <img src="/assets/images/instituicoes/Logo_uninter.png" alt="UNINTER" className="edu-institution-img" />
                </div>
                <div className="edu-info">
                  <h3 className="edu-institution-name">UNINTER</h3>
                  <p className="edu-course-title">{t.eduEng}</p>
                </div>
                <div className="edu-year-badge edu-badge-active">
                  <span className="pulse-dot"></span>
                  <span>{t.current}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Unclipped Official Brand SVG Logos */}
      <section className="stack-section" id="stack">
        <div className="container section-layout-grid">
          <div className="section-header-block">
            <h2 className="section-title">{t.stack}</h2>
            <p className="section-desc">{t.kickerStack}</p>
          </div>
          
          <div className="skills-grid">
            
            {/* Frontend Group */}
            <div className="skills-card">
              <h3 className="skills-card-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, color: 'var(--accent-color)' }}>
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
                <span>{t.groupFrontend}</span>
              </h3>
              <div className="skills-card-list">
                
                {/* React */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/react.svg" alt="React" className="skill-chip-img" />
                  </div>
                  <span>React</span>
                </div>

                {/* JavaScript */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/js.webp" alt="JavaScript" className="skill-chip-img" />
                  </div>
                  <span>JavaScript</span>
                </div>

                {/* HTML5 */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/html.webp" alt="HTML5" className="skill-chip-img" />
                  </div>
                  <span>HTML5</span>
                </div>

                {/* CSS3 */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/css.webp" alt="CSS3" className="skill-chip-img" />
                  </div>
                  <span>CSS3</span>
                </div>

                {/* Tailwind CSS */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/tailwind.webp" alt="Tailwind CSS" className="skill-chip-img" />
                  </div>
                  <span>Tailwind</span>
                </div>

              </div>
            </div>

            {/* Backend Group */}
            <div className="skills-card">
              <h3 className="skills-card-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, color: 'var(--accent-color)' }}>
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
                <span>{t.groupBackend}</span>
              </h3>
              <div className="skills-card-list">
                
                {/* Node.js */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/node.png" alt="Node.js" className="skill-chip-img" />
                  </div>
                  <span>Node.js</span>
                </div>

                {/* PHP */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/php.webp" alt="PHP" className="skill-chip-img" />
                  </div>
                  <span>PHP</span>
                </div>

                {/* Laravel */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/laravel.jpg" alt="Laravel" className="skill-chip-img" />
                  </div>
                  <span>Laravel</span>
                </div>

              </div>
            </div>

            {/* Tools & Infra Group */}
            <div className="skills-card">
              <h3 className="skills-card-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, color: 'var(--accent-color)' }}>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
                <span>{t.groupTools}</span>
              </h3>
              <div className="skills-card-list">
                
                {/* Git */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/git.webp" alt="Git" className="skill-chip-img" />
                  </div>
                  <span>Git</span>
                </div>

                {/* MySQL */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/mysql.png" alt="MySQL" className="skill-chip-img" />
                  </div>
                  <span>MySQL</span>
                </div>

                {/* PostgreSQL */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/postgresql.png" alt="PostgreSQL" className="skill-chip-img" />
                  </div>
                  <span>PostgreSQL</span>
                </div>

                {/* SQLite */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/sqlite.webp" alt="SQLite" className="skill-chip-img" />
                  </div>
                  <span>SQLite</span>
                </div>

                {/* Docker */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/docker svg.svg" alt="Docker" className="skill-chip-img" />
                  </div>
                  <span>Docker</span>
                </div>

                {/* PHPUnit */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <img src="/assets/images/tec/phpunit.jpg" alt="PHPUnit" className="skill-chip-img" />
                  </div>
                  <span>PHPUnit</span>
                </div>

                {/* IA Integration (Gemini API) */}
                <div className="skill-chip">
                  <div className="skill-chip-icon-box">
                    <svg className="skill-chip-svg" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4285F4" />
                          <stop offset="50%" stopColor="#9B51E0" />
                          <stop offset="100%" stopColor="#D946EF" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#geminiGrad)" d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
                    </svg>
                  </div>
                  <span>IA (Gemini API)</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container section-layout-grid">
          <div className="section-header-block">
            <h2 className="section-title">{t.contact}</h2>
            <p className="section-desc">{t.contactKicker}</p>
          </div>
          
          <div className="contact-block">
            <p className="about-intro-lead">{t.contactLead}</p>
            
            <div className="contact-cards-grid">
              
              {/* Main E-mail Card */}
              <div className="contact-channel-card contact-card-main">
                <div className="channel-icon-badge">
                  <svg className="channel-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                
                <div className="channel-details">
                  <span className="channel-label">E-mail</span>
                  <span className="channel-value">nicolasdonedadev@gmail.com</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className={`btn-pill btn-pill-primary ${isCopied ? 'copied' : ''}`}
                  aria-live="polite"
                >
                  <span>{isCopied ? t.copied : t.copyEmail}</span>
                </button>
              </div>

              {/* Social Channels 2-Col Grid */}
              <div className="contact-social-grid">
                
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/nicolasdoneda/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-channel-card contact-card-social linkedin-card"
                >
                  <div className="channel-icon-badge">
                    <svg className="social-logo-svg" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Rede Profissional</span>
                    <span className="channel-value">LinkedIn &rarr;</span>
                  </div>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/Nicolas-Doneda" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-channel-card contact-card-social github-card"
                >
                  <div className="channel-icon-badge">
                    <svg className="social-logo-svg" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Código Fonte</span>
                    <span className="channel-value">GitHub &rarr;</span>
                  </div>
                </a>

                {/* Resume Download */}
                <a 
                  href="/assets/curriculo.pdf" 
                  download="Nicolas-Doneda-Curriculo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-card contact-card-social cv-card"
                >
                  <div className="channel-icon-badge">
                    <svg className="cv-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-6" />
                      <path d="m9 15 3 3 3-3" />
                    </svg>
                  </div>
                  <div className="channel-details">
                    <span className="channel-label">Documento PDF</span>
                    <span className="channel-value">{t.downloadCV} &rarr;</span>
                  </div>
                </a>

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ==========================================================================
// VIEW: OrganizeLife Case Study Screen
// ==========================================================================
function OrganizeLifeCase({ lang, t }) {
  return (
    <div className="case-study-page">
      <div className="container">
        
        <div className="case-hero-container">
          <div className="case-hero-meta">
            <span className="case-kicker">{t.organizeKicker}</span>
            <h1 className="case-title">OrganizeLife</h1>
            <p className="case-subtitle">{t.organizeSubtitle}</p>
            
            <div className="case-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value">{t.statusCompleted}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Core Stack</span>
                <span className="meta-value">Laravel 12 · React 19 · MySQL</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Repository</span>
                <span className="meta-value">
                  <a href="https://github.com/Nicolas-Doneda/OrganizeLife" target="_blank" rel="noopener noreferrer" className="meta-link">
                    <svg className="social-logo-svg" viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Deploy / Live</span>
                <span className="meta-value">
                  <a href="https://organizelife.onrender.com/" target="_blank" rel="noopener noreferrer" className="meta-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    <span>organizelife.onrender.com</span>
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="case-hero-visual">
            <img src="/assets/images/organize-life/cover.png" alt="OrganizeLife Showcase" className="case-mockup-img" />
          </div>
        </div>

        <div className="case-content-grid">
          <aside className="case-sidebar">
            <h3 className="case-sidebar-title">Detalhes do Projeto</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-light)' }}>
              {lang === 'pt-BR' 
                ? 'Desenvolvido por Nicolas Doneda como projeto integrador.' 
                : 'Developed by Nicolas Doneda as an integration project.'}
            </p>
          </aside>

          <div className="case-body-col">
            <article className="case-block">
              <h2 className="case-heading">{t.challengeTitle}</h2>
              <div className="case-text">
                <p>{t.organizeChallengeText}</p>
              </div>
            </article>

            <article className="case-block">
              <h2 className="case-heading">{t.featuresTitle}</h2>
              <ul className="case-feature-list">
                <li>
                  <strong>{t.organizeFeat1Title}</strong>{t.organizeFeat1Desc}
                </li>
                <li>
                  <strong>{t.organizeFeat2Title}</strong>{t.organizeFeat2Desc}
                </li>
                <li>
                  <strong>{t.organizeFeat3Title}</strong>{t.organizeFeat3Desc}
                </li>
                <li>
                  <strong>{t.organizeFeat4Title}</strong>{t.organizeFeat4Desc}
                </li>
              </ul>
            </article>

            <article className="case-block">
              <h2 className="case-heading">{t.engTitle}</h2>
              <div className="case-text">
                <p>{t.organizeEngDesc}</p>
              </div>
              
              <div className="tech-cards-grid">
                <div className="tech-detail-card">
                  <h4>{t.organizeEng1Title}</h4>
                  <p>{t.organizeEng1Desc}</p>
                </div>
                
                <div className="tech-detail-card">
                  <h4>{t.organizeEng2Title}</h4>
                  <p>{t.organizeEng2Desc}</p>
                </div>
                
                <div className="tech-detail-card">
                  <h4>{t.organizeEng3Title}</h4>
                  <p>{t.organizeEng3Desc}</p>
                </div>
              </div>
            </article>

            <article className="case-block project-conclusion-block">
              <h3>{t.gitHubTitle}</h3>
              <p>{t.organizeGitDesc}</p>
              <div className="conclusion-action" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="https://organizelife.onrender.com/" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  <span>{lang === 'pt-BR' ? 'Acessar Aplicação Online' : 'Access Live Application'}</span>
                </a>
                <a href="https://github.com/Nicolas-Doneda/OrganizeLife" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-secondary">
                  <svg className="social-logo-svg" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                  <span>{t.organizeGitCTA}</span>
                </a>
              </div>
            </article>

            <div style={{ marginTop: '2rem', textAlign: 'center', marginBottom: '4rem' }}>
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#/';
                }}
                className="footer-back-link"
              >
                ← {t.backPortfolio}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================================================
// VIEW: EtecRead Case Study Screen
// ==========================================================================
function EtecReadCase({ lang, t }) {
  return (
    <div className="case-study-page">
      <div className="container">
        
        <div className="case-hero-container">
          <div className="case-hero-meta">
            <span className="case-kicker">{t.etecKicker}</span>
            <h1 className="case-title">EtecRead</h1>
            <p className="case-subtitle">{t.etecSubtitle}</p>
            
            <div className="case-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value">{t.statusCompleted}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Core Stack</span>
                <span className="meta-value">Laravel 11 · PHP · Alpine.js</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Repository</span>
                <span className="meta-value">
                  <a href="https://github.com/Nicolas-Doneda/EtecRead" target="_blank" rel="noopener noreferrer" className="meta-link">
                    <svg className="social-logo-svg" viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="case-hero-visual">
            <img src="/assets/images/etec-read/cover.png" alt="EtecRead Showcase" className="case-mockup-img" />
          </div>
        </div>

        <div className="case-content-grid">
          <aside className="case-sidebar">
            <h3 className="case-sidebar-title">Trabalho de Conclusão</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-light)' }}>
              {lang === 'pt-BR' 
                ? 'Desenvolvido por Nicolas Doneda como TCC no curso Técnico da ETEC de Guarulhos.' 
                : 'Developed by Nicolas Doneda as a capstone project for the Technical course at ETEC.'}
            </p>
          </aside>

          <div className="case-body-col">
            <article className="case-block">
              <h2 className="case-heading">{t.challengeTitle}</h2>
              <div className="case-text">
                <p>{t.etecChallengeText}</p>
              </div>
            </article>

            <article className="case-block">
              <h2 className="case-heading">{t.featuresTitle}</h2>
              <ul className="case-feature-list">
                <li>
                  <strong>{t.etecFeat1Title}</strong>{t.etecFeat1Desc}
                </li>
                <li>
                  <strong>{t.etecFeat2Title}</strong>{t.etecFeat2Desc}
                </li>
                <li>
                  <strong>{t.etecFeat3Title}</strong>{t.etecFeat3Desc}
                </li>
                <li>
                  <strong>{t.etecFeat4Title}</strong>{t.etecFeat4Desc}
                </li>
              </ul>
            </article>

            <article className="case-block">
              <h2 className="case-heading">{t.engTitle}</h2>
              <div className="case-text">
                <p>{t.etecEngDesc}</p>
              </div>
              
              <div className="tech-cards-grid">
                <div className="tech-detail-card">
                  <h4>{t.etecEng1Title}</h4>
                  <p>{t.etecEng1Desc}</p>
                </div>
                
                <div className="tech-detail-card">
                  <h4>{t.etecEng2Title}</h4>
                  <p>{t.etecEng2Desc}</p>
                </div>
                
                <div className="tech-detail-card">
                  <h4>{t.etecEng3Title}</h4>
                  <p>{t.etecEng3Desc}</p>
                </div>
              </div>
            </article>

            <article className="case-block project-conclusion-block">
              <h3>{t.gitHubTitle}</h3>
              <p>{t.etecGitDesc}</p>
              <div className="conclusion-action">
                <a href="https://github.com/Nicolas-Doneda/EtecRead" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-primary">
                  <svg className="social-logo-svg" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                  <span>{t.etecGitCTA}</span>
                </a>
              </div>
            </article>

            <div style={{ marginTop: '2rem', textAlign: 'center', marginBottom: '4rem' }}>
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '#/';
                }}
                className="footer-back-link"
              >
                ← {t.backPortfolio}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
