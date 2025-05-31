//platinum | gold | silver | copper - en
// platina | ouro | prata | cobre - pt_BR

const CURRENCY_TO_COPPER = {
  platina: 1000,
  ouro: 100,
  prata: 10,
  cobre: 1,
};

export const convertToCopper = (priceString) => {
  const separatedPrice = priceString.split("/");
  const pricesInCopper = separatedPrice.map((item) => {
    const [value, currency] = item.trim().toLowerCase().split(" ");
    const copperValue = Number(value) * CURRENCY_TO_COPPER[currency];
    return copperValue;
  });
  return pricesInCopper.reduce((acc, curr) => acc + curr, 0);
};

export const convertCopperToAllCurrencies = (priceInCopper) => {
  let rest = priceInCopper;

  // Calculate platinum (1 platinum = 1000 copper)
  const platinum = Math.floor(rest / 1000);
  rest = rest % 1000;

  // Calculate gold (1 gold = 100 copper)
  const gold = Math.floor(rest / 100);
  rest = rest % 100;

  // Calculate silver (1 silver = 10 copper)
  const silver = Math.floor(rest / 10);
  rest = rest % 10;

  // Remaining is copper
  const copper = rest;

  return {
    platinum,
    gold,
    silver,
    copper,
  };
};

export const sumPrices = (priceString, priceString2) => {
  const priceInCopper = convertToCopper(priceString);
  const priceInCopper2 = convertToCopper(priceString2);
  return convertCopperToAllCurrencies(priceInCopper + priceInCopper2);
};

export const subtractPrices = (priceString, priceString2) => {
  const priceInCopper = convertToCopper(priceString);
  const priceInCopper2 = convertToCopper(priceString2);
  return convertCopperToAllCurrencies(priceInCopper - priceInCopper2);
};
