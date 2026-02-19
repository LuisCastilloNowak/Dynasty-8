import { Property, Interior } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'michael-villa',
    title: 'Villa Michael',
    price: 900000,
    location: 'Rockford Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Captured'cran2026-02-17185005.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Captured'cran2026-02-17185005.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Captured'cran2026-02-17184949.png"
    ],
    description: 'Une somptueuse villa de style espagnol située au cœur du prestigieux quartier de Rockford Hills. Alliant charme classique et confort moderne, elle dispose d\'un court de tennis privé et d\'une piscine azur.',
    type: 'Villa'
  },
  {
    id: 'villa-playboy',
    title: 'Manoir Playboy',
    price: 5000000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/Premiere.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/Captured'cran2026-02-17180741.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/Captured'cran2026-02-17180631.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/PlayboyMansion5.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/PlayboyMansion4.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/PlayboyMansion3.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/PlayboyMansion2.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Playboy/PlayboyMansion1.png"
    ],
    description: 'Le manoir le plus légendaire de Los Santos, situé dans le quartier exclusif de Richman. Un domaine iconique conçu pour les réceptions les plus extravagantes, doté de sa célèbre grotte et de jardins botaniques privés.',
    type: 'Manoir'
  },
  {
    id: 'golf-richman',
    title: 'Golf de Richman',
    price: 5000000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Golf/Captured'cran2026-02-17180830.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Golf/Captured'cran2026-02-17180830.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Golf/Captured'cran2026-02-17175213.png"
    ],
    description: "L'ultime symbole de réussite sociale. Ce domaine s'étend sur des hectares de verdure parfaitement entretenue, offrant un parcours de golf privé de renommée mondiale et un club-house d'une élégance absolue au sein de Richman.",
    type: 'Manoir'
  },
  {
    id: 'villa-6070',
    title: 'Villa 6070',
    price: 900000,
    location: 'Vinewood Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6070/Captured'cran2026-02-17181330.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6070/Captured'cran2026-02-17181241.png"],
    description: "Une prouesse architecturale dominant les collines de Vinewood Hills. Cette villa contemporaine offre des perspectives uniques sur Los Santos dans un cadre de vie épuré et sophistiqué.",
    type: 'Villa'
  },
  {
    id: 'villa-6069',
    title: 'Villa 6069',
    price: 800000,
    location: 'Vinewood Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6069/Captured'cran2026-02-17181357.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6069/Captured'cran2026-02-17181420.png"],
    description: "Une élégance discrète au sommet des collines. La Villa 6069 propose une immersion totale dans le luxe moderne, alliant design minimaliste et panoramas urbains exceptionnels.",
    type: 'Villa'
  },
  {
    id: 'villa-6068',
    title: 'Villa 6068',
    price: 900000,
    location: 'Vinewood Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6068/Captured'cran2026-02-17181625.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6068/Captured'cran2026-02-17181523.png"],
    description: "L'art de vivre vertical à Vinewood Hills. Cette demeure d'exception se distingue par ses lignes audacieuses et ses espaces de vie baignés de lumière, au-dessus du tumulte de la ville.",
    type: 'Villa'
  },
  {
    id: 'villa-6067',
    title: 'Villa 6067',
    price: 900000,
    location: 'Vinewood Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6067/Captured'cran2026-02-17181820.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6067/Captured'cran2026-02-17181711.png"],
    description: "Un sanctuaire de verre et de béton niché dans les hauteurs de Vinewood. La Villa 6067 offre une expérience résidentielle unique pour les amateurs d'architecture d'avant-garde.",
    type: 'Villa'
  },
  {
    id: 'villa-6030',
    title: 'Villa 6030',
    price: 700000,
    location: 'West Vinewood',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6030/Captured'cran2026-02-17183239.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6030/Captured'cran2026-02-17183256.png"],
    description: "Une élégante villa urbaine offrant un équilibre parfait entre confort et style au cœur de West Vinewood.",
    type: 'Villa'
  },
  {
    id: 'villa-6029',
    title: 'Villa 6029',
    price: 800000,
    location: 'West Vinewood',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6029/Captured'cran2026-02-17183220.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6029/Captured'cran2026-02-17183159.png"],
    description: "Un design contemporain et des finitions soignées pour cette villa idéalement située à West Vinewood.",
    type: 'Villa'
  },
  {
    id: 'villa-6028',
    title: 'Villa 6028',
    price: 800000,
    location: 'West Vinewood',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6028/Captured'cran2026-02-17183112.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6028/Captured'cran2026-02-17183134.png"],
    description: "Une résidence moderne offrant des volumes généreux et une vue imprenable sur le quartier de West Vinewood.",
    type: 'Villa'
  },
  {
    id: 'villa-6027',
    title: 'Villa 6027',
    price: 950000,
    location: 'West Vinewood',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6027/Captured'cran2026-02-17181015.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6027/Captured'cran2026-02-17180058.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6027/Captured'cran2026-02-17180017.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6027/Captured'cran2026-02-17175923.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6027/Captured'cran2026-02-17175830.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6027/Captured'cran2026-02-17181049.png"
    ],
    description: "Le fleuron de West Vinewood. Une propriété de luxe aux prestations exceptionnelles et au design architectural unique.",
    type: 'Villa'
  },
  {
    id: 'villa-6026',
    title: 'Villa 6026',
    price: 800000,
    location: 'West Vinewood',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6026/Captured'cran2026-02-17183039.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6026/Captured'cran2026-02-17183039.png"],
    description: "Une villa sophistiquée nichée dans un écrin de verdure au cœur de West Vinewood.",
    type: 'Villa'
  },
  {
    id: 'villa-6020',
    title: 'Villa 6020',
    price: 650000,
    location: 'West Vinewood',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6020/Captured'cran2026-02-17183358.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6020/Captured'cran2026-02-17183338.png"],
    description: "Un havre de paix urbain offrant confort et discrétion dans le secteur recherché de West Vinewood.",
    type: 'Villa'
  },
  {
    id: 'villa-6007',
    title: 'Villa 6007',
    price: 650000,
    location: 'West Vinewood',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6007/Captured'cran2026-02-17183430.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/6007/Captured'cran2026-02-17183457.png"],
    description: "L'élégance minimaliste au service d'un art de vivre exclusif à West Vinewood.",
    type: 'Villa'
  },
  {
    id: 'villa-7039',
    title: 'Villa 7039',
    price: 900000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7039/Captured'cran2026-02-17182936.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7039/Captured'cran2026-02-17182911.png"],
    description: "Une élégance contemporaine nichée dans les hauteurs de Richman. Cette villa offre des volumes architecturaux audacieux et une luminosité exceptionnelle pour un art de vivre résolument moderne.",
    type: 'Villa'
  },
  {
    id: 'villa-7036-ext',
    title: 'Résidence 7036',
    price: 900000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7036_7037/Captured'cran2026-02-17182759.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7036_7037/Captured'cran2026-02-17182815.png"],
    description: "Un joyau architectural alliant intimité et prestige. Située dans le secteur le plus prisé de Richman, cette propriété se distingue par ses finitions de haute volée et son design intemporel.",
    type: 'Villa'
  },
  {
    id: 'villa-7036',
    title: 'Villa 7036',
    price: 900000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7036/Captured'cran2026-02-17182730.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7036/Captured'cran2026-02-17182715.png"],
    description: "L'expression pure du luxe à Richman. Cette villa moderne propose des espaces ouverts sur l'extérieur, créant une harmonie parfaite entre nature et architecture d'exception.",
    type: 'Villa'
  },
  {
    id: 'villa-7037',
    title: 'Villa 7037',
    price: 900000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7037/Captured'cran2026-02-17182834.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7037/Captured'cran2026-02-17182846.png"],
    description: "Un domaine d'exception à l'abri des regards. La Villa 7037 redéfinit le raffinement avec ses lignes épurées et sa situation privilégiée sur les collines de Richman.",
    type: 'Villa'
  },
  {
    id: 'villa-7035',
    title: 'Villa 7035',
    price: 900000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7035/Captured'cran2026-02-17182558.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7035/Captured'cran2026-02-17182558.png"],
    description: "Une demeure de caractère au cœur de Richman. Cette propriété offre un cadre de vie prestigieux, idéal pour ceux qui recherchent l'exclusivité Dynasty 8.",
    type: 'Villa'
  },
  {
    id: 'villa-7034',
    title: 'Villa 7034',
    price: 900000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7034/Captured'cran2026-02-17182644.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7034/Captured'cran2026-02-17182619.png"],
    description: "Minimalisme et luxe se rencontrent dans cette villa d'exception. Une architecture soignée pour une expérience résidentielle unique au sommet de la hiérarchie sociale.",
    type: 'Villa'
  },
  {
    id: 'villa-7033',
    title: 'Villa 7033',
    price: 900000,
    location: 'Richman',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7033/Captured'cran2026-02-17182338.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/7033/Captured'cran2026-02-17182453.png"],
    description: "Un sanctuaire de luxe à Richman. Cette villa se distingue par son approche organique de l'espace, offrant sérénité et prestige à chaque instant.",
    type: 'Villa'
  },
  {
    id: 'appartement-del-perro',
    title: 'Del Perro Heights',
    price: 500000,
    location: 'Del Perro Beach',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Del_perro_heights/Captured'cran2026-02-18022753.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Del_perro_heights/Captured'cran2026-02-18022753.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Del_perro_heights/Captured'cran2026-02-18022634.png"
    ],
    description: "Vivez l'effervescence de la côte dans cet appartement de haut standing. Del Perro Heights offre des vues spectaculaires sur l'océan et un accès immédiat aux quartiers les plus branchés.",
    type: 'Appartement'
  },
  {
    id: 'appartement-eclipse',
    title: 'Eclipse Tower',
    price: 500000,
    location: 'Rockford Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Eclipse_tower/Captured'cran2026-02-18024710.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Eclipse_tower/Captured'cran2026-02-18024600.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Eclipse_tower/Captured'cran2026-02-18024754.png"
    ],
    description: "Le summum du chic urbain à Rockford Hills. Ce penthouse au sein de l'Eclipse Tower représente l'apogée du luxe vertical avec des panoramas à couper le souffle sur Los Santos.",
    type: 'Appartement'
  },
  {
    id: 'villa-5012',
    title: 'Villa 5012',
    price: 850000,
    location: 'Del Perro Beach',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/5012/Captured'cran2026-02-17183738.png",
    gallery: ["https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/5012/Captured'cran2026-02-17183649.png"],
    description: "Une élégante résidence balnéaire à Del Perro. Cette villa allie le confort d'un domaine privé à la proximité immédiate des plages de sable fin.",
    type: 'Villa'
  },
  {
    id: 'villa-vigne',
    title: 'Villa Vigne',
    price: 2000000,
    location: 'Tongva Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Vigne/Captured'cran2026-02-17183900.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Villa_Vigne/Captured'cran2026-02-17183900.png"
    ],
    description: 'Une retraite d\'exception nichée au cœur des vignobles de Tongva Hills. Cette villa contemporaine offre un cadre de vie organique, fusionnant luxe moderne et sérénité rurale avec des vues panoramiques sur la vallée.',
    type: 'Villa'
  },
  {
    id: 'maison-phare',
    title: 'Maison du Phare',
    price: 350000,
    location: 'Sandy Shores',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Maison_phare/Captured'cran2026-02-17184356.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Maison_phare/Captured'cran2026-02-17184237.png",
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Maison_phare/Captured'cran2026-02-17184144.png"
    ],
    description: "Un havre de paix pittoresque situé en bordure de la mer d'Alamo Sea. Cette propriété unique offre un charme rustique incomparable et une vue imprenable sur le phare historique de Sandy Shores.",
    type: 'Petite maison'
  },
  {
    id: 'maison-franklin',
    title: 'Maison Franklin',
    price: 1000000,
    location: 'Vinewood Hills',
    imageUrl: "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Maison_Franklin/Captured'cran2026-02-17184841.png",
    gallery: [
      "https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/Maison_Franklin/Captured'cran2026-02-17184841.png"
    ],
    description: 'Une merveille architecturale moderne perchée sur les collines de Vinewood Hills. Offrant des vues spectaculaires sur la ville, cette villa minimaliste redéfinit le luxe contemporait pour les esprits audacieux.',
    type: 'Villa'
  }
];

export const INTERIORS: Interior[] = [
  {
    id: 'int-villa-6128',
    title: 'Villa 6128 / 6129',
    imageUrl: 'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/1_1.png',
    gallery: [
      'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/1_1.png',
      'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/1_2.png',
      'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/1_3.png',
      'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/1_5.png'
    ],
    description: 'Un design architectural de pointe alliant lignes minimalistes et chaleur organique. L\'intérieur parfait pour les amateurs d\'art et de grands volumes.',
    style: 'Meublé'
  },
  {
    id: 'int-del-perro',
    title: 'Appartement Del Perro Heights',
    imageUrl: 'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/3_1.png',
    gallery: [
      'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/3_1.png',
      'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/3_2.png',
      'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/3_3.png'
    ],
    description: 'Le chic urbain par excellence. Un penthouse moderne offrant des vues imprenables sur les hauteurs de Del Perro avec des finitions haut de gamme.',
    style: 'Meublé'
  },
  {
    id: 'int-eclipse',
    title: 'Appartement Eclipse Tower',
    imageUrl: 'https://r2.fivemanage.com/Sy85n35DNuxRwZ2sD4rdz/4.png',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Le summum du luxe provocant. Un contraste saisissant entre plafonds écarlates et murs obscurs.',
    style: 'Meublé'
  }
];