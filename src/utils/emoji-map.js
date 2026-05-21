/**
 * Mapping des catégories et ingrédients vers des emojis OpenMoji.
 * Les emojis sont rendus via le CDN OpenMoji en SVG.
 */

// Emojis par catégorie d'ingrédient
export const categorieEmojis = {
  'viande': '🥩',
  'fruits de mer': '🦐',
  'produit laitier': '🧈',
  'base': '🌾',
  'légume': '🥬',
  'légumineuse': '🫘',
  'fruit': '🍎',
  'noix': '🥜',
  'épice': '🌶️',
  'herbe': '🌿',
  'sauce': '🫙',
  'huile': '🫒',
  'bouillon': '🍲',
  'sucré': '🍯',
  'vinaigre': '🫗',
  'pâtes': '🍜',
  'assaisonnement': '🧂',
  'garniture': '✨',
  'protéine végétale': '🧆',
}

// Emojis spécifiques par ingrédient (override la catégorie)
export const ingredientEmojis = {
  'ing_poulet': '🍗',
  'ing_boeuf': '🥩',
  'ing_boeuf_hache': '🥩',
  'ing_porc': '🥓',
  'ing_crevettes': '🦐',
  'ing_saucisse_italienne': '🌭',
  'ing_farine': '🌾',
  'ing_sucre': '🍬',
  'ing_cassonade': '🍬',
  'ing_beurre': '🧈',
  'ing_oeufs': '🥚',
  'ing_huile_canola': '🫒',
  'ing_huile_sesame': '🫒',
  'ing_huile_olive': '🫒',
  'ing_fecule_mais': '🌽',
  'ing_bicarbonate': '🧪',
  'ing_sel': '🧂',
  'ing_poivre': '🫚',
  'ing_ail': '🧄',
  'ing_oignon': '🧅',
  'ing_gingembre': '🫚',
  'ing_brocoli': '🥦',
  'ing_poivron': '🫑',
  'ing_carotte': '🥕',
  'ing_celeri': '🥬',
  'ing_pomme_terre': '🥔',
  'ing_tomates_des': '🍅',
  'ing_mais': '🌽',
  'ing_haricots_rouges': '🫘',
  'ing_pois_chiches': '🫘',
  'ing_lentilles': '🫘',
  'ing_sauce_soya': '🫙',
  'ing_sauce_huitres': '🦪',
  'ing_sauce_piquante': '🌶️',
  'ing_miel': '🍯',
  'ing_sirop_erable': '🍁',
  'ing_vinaigre_cidre': '🫗',
  'ing_vinaigre_riz': '🫗',
  'ing_bouillon_poulet': '🍲',
  'ing_bouillon_boeuf': '🍲',
  'ing_lait_coco': '🥥',
  'ing_creme': '🥛',
  'ing_vanille': '🌸',
  'ing_chocolat_noir': '🍫',
  'ing_cacao': '🍫',
  'ing_pacanes': '🌰',
  'ing_noix_grenoble': '🌰',
  'ing_noix_cajou': '🥜',
  'ing_arachides': '🥜',
  'ing_beurre_arachide': '🥜',
  'ing_beurre_noix': '🥜',
  'ing_banane': '🍌',
  'ing_pomme': '🍎',
  'ing_ananas': '🍍',
  'ing_peches': '🍑',
  'ing_framboises': '🫐',
  'ing_citron': '🍋',
  'ing_lime': '🍋',
  'ing_coco_rapee': '🥥',
  'ing_riz': '🍚',
  'ing_nouilles_ramen': '🍜',
  'ing_vermicelle_riz': '🍜',
  'ing_penne': '🍝',
  'ing_poudre_chili': '🌶️',
  'ing_cayenne': '🌶️',
  'ing_cumin': '🫙',
  'ing_cari_rouge': '🍛',
  'ing_cari_jaune': '🍛',
  'ing_curry_vert': '🍛',
  'ing_curcuma': '🟡',
  'ing_cari_jamaicain': '🍛',
  'ing_cajun': '🌶️',
  'ing_sriracha': '🌶️',
  'ing_ketchup': '🍅',
  'ing_sauce_bolognese': '🍝',
  'ing_pate_tomates': '🍅',
  'ing_basilic': '🌿',
  'ing_coriandre': '🌿',
  'ing_oignons_verts': '🧅',
  'ing_tofu': '🧆',
  'ing_bok_choy': '🥬',
  'ing_bambou': '🎋',
  'ing_chou': '🥬',
  'ing_laitue': '🥗',
  'ing_mangue': '🥭',
  'ing_chapelure': '🍞',
  'ing_flocons_avoine': '🌾',
  'ing_poudre_amandes': '🌰',
  'ing_amandes': '🌰',
  'ing_fish_sauce': '🐟',
  'ing_sesame': '🫘',
  'ing_laurier': '🍃',
  'ing_thym': '🌿',
}

// Emojis pour les catégories de recettes
export const recetteCategorieEmojis = {
  'plat principal': '🍽️',
  'dessert': '🍰',
  'soupe': '🍲',
  'entrée': '🥗',
  'sauce': '🫙',
  'collation': '🍪',
}

// Emojis pour les métadonnées
export const metaEmojis = {
  'temps': '⏱️',
  'cuisson': '🔥',
  'portions': '👥',
  'difficulte': '📊',
}

/**
 * Retourne l'emoji pour un ingrédient donné (par ID ou par catégorie)
 */
export function getIngredientEmoji(ingredientId, categorie) {
  if (ingredientId && ingredientEmojis[ingredientId]) {
    return ingredientEmojis[ingredientId]
  }
  if (categorie && categorieEmojis[categorie]) {
    return categorieEmojis[categorie]
  }
  return '🥄'
}
