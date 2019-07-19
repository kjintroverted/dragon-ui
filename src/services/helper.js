
export function calculateModifier(x) {
  const y = Math.floor((x - 10) / 2);
  return y < 0 ? `${ y }` : `+${ y }`;
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
