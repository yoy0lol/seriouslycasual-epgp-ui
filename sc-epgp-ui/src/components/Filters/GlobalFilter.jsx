import { BsSearch } from 'react-icons/bs';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className='bg-navBarBg rounded-lg font-poppins flex flex-row-col py-2 px-3 flex-grow'>
      <label htmlFor='search' className='sr-only'></label>
      <div className='mx-2 p-2'>
        <BsSearch className='fill-secondary h-fit w-fit' />
      </div>
      <input
        placeholder='Search'
        className='placeholder-text text-text flex-grow bg-navBarBg focus:text-text focus:ring-0 focus:outline-none focus:placeholder-text/25'
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      ></input>
    </div>
  );
};
