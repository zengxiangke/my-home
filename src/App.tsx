import { IForm } from './components/iform';
import type {
  DefineFormShell,
  FormDesc,
  FormValues,
} from './components/iform/types';

function App() {
  type TestFormShell = DefineFormShell<
    'name' | { type: 'object'; name: 'address'; fields: 'city' | 'street' }
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
    },
    layout: [
      //
      ['name'],
      ['address'],
    ],
  };

  const defaultValues: FormValues<TestFormShell> = {
    name: 'Daniel Mike',
    address: {
      city: '0755',
      street: 'Stone',
    },
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
