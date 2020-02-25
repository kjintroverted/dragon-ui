
export function calculateModifier(x, z) {
  let y = Math.floor((x - 10) / 2);
  y = z ? y + z : y;
  return y < 0 ? `${y}` : `+${y}`;
}

export function dexAttack(item) {
  if (item.weapon.category.toLowerCase().indexOf('range') !== -1) return true;
  if (!item.weapon) return false;
  // TODO: reenable this once i know how
  // const finesse = weapon.weapon.find((prop) => {
  //   const text = prop.toLowerCase();
  //   return text.indexOf('finesse') !== -1;
  // });
  // return !!finesse;
}

export function isRangeWeapon(item) {
  if (item.type.toLowerCase() === 'ranged weapon') return true;
  return false;
}

export function isProWeapon(item, proWeaponDesc) {
  if (!proWeaponDesc) return false;
  const result = proWeaponDesc.find(desc => desc.indexOf(item.name.toLowerCase()));
  if (result) return true;
  const categoryArr = item.weapon.category.split(' ').map(str => str.toLowerCase());
  return !!categoryArr.find(category => !!proWeaponDesc.find(desc => desc.indexOf(category)));
}

export function same(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const skillsArray = [
  {
    label: 'Acrobatics',
    check: 'dex',
  },
  {
    label: 'Animal Handling',
    check: 'wis',
  },
  {
    label: 'Arcana',
    check: 'int',
  },
  {
    label: 'Athletics',
    check: 'str',
  },
  {
    label: 'Deception',
    check: 'cha',
  },
  {
    label: 'History',
    check: 'int',
  },
  {
    label: 'Insight',
    check: 'wis',
  },
  {
    label: 'Intimidation',
    check: 'cha',
  },
  {
    label: 'Investigation',
    check: 'int',
  },
  {
    label: 'Medicine',
    check: 'wis',
  },
  {
    label: 'Nature',
    check: 'int',
  },
  {
    label: 'Perception',
    check: 'wis',
  },
  {
    label: 'Performance',
    check: 'cha',
  },
  {
    label: 'Persuasion',
    check: 'cha',
  },
  {
    label: 'Religion',
    check: 'int',
  },
  {
    label: 'Sleight of Hand',
    check: 'dex',
  },
  {
    label: 'Stealth',
    check: 'dex',
  },
  {
    label: 'Survival',
    check: 'wis',
  },
];
