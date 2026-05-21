/**
 * Script pour peupler Firestore avec les données du livre de recettes.
 * Usage : node seed.js
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { config } from 'dotenv'

config()

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ============================================================
// INGREDIENTS
// ============================================================
const ingredients = [
  { id: 'ing_poulet', nom: 'Poulet', type: 'solide', categorie: 'viande' },
  { id: 'ing_boeuf', nom: 'Bœuf', type: 'solide', categorie: 'viande' },
  { id: 'ing_boeuf_hache', nom: 'Bœuf haché', type: 'solide', categorie: 'viande' },
  { id: 'ing_porc', nom: 'Filet de porc', type: 'solide', categorie: 'viande' },
  { id: 'ing_crevettes', nom: 'Crevettes', type: 'solide', categorie: 'fruits de mer' },
  { id: 'ing_saucisse_italienne', nom: 'Saucisse italienne', type: 'solide', categorie: 'viande' },
  { id: 'ing_farine', nom: 'Farine tout usage', type: 'solide', categorie: 'base' },
  { id: 'ing_sucre', nom: 'Sucre', type: 'solide', categorie: 'base' },
  { id: 'ing_cassonade', nom: 'Cassonade', type: 'solide', categorie: 'base' },
  { id: 'ing_beurre', nom: 'Beurre', type: 'solide', categorie: 'produit laitier' },
  { id: 'ing_oeufs', nom: 'Œufs', type: 'solide', categorie: 'produit laitier' },
  { id: 'ing_huile_canola', nom: 'Huile de canola', type: 'liquide', categorie: 'huile' },
  { id: 'ing_huile_sesame', nom: 'Huile de sésame', type: 'liquide', categorie: 'huile' },
  { id: 'ing_huile_olive', nom: 'Huile d\'olive', type: 'liquide', categorie: 'huile' },
  { id: 'ing_fecule_mais', nom: 'Fécule de maïs', type: 'solide', categorie: 'base' },
  { id: 'ing_bicarbonate', nom: 'Bicarbonate de soude', type: 'solide', categorie: 'base' },
  { id: 'ing_sel', nom: 'Sel', type: 'solide', categorie: 'assaisonnement' },
  { id: 'ing_poivre', nom: 'Poivre', type: 'solide', categorie: 'assaisonnement' },
  { id: 'ing_ail', nom: 'Ail', type: 'solide', categorie: 'légume' },
  { id: 'ing_oignon', nom: 'Oignon', type: 'solide', categorie: 'légume' },
  { id: 'ing_gingembre', nom: 'Gingembre frais', type: 'solide', categorie: 'épice' },
  { id: 'ing_brocoli', nom: 'Brocoli', type: 'solide', categorie: 'légume' },
  { id: 'ing_poivron', nom: 'Poivron', type: 'solide', categorie: 'légume' },
  { id: 'ing_carotte', nom: 'Carotte', type: 'solide', categorie: 'légume' },
  { id: 'ing_celeri', nom: 'Céleri', type: 'solide', categorie: 'légume' },
  { id: 'ing_pomme_terre', nom: 'Pomme de terre', type: 'solide', categorie: 'légume' },
  { id: 'ing_tomates_des', nom: 'Tomates en dés (canne)', type: 'solide', categorie: 'légume' },
  { id: 'ing_mais', nom: 'Maïs', type: 'solide', categorie: 'légume' },
  { id: 'ing_haricots_rouges', nom: 'Haricots rouges', type: 'solide', categorie: 'légumineuse' },
  { id: 'ing_pois_chiches', nom: 'Pois chiches', type: 'solide', categorie: 'légumineuse' },
  { id: 'ing_lentilles', nom: 'Lentilles', type: 'solide', categorie: 'légumineuse' },
]

const ingredients2 = [
  { id: 'ing_sauce_soya', nom: 'Sauce soya', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_sauce_huitres', nom: 'Sauce aux huîtres', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_sauce_piquante', nom: 'Sauce piquante (Red Hot)', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_miel', nom: 'Miel', type: 'liquide', categorie: 'sucré' },
  { id: 'ing_sirop_erable', nom: 'Sirop d\'érable', type: 'liquide', categorie: 'sucré' },
  { id: 'ing_vinaigre_cidre', nom: 'Vinaigre de cidre', type: 'liquide', categorie: 'vinaigre' },
  { id: 'ing_vinaigre_riz', nom: 'Vinaigre de riz', type: 'liquide', categorie: 'vinaigre' },
  { id: 'ing_bouillon_poulet', nom: 'Bouillon de poulet', type: 'liquide', categorie: 'bouillon' },
  { id: 'ing_bouillon_boeuf', nom: 'Bouillon de bœuf', type: 'liquide', categorie: 'bouillon' },
  { id: 'ing_lait_coco', nom: 'Lait de coco', type: 'liquide', categorie: 'produit laitier' },
  { id: 'ing_creme', nom: 'Crème', type: 'liquide', categorie: 'produit laitier' },
  { id: 'ing_vanille', nom: 'Extrait de vanille', type: 'liquide', categorie: 'épice' },
  { id: 'ing_chocolat_noir', nom: 'Chocolat noir', type: 'solide', categorie: 'sucré' },
  { id: 'ing_cacao', nom: 'Poudre de cacao', type: 'solide', categorie: 'sucré' },
  { id: 'ing_pacanes', nom: 'Pacanes', type: 'solide', categorie: 'noix' },
  { id: 'ing_noix_grenoble', nom: 'Noix de Grenoble', type: 'solide', categorie: 'noix' },
  { id: 'ing_noix_cajou', nom: 'Noix de cajou', type: 'solide', categorie: 'noix' },
  { id: 'ing_arachides', nom: 'Arachides', type: 'solide', categorie: 'noix' },
  { id: 'ing_beurre_arachide', nom: 'Beurre d\'arachide', type: 'solide', categorie: 'noix' },
  { id: 'ing_beurre_noix', nom: 'Beurre de noix', type: 'solide', categorie: 'noix' },
  { id: 'ing_banane', nom: 'Banane', type: 'solide', categorie: 'fruit' },
  { id: 'ing_pomme', nom: 'Pomme', type: 'solide', categorie: 'fruit' },
  { id: 'ing_ananas', nom: 'Ananas', type: 'solide', categorie: 'fruit' },
  { id: 'ing_peches', nom: 'Pêches', type: 'solide', categorie: 'fruit' },
  { id: 'ing_framboises', nom: 'Framboises', type: 'solide', categorie: 'fruit' },
  { id: 'ing_citron', nom: 'Jus de citron', type: 'liquide', categorie: 'fruit' },
  { id: 'ing_lime', nom: 'Jus de lime', type: 'liquide', categorie: 'fruit' },
  { id: 'ing_coco_rapee', nom: 'Noix de coco râpée', type: 'solide', categorie: 'noix' },
  { id: 'ing_riz', nom: 'Riz', type: 'solide', categorie: 'base' },
  { id: 'ing_nouilles_ramen', nom: 'Nouilles ramen', type: 'solide', categorie: 'pâtes' },
  { id: 'ing_vermicelle_riz', nom: 'Vermicelle de riz', type: 'solide', categorie: 'pâtes' },
  { id: 'ing_penne', nom: 'Penne', type: 'solide', categorie: 'pâtes' },
  { id: 'ing_poudre_chili', nom: 'Poudre de chili', type: 'solide', categorie: 'épice' },
  { id: 'ing_cayenne', nom: 'Piment de Cayenne', type: 'solide', categorie: 'épice' },
  { id: 'ing_cumin', nom: 'Cumin', type: 'solide', categorie: 'épice' },
  { id: 'ing_cari_rouge', nom: 'Pâte de cari rouge', type: 'solide', categorie: 'épice' },
  { id: 'ing_cari_jaune', nom: 'Sauce cari jaune Poukham', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_curry_vert', nom: 'Pâte curry vert (Blue Dragon)', type: 'solide', categorie: 'épice' },
  { id: 'ing_curcuma', nom: 'Curcuma', type: 'solide', categorie: 'épice' },
  { id: 'ing_cari_jamaicain', nom: 'Cari jamaicain jaune', type: 'solide', categorie: 'épice' },
  { id: 'ing_cajun', nom: 'Épices cajun', type: 'solide', categorie: 'épice' },
  { id: 'ing_sriracha', nom: 'Sriracha', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_ketchup', nom: 'Ketchup', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_sauce_bolognese', nom: 'Sauce bolognese (Mikes)', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_pate_tomates', nom: 'Pâte de tomates', type: 'solide', categorie: 'sauce' },
  { id: 'ing_basilic', nom: 'Basilic frais', type: 'solide', categorie: 'herbe' },
  { id: 'ing_coriandre', nom: 'Coriandre fraîche', type: 'solide', categorie: 'herbe' },
  { id: 'ing_oignons_verts', nom: 'Oignons verts', type: 'solide', categorie: 'légume' },
  { id: 'ing_tofu', nom: 'Tofu frit', type: 'solide', categorie: 'protéine végétale' },
  { id: 'ing_bok_choy', nom: 'Bok Choy', type: 'solide', categorie: 'légume' },
  { id: 'ing_bambou', nom: 'Pousses de bambou', type: 'solide', categorie: 'légume' },
  { id: 'ing_chou', nom: 'Chou vert', type: 'solide', categorie: 'légume' },
  { id: 'ing_laitue', nom: 'Laitue iceberg', type: 'solide', categorie: 'légume' },
  { id: 'ing_mangue', nom: 'Mangue', type: 'solide', categorie: 'fruit' },
  { id: 'ing_chapelure', nom: 'Chapelure', type: 'solide', categorie: 'base' },
  { id: 'ing_flocons_avoine', nom: 'Flocons d\'avoine', type: 'solide', categorie: 'base' },
  { id: 'ing_poudre_amandes', nom: 'Poudre d\'amandes', type: 'solide', categorie: 'noix' },
  { id: 'ing_amandes', nom: 'Amandes tranchées', type: 'solide', categorie: 'noix' },
  { id: 'ing_fish_sauce', nom: 'Sauce de poisson (fish sauce)', type: 'liquide', categorie: 'sauce' },
  { id: 'ing_sesame', nom: 'Graines de sésame', type: 'solide', categorie: 'garniture' },
  { id: 'ing_laurier', nom: 'Feuilles de laurier', type: 'solide', categorie: 'herbe' },
  { id: 'ing_thym', nom: 'Thym séché', type: 'solide', categorie: 'herbe' },
  { id: 'ing_tahini', nom: 'Tahini', type: 'liquide', categorie: 'noix' },
  { id: 'ing_dattes', nom: 'Dattes Medjool', type: 'solide', categorie: 'fruit' },
  { id: 'ing_cannelle', nom: 'Cannelle moulue', type: 'solide', categorie: 'épice' },
  { id: 'ing_poudre_pate', nom: 'Poudre à pâte', type: 'solide', categorie: 'base' },
  { id: 'ing_pepites_chocolat', nom: 'Pépites de chocolat noir', type: 'solide', categorie: 'sucré' },
]

const allIngredients = [...ingredients, ...ingredients2]


// ============================================================
// RECETTES
// ============================================================
const recettes = [
  {
    id: 'rec_ailes_poulet',
    titre: 'Ailes de poulet',
    description: 'Ailes de poulet frites croustillantes avec sauce piquante optionnelle. Recette de Guillaume.',
    imageUrl: '',
    categorie: 'plat principal',
    tempsPreparation: 15,
    tempsCuisson: 15,
    portions: 4,
    difficulte: 'Facile',
    notes: '',
    etapes: [
      'Mélanger la fécule, le sel et les épices dans un grand bol.',
      'Ajouter les ailes de poulet asséchées et bien les enrober.',
      'Frire les ailes, une petite quantité à la fois, de 12 à 15 minutes jusqu\'à ce qu\'elles soient cuites et dorées.',
      'Égoutter sur la plaque et réserver au chaud.',
      'Sauce (optionnel) : mélanger beurre, sauce piquante, cassonade et vinaigre de cidre dans une casserole.',
      'Porter à ébullition et laisser mijoter 5 minutes jusqu\'à réduction de moitié.',
      'Verser la sauce sur les ailes et bien enrober.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-01-15')
  },
  {
    id: 'rec_biscuits_choco_pecane',
    titre: 'Biscuits chocolat/pecane',
    description: 'Gros biscuits moelleux aux pépites de chocolat noir et pacanes grillées. Se congèlent parfaitement.',
    imageUrl: '',
    categorie: 'dessert',
    tempsPreparation: 20,
    tempsCuisson: 15,
    portions: 12,
    difficulte: 'Facile',
    notes: 'Optionnel: ajouter ½ tasse de beurre de noix pour un goût plus riche.',
    etapes: [
      'Tapisser une plaque à biscuits de papier parchemin.',
      'Mélanger la farine, le bicarbonate et le sel. Réserver.',
      'Crémer le beurre avec la cassonade et la vanille au batteur électrique. Ajouter les œufs un à un.',
      'Incorporer les ingrédients secs, les pacanes et le chocolat à la cuillère de bois.',
      'Former des boules de pâte (60 ml) et congeler 4 heures.',
      'Préchauffer le four à 180°C (350°F).',
      'Répartir 6 boules par plaque en les espaçant.',
      'Cuire environ 15 minutes jusqu\'à ce que les biscuits soient légèrement dorés.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-01-20')
  },
  {
    id: 'rec_biscuits_noix',
    titre: 'Biscuits aux noix',
    description: 'Biscuits au beurre de noix Kirkland (amande/cajous/graines citrouille/lin) et noix de Grenoble.',
    imageUrl: '/images/recettes/biscuits-aux-noix.png',
    categorie: 'dessert',
    tempsPreparation: 10,
    tempsCuisson: 12,
    portions: 24,
    difficulte: 'Facile',
    notes: 'Alternative rapide : 1 œuf, 1 tasse cassonade, 1 tasse beurre d\'arachides.',
    etapes: [
      'Mélanger farine et poudre à pâte.',
      'Crémer le beurre, le beurre de noix, le sucre et la cassonade.',
      'Ajouter les œufs et bien mélanger.',
      'Incorporer les ingrédients secs et les noix de Grenoble.',
      'Goûter la pâte pour ajuster le sucre.',
      'Cuire au four environ 12 minutes à 375°F selon l\'épaisseur.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-01-25')
  },
  {
    id: 'rec_boeuf_brocoli',
    titre: 'Bœuf aux brocolis',
    description: 'Sauté de bœuf en lanières avec brocoli, sauce miel-soya et graines de sésame. Servir avec du riz.',
    imageUrl: '/images/recettes/boeuf-aux-brocolis.png',
    categorie: 'plat principal',
    tempsPreparation: 30,
    tempsCuisson: 10,
    portions: 4,
    difficulte: 'Moyen',
    notes: 'Mariner le bœuf 2h avec bicarbonate de soude dilué, puis BIEN RINCER.',
    etapes: [
      'Couper le bœuf en lanières dans le sens de la fibre. Mariner 2h avec 1 c. à soupe de bicarbonate dilué dans 1 c. à soupe d\'eau.',
      'BIEN RINCER la viande.',
      'Cuire la viande dans l\'huile de canola, sortir du poêlon et réserver.',
      'Couper le brocoli en fleurons, trancher l\'oignon, hacher l\'ail, râper le gingembre.',
      'Mélanger eau, miel, sauce soya et fécule de maïs.',
      'Cuire brocoli, oignon, ail et gingembre 2-3 minutes.',
      'Réduire à feu doux, verser la sauce et ajouter la viande. Cuire 2-3 minutes.',
      'Garnir de graines de sésame et servir avec du riz.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-02-01')
  },
  {
    id: 'rec_boeuf_basilic_thai',
    titre: 'Bœuf Basilic Thaï',
    description: 'Sauté de bœuf à la thaïlandaise avec sauce aux huîtres, basilic frais et noix de cajou.',
    imageUrl: '/images/recettes/boeuf-basilic-thai.png',
    categorie: 'plat principal',
    tempsPreparation: 30,
    tempsCuisson: 15,
    portions: 4,
    difficulte: 'Moyen',
    notes: '3 paquets lanières maxi pour 1.5x la recette. Ajouter demi tasse d\'eau + extra fécule pour rendre moins salé.',
    etapes: [
      'Couper le bœuf en lanières dans le sens de la fibre.',
      'Mariner 2h avec bicarbonate de soude dilué. BIEN RINCER.',
      'Préparer la sauce : bouillon de bœuf, sauce aux huîtres, sauce soya, miel, fécule de maïs.',
      'Cuire la viande dans l\'huile de sésame ou canola avec ail râpé. Réserver.',
      'Cuire les légumes (poivron, oignon, brocoli, échalotes).',
      'Ajouter la sauce et la viande.',
      'Garnir de noix de cajou et feuilles de basilic coupées.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-02-05')
  },
  {
    id: 'rec_brochettes_poulet_ananas',
    titre: 'Brochettes de poulet à l\'ananas',
    description: 'Brochettes BBQ marinées au sucre brun et sauce soya avec poulet, poivrons et ananas frais.',
    imageUrl: '/images/recettes/brochettes-poulet-ananas.png',
    categorie: 'plat principal',
    tempsPreparation: 30,
    tempsCuisson: 15,
    portions: 4,
    difficulte: 'Facile',
    notes: 'Peut se cuire au four à 425°F et finir sous le broil.',
    etapes: [
      'Mélanger les ingrédients de la marinade (sucre brun, sauce soya, jus d\'ananas, ail). Diviser en deux.',
      'Mariner les cubes de poulet au réfrigérateur au moins 2 heures.',
      'Préchauffer le BBQ à haute intensité.',
      'Enfiler poivrons, poulet, oignon et ananas en alternance sur les brochettes.',
      'Cuire sur la grille à feu indirect, retourner aux 3-4 minutes en badigeonnant de marinade.',
      'Servir garni d\'oignons verts et de coriandre fraîche.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-02-10')
  },
  {
    id: 'rec_boulettes_teriyaki',
    titre: 'Boulettes Teriyaki avec nouilles ramen',
    description: 'Boulettes de bœuf teriyaki servies avec nouilles ramen, brocoli et poivrons dans une sauce sucrée-salée.',
    imageUrl: '/images/recettes/boulettes-teriyaki.png',
    categorie: 'plat principal',
    tempsPreparation: 30,
    tempsCuisson: 20,
    portions: 6,
    difficulte: 'Moyen',
    notes: 'Réduire le vinaigre de riz et mettre plus de miel/cassonade. Faire 1.5x (27) boulettes. Baking soda aide si trop vinaigré.',
    etapes: [
      'Mélanger les ingrédients des boulettes. Former 18-27 boulettes.',
      'Cuire au four 20 minutes à 375°F.',
      'Préparer la sauce : soya, bouillon bœuf, miel, vinaigre de riz, cassonade, gingembre, huile de sésame, sriracha, ail.',
      'Préparer les légumes (brocoli, poivrons).',
      'Cuire 6 paquets de nouilles ramen.',
      'Mélanger les boulettes dans la sauce, laisser reposer quelques minutes.',
      'Combiner le tout dans un wok.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-02-15')
  },
  {
    id: 'rec_brownies',
    titre: 'Brownies',
    description: 'Brownies fondants au chocolat noir avec pépites. Rempli 2 bols Ikea lunch pyrex.',
    imageUrl: '/images/recettes/brownies.png',
    categorie: 'dessert',
    tempsPreparation: 10,
    tempsCuisson: 42,
    portions: 12,
    difficulte: 'Facile',
    notes: 'Mélanger les ingrédients secs avant, puis les liquides. Battre les œufs séparément en premier.',
    etapes: [
      'Préchauffer le four à 325°F.',
      'Mélanger tous les ingrédients secs : sucre, farine, cacao, sucre glace, pépites de chocolat, sel.',
      'Battre les œufs séparément.',
      'Ajouter les œufs, l\'huile, l\'eau et la vanille aux ingrédients secs.',
      'Bien mélanger.',
      'Cuire 42 minutes à 325°F.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-02-20')
  },
  {
    id: 'rec_chili',
    titre: 'Chili',
    description: 'Chili con carne classique au bœuf haché, haricots rouges et épices. Servir avec tostitos.',
    imageUrl: '/images/recettes/chili.png',
    categorie: 'plat principal',
    tempsPreparation: 15,
    tempsCuisson: 45,
    portions: 8,
    difficulte: 'Facile',
    notes: 'Mettre beaucoup plus de ketchup que suggéré. Pas besoin d\'eau, le jus des tomates suffit.',
    etapes: [
      'Faire revenir environ 1kg de bœuf haché.',
      'Ajouter 2-3 oignons coupés grossièrement.',
      'Ajouter la canne de tomates en dés (enlever un peu de liquide).',
      'Ajouter les haricots rouges égouttés.',
      'Ajouter ketchup (½ tasse ou plus), bouillon concentré de bœuf, poudre de chili (½ tasse), cumin, cayenne.',
      'Laisser mijoter jusqu\'à épaississement.',
      'Optionnel : ajouter maïs en grains. Servir avec tostitos en coupe.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-02-25')
  },
  {
    id: 'rec_creme_brocoli',
    titre: 'Crème brocoli/légumes',
    description: 'Velouté crémeux de brocoli avec pomme de terre, céleri et crème 35%.',
    imageUrl: '/images/recettes/creme-brocoli.png',
    categorie: 'soupe',
    tempsPreparation: 15,
    tempsCuisson: 30,
    portions: 6,
    difficulte: 'Facile',
    notes: '',
    etapes: [
      'Faire fondre le beurre, ajouter ail et oignon. Cuire jusqu\'à translucide.',
      'Ajouter céleri, brocoli et pomme de terre en dés.',
      'Verser le bouillon de poulet, ajouter laurier et thym.',
      'Cuire jusqu\'à ce que les légumes soient tendres.',
      'Retirer le laurier, mixer au mélangeur plongeant.',
      'Ajouter la crème, saler et poivrer.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-03-01')
  },
  {
    id: 'rec_croustade_peches',
    titre: 'Croustade aux pêches et amandes',
    description: 'Croustade aux pêches fraîches avec croustillant à l\'avoine et amandes.',
    imageUrl: '/images/recettes/croustade-peches.png',
    categorie: 'dessert',
    tempsPreparation: 20,
    tempsCuisson: 35,
    portions: 8,
    difficulte: 'Facile',
    notes: 'Ajouter un peu de liquide (sirop ou eau sucrée) pour plus juteux.',
    etapes: [
      'Couper les pêches en cubes, mélanger avec cassonade, jus de citron et extrait d\'amandes.',
      'Verser dans un plat allant au four.',
      'Préparer le croustillant : mélanger cassonade, farine, poudre d\'amandes, flocons d\'avoine, amandes tranchées et sel.',
      'Incorporer le beurre ramolli en dés.',
      'Répartir le croustillant sur les pêches.',
      'Cuire au four jusqu\'à doré et bouillonnant.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-03-05')
  },
  {
    id: 'rec_croustillant_bananes',
    titre: 'Croustillant aux bananes, framboises et coconut',
    description: 'Craquelins déshydratés à la banane, framboises et noix de coco. Collation santé.',
    categorie: 'collation',
    tempsPreparation: 15,
    tempsCuisson: 480,
    portions: 8,
    difficulte: 'Facile',
    notes: 'Si pas assez croustillants, remettre au four 1 heure. Garder au sec dans un contenant hermétique.',
    etapes: [
      'Préchauffer le four à 170°F (75°C).',
      'Réduire les bananes en purée avec le jus de citron.',
      'Ajouter la vanille et la noix de coco râpée.',
      'Hacher les framboises congelées et les mélanger rapidement.',
      'Étendre sur une plaque recouverte de papier parchemin.',
      'Déshydrater au four environ 8 heures.',
      'Laisser refroidir (ils durciront en refroidissant). Briser en morceaux.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-03-10')
  },
  {
    id: 'rec_curry_jaune_vege',
    titre: 'Curry jaune végé (Poukham)',
    description: 'Curry jaune végétarien avec tofu frit, bok choy, brocoli et pousses de bambou.',
    imageUrl: '/images/recettes/curry-jaune-vege.png',
    categorie: 'plat principal',
    tempsPreparation: 15,
    tempsCuisson: 20,
    portions: 4,
    difficulte: 'Facile',
    notes: '',
    etapes: [
      'Couper les carottes en slices, les oignons en gros morceaux, le poivron en lanières.',
      'Préparer le bok choy et le brocoli.',
      'Rincer les pousses de bambou.',
      'Faire chauffer les 2 pots de sauce cari jaune Poukham.',
      'Ajouter tous les légumes et le tofu frit.',
      'Cuire jusqu\'à ce que les légumes soient tendres. Servir avec du riz.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-03-15')
  },
  {
    id: 'rec_curry_vert',
    titre: 'Curry vert (Blue Dragon)',
    description: 'Curry vert au poulet avec légumes congelés et crème. Recette du paquet adaptée.',
    categorie: 'plat principal',
    tempsPreparation: 10,
    tempsCuisson: 20,
    portions: 4,
    difficulte: 'Facile',
    notes: '1-2 piments chili suffisent (3 = très piquant authentique).',
    etapes: [
      'Suivre la recette du paquet Blue Dragon.',
      'Cuire 3 poitrines de poulet coupées.',
      'Ajouter 2 tasses de légumes congelés.',
      'Ajouter 1-2 piments chili.',
      'Épaissir avec ¾ tasse de crème.',
      'Ajouter 1 cuillère de sucre/sirop. Servir avec du riz.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-03-20')
  },
  {
    id: 'rec_filets_poulet',
    titre: 'Filets de poulet',
    description: 'Filets de poulet panés aux épices cajun, croustillants au four à convection.',
    imageUrl: '/images/recettes/filets-poulet.png',
    categorie: 'plat principal',
    tempsPreparation: 15,
    tempsCuisson: 17,
    portions: 4,
    difficulte: 'Facile',
    notes: 'On peut double dip entre chapelure et œufs pour plus de croustillant.',
    etapes: [
      'Mélanger chapelure, épices cajun et sel d\'ail dans un bol.',
      'Battre 4 œufs dans un autre bol.',
      'Enrober les lanières de poulet dans environ 1 tasse de farine.',
      'Tremper dans les œufs puis dans la chapelure.',
      'Placer sur la grille.',
      'Cuire à 400°F convection pendant 17 minutes.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-03-25')
  },
  {
    id: 'rec_gateau_bananes',
    titre: 'Gâteau aux bananes',
    description: 'Pain aux bananes classique, moelleux et simple. Meilleur avec 3 bananes.',
    imageUrl: '/images/recettes/gateau-bananes.png',
    categorie: 'dessert',
    tempsPreparation: 10,
    tempsCuisson: 75,
    portions: 8,
    difficulte: 'Facile',
    notes: 'Utiliser 3 bananes (2 = trop sec) et ajouter un peu de farine. Ajouter noix/chocolat pour meilleur goût.',
    etapes: [
      'Préchauffer le four à 350°F (175°C). Beurrer un moule à pain 4x8.',
      'Écraser les bananes à la fourchette. Verser le beurre fondu.',
      'Ajouter bicarbonate, sel, sucre, œuf et vanille. Bien mélanger.',
      'Ajouter la farine et mélanger jusqu\'à texture homogène.',
      'Verser dans le moule.',
      'Cuire 1h15 ou jusqu\'à ce qu\'un cure-dent en ressorte propre.',
      'Faire refroidir.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-04-01')
  },
  {
    id: 'rec_nouilles_chinoises',
    titre: 'Nouilles chinoises',
    description: 'Sauté de nouilles avec légumes au choix et viande, assaisonné au bouillon de bœuf et soya.',
    imageUrl: '/images/recettes/nouilles-chinoises.png',
    categorie: 'plat principal',
    tempsPreparation: 10,
    tempsCuisson: 15,
    portions: 4,
    difficulte: 'Facile',
    notes: '',
    etapes: [
      'Faire frire les légumes au choix dans un peu d\'huile (brocoli, carottes, poivrons, oignons).',
      'Faire frire un peu de poulet ou viande hachée.',
      'Ajouter bouillon de bœuf, soya et cassonade au goût.',
      'Mélanger avec les nouilles cuites.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-04-05')
  },
  {
    id: 'rec_penne_saucisses',
    titre: 'Penne saucisses italienne',
    description: 'Penne avec saucisses italiennes Delisa et sauce bolognese Mikes. Rapide et réconfortant.',
    imageUrl: '/images/recettes/penne-saucisses.png',
    categorie: 'plat principal',
    tempsPreparation: 5,
    tempsCuisson: 20,
    portions: 4,
    difficulte: 'Facile',
    notes: 'Ajouter un peu de beurre pour que la sauce épaississe et colle mieux aux nouilles.',
    etapes: [
      'Faire bouillir l\'eau et cuire les penne.',
      'Faire frire les saucisses jusqu\'à cuisson complète.',
      'Drainer un peu de gras, garder un peu et faire frire les oignons.',
      'Drainer les nouilles.',
      'Chauffer la sauce bolognese dans un wok. Optionnel : ajouter du beurre.',
      'Combiner nouilles, saucisses et sauce. Brasser quelques minutes.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-04-10')
  },
  {
    id: 'rec_porc_pommes',
    titre: 'Porc aux pommes',
    description: 'Filet de porc rôti au four avec pommes caramélisées au sirop d\'érable.',
    categorie: 'plat principal',
    tempsPreparation: 10,
    tempsCuisson: 25,
    portions: 4,
    difficulte: 'Moyen',
    notes: 'Faire le triple de sauce pour 2-3 filets.',
    etapes: [
      'Préchauffer le four à 205°C (400°F).',
      'Parer le filet de porc en retirant la membrane blanche.',
      'Saisir le filet 2-3 minutes sur toutes les faces dans une poêle allant au four.',
      'Faire dorer l\'oignon et les pommes 2-3 minutes dans la même poêle.',
      'Ajouter le sirop d\'érable et le bouillon de poulet. Porter à ébullition.',
      'Remettre le filet, saler et poivrer.',
      'Cuire au four 20-25 minutes.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-04-15')
  },
  {
    id: 'rec_sauce_arachides',
    titre: 'Sauce au beurre d\'arachides (rouleaux printemps)',
    description: 'Sauce trempette au beurre d\'arachide, lime et soya pour rouleaux de printemps.',
    categorie: 'sauce',
    tempsPreparation: 5,
    tempsCuisson: 0,
    portions: 4,
    difficulte: 'Facile',
    notes: '',
    etapes: [
      'Mélanger beurre d\'arachide, eau, jus de lime, sauce soya, miel et ail haché.',
      'Poivrer au goût.',
      'Servir avec des rouleaux de printemps.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-04-20')
  },
  {
    id: 'rec_salade_choux_vietnamienne',
    titre: 'Salade de choux vietnamienne - Goi Ga',
    description: 'Salade fraîche de chou, poulet effiloché, carottes, menthe et coriandre avec vinaigrette au fish sauce.',
    categorie: 'entrée',
    tempsPreparation: 25,
    tempsCuisson: 5,
    portions: 4,
    difficulte: 'Moyen',
    notes: '',
    etapes: [
      'Préparer la vinaigrette : sucre, fish sauce, jus de lime, vinaigre blanc, eau, piment serrano et ail. Laisser reposer 5 min.',
      'Frire les échalotes dans l\'huile végétale jusqu\'à dorées. Égoutter et saler.',
      'Mélanger chou, carottes, oignon rouge, coriandre, menthe et poulet effiloché.',
      'Ajouter l\'huile d\'olive et la vinaigrette. Mélanger.',
      'Garnir d\'arachides et d\'échalotes frites. Servir avec quartiers de lime.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-04-25')
  },
  {
    id: 'rec_soupe_thailandaise',
    titre: 'Soupe thaïlandaise',
    description: 'Soupe au lait de coco, curry rouge, poulet et beurre d\'arachide. Servir avec vermicelle de riz.',
    imageUrl: '/images/recettes/soupe-thailandaise.png',
    categorie: 'soupe',
    tempsPreparation: 15,
    tempsCuisson: 25,
    portions: 6,
    difficulte: 'Facile',
    notes: 'Portions au pif avec expérience. Vermicelle à part pour éviter bouillon épais.',
    etapes: [
      'Rôtir gingembre et ail haché au fond de la marmite quelques secondes.',
      'Ajouter bouillon de poulet et lait de coco (2 cannes).',
      'Ajouter curry rouge thaï (Blue Dragon).',
      'Ajouter le poulet en petits morceaux.',
      'Ajouter beurre d\'arachide (1 cuillère par litre).',
      'Optionnel : poivrons et oignons en petits morceaux.',
      'Cuire le vermicelle de riz séparément.',
      'Servir garni d\'arachides écrasées, coriandre et oignons verts.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-05-01')
  },
  {
    id: 'rec_soupe_bangkok',
    titre: 'Soupe bangkok',
    description: 'Soupe au cari rouge, lait de coco et beurre d\'arachide servie sur vermicelle de riz et laitue.',
    categorie: 'soupe',
    tempsPreparation: 15,
    tempsCuisson: 20,
    portions: 4,
    difficulte: 'Facile',
    notes: '',
    etapes: [
      'Mélanger le bouillon chaud et le lait de coco. Réserver.',
      'Faire suer l\'ail et l\'oignon dans l\'huile.',
      'Ajouter pâte de cari, curcuma et cayenne pour faire une pâte.',
      'Ajouter le mélange bouillon/coco et le beurre d\'arachide.',
      'Porter à ébullition, mijoter 15 minutes.',
      'Ajouter coriandre moulue et sucre.',
      'Servir sur laitue et vermicelle de riz trempé dans eau tiède.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-05-05')
  },
  {
    id: 'rec_soupe_mexicaine',
    titre: 'Soupe mexicaine',
    description: 'Soupe épicée au bœuf, haricots, maïs, riz et jalapeños. Épaissie à la fécule de maïs.',
    imageUrl: '/images/recettes/soupe-mexicaine.png',
    categorie: 'soupe',
    tempsPreparation: 15,
    tempsCuisson: 30,
    portions: 6,
    difficulte: 'Facile',
    notes: 'Attention le riz gonfle. Plus facile si précuit.',
    etapes: [
      'Rôtir l\'ail émincé.',
      'Ajouter bouillon bœuf (¾) et bouillon poulet (¼).',
      'Ajouter céleri, maïs, haricots, riz, oignons, jalapeños, bœuf.',
      'Assaisonner avec beaucoup de poivre et chili powder.',
      'Épaissir avec fécule de maïs.',
      'Laisser mijoter jusqu\'à ce que tout soit cuit.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-05-10')
  },
  {
    id: 'rec_soupe_jamaicaine',
    titre: 'Soupe jamaicaine (pois et poulet)',
    description: 'Soupe réconfortante au poulet, pois chiches, lentilles et cari jamaicain.',
    imageUrl: '/images/recettes/soupe-jamaicaine.png',
    categorie: 'soupe',
    tempsPreparation: 15,
    tempsCuisson: 35,
    portions: 6,
    difficulte: 'Facile',
    notes: 'Mesures approximatives.',
    etapes: [
      'Verser 2L de bouillon de poulet dans une marmite.',
      'Ajouter 1 canne de soupe tomate.',
      'Ajouter 2 cannes de pois chiches (dont ½ broyée) et 1 canne de lentilles.',
      'Ajouter le poulet en morceaux.',
      'Ajouter 2-3 cuillères de cari jamaicain jaune.',
      'Ajouter oignon broyé et gingembre broyé.',
      'Saler, poivrer et laisser mijoter.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-05-15')
  },
  {
    id: 'rec_jambalaya',
    titre: 'Jambalaya',
    description: 'Jambalaya cajun avec saucisses, poulet, crevettes et riz aux tomates. "Giblotte!" faite au goût!',
    imageUrl: '/images/recettes/jambalaya.png',
    categorie: 'plat principal',
    tempsPreparation: 20,
    tempsCuisson: 30,
    portions: 6,
    difficulte: 'Moyen',
    notes: 'Préparer le riz avec bouillon poulet, pâte de tomates et épices.',
    etapes: [
      'Préparer le riz avec bouillon de poulet, pâte de tomates et épices au goût.',
      'Cuire les saucisses en premier, puis les couper.',
      'Cuire poulet en dés, crevettes, céleri et oignons avec ail émincé.',
      'Combiner le tout dans un grand poêlon.',
      'Ajouter la canne de tomates en dés.',
      'Assaisonner avec chili powder et épices cajun.',
      'Mélanger avec le riz et servir.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-05-20')
  },
  {
    id: 'rec_biscuits_tahini_dattes',
    titre: 'Biscuits chocolat noir, tahini et dattes',
    description: 'Des biscuits moelleux et bien dodus qui nous amènent hors des sentiers battus grâce au tahini et à la touche d\'huile de sésame grillé.',
    imageUrl: '/images/recettes/biscuits-tahini-dattes.jpg',
    categorie: 'dessert',
    tempsPreparation: 15,
    tempsCuisson: 12,
    portions: 8,
    difficulte: 'Facile',
    notes: 'Si pas assez dorés, régler le four à broil et poursuivre la cuisson de 1 à 2 minutes, pas plus!',
    etapes: [
      'Préchauffer le four à 350°F et placer la grille au centre. Tapisser une plaque à biscuits de papier parchemin.',
      'Dans un bol, à l\'aide d\'un fouet, mélanger vigoureusement le tahini avec le sirop d\'érable, l\'huile de sésame grillé et l\'œuf.',
      'Ajouter la poudre d\'amandes, la fécule de maïs, la cannelle, la poudre à pâte, le bicarbonate et le sel, et mélanger à l\'aide d\'une cuillère de bois jusqu\'à ce que les ingrédients secs soient bien incorporés (le mélange sera très collant, c\'est normal).',
      'Ajouter les pépites de chocolat et les dattes, et bien mélanger.',
      'Avec les mains ou à l\'aide d\'une cuillère à crème glacée, former des boules de pâte de la grosseur d\'une balle de golf et les déposer sur la plaque en les aplatissant un peu. Laisser un espace de 2 po entre chacune.',
      'Enfoncer quelques pépites de chocolat et quelques morceaux de dattes sur le dessus des boules de pâte. Ajouter des graines de sésame et presser légèrement.',
      'Cuire au four 12 minutes ou jusqu\'à ce que les biscuits soient bien dorés.'
    ],
    authorId: 'user_francois',
    createdAt: new Date('2025-05-25')
  }
]


// ============================================================
// RECETTE-INGREDIENTS (liaisons avec quantités)
// ============================================================
const recetteIngredients = [
  // Ailes de poulet
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_poulet', quantiteValeur: 12, quantiteType: 'unite', unite: 'ailes' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_fecule_mais', quantiteValeur: 25, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_sel', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_poudre_chili', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_cayenne', quantiteValeur: 1, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_huile_canola', quantiteValeur: 500, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_beurre', quantiteValeur: 55, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_sauce_piquante', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_cassonade', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_ailes_poulet', ingredientId: 'ing_vinaigre_cidre', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },

  // Biscuits chocolat/pecane
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_farine', quantiteValeur: 500, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_bicarbonate', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_sel', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_beurre', quantiteValeur: 250, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_cassonade', quantiteValeur: 375, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_vanille', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_oeufs', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_pacanes', quantiteValeur: 375, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_choco_pecane', ingredientId: 'ing_chocolat_noir', quantiteValeur: 375, quantiteType: 'volume', unite: 'ml' },

  // Biscuits aux noix
  { recetteId: 'rec_biscuits_noix', ingredientId: 'ing_farine', quantiteValeur: 430, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_noix', ingredientId: 'ing_beurre', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_noix', ingredientId: 'ing_beurre_noix', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_noix', ingredientId: 'ing_sucre', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_noix', ingredientId: 'ing_cassonade', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_noix', ingredientId: 'ing_oeufs', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_biscuits_noix', ingredientId: 'ing_noix_grenoble', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },

  // Boeuf aux brocolis
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_boeuf', quantiteValeur: 500, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_brocoli', quantiteValeur: 1, quantiteType: 'unite', unite: 'pièce' },
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_oignon', quantiteValeur: 1, quantiteType: 'unite', unite: 'gros' },
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_ail', quantiteValeur: 2, quantiteType: 'unite', unite: 'gousses' },
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_gingembre', quantiteValeur: 1.5, quantiteType: 'poids', unite: 'cm' },
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_miel', quantiteValeur: 80, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_sauce_soya', quantiteValeur: 80, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boeuf_brocoli', ingredientId: 'ing_fecule_mais', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },

  // Boeuf Basilic Thai
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_boeuf', quantiteValeur: 500, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_bouillon_boeuf', quantiteValeur: 180, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_sauce_huitres', quantiteValeur: 60, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_sauce_soya', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_miel', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_fecule_mais', quantiteValeur: 10, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_basilic', quantiteValeur: 1, quantiteType: 'unite', unite: 'bouquet' },
  { recetteId: 'rec_boeuf_basilic_thai', ingredientId: 'ing_noix_cajou', quantiteValeur: 60, quantiteType: 'volume', unite: 'ml' },
]

const recetteIngredients2 = [
  // Brochettes poulet ananas
  { recetteId: 'rec_brochettes_poulet_ananas', ingredientId: 'ing_poulet', quantiteValeur: 2, quantiteType: 'unite', unite: 'poitrines' },
  { recetteId: 'rec_brochettes_poulet_ananas', ingredientId: 'ing_cassonade', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_brochettes_poulet_ananas', ingredientId: 'ing_sauce_soya', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_brochettes_poulet_ananas', ingredientId: 'ing_ananas', quantiteValeur: 2, quantiteType: 'volume', unite: 'tasses' },
  { recetteId: 'rec_brochettes_poulet_ananas', ingredientId: 'ing_poivron', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_brochettes_poulet_ananas', ingredientId: 'ing_oignon', quantiteValeur: 1, quantiteType: 'unite', unite: 'rouge' },
  { recetteId: 'rec_brochettes_poulet_ananas', ingredientId: 'ing_ail', quantiteValeur: 2, quantiteType: 'unite', unite: 'gousses' },

  // Boulettes Teriyaki
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_boeuf_hache', quantiteValeur: 1, quantiteType: 'poids', unite: 'lb' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_sauce_soya', quantiteValeur: 180, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_bouillon_boeuf', quantiteValeur: 180, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_miel', quantiteValeur: 60, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_vinaigre_riz', quantiteValeur: 45, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_cassonade', quantiteValeur: 45, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_gingembre', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_huile_sesame', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_sriracha', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_nouilles_ramen', quantiteValeur: 6, quantiteType: 'unite', unite: 'paquets' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_brocoli', quantiteValeur: 1, quantiteType: 'unite', unite: 'pièce' },
  { recetteId: 'rec_boulettes_teriyaki', ingredientId: 'ing_poivron', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },

  // Brownies
  { recetteId: 'rec_brownies', ingredientId: 'ing_sucre', quantiteValeur: 375, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_brownies', ingredientId: 'ing_farine', quantiteValeur: 180, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_brownies', ingredientId: 'ing_cacao', quantiteValeur: 160, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_brownies', ingredientId: 'ing_chocolat_noir', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_brownies', ingredientId: 'ing_oeufs', quantiteValeur: 2, quantiteType: 'unite', unite: 'gros' },
  { recetteId: 'rec_brownies', ingredientId: 'ing_huile_canola', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_brownies', ingredientId: 'ing_vanille', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },

  // Chili
  { recetteId: 'rec_chili', ingredientId: 'ing_boeuf_hache', quantiteValeur: 1, quantiteType: 'poids', unite: 'kg' },
  { recetteId: 'rec_chili', ingredientId: 'ing_oignon', quantiteValeur: 3, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_chili', ingredientId: 'ing_tomates_des', quantiteValeur: 1, quantiteType: 'unite', unite: 'grosse canne' },
  { recetteId: 'rec_chili', ingredientId: 'ing_haricots_rouges', quantiteValeur: 1, quantiteType: 'unite', unite: 'canne' },
  { recetteId: 'rec_chili', ingredientId: 'ing_ketchup', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_chili', ingredientId: 'ing_bouillon_boeuf', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_chili', ingredientId: 'ing_poudre_chili', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_chili', ingredientId: 'ing_cumin', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_chili', ingredientId: 'ing_cayenne', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },

  // Crème brocoli
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_beurre', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_ail', quantiteValeur: 2, quantiteType: 'unite', unite: 'gousses' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_oignon', quantiteValeur: 1, quantiteType: 'unite', unite: 'moyen' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_celeri', quantiteValeur: 2, quantiteType: 'unite', unite: 'branches' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_brocoli', quantiteValeur: 2, quantiteType: 'unite', unite: 'couronnes' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_pomme_terre', quantiteValeur: 1, quantiteType: 'unite', unite: 'moyenne' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_bouillon_poulet', quantiteValeur: 875, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_creme', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_laurier', quantiteValeur: 2, quantiteType: 'unite', unite: 'feuilles' },
  { recetteId: 'rec_creme_brocoli', ingredientId: 'ing_thym', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },

  // Croustade pêches
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_peches', quantiteValeur: 900, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_cassonade', quantiteValeur: 160, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_citron', quantiteValeur: 45, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_farine', quantiteValeur: 75, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_poudre_amandes', quantiteValeur: 65, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_flocons_avoine', quantiteValeur: 50, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_amandes', quantiteValeur: 30, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_croustade_peches', ingredientId: 'ing_beurre', quantiteValeur: 115, quantiteType: 'poids', unite: 'g' },
]

const recetteIngredients3 = [
  // Croustillant bananes
  { recetteId: 'rec_croustillant_bananes', ingredientId: 'ing_banane', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_croustillant_bananes', ingredientId: 'ing_citron', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_croustillant_bananes', ingredientId: 'ing_coco_rapee', quantiteValeur: 200, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_croustillant_bananes', ingredientId: 'ing_framboises', quantiteValeur: 140, quantiteType: 'volume', unite: 'ml' },

  // Curry jaune végé
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_cari_jaune', quantiteValeur: 2, quantiteType: 'unite', unite: 'pots' },
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_carotte', quantiteValeur: 1, quantiteType: 'unite', unite: 'géante' },
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_bok_choy', quantiteValeur: 1, quantiteType: 'unite', unite: 'bouquet' },
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_oignon', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_tofu', quantiteValeur: 2, quantiteType: 'unite', unite: 'paquets' },
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_poivron', quantiteValeur: 1, quantiteType: 'unite', unite: 'rouge' },
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_bambou', quantiteValeur: 1, quantiteType: 'unite', unite: 'canne' },
  { recetteId: 'rec_curry_jaune_vege', ingredientId: 'ing_brocoli', quantiteValeur: 1, quantiteType: 'unite', unite: 'pièce' },

  // Curry vert
  { recetteId: 'rec_curry_vert', ingredientId: 'ing_poulet', quantiteValeur: 3, quantiteType: 'unite', unite: 'poitrines' },
  { recetteId: 'rec_curry_vert', ingredientId: 'ing_curry_vert', quantiteValeur: 1, quantiteType: 'unite', unite: 'paquet' },
  { recetteId: 'rec_curry_vert', ingredientId: 'ing_creme', quantiteValeur: 180, quantiteType: 'volume', unite: 'ml' },

  // Filets de poulet
  { recetteId: 'rec_filets_poulet', ingredientId: 'ing_poulet', quantiteValeur: 20, quantiteType: 'unite', unite: 'lanières' },
  { recetteId: 'rec_filets_poulet', ingredientId: 'ing_oeufs', quantiteValeur: 4, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_filets_poulet', ingredientId: 'ing_chapelure', quantiteValeur: 250, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_filets_poulet', ingredientId: 'ing_cajun', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_filets_poulet', ingredientId: 'ing_farine', quantiteValeur: 250, quantiteType: 'volume', unite: 'ml' },

  // Gâteau aux bananes
  { recetteId: 'rec_gateau_bananes', ingredientId: 'ing_banane', quantiteValeur: 3, quantiteType: 'unite', unite: 'mûres' },
  { recetteId: 'rec_gateau_bananes', ingredientId: 'ing_beurre', quantiteValeur: 85, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_gateau_bananes', ingredientId: 'ing_sucre', quantiteValeur: 250, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_gateau_bananes', ingredientId: 'ing_oeufs', quantiteValeur: 1, quantiteType: 'unite', unite: 'pièce' },
  { recetteId: 'rec_gateau_bananes', ingredientId: 'ing_vanille', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_gateau_bananes', ingredientId: 'ing_bicarbonate', quantiteValeur: 5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_gateau_bananes', ingredientId: 'ing_farine', quantiteValeur: 375, quantiteType: 'volume', unite: 'ml' },

  // Penne saucisses
  { recetteId: 'rec_penne_saucisses', ingredientId: 'ing_penne', quantiteValeur: 500, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_penne_saucisses', ingredientId: 'ing_saucisse_italienne', quantiteValeur: 4, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_penne_saucisses', ingredientId: 'ing_oignon', quantiteValeur: 1, quantiteType: 'unite', unite: 'pièce' },
  { recetteId: 'rec_penne_saucisses', ingredientId: 'ing_sauce_bolognese', quantiteValeur: 1, quantiteType: 'unite', unite: 'pot' },

  // Porc aux pommes
  { recetteId: 'rec_porc_pommes', ingredientId: 'ing_porc', quantiteValeur: 680, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_porc_pommes', ingredientId: 'ing_oignon', quantiteValeur: 1, quantiteType: 'unite', unite: 'émincé' },
  { recetteId: 'rec_porc_pommes', ingredientId: 'ing_pomme', quantiteValeur: 3, quantiteType: 'unite', unite: 'rouges' },
  { recetteId: 'rec_porc_pommes', ingredientId: 'ing_sirop_erable', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_porc_pommes', ingredientId: 'ing_bouillon_poulet', quantiteValeur: 80, quantiteType: 'volume', unite: 'ml' },

  // Sauce arachides
  { recetteId: 'rec_sauce_arachides', ingredientId: 'ing_beurre_arachide', quantiteValeur: 45, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_sauce_arachides', ingredientId: 'ing_lime', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_sauce_arachides', ingredientId: 'ing_sauce_soya', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_sauce_arachides', ingredientId: 'ing_miel', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_sauce_arachides', ingredientId: 'ing_ail', quantiteValeur: 1, quantiteType: 'unite', unite: 'gousse' },

  // Soupe thailandaise
  { recetteId: 'rec_soupe_thailandaise', ingredientId: 'ing_bouillon_poulet', quantiteValeur: 1500, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_thailandaise', ingredientId: 'ing_lait_coco', quantiteValeur: 2, quantiteType: 'unite', unite: 'cannes' },
  { recetteId: 'rec_soupe_thailandaise', ingredientId: 'ing_cari_rouge', quantiteValeur: 60, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_thailandaise', ingredientId: 'ing_poulet', quantiteValeur: 500, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_soupe_thailandaise', ingredientId: 'ing_beurre_arachide', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_thailandaise', ingredientId: 'ing_gingembre', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_thailandaise', ingredientId: 'ing_vermicelle_riz', quantiteValeur: 200, quantiteType: 'poids', unite: 'g' },

  // Soupe bangkok
  { recetteId: 'rec_soupe_bangkok', ingredientId: 'ing_bouillon_poulet', quantiteValeur: 940, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_bangkok', ingredientId: 'ing_lait_coco', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_bangkok', ingredientId: 'ing_cari_rouge', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_bangkok', ingredientId: 'ing_beurre_arachide', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_bangkok', ingredientId: 'ing_curcuma', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_bangkok', ingredientId: 'ing_vermicelle_riz', quantiteValeur: 100, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_soupe_bangkok', ingredientId: 'ing_laitue', quantiteValeur: 1, quantiteType: 'unite', unite: 'pièce' },

  // Soupe mexicaine
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_boeuf_hache', quantiteValeur: 500, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_bouillon_boeuf', quantiteValeur: 1000, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_bouillon_poulet', quantiteValeur: 350, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_celeri', quantiteValeur: 2, quantiteType: 'unite', unite: 'branches' },
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_mais', quantiteValeur: 1, quantiteType: 'unite', unite: 'canne' },
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_haricots_rouges', quantiteValeur: 1, quantiteType: 'unite', unite: 'canne' },
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_riz', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_mexicaine', ingredientId: 'ing_poudre_chili', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },

  // Soupe jamaicaine
  { recetteId: 'rec_soupe_jamaicaine', ingredientId: 'ing_bouillon_poulet', quantiteValeur: 2000, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_jamaicaine', ingredientId: 'ing_poulet', quantiteValeur: 500, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_soupe_jamaicaine', ingredientId: 'ing_pois_chiches', quantiteValeur: 2, quantiteType: 'unite', unite: 'cannes' },
  { recetteId: 'rec_soupe_jamaicaine', ingredientId: 'ing_lentilles', quantiteValeur: 1, quantiteType: 'unite', unite: 'canne' },
  { recetteId: 'rec_soupe_jamaicaine', ingredientId: 'ing_cari_jamaicain', quantiteValeur: 45, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_soupe_jamaicaine', ingredientId: 'ing_gingembre', quantiteValeur: 10, quantiteType: 'volume', unite: 'ml' },

  // Jambalaya
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_riz', quantiteValeur: 500, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_saucisse_italienne', quantiteValeur: 4, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_poulet', quantiteValeur: 2, quantiteType: 'unite', unite: 'poitrines' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_crevettes', quantiteValeur: 300, quantiteType: 'poids', unite: 'g' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_bouillon_poulet', quantiteValeur: 500, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_tomates_des', quantiteValeur: 1, quantiteType: 'unite', unite: 'canne' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_celeri', quantiteValeur: 2, quantiteType: 'unite', unite: 'branches' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_oignon', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_poivron', quantiteValeur: 2, quantiteType: 'unite', unite: 'pièces' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_cajun', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_jambalaya', ingredientId: 'ing_pate_tomates', quantiteValeur: 30, quantiteType: 'volume', unite: 'ml' },

  // Biscuits chocolat noir, tahini et dattes
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_tahini', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_sirop_erable', quantiteValeur: 80, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_huile_sesame', quantiteValeur: 10, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_oeufs', quantiteValeur: 1, quantiteType: 'unite', unite: 'gros' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_poudre_amandes', quantiteValeur: 310, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_fecule_mais', quantiteValeur: 60, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_cannelle', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_poudre_pate', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_bicarbonate', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_sel', quantiteValeur: 2.5, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_pepites_chocolat', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_dattes', quantiteValeur: 125, quantiteType: 'volume', unite: 'ml' },
  { recetteId: 'rec_biscuits_tahini_dattes', ingredientId: 'ing_sesame', quantiteValeur: 15, quantiteType: 'volume', unite: 'ml' },
]

const allRecetteIngredients = [...recetteIngredients, ...recetteIngredients2, ...recetteIngredients3]


// ============================================================
// USERS
// ============================================================
const users = [
  {
    id: 'user_francois',
    displayName: 'François',
    email: 'francois.c.n@gmail.com',
    bio: 'Cuisinier amateur passionné de cuisine asiatique et de desserts.',
    createdAt: new Date('2025-01-01')
  }
]

// ============================================================
// USER-RECETTES (favoris)
// ============================================================
const userRecettes = [
  { userId: 'user_francois', recetteId: 'rec_boeuf_basilic_thai', type: 'favori', addedAt: new Date('2025-02-10') },
  { userId: 'user_francois', recetteId: 'rec_boulettes_teriyaki', type: 'favori', addedAt: new Date('2025-02-20') },
  { userId: 'user_francois', recetteId: 'rec_soupe_thailandaise', type: 'favori', addedAt: new Date('2025-03-01') },
  { userId: 'user_francois', recetteId: 'rec_brownies', type: 'favori', addedAt: new Date('2025-03-15') },
  { userId: 'user_francois', recetteId: 'rec_jambalaya', type: 'favori', addedAt: new Date('2025-04-01') },
]

// ============================================================
// SEED FUNCTION
// ============================================================
async function seed() {
  console.log('🌱 Début du seed Firestore...\n')

  // Ingredients
  console.log('📦 Création des ingrédients...')
  for (const ing of allIngredients) {
    const { id, ...data } = ing
    await setDoc(doc(db, 'ingredients', id), data)
  }
  console.log(`   ✓ ${allIngredients.length} ingrédients créés`)

  // Recettes
  console.log('\n📖 Création des recettes...')
  for (const rec of recettes) {
    const { id, ...data } = rec
    await setDoc(doc(db, 'recettes', id), data)
  }
  console.log(`   ✓ ${recettes.length} recettes créées`)

  // Recette-Ingredients
  console.log('\n🔗 Création des liaisons recette-ingrédients...')
  for (const ri of allRecetteIngredients) {
    const docId = `${ri.recetteId}_${ri.ingredientId}`
    await setDoc(doc(db, 'recetteIngredients', docId), ri)
  }
  console.log(`   ✓ ${allRecetteIngredients.length} liaisons créées`)

  // Users
  console.log('\n👤 Création des utilisateurs...')
  for (const user of users) {
    const { id, ...data } = user
    await setDoc(doc(db, 'users', id), data)
  }
  console.log(`   ✓ ${users.length} utilisateur(s) créé(s)`)

  // User-Recettes
  console.log('\n⭐ Création des favoris...')
  for (const ur of userRecettes) {
    const docId = `${ur.userId}_${ur.recetteId}`
    await setDoc(doc(db, 'userRecettes', docId), ur)
  }
  console.log(`   ✓ ${userRecettes.length} favoris créés`)

  console.log('\n✅ Seed terminé avec succès !')
  console.log(`
  Résumé :
  • ingredients          ${allIngredients.length} documents
  • recettes             ${recettes.length} documents
  • recetteIngredients   ${allRecetteIngredients.length} documents
  • users                ${users.length} documents
  • userRecettes         ${userRecettes.length} documents
  `)

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Erreur lors du seed:', err)
  process.exit(1)
})
