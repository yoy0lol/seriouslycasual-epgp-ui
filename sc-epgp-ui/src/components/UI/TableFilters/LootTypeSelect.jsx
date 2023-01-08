import { useContext, useEffect } from 'react';
import { Context } from '../Table';

export default function LootTypeSelect() {
  // Initialize gear types
  const gearTypes = {
    Cloth: ['Priest', 'Mage', 'Warlock'],
    Leather: ['DemonHunter', 'Rogue', 'Druid'],
    Mail: ['Hunter', 'Shaman', 'Evoker'],
    Plate: ['Warrior', 'Paladin', 'DeathKnight'],
  };

  const options = ['All', ...Object.keys(gearTypes)]; // Create an array with all the different looting options
  gearTypes.All = Object.values(gearTypes).flat(); // Basically make an 'All' category with all classes for every gear type.

  // Contexts (to share props between components)
  const { setGearTypeSelection } = useContext(Context);

  // UseEffect to set up 'all' as the default starting point
  useEffect(() => {
    setGearTypeSelection(['All', gearTypes['All']]);
  }, []);

  // Define an onChange event handler for the select element
  const handleChange = (event) => {
    event.preventDefault();
    const itemType = event.target.value;
    setGearTypeSelection([itemType, gearTypes[itemType]]);
  };

  return (
    <div className='bg-test2'>
      <div className='flex flex-col font-poppins justify-center place-items-center  px-3'>
        <div className='xl:w-96 sm:w-36 min-h-full'>
          <select
            onChange={handleChange}
            className='form-select appearance-none
          text-gray
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            aria-label='Default select example'
          >
            {options.map((option) => {
              if (option === 'All') {
                return (
                  <option key={option} defaultValue value={option}>
                    {option}
                  </option>
                );
              } else {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
