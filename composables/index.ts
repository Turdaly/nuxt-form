export const styles = {
  blueDark: '#A0B3D8',
};

export const masks = {
  numbers: '#*',
  date: '##.##.####',
  phone: '+7 (7##) ### ## ##',
};

export const regex = {
  cyr: /^[\u0400-\u04FF \- a-z A-Z]+$/,
  phone: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}/,
};

export const rules = {
  required: (v: any) => !!v || 'Заполните поле',
  phone: (v: any) => regex.phone.test(v) || 'Заполните поле',
  cyrillic: (v: any) => regex.cyr.test(v) || 'Неправильный формат',
};
