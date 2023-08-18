import { Form, Input } from 'antd';
import { TextDesc } from '../types/desc';

export default function FieldText({
  name,
  label,
}: Omit<TextDesc, 'type'> & {
  name: string | string[];
}) {
  return (
    <Form.Item
      label={label}
      name={name}
    >
      <Input />
    </Form.Item>
  );
}
