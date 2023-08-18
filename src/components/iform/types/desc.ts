interface BaseDesc {
  required?: boolean;
  help?: string;
  deps?: string[];
  label: string;
}

interface TextDesc extends BaseDesc {
  type: 'text';
}

interface NumberDesc extends BaseDesc {
  type: 'number';
}

interface SelectOneDesc extends BaseDesc {
  type: 'select-one';
  getOptions: (context: object) => Promise<any[]>;
}

export { TextDesc, NumberDesc, SelectOneDesc };
