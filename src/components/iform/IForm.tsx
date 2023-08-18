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
}: FieldsDesc<T> & { namePrefix?: string[]; extra?: object }) {
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
  extra,
}: {
  field: ScalarDesc | ListDesc<FormShell> | ObjectDesc<FormShell>;
  name: string[];
  extra?: object;
}) {
  switch (field.type) {
    case 'text':
      return (
        <FieldText
          name={name}
          label={field.label}
          extra={extra}
        />
      );

    case 'list':
      return (
        <Form.List name={name}>
          {(fields, ops, meta) => {
            return (
              <div>
                <h3>{field.label}</h3>
                <div>
                  <span>Ops:</span>
                  <button
                    onClick={() => {
                      ops.add();
                    }}
                  >
                    add item
                  </button>
                </div>
                {fields.map((fieldItem) => {
                  return (
                    <div key={fieldItem.key}>
                      <div>
                        <button
                          onClick={() => {
                            ops.remove(fieldItem.name);
                          }}
                        >
                          remove this
                        </button>
                      </div>
                      <RenderFields
                        namePrefix={[fieldItem.name as any]}
                        fields={field.fields}
                        layout={field.layout}
                        // extra={fieldItem}
                      />
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Form.List>
      );

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
