import axios from 'axios';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { epgpApi } from '../../../config.json';
import { getClassColor } from '../../utils/getClassColor';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

  // Styles for the buttons in the date picker
  // -- For the left arrow, If page reaches the last index of the raid dates array, hide it
  const leftArrowBtnStyle = classNames([
    { 'text-secondary text-2xl': !(page + 1 === raidDates.length) }, // apply if active
    { 'invisible disabled': page + 1 === raidDates.length }, // apply if inactive
  ]);

  // -- For the left arrow, If page reaches the last index of the raid dates array, hide it
  const rightArrowBtnStyle = classNames([
    { 'text-secondary text-2xl': page !== 0 }, // apply if active
    { 'invisible disabled': page === 0 }, // apply if inactive
  ]);

  // Divs depending on conditions
  if (error) return <div>Failed to load data</div>;

  return (
    <div className='flex flex-col w-full h-full font-poppins'>
      <div className='w-full space-y-2'>
        {/* Default renders */}
        <h2 className='font-black text-4xl'>Loot History</h2>

        {/* If there's an error, load an error div */}
        {error && <div>Failed to load data.</div>}

        {/* If raid dates exist, and the array of raidDates is more than 0, then load the date chooser */}
        {raidDates && raidDates.length > 0 && (
          <div className='flex flex-row space-x-3 min-w-fit text-[12px] font-bold border-2 border-secondary p-[4px] rounded-lg'>
            {/* Left Button */}
            <button className={leftArrowBtnStyle} onClick={() => setPage((prevValue) => prevValue + 1)}>
              <BsFillArrowLeftSquareFill />
            </button>
            {/* Date Text */}
            <span className='text-center place-self-center flex-grow'>{raidDates[page]}</span>
            {/* Right Button */}

            <button className={rightArrowBtnStyle} onClick={() => setPage((prevValue) => prevValue - 1)}>
              <BsFillArrowRightSquareFill />
            </button>
          </div>
        )}
        {data && (
          <div className='font-poppins divide-y-[2px] divide-secondary/50'>
            {data.lootHistory.loot
              // filter out any elements in the array that have duplicate characterName and itemString.itemId properties
              .filter(
                (el, index, self) => self.findIndex((t) => t.characterName === el.characterName && t.itemString.itemId === el.itemString.itemId) === index
              )
              .map((el) => {
                // destructuring assignment
                const charName = el.characterName;
                const realm = el.realm;
                const region = el.region;
                const item = el.itemString;
                const classColor = getClassColor(el.characterClass);

                return (
                  <div className='py-2 text-[12px]'>
                    <Link to={`/characters/${region}/${realm}/${charName}`}>
                      <span style={{ color: classColor }}>{charName}</span>
                    </Link>
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

      {/* While loading, show a loading div for the loot history list only */}
      {!data && (
        <div className='bg-secondary/10 h-full rounded-xl flex place-items-center justify-center items-center'>
          <div className='spinner-border animate-spin inline-block w-12 h-12 border-8 rounded-full text-secondary' role='status'></div>
        </div>
      )}
    </div>
  );
}
