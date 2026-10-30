/* =============================================================
 * PLATFORM CONFIG — identidade visual do cliente.
 * =============================================================
 *
 * ⚠️  ESTE TEMPLATE É NEUTRO DE PROPÓSITO (preto, branco, cinzas,
 *     Helvetica e imagens placeholder). Nada aqui é a identidade final.
 *
 * Ao criar uma plataforma para um cliente ("vamos criar a plataforma
 * do cliente X"), TODO campo marcado com [CLIENTE] DEVE ser trocado
 * pelo design system / identidade visual desse cliente:
 *
 *   [CLIENTE] nome, logo, logo para fundo escuro, favicon
 *   [CLIENTE] fonte da interface (typography)
 *   [CLIENTE] cor da marca  → botões primários, progresso, chips, links, foco
 *   [CLIENTE] cores da barra lateral (sidebar)
 *   [CLIENTE] fundo das páginas e imagem de fundo da barra lateral
 *   [CLIENTE] tema claro/escuro e tema da barra superior
 *
 * Ao terminar, mude `isTemplate` para false e rode:
 *   node scripts/check-client.mjs
 * O script aponta qualquer valor de template que ainda tenha ficado.
 *
 * Campos marcados com [OPCIONAL] podem ficar como estão.
 * Layout, medidas e componentes são IMUTÁVEIS e vivem em src/ — não
 * edite src/ para "encaixar" a identidade do cliente. Ver AGENTS.md.
 * ============================================================= */

window.PLATFORM_CONFIG = {
  /* true = ainda é o template neutro. [CLIENTE] mude para false ao personalizar. */
  isTemplate: false,

  /* ---------- Identidade ---------- */
  brand: {
    name: "O Mapa da Expansão do Líder",                     // [CLIENTE] título da aba, cabeçalhos, certificado
    logo: {
      src: "assets/logo/gracielli-logo.svg",          // [CLIENTE] logo p/ fundo claro → assets/logo/ (até 200px de largura, ideal ≤ 48px de altura)
      srcDark: "assets/logo/gracielli-logo-dark.svg", // [CLIENTE] logo p/ fundo escuro (topbar escura, gaveta mobile). "" = usa src
      alt: "Graciélli Camini",                    // [CLIENTE]
    },
    favicon: "assets/logo/gracielli-favicon.svg",     // [CLIENTE] 196x196 → assets/logo/
  },

  /* ---------- Tipografia ----------
     Template: Helvetica. Cliente: a fonte do design system dele.
     - Google Fonts: cole a URL do CSS em fontUrl e o nome em fontFamily.
       ex.: fontUrl: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
            fontFamily: '"Manrope", sans-serif'
     - Arquivos próprios: coloque em assets/fonts/, crie assets/fonts/fonts.css
       com os @font-face e use fontUrl: "assets/fonts/fonts.css".
     Pesos usados pela interface: 400, 500, 600 e 700. */
  typography: {
    fontFamily: '"Inter", sans-serif', // [CLIENTE]
    fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap",                                                  // [CLIENTE] "" = fonte do sistema
  },

  /* ---------- Aparência ----------
     Espelha a tela "Aparência" da Memberkit. Só estas opções existem —
     NÃO crie cores novas em src/css para um cliente. */
  appearance: {
    /* [CLIENTE] Cor da marca (UMA cor, hex). Pinta: botões primários, botão
       "começar agora", barras de progresso, chip de categoria ativo, links,
       anel de foco, check de aula concluída, medalha do ranking.
       Claro/escuro e cor do texto sobre ela são calculados sozinhos.
       Template: cinza médio neutro. */
    brandColor: "#3E8A47",

    /* [CLIENTE] Cores da barra lateral (hex): início e fim do degradê;
       em "solid" só primary é usada. Prefira um tom escuro em primary —
       a cor do texto (clara/escura) é escolhida automaticamente.
       Template: grafite/preto. */
    sidebarColors: { primary: "#2D2A29", secondary: "#5E5653" },

    /* [CLIENTE] Estilo da barra lateral:
       "solid" (cor sólida) | "linear_gradient" (gradiente simples)
       "blend_gradient" (gradiente sobre images.sidebarBackground)
       "minimal" (fundo branco com borda) | "transparent" */
    sidebarStyle: "linear_gradient",

    /* [CLIENTE] Fundo das páginas no tema claro (hex) — normalmente o
       off-white/neutro do design system. Temas escuros usam o próprio fundo. */
    pageBackground: "#F7F4F3",

    /* [CLIENTE] Tema da área do aluno: "classic" (claro) | "carbon" | "dracula" | "prime" (escuros).
       O botão lua/sol alterna entre "classic" e este tema (ou "carbon"). */
    theme: "classic",

    /* [CLIENTE] Tema da barra superior: "classic" | "carbon" | "dracula" | "prime" */
    topbarTheme: "classic",

    images: {
      /* [CLIENTE] só aparece com sidebarStyle "blend_gradient". 700x1050 → assets/brand/ */
      sidebarBackground: "assets/brand/sidebar-background.svg",
    },
  },

  /* ---------- Certificado ----------
     Padrão Memberkit: imagem 1056x816 (Carta paisagem). A arte leva os textos
     FIXOS (curso, carga horária, instrutor, assinatura) e deixa espaço livre
     para os campos que a Memberkit insere (nome, datas, CPF/CNPJ, QR Code).
     Cores, fonte e logo vêm da identidade acima — gere a arte no kit de artes
     (http://localhost:5180/kit/) junto com as capas.
     Cada curso pode sobrescrever hours/instructor/instructorRole/signature em
     content.config.js → courses[].certificate. */
  certificate: {
    title: "Certificado",                  // [OPCIONAL] sobrelinha
    subtitle: "de conclusão",              // [OPCIONAL] título grande
    background: "#F7F4F3",                 // [CLIENTE] fundo do certificado (branco/off-white do design system)
    instructor: "Graciélli Camini",       // [CLIENTE] quem assina (padrão de todos os cursos)
    instructorRole: "Psicóloga e Mentora de Líderes",        // [CLIENTE] cargo/título abaixo do nome
    signature: "",                         // [CLIENTE] PNG transparente da assinatura → assets/brand/ ("" = só a linha)
    /* campos dinâmicos que serão ligados no editor da Memberkit (reserva o espaço na arte) */
    fields: { startDate: false, endDate: true, document: false, qrCode: true }, // [OPCIONAL]
    back: true,                            // [OPCIONAL] gera o verso com o conteúdo programático
  },

  /* ---------- Menu lateral [OPCIONAL] ----------
     Liga/desliga itens. "Conteúdos" sempre aparece. */
  menu: {
    community: false,     // Comunidades
    ranking: false,       // Ranking
    certificates: false,  // Ativar após confirmar carga horária e assinatura
  },

  /* ---------- Aluno de demonstração [OPCIONAL] ---------- */
  demoUser: {
    name: "Aluno Demo",
    email: "aluno@exemplo.com",
    avatar: "", // vazio = avatar padrão
  },
};
