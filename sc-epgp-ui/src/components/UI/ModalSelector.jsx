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
    'w-32', // layout properties
    'border border-secondary', // border properties
    'px-4 py-2', // padding properties
    'text-sm', // text properties
  ]);
  const btnSelectedClass = classNames('bg-secondary text-gray');

  return (
    <div className='font-poppins mx-auto font-bold'>
      <button
        type='button'
        onClick={() => {
          setViewData(true);
          setUploadData(false);
        }}
        className={classNames(btnDefaultClass, 'rounded-l-md', { [btnSelectedClass]: viewData })}
      >
        View Data
      </button>
      <button
        type='button'
        onClick={() => {
          setViewData(false);
          setUploadData(true);
        }}
        className={classNames(btnDefaultClass, 'rounded-r-md', { [btnSelectedClass]: uploadData })}
      >
        Upload Data
      </button>
    </div>
  );
}
