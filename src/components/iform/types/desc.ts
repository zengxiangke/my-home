type TextDesc = {
  type: 'text';
  required?: boolean;
  help?: string;
};

type NumberDesc = {
  type: 'number';
  required?: boolean;
  help?: string;
};

export { TextDesc, NumberDesc };
