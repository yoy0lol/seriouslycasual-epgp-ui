import ModalSelector from '../../components/UI/ModalSelector';
import Table from '../../components/UI/Table';
import UploadDataModule from '../../components/UI/UploadDataModule';
import { useState } from 'react';

export default function Home() {
  // States
  const [viewData, setViewData] = useState(true);
  const [uploadData, setUploadData] = useState(false);

  // Methods
  const updateStateMethod = (newViewData, newUploadData) => {
    setViewData(newViewData);
    setUploadData(newUploadData);
  };
  return (
    <div className='flex-grow min-h-full flex-col'>
      <div className='flex flex-col mx-auto space-y-3'>
        <ModalSelector updateStateMethod={updateStateMethod} />
        {viewData && <Table />}
        {uploadData && <UploadDataModule />}
      </div>
    </div>
  );
}
