export const generateIdImage = (url: any) => {
  const link = url?.split('/');
  const index = link?.length ? link?.length - 2 : null;

  return index ? link[index] : null;
};

export const getLinkImage = (id: any) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
};
