import classNames from 'classnames';
import { useState, useEffect } from 'react';

export default function ModalSelector({ updateStateMethod }) {
  // States
  const [viewData, setViewData] = useState(true);
  const [uploadData, setUploadData] = useState(false);

  // useEffect to perform a side effect after the viewData and uploadData states are updated
  useEffect(() => {
    updateStateMethod(viewData, uploadData);
  }, [viewData, uploadData]);

  // Button classes
  const btnDefaultClass = classNames([
    'w-32', //layout properties
    'border border-secondary', //border properties
    'px-4 py-2', //padding properties
    'text-sm', //text properties
  ]);
  const btnSelectedClass = classNames('bg-secondary text-gray');

  return (
    <div className='font-poppins mx-auto font-bold pb-6'>
      <button
        type='button'
        onClick={() => {
          setViewData(true);
          setUploadData(false);
        }}
        className={btnDefaultClass + ` rounded-l-md ` + (viewData ? btnSelectedClass : null)}
      >
        View Data
      </button>
      <button
        type='button'
        onClick={() => {
          setViewData(false);
          setUploadData(true);
        }}
        className={btnDefaultClass + ` rounded-r-md ` + (uploadData ? btnSelectedClass : null)}
      >
        Upload Data
      </button>
    </div>
  );
}
