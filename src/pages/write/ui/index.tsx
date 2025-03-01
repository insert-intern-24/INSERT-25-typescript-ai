import CKEditer from '@/shared/components/CKEditer/index.tsx';
import { useParams } from 'react-router-dom';

const Write = () => {
  const { hashed_id } = useParams<{ hashed_id: string }>();
  console.log(hashed_id);
  
  return (
    <>
      <CKEditer />
    </>
  )
}

export default Write