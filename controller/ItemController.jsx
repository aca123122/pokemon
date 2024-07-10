
export const pokeItems = async ()  => {
    let result = await  fetch("https://pokeapi.co/api/v2/item/?limit=2110",{
      method: "GET",
    });
  
    return result.json()
    };
  
    export const pokeItemDetails = async (url) => {
      let result = await fetch(url, {
        method: "GET",
      })
    
      return result.json()
    };