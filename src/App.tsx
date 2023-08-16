import { IForm } from './components/iform';
import { DefineFormShell, Form, FormValues } from './components/iform/types';

function App() {
  type TestFormShell = DefineFormShell<
    | 'firstName'
    | 'lastName'
    | 'age'
    | { type: 'list'; name: 'book'; fields: 'title' }
  >;
  const testForm: Form<TestFormShell> = {
    fields: {
      firstName: {
        type: 'text',
      },
      lastName: {
        type: 'text',
      },
      age: {
        type: 'number',
      },
      book: {
        type: 'list',
        maxSize: 10,
        layout: [['title']],
        fields: {
          title: {
            type: 'text',
          },
        },
      },
    },
    layout: [
      ['firstName', 'lastName'],
      ['age', 'age'],
    ],
  };

  const defaultValues: FormValues<TestFormShell> = {
    age: 20,
    firstName: 30,
    lastName: '',
    book: [
      {
        title: 'book1',
      },
    ],
  };

  return (
    <>
      {/* <pre>{JSON.stringify({ testForm, defaultValues }, null, 2)}</pre> */}
      <IForm
        form={testForm}
        initialValues={defaultValues}
      />
    </>
  );
}

export default App;
