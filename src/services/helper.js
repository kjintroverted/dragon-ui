
export function calculateModifier(x, z) {
  let y = Math.floor((x - 10) / 2);
  y = z ? y + z : y;
  return y < 0 ? `${y}` : `+${y}`;
}

export function isFinesse(weapon) {
  const finesse = weapon.properties.find((prop) => {
    const text = prop.toLowerCase();
    return text.indexOf('range') !== -1
      || text.indexOf('finesse') !== -1;
  });
  return !!finesse;
}

export function isProWeapon(weapon, proWeaponDesc) {
  const descArr = proWeaponDesc.split(', ').map(desc => desc.toLowerCase());
  const result = descArr.find(desc => desc.indexOf(weapon.name.toLowerCase()));
  if (result) return true;
  const categoryArr = weapon.category.split(' ').map(str => str.toLowerCase());
  return !!categoryArr.find(category => !!descArr.find(desc => desc.indexOf(category)));
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
    check: 'intel',
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
    check: 'intel',
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
    check: 'intel',
  },
  {
    label: 'Medicine',
    check: 'wis',
  },
  {
    label: 'Nature',
    check: 'intel',
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
    check: 'intel',
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
