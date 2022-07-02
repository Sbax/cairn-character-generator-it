import generator from "./generator.it.json";

const getRandomFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomBetween = (min = 1, max = 20) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFromItemArray = (array) => {
  const generated = getRandomBetween();

  const sorted = array.sort((a, b) => {
    if (a.value > b.value) return -1;
    if (a.value < b.value) return 1;

    return 0;
  });

  const toReturn = sorted.find(({ value }) => generated >= value);
  return toReturn;
};

const getFirstName = (filter) => {
  if (filter?.female) return getRandomFromArray(generator.firstNames.females);
  if (filter?.male) return getRandomFromArray(generator.firstNames.males);

  return getRandomFromArray([
    ...generator.firstNames.females,
    ...generator.firstNames.males,
  ]);
};

const getLastName = () => getRandomFromArray(generator.lastNames);

const getBackground = () => getRandomFromArray(generator.backgrounds);

const getTraits = () => {
  const physique = getRandomFromArray(generator.traits.physique).toLowerCase();
  const skin = getRandomFromArray(generator.traits.skin).toLowerCase();
  const hair = getRandomFromArray(generator.traits.hair).toLowerCase();
  const face = getRandomFromArray(generator.traits.face).toLowerCase();

  const speech = getRandomFromArray(generator.traits.speech).toLowerCase();
  const clothing = getRandomFromArray(generator.traits.clothing).toLowerCase();

  const virtue = getRandomFromArray(generator.traits.virtue).toLowerCase();
  const vice = getRandomFromArray(generator.traits.vice).toLowerCase();
  const reputation = getRandomFromArray(
    generator.traits.reputation
  ).toLowerCase();

  const misfortune = getRandomFromArray(
    generator.traits.misfortunes
  ).toLowerCase();

  return [
    `Hai un fisico ${physique}, la pelle ${skin}, ${hair} e la faccia ${face}.`,
    `Hai una parlata ${speech} e indossi ${clothing}.`,
    `Sei ${vice}, ma ${virtue} e sei noto come ${reputation}.`,
    `Hai avuto la sfortuna di essere stato ${misfortune}.`,
  ].join(" ");
};

const getArmor = () => {
  const armor = getRandomFromItemArray(generator.equipment.armor);
  const helmetAndShield = getRandomFromItemArray(
    generator.equipment.helmetsAndShields
  );

  const totalValue = armor.armorValue + helmetAndShield.armorValue;

  return {
    armor: `${armor.name}, ${helmetAndShield.name}`,
    armorValue: totalValue >= 3 ? 3 : totalValue,
  };
};

const getWeapon = () =>
  getRandomFromArray(
    getRandomFromItemArray(generator.equipment.weapons).options
  );

const getExpeditionaryGear = () =>
  getRandomFromArray(generator.equipment.expeditionaryGear);

const getTools = () => getRandomFromArray(generator.equipment.tools);

const getTrinkets = () => getRandomFromArray(generator.equipment.trinkets);

const getSpellbooks = () => getRandomFromArray(generator.equipment.spellbooks);

const getBonus = () => {
  const table = getRandomFromArray(
    getRandomFromItemArray(generator.equipment.bonus).options
  );

  if (table === "weapons") return getWeapon();
  if (table === "tools") return getTools();
  if (table === "trinkets") return getTrinkets();
  if (table === "expeditionaryGear") return getExpeditionaryGear();
  if (table === "armor")
    return getRandomFromItemArray(generator.equipment.armor);
  if (table === "spellbooks") return getSpellbooks();
};

const diceNotation = (string) => {
  const [count, faces] = string.split("d").map((n) => parseInt(n));

  return Array.from({ length: count }, () => getRandomBetween(1, faces)).reduce(
    (sum, item) => {
      sum += item;
      return sum;
    },
    0
  );
};

export const generateCharacter = () => {
  const gearToolsAndTrinkets = `${getExpeditionaryGear()}, ${getTools()} e ${getTrinkets()}`;
  const gold = diceNotation("3d6");
  const { armor, armorValue } = getArmor();
  const bonus = getBonus();

  const totalValue = armorValue + (bonus.armorValue || 0);

  return {
    name: `${getFirstName()} ${getLastName()}`,
    background: getBackground().toLowerCase(),
    traits: getTraits(),
    age: diceNotation("2d20") + 10,

    hp: diceNotation("1d6"),
    str: diceNotation("3d6"),
    dex: diceNotation("3d6"),
    wil: diceNotation("3d6"),
    armorValue: totalValue >= 3 ? 3 : totalValue,

    armor,
    weapon: getWeapon(),
    gearToolsAndTrinkets,
    bonus: bonus.armorValue ? bonus.name : bonus,
    startingSupplies: [
      "Tre giorni di razioni",
      "Una torcia",
      `${gold} pezzi d'oro`,
    ],
  };
};
