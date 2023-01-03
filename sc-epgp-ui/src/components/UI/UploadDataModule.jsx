import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';
import { AiFillWarning, AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios';

export default function UploadDataModule() {
  // States
  const [jsonInput, setJsonInput] = useState('');
  const [warning, setWarning] = useState(false);
  const [showPostBtn, setShowPostButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // use state hook to track loading state
  const [isError, setIsError] = useState(false); // use state hook to track any errors
  const [isSuccessful, setIsSuccessful] = useState(false); // use state hooks to track success in posting data

  // Functions
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const postData = () => {
    setIsLoading(true); // show loading message
    axios
      .post('https://epgp-api.ryanwong.uk/api/Uploads/epgp', {
        jsonInput,
      })
      .then((response) => {
        setIsLoading(false); // hide loading message
        console.log(response);
        setIsSuccessful(true);
      })
      .catch((error) => {
        setIsLoading(false); // hide loading message
        setIsError(true); // load error div
        console.log('There was an error posting the request');
        console.log(error);
      });
  };

  const resetRequest = () => {
    setJsonInput('');
    setIsLoading(false);
    setIsError(false);
    setIsSuccessful(false);
  };

  // FOR TESTING:
  const setLoadingTrue = () => {
    setIsLoading(true);
    console.log('isLoading state is now: ' + isLoading);
    console.log('isError state is now: ' + isError);
  };
  const setErrorTrue = () => {
    setIsError(true);
    console.log('isLoading state is now: ' + isLoading);
    console.log('isError state is now: ' + isError);
  };

  // Use effect to do stuff if the input is a JSON file
  useEffect(() => {
    if (jsonInput) {
      try {
        JSON.parse(jsonInput); // <- the JSON check.
        console.log('Posting the request now...');
        setWarning(false);
        setShowPostButton(true);
      } catch (error) {
        setWarning(true);
        setShowPostButton(false);
      }
    } else {
      setWarning(false);
      setShowPostButton(false);
    }
  }, [jsonInput]);

  const btnStyles = classNames([
    'w-36 p-4 rounded-lg font-bold font-poppins text-gray bg-secondary',
    { 'bg-test1': !isError && isLoading }, // if there are no errors and nothing is loading, this will be the btn's default style
  ]);

  return (
    <div className='flex flex-col w-full pt-5'>
      <div className='flex flex-col items-center justify-center space-y-5'>
        <textarea
          placeholder='// Copy and paste the text from your JSON file here.          '
          onChange={handleInputChange}
          value={jsonInput}
          rows={10}
          cols={80}
          className='bg-gray text-text rounded-md py-2 px-4 block w-full leading-5 font-mono'
        />
        {/* Error div and reset data in the event the post request fails */}
        {isError && !isLoading && (
          <>
            <div className='rounded-md bg-red/50 p-4 flex items-center align-middle font-poppins text-sm'>
              <AiFillWarning className='flex-shrink-0 h-7 w-7' />
              <p className='ml-3'>There was an error with your request. Please try again later.</p>
            </div>
            <button onClick={resetRequest} className={'w-36 p-4 rounded-lg font-bold font-poppins text-gray bg-secondary'}>
              Reset
            </button>
          </>
        )}

        {/* Loading spinner while the post request is going through */}
        {!isError && isLoading && (
          <div className='flex justify-center items-center text-secondary'>
            <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}

        {/* Success div if the post request goes through */}
        {isSuccessful && (
          <>
            <div className='rounded-md bg-green/50 p-4 flex items-center align-middle font-poppins'>
              <AiOutlineCheckCircle className='flex-shrink-0 h-7 w-7' />
              <p className='ml-3 text-sm font-medium'>Data posted successfully!</p>
            </div>
            <button onClick={resetRequest} className={'w-36 p-4 rounded-lg font-bold font-poppins text-gray bg-secondary'}>
              Reset
            </button>
          </>
        )}

        {/* Warning div in the event that the text inputted is not json-friendly */}
        {warning && (
          <div className='rounded-md bg-secondary p-4 flex items-center align-middle'>
            <AiFillWarning className='flex-shrink-0 text-gray h-7 w-7' />
            <p className='ml-3 text-sm font-medium text-gray'>
              It seems like the text you inputted is not a JSON file. Make sure you copy everything and try again.
            </p>
          </div>
        )}

        {/* Button that shows when no other states (isError, isLoading, or isSuccessful) are true*/}
        {showPostBtn && !isError && !isLoading && !isSuccessful && (
          <button onClick={postData} className={btnStyles}>
            Post Data
          </button>
        )}
      </div>

      {/* <button onClick={setErrorTrue}>Set Error to true</button>
      <button onClick={setLoadingTrue}>Set loading to true</button>
      <button
        onClick={() => {
          setIsSuccessful(true);
        }}
      >
        Set success to true
      </button>
      <button onClick={resetRequest}>reset states</button> */}
    </div>
  );
}
