import CKEditorComponent from '@/shared/components/CKEditor/index.tsx';
import { useParams } from 'react-router-dom';

const Write = () => {
  // const { hashed_id } = useParams<{ hashed_id: string }>();
  // console.log(hashed_id);
  

  return (
    <>
      <CKEditorComponent />
    </>
  )
}

export default Write