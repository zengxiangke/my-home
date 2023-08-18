import { IForm } from './components/iform';
import type {
  DefineFormShell,
  FormDesc,
  FormValues,
} from './components/iform/types';

function App() {
  type TestFormShell = DefineFormShell<
    | 'name'
    | { name: 'address'; type: 'object'; fields: 'city' | 'street' }
    | {
        name: 'books';
        type: 'list';
        fields:
          | 'title'
          | 'author'
          | { name: 'langs'; type: 'list'; fields: 'id' };
      }
  >;
  const testForm: FormDesc<TestFormShell> = {
    fields: {
      name: {
        label: 'Name',
        type: 'text',
      },
      address: {
        type: 'object',
        label: 'home address',
        layout: [['city', 'street']],
        fields: {
          city: {
            label: 'City',
            type: 'text',
          },
          street: {
            label: 'Street',
            type: 'text',
          },
        },
      },
      books: {
        label: 'Favorite books',
        type: 'list',
        layout: [
          ['title', 'author'],
          ['langs', 'langs'],
        ],
        fields: {
          title: {
            label: 'Title',
            type: 'text',
          },
          author: {
            label: 'Author',
            type: 'text',
          },
          langs: {
            label: 'Language',
            type: 'list',
            fields: {
              id: {
                label: 'LangId',
                type: 'text',
              },
            },
            layout: [['id']],
          },
        },
      },
    },
    layout: [
      //
      ['name'],
      ['address'],
      ['books'],
    ],
  };

  const defaultValues: FormValues<TestFormShell> = {
    name: 'Daniel Mike',
    address: {
      city: '0755',
      street: 'Stone',
    },
    books: [],
  };

  return (
    <>
      <IForm
        form={testForm}
        defaultValues={defaultValues}
      />
    </>
  );
}

export default App;
