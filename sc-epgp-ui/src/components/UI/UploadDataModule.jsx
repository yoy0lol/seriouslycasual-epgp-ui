import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';
import { AiFillWarning } from 'react-icons/ai';

export default function UploadDataModule() {
  // States
  const [jsonInput, setJsonInput] = useState('');
  const [warning, setWarning] = useState(false);
  const [showBtn, setShowButton] = useState(false);

  // Functions
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Use effect to do stuff if the
  useEffect(() => {
    if (jsonInput) {
      try {
        JSON.parse(jsonInput);
        setWarning(false);
        setShowButton(true);
      } catch (error) {
        setWarning(true);
        setShowButton(false);
      }
    } else {
      setWarning(false);
      setShowButton(false);
    }
  }, [jsonInput]);

  // Styles
  const defaultBtnStlye = classNames(['w-36 py-3']);

  return (
    <div className='flex flex-col w-full space-y-10'>
      <div className='flex flex-col'>
        <textarea
          placeholder='// Copy and paste the text from your JSON file here.          '
          onChange={handleInputChange}
          value={jsonInput}
          rows={10}
          cols={80}
          className='bg-gray text-text rounded-md py-2 px-4 block w-full leading-5 font-mono'
        />
      </div>

      {warning && (
        <div className='rounded-md bg-secondary p-4 flex items-center align-middle'>
          <AiFillWarning className='flex-shrink-0 text-gray h-7 w-7' />
          <p className='ml-3 text-sm font-medium text-gray'>
            It seems like the text you inputted is not a JSON file. Make sure you copy everything and try again.
          </p>
        </div>
      )}

      {showBtn && (
        <button className={defaultBtnStlye + ' bg-[#15803d]'} onClick={null}>
          Post Data
        </button>
      )}
    </div>
  );
}
