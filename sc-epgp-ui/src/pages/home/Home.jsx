import Table from '../../components/UI/Table';
import LootHistory from '../../components/UI/LootHistory';

export default function Home() {
  return (
    <div className='flex-grow sm:flex sm:flex-row sm:space-x-5'>
      <div className='flex flex-col mx-auto space-y-3 w-fit sm:w-4/6'>{<Table />}</div>
      <div className='sm:w-2/6'>
        <LootHistory />
      </div>
    </div>
  );
}
