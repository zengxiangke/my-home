import { NumberDesc, TextDesc } from './desc';

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
type ScalarDesc = TextDesc | NumberDesc;
type ListDesc<T extends FormShell> = BlockDesc<T> & {
  type: 'list';
  maxSize: number;
};
type ObjectDesc<T extends FormShell> = BlockDesc<T> & { type: 'object' };
type BlockDesc<T extends FormShell> = {
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

type Form<T extends FormShell> = BlockDesc<T>;

/**
 * typing the Values
 */
type ListValues<T extends FormShell> = BlockValues<T>;
type ObjectValues<T extends FormShell> = BlockDesc<T>;
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
  Form,
  FormShell,
  DefineFormShell,
  FormValues,
  ScalarDesc,
  ListDesc,
  ObjectDesc,
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
