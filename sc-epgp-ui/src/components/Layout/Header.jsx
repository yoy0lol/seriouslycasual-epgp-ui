import React from 'react';
import logo from '../../assets/sc_logo_svg_edited.svg';

export default function Header() {
  return (
    <header className='bg-primary'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between border-indigo-500 py-6 lg:border-none'>
          <div className='flex items-center'>
            <img className='h-12 mr-3 w-auto' src={logo} alt='' />
            <span className='lora'>Seriously Casual</span>
          </div>
          <div className='ml-10 space-x-4'>
            {/* This is where we can put some pages: */}
            {/* Consider also adding an admin area here. */}
          </div>
        </div>
      </nav>
    </header>
  );
}
