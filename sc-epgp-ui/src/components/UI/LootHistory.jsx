import axios from 'axios';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { epgpApi } from '../../../config.json';
import { getClassColor } from '../../utils/getClassColor';

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

    console.log(page);
    console.log(raidDates.length);
  }, [data, setRaidDates, page]);

  // Divs depending on conditions
  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className='flex flex-col w-full h-full font-poppins'>
        <h2 className='font-black text-4xl h-[70px]'>Loot History</h2>
        <div>
          {/* If page reaches the last index of the raid dates array, hide it*/}
          {page + 1 === raidDates.length ? null : <button onClick={() => setPage((prevValue) => prevValue + 1)}>⬅️</button>}

          <span>{raidDates[page]}</span>

          {/* If page is set to zero, do not show the right button */}
          {page === 0 ? null : <button onClick={() => setPage((prevValue) => prevValue - 1)}>➡️</button>}
        </div>
        <div className='space-y-1 font-poppins'>
          {data.lootHistory.loot
            // filter out any elements in the array that have duplicate characterName and itemString.itemId properties
            .filter((el, index, self) => self.findIndex((t) => t.characterName === el.characterName && t.itemString.itemId === el.itemString.itemId) === index)
            .map((el) => {
              // destructuring assignment
              const charName = el.characterName;
              const item = el.itemString;
              const classColor = getClassColor(el.characterClass);

              return (
                <div className='py-1 text-sm'>
                  <span style={{ color: classColor }}>{charName}</span>
                  <span> </span>
                  <span>looted</span>
                  <span> </span>
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
      </div>
    </>
  );
}
