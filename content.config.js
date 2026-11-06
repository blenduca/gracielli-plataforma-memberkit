/* Conteúdo da mentoria de Graciélli Camini. IDs estáveis para preservar progresso. */
(function () {
  const prefix = "assets/courses/mapa-da-expansao-do-lider-";
  const lesson = (id, title, moduleNo, lessonNo) => ({
    id, title, duration: "",
    thumbnail: prefix + "modulo-" + moduleNo + "-aula-" + lessonNo + ".png",
    content: "<p>O vídeo e os materiais desta aula serão disponibilizados em breve.</p>",
    attachments: [],
  });
  window.CONTENT_CONFIG = {
    banners: [{
      src: "assets/banners/banner-01.png",
      alt: "O Mapa da Expansão do Líder — mentoria de liderança com Graciélli Camini",
      title: "O Mapa da Expansão do Líder",
      subtitle: "Uma jornada para liderar com clareza, consciência e resultado.",
      cta: "Começar agora",
      href: "#/curso/mapa-da-expansao-do-lider",
    }],
    categories: [{ id: "mentoria", title: "Mentoria" }],
    courses: [{
      slug: "mapa-da-expansao-do-lider",
      title: "O Mapa da Expansão do Líder",
      subtitle: "Liderança, autoconhecimento e autogestão",
      description: "Desenvolva uma liderança mais segura, estratégica e emocionalmente preparada para conduzir pessoas com clareza, respeito e resultado.",
      cover: prefix + "capa.png",
      heroImage: prefix + "hero.png",
      category: "mentoria",
      modules: [
        {
          id: "fundamentos-da-lideranca",
          title: "Módulo 1 · Fundamentos da Liderança",
          description: "O papel do líder, sua visão e o impacto que gera nas pessoas.",
          cover: prefix + "modulo-01.png",
          lessons: [
            lesson("lideranca-nao-comeca-no-cargo", "1.1 Liderança não começa no cargo", "01", "01"),
            lesson("lider-chefe-e-gestor", "1.2 Líder, chefe e gestor", "01", "02"),
            lesson("impacto-do-lider-parte-1", "1.3 O impacto do líder sobre o ambiente e as pessoas — vídeo 1", "01", "03"),
            lesson("impacto-do-lider-parte-2", "1.3 O impacto do líder sobre o ambiente e as pessoas — vídeo 2", "01", "04"),
            lesson("construa-sua-visao-de-lideranca", "1.4 Construa sua visão de liderança", "01", "05"),
          ],
        },
        {
          id: "autoconhecimento-e-perfil",
          title: "Módulo 2 · Autoconhecimento e Perfil",
          description: "Interprete seu perfil e reconheça suas forças e excessos.",
          cover: prefix + "modulo-02.png",
          lessons: [
            lesson("autoconhecimento", "2.1 Autoconhecimento", "02", "01"),
            lesson("interpretar-perfil-comportamental", "2.2 Como interpretar um perfil comportamental", "02", "02"),
            lesson("forcas-e-excessos", "2.3 Suas forças e seus excessos", "02", "03"),
            lesson("mapa-do-perfil-do-lider", "2.4 Mapa do Perfil do Líder", "02", "04"),
          ],
        },
        {
          id: "autogestao-e-inteligencia-emocional",
          title: "Módulo 3 · Autogestão e Inteligência Emocional",
          description: "Desenvolva autorregulação e transforme reflexão em plano de ação.",
          cover: prefix + "modulo-03.png",
          lessons: [
            lesson("lideranca-autogestao-inteligencia-emocional", "3.1 Liderança Autogestão – Inteligência emocional", "03", "01"),
            lesson("autorregulacao", "3.2 Autorregulação", "03", "02"),
            lesson("resiliencia-pressao-e-recuperacao", "3.3 Resiliência: pressão e recuperação", "03", "03"),
            lesson("meu-plano-de-autogestao", "3.4 Meu plano de Autogestão", "03", "04"),
          ],
        },
        {
          id: "comunicacao-assertiva",
          title: "Módulo 4 · Comunicação Assertiva",
          description: "Comunique com responsabilidade, escute de verdade e seja claro sem ser agressivo.",
          cover: prefix + "modulo-04.png",
          lessons: [
            lesson("comunicacao-responsabilidade-do-lider-parte-1", "4.1 Comunicação é responsabilidade do líder — vídeo 1", "04", "01"),
            lesson("comunicacao-responsabilidade-do-lider-parte-2", "4.1 Comunicação é responsabilidade do líder — vídeo 2", "04", "02"),
            lesson("escuta-ativa", "4.2 Escuta ativa", "04", "03"),
            lesson("assertividade-clareza-sem-agressividade", "4.3 Assertividade: clareza sem agressividade", "04", "04"),
            lesson("comunicacao-nao-violenta-parte-1", "4.4 Comunicação não violenta — vídeo 1", "04", "05"),
            lesson("comunicacao-nao-violenta-parte-2", "4.4 Comunicação não violenta — vídeo 2", "04", "06"),
          ],
        },
        {
          id: "feedback",
          title: "Módulo 5 · Feedback",
          description: "Prepare e conduza conversas de feedback com conexão e clareza.",
          cover: prefix + "modulo-05.png",
          lessons: [
            lesson("feedback-nao-e-bronca", "5.1 Feedback não é bronca", "05", "01"),
            lesson("conexao-e-preparacao-para-o-feedback", "5.2 Conexão e preparação para o feedback", "05", "02"),
            lesson("acao-nao-esperada-e-acao-esperada", "5.3 Ação não esperada x ação esperada", "05", "03"),
            lesson("perguntas-de-alinhamento-e-compromisso", "5.4 Perguntas de alinhamento e compromisso", "05", "04"),
            lesson("acompanhar-reconhecer-e-apoiar", "5.5 Acompanhar, reconhecer e apoiar", "05", "05"),
          ],
        },
      ],
    }],
    ranking: [], forums: [], posts: [], notifications: [],
  };
})();
