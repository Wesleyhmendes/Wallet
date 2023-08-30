const DefaultURL = 'https://economia.awesomeapi.com.br/json/all';

const getCharacter = async () => {
  const response = await fetch(DefaultURL);
  const data = await response.json();
  const arrayData = Object.keys(data);
  arrayData.splice(1, 1);
  return arrayData;
};
console.log(await getCharacter());
export default getCharacter;
