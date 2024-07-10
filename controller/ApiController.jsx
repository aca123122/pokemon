
export const pokemonapi = async () => {
  let result = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0", {
    method: "GET",
  });

  return result.json()
};

export const pokemonDetails = async (url) => {
  let result = await fetch(url, {
    method: "GET",
  })

  return result.json()
};

export const pokemontype = async () => {
  let result = await fetch("https://pokeapi.co/api/v2/type/", {
    method: "GET",
  });

  return result.json()
};
