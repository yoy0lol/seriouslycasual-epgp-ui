import axios from 'axios';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { epgpApi } from '../../../config.json';
import { getClassColor } from '../../utils/getClassColor';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';

const LOOTHISTORY_API_ENDPOINT = `${epgpApi.baseUrl}/Loot/date/paged/`;
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function LootHistory() {
  // States
  const [page, setPage] = useState(0);
  const [raidDates, setRaidDates] = useState([]);

  // SWRfetch
  const { data, error } = useSWR(LOOTHISTORY_API_ENDPOINT + page, fetcher);

  // UseEffects
  useEffect(() => {
    // Refresh the wowhead links so they render properly
    $WowheadPower.refreshLinks();
    // Pull the raidDates from the api into raidDates
    if (data) {
      const unformattedDates = data.raidDates;
      const formattedDates = unformattedDates.map((d) => {
        const date = new Date(d);
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      });
      setRaidDates(formattedDates);
    }
  }, [data, setRaidDates]);

  // Divs depending on conditions
  if (error) return <div>Failed to load data</div>;

  return (
    <div className='flex flex-col w-full h-full font-poppins'>
      <div className='h-[70px] w-full space-y-1'>
        {/* Default renders */}
        <h2 className='font-black text-4xl'>Loot History</h2>

        {/* If there's an error, load an error div */}
        {error && <div>Failed to load data.</div>}

        {/* If raid dates exist, and the array of raidDates is more than 0, then load the date chooser */}
        {raidDates && raidDates.length > 0 && (
          <div className='flex flex-row space-x-3 w-fit text-[12px] font-bold'>
            {/* If page reaches the last index of the raid dates array, hide it*/}
            {page + 1 === raidDates.length ? null : (
              <button className='text-secondary' onClick={() => setPage((prevValue) => prevValue + 1)}>
                <BsFillArrowLeftSquareFill />
              </button>
            )}
            <span className='text-center'>{raidDates[page]}</span>
            {/* If page is set to zero, do not show the right button */}
            {page === 0 ? null : (
              <button className='text-secondary' onClick={() => setPage((prevValue) => prevValue - 1)}>
                <BsFillArrowRightSquareFill />
              </button>
            )}
          </div>
        )}
      </div>

      {/* While loading, show a loading div for the loot history list only */}
      {!data && <div className='flex-grow'>Loading data...</div>}

      {data && (
        <div className='font-poppins divide-y-[2px] divide-secondary/50'>
          {data.lootHistory.loot
            // filter out any elements in the array that have duplicate characterName and itemString.itemId properties
            .filter((el, index, self) => self.findIndex((t) => t.characterName === el.characterName && t.itemString.itemId === el.itemString.itemId) === index)
            .map((el) => {
              // destructuring assignment
              const charName = el.characterName;
              const item = el.itemString;
              const classColor = getClassColor(el.characterClass);

              return (
                <div className='py-2 text-[12px]'>
                  <span style={{ color: classColor }}>{charName}</span>
                  <span> looted </span>
                  <a
                    className='font-bold'
                    data-wowhead={'bonus=' + item.bonusIds.join(':').replace(/\s+/g, '')}
                    href={`https://www.wowhead.com/item=${item.itemId}`}
                  >
                    {item.itemId}
                  </a>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
