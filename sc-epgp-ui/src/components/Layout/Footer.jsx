import { getClassColor } from '../../utils/getClassColor';

export default function Footer() {
  return (
    <nav className='text-text bg-navBarBg border-t-2 border-secondary overflow-x-hidden w-full relative bottom-0'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-text h-full w-full'>
        <div className='overflow-hidden py-2 items-center w-full'>
          <div className='px-2 flex flex-col font-poppins items-center justify-center'>
            <span className='font-extralight text-sm leading-snug text-center'>
              Made with ❤️ by SeriouslyCasual's{' '}
              <span className='px-1 rounded-lg font-bold' style={{ background: getClassColor('DemonHunter') }}>
                Cholate
              </span>{' '}
              &{' '}
              <span className='px-1 rounded-lg font-bold text-gray' style={{ background: getClassColor('Rogue') }}>
                Ryan
              </span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
