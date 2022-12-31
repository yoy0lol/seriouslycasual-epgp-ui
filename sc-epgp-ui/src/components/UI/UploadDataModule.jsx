import React, { useState, useEffect, useRef } from 'react';

export default function UploadDataModule() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const fileInput = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const clearFileInput = () => {
    fileInput.current.value = '';
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

  return (
    <div className='mx-auto flex flex-col space-y-10'>
      <label className='bg-secondary font-lora py-2 px-3 w-36 text-gray'>
        Choose File
        <input type='file' style={{ display: 'none' }} onChange={handleFileChange} ref={fileInput} />
      </label>

      {data && (
        <div className='flex flex-col'>
          <pre className='overflow-y-scroll max-h-72 bg-gray p-5'>{JSON.stringify(data, null, 2)}</pre>
          <div className='flex mx-auto space-x-10'>
            {/* Clear button goes below */}
            <button>Clear Data</button>
            {/* Post Button goes below */}
            <button>Post Data</button>
          </div>
        </div>
      )}
    </div>
  );
}
