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
    <div className='bg-bg text-text min-h-screen min-w-screen h-full w-full'>
      <div className='flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
        <ModalSelector updateStateMethod={updateStateMethod} />
        {viewData && <Table />}
        {uploadData && <UploadDataModule />}
      </div>
    </div>
  );
}
