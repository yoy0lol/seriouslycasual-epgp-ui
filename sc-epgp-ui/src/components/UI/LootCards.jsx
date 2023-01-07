import classNames from 'classnames';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

export default function LootCards({ lootHistoryData }) {
  const divRef = useRef(null);
  const [timedLoot, setTimedLoot] = useState([]);

  useEffect(() => {
    if (divRef.current.children.length > 0) {
      $WowheadPower.refreshLinks();
    }
  });

  useEffect(() => {
    // Create a new array to hold the result
    const result = [];

    // Loop through each object in lootHistoryData.loots
    for (const { timestamp, itemString, lootHistoryId, gearPoints } of lootHistoryData.loots) {
      // Get the month and year of the timestamp
      const date = new Date(timestamp);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

      // Add other values to the itemString object
      itemString.timestamp = timestamp;
      itemString.lootHistoryId = lootHistoryId;
      itemString.gearPoints = gearPoints;

      // Find the entry with the same month and year
      const entry = result.find((entry) => Object.keys(entry)[0] === monthYear);

      if (entry) {
        // Update the value of the existing entry by adding the itemString to the array
        entry[monthYear].push(itemString);
      } else {
        // Add a new entry with the month and year as the key and the itemString as the value
        result.push({ [monthYear]: [itemString] });
      }
    }

    // Flatten the result array to contain the month and year followed by the itemStrings
    const lootCards = result.flatMap((entry) => {
      // Get the month and year from the key of the entry object
      const monthYear = Object.keys(entry)[0];
      // Get the array of itemStrings from the value of the entry object
      const itemStrings = entry[monthYear];

      // Return an array with the month and year followed by the itemStrings array
      return [monthYear, ...itemStrings];
    });

    setTimedLoot(lootCards);
    console.log(lootCards);
  }, [lootHistoryData]);

  return (
    <div
      className='flex flex-col space-y-4 pr-3 pb-4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-secondary scrollbar-thumb-rounded-lg scrollbar-w-2 font-poppins'
      ref={divRef}
    >
      {timedLoot.map((entry) => {
        if (typeof entry === 'object') {
          // element is a loot object
          const item = entry;

          //Date Options
          const dateString = item.timestamp;
          const date = new Date(dateString);

          const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          };
          const formattedDate = date.toLocaleString('en-US', options);

          // Styling for GP Balance
          const gPTextStyles = classNames([
            'sm:text-4xl text-2xl font-bold sm:w-36 w-23 text-center', // Default style
            { 'text-red': item.gearPoints > 0 }, // GP Balance goes red when the number is below 0.
            { 'text-green': item.gearPoints <= 0 }, // GP Balance goes red when the number is above or equal to 0.
          ]);

          return (
            <div className='rounded-lg border-2 border-secondary h-24 px-4 py-8 flex hover:bg-secondary/20 hover:transition' key={item.lootHistoryId}>
              {/* DIV for item name and date */}
              <div className='grow flex flex-col justify-center'>
                <div>
                  <a
                    className='font-bold text-sm md:text-lg'
                    data-wowhead={'bonus=' + item.bonusIds.join(':').replace(/\s+/g, '')}
                    href={`https://www.wowhead.com/item=${item.itemId}`}
                  ></a>
                </div>
                <span className='text-sm text-[11px] italic'>Looted on {formattedDate}</span>
              </div>
              {/* DIV for gear points */}
              <div className='flex flex-col justify-center items-center '>
                <span className='text-sm w-max'>GP Cost:</span>
                <span className={gPTextStyles}>{item.gearPoints < 0 ? item.gearPoints : `+${item.gearPoints}`}</span>
              </div>
            </div>
          );
        } else {
          // element is not an object
          const monthAndYear = entry;
          return (
            <div className='flex max-w-fit px-4 text-gray rounded-lg text-lg font-semibold bg-secondary' key={monthAndYear}>
              {monthAndYear}
            </div>
          );
        }
      })}
    </div>
  );
}
