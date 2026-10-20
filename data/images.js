// 이미지 경로를 한곳에서 관리해요.
// 파일은 public/images 아래에 있고, Figma "Dev export — Images" 프레임에서 같은 이름으로 내보낸 거예요.
// 이미지를 교체할 때는 같은 파일명으로 덮어쓰기만 하면 돼요.

const p = (name) => `/images/${name}.jpg`;

export const images = {
  // products
  toner: p('product-toner'),
  cleanser: p('product-cleanser'),
  serum: p('product-serum'),
  cream: p('product-cream'),
  set: p('product-set'),

  // ingredients
  centella: p('ingredient-centella'),
  hyaluronic: p('ingredient-hyaluronic'),
  ceramide: p('ingredient-ceramide'),
  greenTea: p('ingredient-green-tea'),

  // mood · scene
  hills: p('scene-hills'),
  leaf: p('scene-leaf'),
  light: p('scene-light'),
  stones: p('scene-stones'),
  portrait: p('scene-portrait'),
  skin: p('scene-skin'),
  centellaField: p('scene-centella-field'),
  night: p('scene-night'),

  // product details
  swatch: p('detail-swatch'),
  tonerTexture: p('detail-toner-texture'),
  packshot: p('detail-packshot'),
  gift: p('detail-gift'),
  flatlay: p('detail-flatlay'),
  foam: p('detail-foam'),
  drop: p('detail-drop'),
  creamTop: p('detail-cream-top'),
};
