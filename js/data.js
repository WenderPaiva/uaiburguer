/* =========================================================
   UAI BURGUER — DADOS OFICIAIS, CARDÁPIO & QUIZ INTERATIVO
   Inspiração: Hamburgueria Tradi (hamburgueriatradi.com.br)
   Unidade: Jardim Guanabara — Av. Goiânia, Goiânia - GO
   Instagram: @uaiburguergyn
   ========================================================= */

window.UAI_CONFIG = {
  whatsapp: "5562995458700",
  phoneFormatted: "(62) 99545-8700",
  storeName: "UAI BURGUER",
  instagram: "https://www.instagram.com/uaiburguergyn/",
  instagramHandle: "@uaiburguergyn",
  linktree: "https://linktr.ee/UAI_BURGUER",
  facebook: "https://www.facebook.com/uaiburguergyn",
  neighborhood: "Jardim Guanabara",
  city: "Goiânia - GO",
  address: {
    line1: "Avenida Goiânia, Qd. 03, Lt. 18",
    line2: "Jardim Guanabara — Goiânia - GO",
    cep: "74675-320",
    mapsShort: "https://maps.app.goo.gl/ZYBhtQiFMqJimCWP8",
    query: "Uai Burguer Gyn, Av. Goiânia, Qd 3 Lt 18, Jardim Guanabara, Goiânia - GO, 74675-320",
  },
  deliveryFee: 7.0,
  freeDeliveryFrom: 120.0,
  // 0 = Domingo ... 6 = Sábado. null = fechado.
  hours: {
    0: { open: "18:00", close: "23:30" },
    1: null,
    2: { open: "18:00", close: "23:30" },
    3: { open: "18:00", close: "23:30" },
    4: { open: "18:00", close: "23:30" },
    5: { open: "18:00", close: "24:00" },
    6: { open: "18:00", close: "24:00" },
  },
};

/* ---------- PONTO DA CARNE ---------- */
window.UAI_PONTOS = [
  { id: "Ao Ponto da Casa", label: "Ao Ponto da Casa", spec: "Centro rosado, suculento e tostado por fora" },
  { id: "Bem Passado", label: "Bem Passado", spec: "Selado por completo na chapa quente" },
];

/* ---------- ADICIONAIS ---------- */
const ADDONS_BURGER = [
  { id: "bacon", label: "Bacon Crocante Extra em Tiras", price: 6.0 },
  { id: "cheddar", label: "Camada Extra de Cheddar Cremoso", price: 5.5 },
  { id: "catupiry", label: "Catupiry® Original Maçaricado", price: 6.5 },
  { id: "carne", label: "Hambúrguer Extra 160g na Chapa", price: 12.0 },
  { id: "ovo", label: "Ovo Caipira na Chapa", price: 3.5 },
  { id: "batata-palha", label: "Porção Extra de Batata Palha & Milho", price: 4.0 },
];

const ADDONS_SIDE = [
  { id: "cheddar-pote", label: "Pote Extra de Cheddar Cremoso", price: 6.0 },
  { id: "bacon-farofa", label: "Farofa de Bacon Defumado", price: 5.0 },
  { id: "maionese-verde", label: "Maionese Temperada da Casa (Pote)", price: 3.5 },
];

/* ---------- DESTAQUES DO MÊS / ESTRELAS DA CASA (ESTILO TRADI) ---------- */
window.UAI_SPOTLIGHTS = [
  {
    id: "barca-tentadora",
    pill: "A Mais Famosa do Instagram",
    monthTag: "ESTRELA DA CASA",
    name: "BARCA TENTADORA UAI",
    subtitle: "O combo completo que para a mesa no Jardim Guanabara",
    description:
      "Nossa famosa Barca Tentadora: 4 hambúrgueres suculentos no brioche selado na manteiga, batata frita crocante, onion rings douradas, calabresa acebolada na chapa, dadinhos de queijo e potes de cheddar cremoso e maionese da casa.",
    image: "assets/img/barca.jpg",
    price: 119.9,
    tags: [
      "4 Burgers Artesanais",
      "Batata Frita + Onion Rings",
      "Calabresa Acebolada & Dadinhos",
      "Potes de Cheddar & Maionese UAI",
    ],
  },
  {
    id: "uai-supremo",
    pill: "Artesanal Insano • Campeão de Vendas",
    monthTag: "BURGER DO MÊS",
    name: "UAI SUPREMO ARTESANAL",
    subtitle: "Blend 180g na brasa, fusão de queijos e farofa de bacon",
    description:
      "Hambúrguer artesanal alto de 180g preparado na grelha de fogo alto, coberto por uma cascata cremosa de queijo especial derretido, farofa crocante de bacon defumado e molho secreto UAI no pão brioche dourado na manteiga.",
    image: "assets/img/uai-supremo.jpg",
    price: 42.9,
    tags: [
      "Blend Bovino 180g Suculento",
      "Cascata de Queijo Derretido",
      "Farofa de Bacon + Tiras",
      "Pão Brioche Selado na Manteiga",
    ],
  },
  {
    id: "x-tudo-goiano",
    pill: "Tradição de Goiânia Sem Miséria",
    monthTag: "GIGANTE GOIANO",
    name: "X-SALADA MONSTRO GOIANO",
    subtitle: "O verdadeiro sanduíche raiz de Goiânia em versão gigante",
    description:
      "Para quem ama fartura de verdade: hambúrguer suculento na chapa, camadas generosas de cheddar e requeijão cremoso, bacon, salsicha chapeada, ovo caipira, milho verde, batata palha crocante, alface fresca e maionese verde da casa.",
    image: "assets/img/x-salada.jpg",
    price: 36.9,
    tags: [
      "Cheddar + Requeijão Cremoso",
      "Bacon, Ovo & Salsicha na Chapa",
      "Milho + Batata Palha Crocante",
      "Maionese Verde Tradicional",
    ],
  },
];

/* ---------- SLIDES DO CARROSSEL DO CARDÁPIO (ESTILO TRADI) ---------- */
window.UAI_CAROUSEL = [
  {
    productId: "uai-supremo",
    name: "UAI SUPREMO ARTESANAL",
    subtitle: "Artesanais Insanos • O Carro-Chefe da Casa",
    image: "assets/img/uai-supremo.jpg",
  },
  {
    productId: "barca-tentadora",
    name: "BARCA TENTADORA COMPLETA",
    subtitle: "Para Compartilhar • Sucesso no @uaiburguergyn",
    image: "assets/img/barca.jpg",
  },
  {
    productId: "goiano-bruto",
    name: "COWBOY NA BRASA 180G",
    subtitle: "Defumado no Fogo • Cheddar & Bacon em Tiras",
    image: "assets/img/hero.jpg",
  },
  {
    productId: "uai-duplo-smash",
    name: "TREM BÃO DUPLO SMASH",
    subtitle: "Prensado na Chapa • Crosta Caramelizada & Cebola Roxa",
    image: "assets/img/trem-bao-smash.jpg",
  },
  {
    productId: "x-salada-raiz",
    name: "X-SALADA SUCULENTO UAI",
    subtitle: "Clássico Goiano • Maionese Verde da Casa",
    image: "assets/img/x-salada.jpg",
  },
  {
    productId: "shake-doce-leite",
    name: "MILK SHAKE DOCE DE LEITE MINEIRO",
    subtitle: "Sobremesas & Shakes • Ultra Cremoso",
    image: "assets/img/milkshake.jpg",
  },
];

/* ---------- CATEGORIAS DO CARDÁPIO ---------- */
window.UAI_CATEGORIES = [
  { id: "todos", name: "Destaques & Todos" },
  { id: "artesanais", name: "Artesanais Insanos" },
  { id: "xsalada", name: "X-Salada & Goianos" },
  { id: "barcas", name: "Barca & Porções" },
  { id: "smash", name: "Estilo Smash" },
  { id: "shakes", name: "Milk Shakes & Doces" },
  { id: "bebidas", name: "Bebidas & Chopp" },
];

/* ---------- PRODUTOS DO CARDÁPIO ---------- */
window.UAI_PRODUCTS = [
  /* ==================== ARTESANAIS INSANOS ==================== */
  {
    id: "uai-supremo",
    cat: "artesanais",
    name: "Uai Supremo Artesanal",
    badge: "Carro-Chefe",
    specs: "Blend 180g • Cascata de Queijo • Farofa e Tiras de Bacon • Brioche",
    desc: "Hambúrguer artesanal 180g grelhado no fogo, coberto por fusão cremosa de queijos, farofa crocante de bacon defumado, tiras de bacon e maionese especial da casa no pão brioche selado na manteiga.",
    price: 42.9,
    img: "assets/img/uai-supremo.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },
  {
    id: "goiano-bruto",
    cat: "artesanais",
    name: "Cowboy na Brasa 180g",
    badge: "Artesanal Insano",
    specs: "Blend 180g • Cheddar Derretido • Bacon Defumado • Cebola Roxa • Molho UAI",
    desc: "Blend bovino 180g assado na brasa com aroma defumado, camada dupla de cheddar cremoso, fatias generosas de bacon crocante, cebola roxa, tomate, alface e molho rústico no pão com gergelim.",
    price: 41.9,
    img: "assets/img/hero.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },
  {
    id: "cowboy-rapadura",
    cat: "artesanais",
    name: "Uai Cheddar & Bacon Duplo",
    badge: "Para Fome Bruta",
    specs: "2x 160g Artesanal • Cheddar Cremoso • Cebola Caramelizada • Brioche",
    desc: "Dois hambúrgueres artesanais de 160g, banho de queijo cheddar derretido, bacon crocante em dobro, picles de cebola roxa e barbecue defumado da casa no pão brioche.",
    price: 46.9,
    img: "assets/img/trem-bao-smash.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },
  {
    id: "fazenda-160",
    cat: "artesanais",
    name: "Fazendeiro Mineiro",
    specs: "Blend 180g • Queijo Meia Cura • Geleia de Pimenta & Bacon • Brioche",
    desc: "Hambúrguer artesanal de 180g com queijo meia cura derretido no abafador, tiras de bacon, toque de geleia artesanal de pimenta com abacaxi e rúcula fresca no pão brioche.",
    price: 39.9,
    img: "assets/img/uai-supremo.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },

  /* ==================== X-SALADA & GOIANOS ==================== */
  {
    id: "x-salada-raiz",
    cat: "xsalada",
    name: "X-Salada Suculento UAI",
    badge: "Clássico da Casa",
    specs: "Hambúrguer 150g • Queijo Derretido • Alface e Tomate • Maionese Verde",
    desc: "O X-Salada que deu fama ao UAI Burguer no Jardim Guanabara: carne suculenta 150g, queijo derretido no vapor, alface americana crocante, tomate selecionado e nossa lendária maionese temperada no pão com gergelim.",
    price: 28.9,
    img: "assets/img/x-salada.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },
  {
    id: "x-tudo-goiano",
    cat: "xsalada",
    name: "X-Salada Monstro Goiano (X-Tudo)",
    badge: "Fartura Total",
    specs: "Carne 160g • Cheddar & Catupiry • Bacon • Ovo • Milho & Batata Palha",
    desc: "Montado sem miséria no verdadeiro estilo de Goiânia: carne artesanal 160g, cheddar e requeijão cremoso em espiral, bacon, salsicha chapeada, ovo caipira, milho verde, batata palha crocante e salada fresca.",
    price: 36.9,
    img: "assets/img/x-salada.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },
  {
    id: "x-bacon-especial",
    cat: "xsalada",
    name: "X-Bacon Suculento",
    specs: "Hambúrguer 150g • Queijo Prato Duplo • Muito Bacon • Maionese da Casa",
    desc: "Carne 150g na chapa quente, queijo prato derretido em dobro, fatias caprichadas de bacon crocante, milho, batata palha, alface, tomate e maionese verde no pão macio.",
    price: 32.9,
    img: "assets/img/hero.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },
  {
    id: "x-egg-bacon",
    cat: "xsalada",
    name: "X-Egg Calabresa & Queijo",
    specs: "Hambúrguer 150g • Calabresa na Chapa • Ovo Caipira • Cheddar • Salada",
    desc: "Hambúrguer 150g acompanhado de calabresa defumada chapeada com cebola, ovo caipira na chapa, queijo derretido, milho, batata palha, alface e tomate.",
    price: 33.9,
    img: "assets/img/x-salada.jpg",
    ponto: true,
    addons: ADDONS_BURGER,
  },

  /* ==================== BARCA & PORÇÕES ==================== */
  {
    id: "barca-tentadora",
    cat: "barcas",
    name: "Barca Tentadora Completa",
    badge: "Serve 3 a 4 Pessoas",
    specs: "4 Burgers • Batata Frita • Onion Rings • Calabresa • Dadinhos • Molhos",
    desc: "A estrela do nosso Instagram! Barca recheada com 4 hambúrgueres suculentos com queijo e bacon, porção de batata frita, anéis de cebola, calabresa acebolada, dadinhos de queijo e potes de cheddar e maionese da casa.",
    price: 119.9,
    img: "assets/img/barca.jpg",
    ponto: false,
    addons: ADDONS_SIDE,
  },
  {
    id: "barca-casal",
    cat: "barcas",
    name: "Barca Tentadora Casal",
    badge: "Serve 2 Pessoas",
    specs: "2 Burgers Artesanais • Batata com Cheddar & Bacon • Calabresa • Molho",
    desc: "Ideal para dividir a dois: 2 hambúrgueres artesanais no brioche com cheddar e bacon, acompanhados de batata frita crocante, calabresa na chapa e pote de cheddar cremoso.",
    price: 74.9,
    img: "assets/img/barca.jpg",
    ponto: false,
    addons: ADDONS_SIDE,
  },
  {
    id: "dadinhos-coalho",
    cat: "barcas",
    name: "Dadinhos de Queijo Coalho",
    badge: "Entrada Favorita",
    specs: "10 Unidades • Crocantes por Fora • Acompanha Geleia de Pimenta ou Melado",
    desc: "Cubos dourados de queijo coalho com tapioca fritos na hora, casquinha crocante e interior super macio, servidos com geleia artesanal agridoce picante.",
    price: 29.9,
    img: "assets/img/dadinhos.jpg",
    ponto: false,
    addons: ADDONS_SIDE,
  },
  {
    id: "batata-rustica",
    cat: "barcas",
    name: "Batata Rústica da Fazenda",
    specs: "Corte com Casca • Alecrim & Alho • Pote de Creme de Queijo Quente",
    desc: "Batatas cortadas em gomos rústicos com casca, dupla fritura super crocante, finalizadas com alecrim fresco e acompanhadas de creme quente de queijos.",
    price: 27.9,
    img: "assets/img/batata-rustica.jpg",
    ponto: false,
    addons: ADDONS_SIDE,
  },
  {
    id: "fritas-bacon",
    cat: "barcas",
    name: "Fritas Suprema Cheddar & Bacon",
    specs: "Porção 400g • Cobertura de Cheddar Cremoso • Chuva de Bacon Crocante",
    desc: "Porção generosa de batatas fritas sequinhas e crocantes, cobertas com muito cheddar cremoso quentinho e bacon picado na faca.",
    price: 32.9,
    img: "assets/img/batata-rustica.jpg",
    ponto: false,
    addons: ADDONS_SIDE,
  },

  /* ==================== ESTILO SMASH ==================== */
  {
    id: "uai-duplo-smash",
    cat: "smash",
    name: "Trem Bão Duplo Smash",
    badge: "Mais Pedido",
    specs: "2x 90g Smash Angus • Duplo Cheddar • Cebola Roxa • Brioche",
    desc: "Dois discos de 90g prensados na chapa fervendo até formar aquela crosta caramelizada irresistível, duplo queijo cheddar derretido, cebola roxa e molho especial UAI.",
    price: 34.9,
    img: "assets/img/trem-bao-smash.jpg",
    ponto: false,
    addons: ADDONS_BURGER,
  },
  {
    id: "bacon-double",
    cat: "smash",
    name: "Smash Bacon Melt",
    specs: "2x 90g Smash • American Cheese • Tiras de Bacon Crocante • Molho da Casa",
    desc: "Duplo smash prensado na chapa com borda rendada, queijo derretido entre as carnes, tiras inteiras de bacon defumado e molho defumado no pão selado.",
    price: 36.9,
    img: "assets/img/trem-bao-smash.jpg",
    ponto: false,
    addons: ADDONS_BURGER,
  },
  {
    id: "smash-simples",
    cat: "smash",
    name: "Smash Clássico UAI",
    specs: "1x 90g Smash • Queijo Cheddar • Picles da Casa • Molho Especial",
    desc: "Direto ao ponto: disco smash de 90g com crosta crocante, fatia dupla de cheddar derretido, picles artesanal e molho da casa no pão brioche macio.",
    price: 23.9,
    img: "assets/img/trem-bao-smash.jpg",
    ponto: false,
    addons: ADDONS_BURGER,
  },

  /* ==================== MILK SHAKES & DOCES ==================== */
  {
    id: "shake-doce-leite",
    cat: "shakes",
    name: "Milk Shake Doce de Leite Mineiro",
    badge: "Receita Exclusiva",
    specs: "400ml • Sorvete de Creme • Doce de Leite Artesanal • Chantilly e Farofa Doce",
    desc: "Batido ultra cremoso com sorvete de baunilha, calda generosa de doce de leite mineiro de tacho, coberto com chantilly e farofa crocante de castanhas.",
    price: 22.9,
    img: "assets/img/milkshake.jpg",
    ponto: false,
  },
  {
    id: "shake-ovomaltine",
    cat: "shakes",
    name: "Milk Shake Crocante Ovomaltine",
    specs: "400ml • Sorvete Cremoso • Calda de Chocolate • Chantilly & Ovomaltine",
    desc: "Milk shake espesso batido com flocos crocantes de Ovomaltine, calda de chocolate belga e finalizado com chantilly.",
    price: 22.9,
    img: "assets/img/milkshake.jpg",
    ponto: false,
  },
  {
    id: "romeu-julieta",
    cat: "shakes",
    name: "Cheesecake Romeu & Julieta",
    specs: "Fatia Generosa • Creme de Queijo Artesanal • Calda de Goiabada Cascão",
    desc: "Sobremesa cremosa à base de queijo suave sobre base amanteigada crocante, servida com calda rústica de goiabada cascão derretida.",
    price: 19.9,
    img: "assets/img/sobremesa.jpg",
    ponto: false,
  },

  /* ==================== BEBIDAS & CHOPP ==================== */
  {
    id: "chopp-pilsen",
    cat: "bebidas",
    name: "Chopp Pilsen Trincando 400ml",
    badge: "Caneca Gelada",
    specs: "400ml • Puro Malte • Colarinho Cremoso",
    desc: "Chopp artesanal puro malte tirado na pressão na temperatura perfeita para acompanhar seu burger ou barca.",
    price: 14.9,
    img: "assets/img/chopp.jpg",
    ponto: false,
  },
  {
    id: "refri-lata",
    cat: "bebidas",
    name: "Refrigerante Lata 350ml",
    specs: "Coca-Cola • Coca Zero • Guaraná Antarctica • Sprite",
    desc: "Lata 350ml super gelada. Informe o sabor preferido nas observações do pedido.",
    price: 6.9,
    img: "assets/img/chopp.jpg",
    ponto: false,
  },
  {
    id: "refri-2l",
    cat: "bebidas",
    name: "Refrigerante 2 Litros (Para a Galera)",
    specs: "2 Litros • Coca-Cola ou Guaraná Antarctica Gelado",
    desc: "Garrafa de 2 litros gelada, perfeita para acompanhar a Barca Tentadora ou o pedido da família.",
    price: 15.9,
    img: "assets/img/chopp.jpg",
    ponto: false,
  },
];

/* ---------- QUIZ INTERATIVO "QUAL É O SEU BURGER?" (ESTILO TRADI) ---------- */
window.UAI_QUIZ = {
  questions: [
    {
      id: "fome",
      hostQuote: "Fala, cumpadi! Aqui no UAI Burguer a gente não brinca em serviço. Me conta primeiro...",
      question: "Qual é o tamanho da sua fome hoje?",
      answers: [
        { label: "Quero um Artesanal alto e suculento!", emoji: "🔥", value: "artesanal" },
        { label: "Tô com desejo daquele X-Salada / X-Tudo Goiano!", emoji: "🍔", value: "goiano" },
        { label: "Tô com a galera ou família: quero FARTURA!", emoji: "🛶", value: "barca" },
        { label: "Prefiro um Smash prensadinho com crosta!", emoji: "⚡", value: "smash" },
      ],
    },
    {
      id: "recheio",
      hostQuote: "Boa escolha, sô! Agora vem a pergunta que separa os fortes...",
      question: "O que faz seu olho brilhar no recheio?",
      answers: [
        { label: "Queijo derretendo sem dó por cima de tudo", emoji: "🧀", value: "queijo" },
        { label: "Muito bacon crocante em tiras e farofa", emoji: "🥓", value: "bacon" },
        { label: "Milho, batata palha, ovo caipira e maionese verde", emoji: "🌽", value: "completo" },
        { label: "Porções variadas: fritas, calabresa e onion rings", emoji: "🍟", value: "porcoes" },
      ],
    },
    {
      id: "vibe",
      hostQuote: "Tá ficando bão demais da conta! Última pergunta pra fechar a comanda...",
      question: "Qual é o toque final perfeito pra hoje?",
      answers: [
        { label: "Pão brioche selado na manteiga + molho secreto", emoji: "✨", value: "brioche" },
        { label: "Sabor defumado na brasa com cheddar cremoso", emoji: "🤠", value: "defumado" },
        { label: "Acompanhado de Milk Shake cremoso ou Chopp", emoji: "🥤", value: "shake" },
        { label: "Dividir tudo na mesa sem ninguém passar vontade", emoji: "🎉", value: "mesa" },
      ],
    },
  ],
  recommend(answers) {
    const [q1, q2, q3] = answers;
    if (q1 === "barca" || q2 === "porcoes" || q3 === "mesa") {
      return {
        productId: "barca-tentadora",
        quote:
          "Não tem erro, cumpadi! A sua pedida hoje é a famosa BARCA TENTADORA COMPLETA! Vem 4 burgers, fritas, onion rings, calabresa, dadinhos e cheddar pra todo mundo sair feliz!",
        tags: ["Serve 3-4 Pessoas", "Estrela do Insta", "Fartura Total"],
      };
    }
    if (q1 === "goiano" || q2 === "completo") {
      return {
        productId: "x-tudo-goiano",
        quote:
          "Você tem alma goiana raiz! Vai de X-SALADA MONSTRO GOIANO: muito queijo, bacon, ovo, salsicha, milho, batata palha crocante e aquela maionese verde que só o UAI tem!",
        tags: ["X-Tudo Raiz", "Milho & Batata Palha", "Maionese Verde"],
      };
    }
    if (q1 === "smash") {
      return {
        productId: "uai-duplo-smash",
        quote:
          "Chapa fervendo! O TREM BÃO DUPLO SMASH foi feito pra você: dois discos prensados com bordinha crocante, duplo cheddar derretido e cebola roxa no brioche!",
        tags: ["Duplo Smash", "Crosta Crocante", "Campeão de Pedidos"],
      };
    }
    if (q2 === "bacon" || q3 === "defumado") {
      return {
        productId: "goiano-bruto",
        quote:
          "Segura o chapéu! O COWBOY NA BRASA 180G combina carne alta defumada no fogo, cheddar cremoso escorrendo e fatias generosas de bacon crocante!",
        tags: ["180g na Brasa", "Cheddar & Bacon", "Defumado"],
      };
    }
    return {
      productId: "uai-supremo",
      quote:
        "Pode pedir de olho fechado o nosso carro-chefe: UAI SUPREMO ARTESANAL! Carne alta de 180g, cascata de queijo derretido e farofa de bacon no brioche tostado!",
      tags: ["Carro-Chefe", "Blend 180g", "Cascata de Queijo"],
    };
  },
};
