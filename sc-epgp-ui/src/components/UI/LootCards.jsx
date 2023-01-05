import classNames from 'classnames';
import { useEffect, useRef } from 'react';

export default function LootCards({ lootHistoryData }) {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current.children.length > 0) {
      $WowheadPower.refreshLinks();
    }
  });

  return (
    <div
      ref={divRef}
      className='flex flex-col space-y-4 pr-3 pb-4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-secondary scrollbar-thumb-rounded-lg scrollbar-w-2'
    >
      {lootHistoryData.loots.map((item) => {
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
          'text-4xl font-poppins font-bold w-36 text-center', // Default style
          { 'text-red': item.gearPoints > 0 }, // GP Balance goes red when the number is below 0.
          { 'text-green': item.gearPoints <= 0 }, // GP Balance goes red when the number is above or equal to 0.
        ]);

        return (
          <div className='rounded-lg border-2 border-secondary h-24 px-4 py-8 flex hover:bg-secondary/20 hover:transition' key={item.lootHistoryId}>
            {/* DIV for item name and date */}
            <div className='grow flex flex-col justify-center'>
              <div>
                <a
                  className='font-poppins font-bold text-sm md:text-lg'
                  data-wowhead={'bonus=' + item.itemString.bonusIds.join(':').replace(/\s+/g, '')}
                  href={`https://www.wowhead.com/item=${item.itemString.itemId}`}
                ></a>
              </div>
              <span className='font-poppins text-sm text-[11px] italic'>Looted on {formattedDate}</span>
            </div>
            {/* DIV for gear points */}
            <div className='flex flex-col justify-center items-center '>
              <span className='text-sm font-poppins w-max'>GP Cost:</span>
              <span className={gPTextStyles}>{item.gearPoints < 0 ? item.gearPoints : `+${item.gearPoints}`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
