import Form from '../common/Form';

export default function EditPost() {
  const editButton = () => <button>수정</button>;
  return <Form Button={editButton} />;
}
