import Header from './components/Layout/Header';
import ModalSelector from './components/UI/ModalSelector';
import Table from './components/UI/Table';
import { useState } from 'react';

function App() {
  // States
  const [viewData, setViewData] = useState(true);
  const [uploadData, setUploadData] = useState(false);

  // Methods
  const updateStateMethod = (newViewData, newUploadData) => {
    setViewData(newViewData);
    setUploadData(newUploadData);
  };

  return (
    <div>
      <Header />
      <div className='bg-bg text-text h-screen w-full'>
        <div className='flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8'>
          <ModalSelector updateStateMethod={updateStateMethod} />
          {viewData && <Table />}
          {uploadData && <div>Upload Data Panel Goes Here</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
