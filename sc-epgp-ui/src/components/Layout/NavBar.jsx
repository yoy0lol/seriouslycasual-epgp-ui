import scLogo from '../../assets/sc_logo_svg_edited.svg';
import { ReactSVG } from 'react-svg';
import { BrowserRouter, Route, Routes, NavLink, Navigate } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='text-text bg-navBarBg border-b-2 border-secondary overflow-x-hidden w-full'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-text h-full w-full'>
        <div className='flex overflow-hidden py-2 items-center  w-full'>
          <NavLink className='text-3xl font-lobster mr-auto' to='/'>
            <div className='w-fit bg-test1 flex'>
              <ReactSVG src={scLogo} className='h-11 w-11' style={{ color: 'red' }} />
              <div className='px-2 flex flex-col font-poppins'>
                <span className='font-black text-sm text-secondary leading-snug'>SeriouslyCasual</span>
                <span className='font-light text-lg leading-snug'>EPGP Interface</span>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
