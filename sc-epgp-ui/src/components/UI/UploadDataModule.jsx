import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';

export default function UploadDataModule() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const fileInput = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const clearFileInput = () => {
    console.log('Clear File Input clicked');
    fileInput.current ? (fileInput.current.value = '') : null;
    setFile(null);
    setData(null);
  };

  useEffect(() => {
    if (!file) {
      // if there's no file, the useEffect won't trigger
      return;
    }

    if (file.name !== 'epgp.json') {
      // if the file is not named 'epgp.json' the file gets rejected and the input gets cleared
      console.log(`Can't upload this file.`);
      clearFileInput();
      return;
    }

    console.log(file.name);

    const reader = new FileReader();
    reader.onloadend = (e) => {
      const jsonData = JSON.parse(e.target.result);
      setData(jsonData);
    };
    reader.readAsText(file);
  }, [file]);

  // Styles
  const defaultBtnStlye = classNames(['w-36 py-3']);

  return (
    <div className='mx-auto flex flex-col space-y-10'>
      {data ? (
        <div className='flex flex-col'>
          <pre className='overflow-y-scroll max-h-72 bg-gray p-5'>{JSON.stringify(data, null, 2)}</pre>
          <div className='flex mx-auto space-x-10 my-5'>
            {/* Clear button goes below */}
            <button className={defaultBtnStlye + ' bg-[#991b1b]'} onClick={clearFileInput}>
              Clear Data
            </button>
            {/* Post Button goes below */}
            <button className={defaultBtnStlye + ' bg-[#15803d]'} onClick={null}>
              Post Data
            </button>
          </div>
        </div>
      ) : (
        <label className='bg-secondary font-lora py-2 px-3 w-36 text-gray text-center font-bold'>
          Choose File
          <input type='file' style={{ display: 'none' }} onChange={handleFileChange} ref={fileInput} />
        </label>
      )}
    </div>
  );
}
