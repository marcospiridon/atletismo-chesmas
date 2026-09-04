import { ClubInfo, GalleryPhoto, NewsArticle, TrainingSession, AthleteRegistration } from '../types';

export const initialClubInfo: ClubInfo = {
  name: "Clube de Atletismo Chesmas",
  slogan: "Garra, Superação e Paixão pelo Atletismo",
  description: "Dedicados à formação de jovens talentos, ao atletismo de competição e à promoção de um estilo de vida ativo e saudável através da corrida de estrada, trail running e pista.",
  foundationYear: 2018,
  email: "atletismochesmas@gmail.com",
  phone: "+351 912 345 678",
  address: "Complexo Desportivo Municipal, Campo de Treinos, Portugal",
  trainingLocations: [
    {
      name: "Pista Municipal de Atletismo",
      address: "Av. do Desporto, 4500",
      details: "Treinos de velocidade, técnica de corrida, barreiras e séries controladas (Piso sintético de Tartan)."
    },
    {
      name: "Parque Verde da Cidade & Trilhos",
      address: "Alameda dos Pinheiros",
      details: "Treinos longos de resistência, fartlek e preparação para Trail Running."
    },
    {
      name: "Pavilhão Gimnodesportivo",
      address: "Rua dos Campeões",
      details: "Reforço muscular, pliometria e flexibilidade para escalões de formação e seniores."
    }
  ],
  socialMedia: {
    facebook: "https://facebook.com/atletismochesmas",
    instagram: "https://instagram.com/atletismochesmas",
    strava: "https://strava.com/clubs/atletismochesmas",
    whatsapp: "https://wa.me/351912345678"
  },
  president: "Carlos Silva",
  headCoach: "Prof. António Ferreira",
  logoUrl: "/logo.png"
};

export const initialNews: NewsArticle[] = [
  {
    id: "news-1",
    title: "Chesmas brilha no Campeonato Regional de Estrada com 4 Pódios",
    slug: "chesmas-brilha-campeonato-regional-estrada",
    category: "Resultados",
    summary: "A nossa equipa conquistou lugares de topo nos 10km e na prova de veteranos, demonstrando o excelente momento de forma dos nossos atletas.",
    content: `Uma manhã memorável para as cores do Clube de Atletismo Chesmas! No passado domingo, os nossos atletas estiveram em grande destaque no Campeonato Regional de Estrada.

Com mais de 30 atletas alinhados à partida nas várias categorias, o Chesmas impôs um ritmo forte desde os primeiros quilómetros. 

Destaques individuais:
- **Manuel Santos**: 1º Lugar em Veteranos M40 com a marca de 32:45.
- **Sofia Ramos**: 2º Lugar em Seniores Femininos com novo recorde pessoal de 37:12.
- **Tiago Neves**: 3º Lugar em Sub-23 com 33:18.
- **Equipa Masculina de Veteranos**: Campeões Regionais Coletivos!

O treinador António Ferreira destacou o espírito de união e a consistência no plano de treinos: *"Estes resultados são o reflexo do trabalho árduo que fazemos semanalmente na pista e nos treinos de estrada. Parabéns a todos!"*`,
    coverImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
    author: "Direção de Comunicação",
    publishDate: "2026-08-15",
    featured: true,
    tags: ["Estrada", "Pódios", "Campeonato Regional", "Recordes"],
    views: 420,
    likes: 84
  },
  {
    id: "news-2",
    title: "Abertura das Inscrições para a Época 2026/2027: Junta-te à Família Chesmas!",
    slug: "abertura-inscricoes-epoca-2026-2027",
    category: "Clube & Comunidade",
    summary: "Desde a formação infantil aos masters e trail running, temos turmas adaptadas a todos os níveis de experiência.",
    content: `Estão oficialmente abertas as inscrições para a nova época desportiva do Clube de Atletismo Chesmas!

Quer sejas um jovem que quer dar os primeiros passos nas disciplinas do atletismo, um corredor experiente à procura de bater o seu recorde pessoal, ou alguém que quer começar a correr com acompanhamento técnico qualificado, o Chesmas é o teu lugar.

**O que oferecemos:**
- Treinadores credenciados pela Federação Portuguesa de Atletismo
- Acesso à pista de atletismo e instalações de apoio
- Planeamento individualizado e treinos de grupo
- Seguro desportivo e filiação federativa
- Equipamento oficial do clube e ambiente de camaradagem inigualável

Podes fazer a tua pré-inscrição diretamente no nosso site através do formulário online ou contactar-nos para realizar dois treinos experimentais gratuitos!`,
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    author: "Coordenação Técnica",
    publishDate: "2026-08-10",
    featured: true,
    tags: ["Inscrições", "Formação", "Escola de Atletismo", "Novos Atletas"],
    views: 610,
    likes: 128
  },
  {
    id: "news-3",
    title: "Desafio na Serra: Equipa de Trail Running conquista Ultra dos Miradouros",
    slug: "equipa-trail-running-ultra-miradouros",
    category: "Eventos & Provas",
    summary: "Os nossos atletas de montanha enfrentaram 45km com 2800m D+ em condições exigentes e subiram ao pódio coletivo.",
    content: `Os trilhos da serra foram o palco de mais uma grande demonstração de resiliência e garra da nossa secção de Trail Running.

A prova de 45km com elevado desnível positivo colocou à prova a resistência física e mental de todos os participantes. O atleta Pedro Gonçalves terminou na 4ª posição da geral e 2º no escalão M35, completando o percurso em 04:38:15.

Na distância curta de 18km, Maria João conquistou o 1º lugar feminino com uma descida final vertiginosa.

Parabéns a todos os bravos que levaram as cores do Chesmas ao topo das montanhas!`,
    coverImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    author: "Secção de Trail",
    publishDate: "2026-07-28",
    featured: false,
    tags: ["Trail Running", "Montanha", "Pódios", "Resistência"],
    views: 310,
    likes: 67
  },
  {
    id: "news-4",
    title: "Treino Especial de Verão com Atleta Olímpico Convidado",
    slug: "treino-especial-atleta-olimpico-convidado",
    category: "Treinos",
    summary: "Uma sessão técnica inesquecível focada na biomecânica da passada, cadência e estratégias de prova.",
    content: `Na passada quinta-feira, os jovens da nossa academia e o escalão sénior tiveram o privilégio de partilhar a pista de atletismo numa masterclass exclusiva.

Foram abordados temas cruciais para a evolução dos corredores:
- Exercícios educativos para ganho de mobilidade no tornozelo e anca
- Gestão do limiar anaeróbio e controlo de ritmo
- Nutrição e hidratação pré e pós-competição
- Trabalho de fortalecimento do core

Agradecemos a disponibilidade e a inspiração transmitida a todos os nossos jovens atletas!`,
    coverImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
    author: "Prof. António Ferreira",
    publishDate: "2026-07-15",
    featured: false,
    tags: ["Técnica", "Masterclass", "Treino de Pista", "Educação"],
    views: 290,
    likes: 92
  }
];

export const initialTrainings: TrainingSession[] = [
  {
    id: "train-1",
    title: "Escola de Formação (Benjamins a Infantis)",
    category: "Formação (Benjamins a Iniciados)",
    dayOfWeek: "Segunda-feira & Quarta-feira",
    time: "17:30 - 18:45",
    location: "Pista Municipal de Atletismo",
    coach: "Prof. Joana Castro",
    targetLevel: "Crianças dos 6 aos 13 anos",
    focus: "Desenvolvimento motor geral, jogos atléticos, saltos, lançamentos e iniciação à corrida.",
    notes: "Trazer garrafa de água e sapatilhas de desporto confortáveis.",
    active: true
  },
  {
    id: "train-2",
    title: "Jovens de Rendimento (Juvenis & Juniores)",
    category: "Jovens (Juvenis e Juniores)",
    dayOfWeek: "Terça-feira & Quinta-feira",
    time: "18:30 - 20:00",
    location: "Pista Municipal de Atletismo",
    coach: "Prof. António Ferreira",
    targetLevel: "Atletas dos 14 aos 19 anos",
    focus: "Treino de séries específicas, potência aeróbia, técnica de barreiras e velocidade.",
    notes: "Obrigatório uso de sapatilhas de bicos para os blocos de velocidade.",
    active: true
  },
  {
    id: "train-3",
    title: "Grupo de Fundo & Estrada (Seniores e Veteranos)",
    category: "Estrada & Meia-Maratona",
    dayOfWeek: "Terça-feira & Quinta-feira",
    time: "19:15 - 20:45",
    location: "Pista Municipal & Circuito Urbano",
    coach: "Prof. António Ferreira",
    targetLevel: "Adultos - Manutenção e Competição",
    focus: "Fartlek, séries longas no limiar e reforço muscular complementar.",
    notes: "Ritmos divididos por grupos (Grupo A: <3:45/km, Grupo B: 4:00-4:30/km, Grupo C: 4:45-5:30/km).",
    active: true
  },
  {
    id: "train-4",
    title: "Treino Longo de Fim de Semana / Trail & Estrada",
    category: "Trail Running",
    dayOfWeek: "Sábado",
    time: "08:30 - 11:00",
    location: "Parque Verde & Serra dos Pinhais",
    coach: "Pedro Gonçalves & Tiago Neves",
    targetLevel: "Todos os escalões de resistência",
    focus: "Volume contínuo, adaptação a desnível positivo e abastecimento em corrida.",
    notes: "Ponto de encontro no parque de estacionamento do Parque Verde às 08h20.",
    active: true
  },
  {
    id: "train-5",
    title: "Reforço Funcional & Mobilidade",
    category: "Seniores & Sub-23",
    dayOfWeek: "Sexta-feira",
    time: "18:45 - 19:45",
    location: "Pavilhão Gimnodesportivo",
    coach: "Fisioterapeuta Rui Miranda",
    targetLevel: "Todos os atletas do clube",
    focus: "Prevenção de lesões, fortalecimento de core e estabilizadores, mobilidade articular.",
    notes: "Trazer tapete de treino ou toalha.",
    active: true
  }
];

export const initialGallery: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Pódio Coletivo no Campeonato Regional",
    album: "Campeonato Regional 2026",
    category: "Pódios",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80",
    date: "2026-08-15",
    photographer: "Carlos Fotografia"
  },
  {
    id: "gal-2",
    title: "Partida dos 10km Estrada",
    album: "Campeonato Regional 2026",
    category: "Competições",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
    date: "2026-08-15"
  },
  {
    id: "gal-3",
    title: "Treino de Séries na Pista Municipal",
    album: "Treinos de Pista",
    category: "Treinos",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80",
    date: "2026-08-08"
  },
  {
    id: "gal-4",
    title: "Percurso na Crista da Serra - Trail dos Miradouros",
    album: "Trail dos Miradouros 2026",
    category: "Competições",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80",
    date: "2026-07-28"
  },
  {
    id: "gal-5",
    title: "Jantar de Encerramento de Época",
    album: "Convívio de Verão",
    category: "Convívio",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
    date: "2026-07-20"
  },
  {
    id: "gal-6",
    title: "Aquecimento e Técnica da Formação Jovem",
    album: "Academia Jovem Chesmas",
    category: "Treinos",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80",
    date: "2026-07-12"
  },
  {
    id: "gal-7",
    title: "Entrega de Troféus e Medalhas",
    album: "Gala do Atletismo",
    category: "Pódios",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80",
    date: "2026-06-30"
  },
  {
    id: "gal-8",
    title: "Treino Longo de Estrada ao Nascer do Sol",
    album: "Treinos de Estrada",
    category: "Treinos",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80",
    date: "2026-06-15"
  }
];

export const initialRegistrations: AthleteRegistration[] = [
  {
    id: "reg-1",
    registrationNumber: "CHS-2026-081",
    fullName: "Bernardo Silva Martins",
    email: "bernardo.martins@exemplo.pt",
    phone: "919 888 777",
    birthDate: "2010-04-12",
    idNumber: "15984723",
    nif: "234567890",
    gender: "M",
    address: "Rua das Flores, nº 14",
    city: "Porto",
    postalCode: "4000-123",
    escalao: "Iniciados / Juvenis",
    disciplines: ["Pista & Marcha", "Estrada & Meia-Maratona"],
    emergencyContactName: "Teresa Martins (Mãe)",
    emergencyContactPhone: "912 333 444",
    medicalConditions: "Nenhuma restrição médica relevante.",
    experienceLevel: "Iniciante",
    termsAccepted: true,
    rgpdAccepted: true,
    status: "Aprovado",
    submissionDate: "2026-08-16 14:22",
    adminNotes: "Documentos validados pelo treinador da formação. Convocado para treino de terça."
  },
  {
    id: "reg-2",
    registrationNumber: "CHS-2026-082",
    fullName: "Clara Figueiredo Matos",
    email: "clara.matos@exemplo.pt",
    phone: "934 555 666",
    birthDate: "1994-11-20",
    idNumber: "13482910",
    nif: "245890123",
    gender: "F",
    address: "Avenida da Boavista, 820",
    city: "Porto",
    postalCode: "4100-111",
    escalao: "Seniores & Sub-23",
    disciplines: ["Estrada & Meia-Maratona", "Trail Running"],
    emergencyContactName: "Gonçalo Matos (Irmão)",
    emergencyContactPhone: "934 111 222",
    medicalConditions: "",
    experienceLevel: "Intermédio",
    termsAccepted: true,
    rgpdAccepted: true,
    status: "Contactado",
    submissionDate: "2026-08-18 10:05",
    adminNotes: "Enviado email de boas-vindas e agendamento para entrega de equipamento."
  }
];
