import type {
  Form,
  FormShell,
  FormValues,
  ListDesc,
  ObjectDesc,
  ScalarDesc,
} from './types';

export default function IForm<T extends FormShell>({
  form,
  initialValues,
}: {
  form: Form<T>;
  initialValues: FormValues<T>;
}) {
  return (
    <section>
      <header>
        <h2>IForm here</h2>
      </header>
      <main>
        <div className="fields">
          {Object.entries(form.fields).map(([name, value]) => {
            const field = value as ScalarDesc | ListDesc<T> | ObjectDesc<T>;

            return (
              <p>
                {name} - {field.type}
              </p>
            );
          })}
        </div>
      </main>
    </section>
  );
}
