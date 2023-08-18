import { Form } from 'antd';
import type {
  FieldsDesc,
  FormDesc,
  FormShell,
  FormValues,
  ListDesc,
  ObjectDesc,
  ScalarDesc,
} from './types';
import Layout from './components/Layout';
import FieldText from './components/FieldText';

export default function IForm<T extends FormShell>({
  form,
  defaultValues,
}: {
  form: FormDesc<T>;
  defaultValues?: FormValues<T>;
}) {
  return (
    <section>
      <header>
        <h2>IForm here</h2>
      </header>
      <main>
        <Form initialValues={defaultValues}>
          <RenderFields
            fields={form.fields}
            layout={form.layout}
          />
          <Form.Item shouldUpdate>
            {(form) => {
              return (
                <pre>
                  {JSON.stringify(
                    //
                    form.getFieldsValue(),
                    null,
                    2
                  )}
                </pre>
              );
            }}
          </Form.Item>
        </Form>
      </main>
    </section>
  );
}

function RenderFields<T extends FormShell>({
  fields,
  layout,
  namePrefix,
}: FieldsDesc<T> & { namePrefix?: string[] }) {
  return (
    <Layout areas={layout}>
      {Object.entries(fields).map((entry) => {
        const [name, value] = entry;
        const field = value as ScalarDesc | ListDesc<T> | ObjectDesc<T>;
        const namePath = namePrefix ? [...namePrefix, name] : [name];

        return (
          <Layout.Item
            key={name}
            area={name}
          >
            <RenderField
              key={name}
              name={namePath}
              field={field}
            />
          </Layout.Item>
        );
      })}
    </Layout>
  );
}

function RenderField({
  name,
  field,
}: {
  field: ScalarDesc | ListDesc<FormShell> | ObjectDesc<FormShell>;
  name: string[];
}) {
  switch (field.type) {
    case 'text':
      return (
        <FieldText
          name={name}
          label={field.label}
        />
      );

    // case 'list':
    //   return (
    //     // <FieldList
    //     //   name={finalNamePath}
    //     //   label={field.label}
    //     //   fields={field.fields}
    //     //   layout={field.layout}
    //     // />
    //   );

    case 'object':
      return (
        <div>
          <h3>Object: {field.label}</h3>
          <RenderFields
            fields={field.fields}
            layout={field.layout}
            namePrefix={name}
          />
        </div>
      );

    default:
      return null;
  }
}
