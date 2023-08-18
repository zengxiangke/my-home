import { Form, Input } from 'antd';
import { TextDesc } from '../types/desc';

export default function FieldText({
  name,
  label,
  extra,
}: Omit<TextDesc, 'type'> & {
  name: string[];
  extra?: object;
}) {
  return (
    <Form.Item
      {...extra}
      label={label}
      name={name}
    >
      <Input />
    </Form.Item>
  );
}
