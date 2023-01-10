import { useContext, useEffect, useState } from 'react';
import { Context } from '../Table';
import classNames from 'classnames';
import { getClassColor } from '../../../utils/getClassColor';

// Initialize gear per class
const gearTypes = {
  Cloth: ['Priest', 'Mage', 'Warlock'],
  Leather: ['DemonHunter', 'Rogue', 'Druid', 'Monk'],
  Mail: ['Hunter', 'Shaman', 'Evoker'],
  Plate: ['Warrior', 'Paladin', 'DeathKnight'],
};

// Initialize tokens per class
const tokensPerClass = {
  Zenith: ['Evoker', 'Monk', 'Rogue', 'Warrior'],
  Dreadful: ['DeathKnight', 'DemonHunter', 'Warlock'],
  Mystic: ['Druid', 'Hunter', 'Mage'],
  Venerated: ['Paladin', 'Priest', 'Shaman'],
};

export default function LootTypeSelect() {
  const [activeFilters, setActiveFilters] = useState([]);

  // Contexts (to share props between components)
  const { setFilters } = useContext(Context);

  // useEffect in order to dynamically change the filters based on the filters selected
  useEffect(() => {
    const classes = activeFilters
      .map((fil) => {
        return { ...gearTypes, ...tokensPerClass }[fil];
      })
      .flat();

    setFilters(classes);
  }, [activeFilters]);

  // Define an onChange event handler for the select element
  function handleChange(event) {
    event.preventDefault();
    const filterType = event.target.textContent;

    // Check to see if the filter exists in activeFilters. If not, then add to it. If yes, remove it.
    if (!activeFilters.includes(filterType)) {
      setActiveFilters((prevFilters) => {
        return [...prevFilters, filterType];
      });
    } else {
      setActiveFilters((prevFilters) => {
        return prevFilters.filter((filter) => filter !== filterType);
      });
    }
  }

  return (
    <>
      {/* Gear Filters */}
      <div className='flex flex-col space-y-2 text-[10px] font-poppins text-center'>
        <div className='flex flex-row space-x-1 w-full'>
          <span className='w-20 place-self-center text-left'>Filter by Gear: </span>
          {Object.keys({ ...gearTypes }).map((el) => {
            const filterStyles = classNames([
              'flex py-1 px-2 rounded-lg hover:cursor-pointer border-2 border-secondary select-none', // default styles
              { 'bg-secondary text-gray': activeFilters.includes(el) },
              { 'border-2 border-secondary': !activeFilters.includes(el) },
            ]);
            return (
              <div onClick={handleChange} className={filterStyles} key={el}>
                {el}
              </div>
            );
          })}
        </div>
        {/* Token Filters */}
        <div className='flex flex-row space-x-1 w-full'>
          <span className='w-20 place-self-center text-left'>Filter by Token: </span>
          {Object.keys({ ...tokensPerClass }).map((el) => {
            const filterStyles = classNames([
              'flex py-1 px-2 rounded-lg hover:cursor-pointer border-2 border-secondary select-none', // default styles
              { 'bg-secondary text-gray': activeFilters.includes(el) },
              { 'border-2 border-secondary': !activeFilters.includes(el) },
            ]);
            return (
              <div key={el} className='group relative flex justify-center'>
                <div onClick={handleChange} className={filterStyles}>
                  {el}
                </div>
                <div className='select-none w-36 flex flex-col flex-wrap bg-navBarBg absolute top-10 scale-0 transition-all rounded p-2 text-[10px] group-hover:scale-100'>
                  <span>Includes:</span>
                  <ul>
                    {tokensPerClass[el].map((wowCl) => {
                      // Get the class color
                      const classColor = getClassColor(wowCl);

                      // Add an 's' to the end of the string if it doesn't already end in 's'
                      const formattedWowCl = wowCl.endsWith('s') ? wowCl : `${wowCl}s`;

                      // Split the string into words at each uppercase letter
                      const words = formattedWowCl.split(/(?=[A-Z])/);

                      // Join the words with a space
                      const formattedWowClWithSpaces = words.join(' ');

                      return (
                        <li key={wowCl} style={{ color: classColor }}>
                          {formattedWowClWithSpaces}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
