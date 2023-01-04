import Table from '../../components/UI/Table';

export default function Home() {
  return (
    <div className='flex-grow min-h-full flex-col'>
      <div className='flex flex-col mx-auto space-y-3'>{<Table />}</div>
    </div>
  );
}
