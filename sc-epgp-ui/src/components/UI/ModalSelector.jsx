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
  const btnNotSelectedClass = classNames('hover:bg-secondary/50 transition-all ease-out duration-500');

  return (
    <div className='font-poppins mx-auto font-bold grow-0'>
      <button
        type='button'
        onClick={() => {
          setViewData(true);
          setUploadData(false);
        }}
        className={classNames(btnDefaultClass, 'rounded-l-md ', { [btnSelectedClass]: viewData }, { [btnNotSelectedClass]: uploadData })}
      >
        View Data
      </button>
      <button
        type='button'
        onClick={() => {
          setViewData(false);
          setUploadData(true);
        }}
        className={classNames(btnDefaultClass, 'rounded-r-md', { [btnSelectedClass]: uploadData }, { [btnNotSelectedClass]: viewData })}
      >
        Upload Data
      </button>
    </div>
  );
}
