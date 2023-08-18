import { NumberDesc, SelectOneDesc, TextDesc } from './desc';

/**
 * typing the Shell
 */
type ScalarShell = string;
type ListShell = {
  type: 'list';
  name: string;
  fields: FormShell;
};
type ObjectShell = {
  type: 'object';
  name: string;
  fields: FormShell;
};
type FormShell = ScalarShell | ListShell | ObjectShell;
type DefineFormShell<T extends FormShell> = T;

/**
 * typing the Form
 */
type Layout<T extends FormShell> = Array<
  Array<
    | Extract<T, ScalarShell>
    // list & object
    | Extract<T, ListShell | ObjectShell>['name']
  >
>;
type ScalarDesc = TextDesc | NumberDesc | SelectOneDesc;
type ListDesc<T extends FormShell> = FieldsDesc<T> & {
  type: 'list';
  label: string;
};
type ObjectDesc<T extends FormShell> = FieldsDesc<T> & {
  type: 'object';
  label: string;
};
type FieldsDesc<T extends FormShell = FormShell> = {
  fields: // combination of scalar, list and object fields
  {
    [K in Extract<T, ScalarShell>]: ScalarDesc;
  } & {
    [K in Extract<T, ListShell> as K['name']]: ListDesc<K['fields']>;
  } & {
    [K in Extract<T, ObjectShell> as K['name']]: ObjectDesc<K['fields']>;
  };
  layout: Layout<T>;
};

type FormDesc<T extends FormShell = FormShell> = FieldsDesc<T>;

/**
 * typing the Values
 */
type ListValues<T extends FormShell> = BlockValues<T>;
type ObjectValues<T extends FormShell> = BlockValues<T>;
type BlockValues<T extends FormShell> =
  // combination of scalar, list and object fields
  {
    [K in Extract<T, ScalarShell>]: any;
  } & {
    [K in Extract<T, ListShell> as K['name']]: ListValues<K['fields']>[];
  } & {
    [K in Extract<T, ObjectShell> as K['name']]: ObjectValues<K['fields']>;
  };
type FormValues<T extends FormShell> = BlockValues<T>;

export {
  FormShell,
  DefineFormShell,
  ScalarDesc,
  ListDesc,
  ObjectDesc,
  FieldsDesc,
  FormDesc,
  FormValues,
};

/**
 * usage demo
 */

type StudentFormShell = DefineFormShell<
  | 'name'
  | 'age'
  // list: family members
  | { name: 'family'; type: 'list'; fields: 'name' | 'relation' }
  // object: bank card
  | { name: 'bankCard'; type: 'object'; fields: 'bank' | 'cardNumber' }
>;

// let studentForm: Form<StudentFormShell> = {
//   fields: {
//     age: { type: 'text' },
//     name: { type: 'number' },
//     family: {
//       maxSize: 3,
//       fields: { name: { type: 'text' }, relation: { type: 'text' } },
//       layout: [['name']],
//     },
//     bankCard: {
//       fields: {
//         bank: { type: 'text' },
//         cardNumber: {
//           type: 'text',
//         },
//       },
//       layout: [['bank']],
//     },
//   },
//   layout: [['age']],
// };
