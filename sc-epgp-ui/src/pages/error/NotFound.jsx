import { Link } from 'react-router-dom';
import Home from '../home/Home';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col flex-grow items-center justify-center font-poppins'>
      <span className='text-base font-semibold text-secondary'>404</span>
      <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>This page doesn't exist.</h1>
      <Link className='mt-6 text-base font-medium text-secondary/50 hover:text-secondary' to='/'>
        Go back home
        <span aria-hidden='true'> &rarr;</span>
      </Link>
      {/* <a href='#' className='mt-6 text-base font-medium text-secondary/50 hover:text-secondary'>
        Go back home
        <span aria-hidden='true'> &rarr;</span>
      </a> */}
    </div>
  );
}
