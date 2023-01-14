import Table from '../../components/UI/Table';
import LootHistory from '../../components/UI/LootHistory';

export default function Home() {
  return (
    <div className='flex-grow sm:flex sm:flex-row sm:space-x-8 sm:space-y-0 space-y-8 '>
      {/* Change 'sm:w-full' to 'sm:w-4/6 once Loot History API is up' */}
      <div className='flex flex-col mx-auto space-y-3 w-full sm:w-4/6'>{<Table />}</div>
      <div className='flex flex-col mx-auto space-y-3 w-full sm:w-2/6'>
        <LootHistory />
      </div>
    </div>
  );
}
