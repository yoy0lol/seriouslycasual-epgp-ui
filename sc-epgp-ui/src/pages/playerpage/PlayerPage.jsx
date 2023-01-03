import { useEffect, useState } from 'react';
import { BlizzAPI } from 'blizzapi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LootCards from '../../components/UI/LootCards';

export default function PlayerPage() {
  // Params
  const params = useParams();
  const region = params.region;
  const realm = params.realm;
  const playerName = params.playerName;

  // States
  const [lootHistoryData, setLootHistoryData] = useState(null);
  const [pagination, setPagination] = useState(5);
  const [charMedia, setCharMedia] = useState([]);
  const [avatar, setAvatar] = useState('');

  // Use Effects:
  // --UseEffect to get the media asset (basically a render img of the character)
  useEffect(() => {
    const api = new BlizzAPI({
      region: 'eu',
      clientId: '1f1c7f5814a04308a026093aeb6f9e3f',
      clientSecret: 'IEe8WPqcf7h2M1fEBPD4OyVkjsbMnVzH',
    });

    api.getAccessToken().then(async (accessToken) => {
      console.log(accessToken);
      const characterQuery = await api.query(`/profile/wow/character/${realm.toLowerCase()}/${playerName.toLowerCase()}/character-media?namespace=profile-eu`);
      setCharMedia(characterQuery.assets);
    });
  }, []);

  // --UseEffect to change the state of the 'avatar' based on what was received in the previous useEffect
  useEffect(() => {
    if (charMedia.length > 0) {
      const main = charMedia.find((item) => item.key === 'main').value;
      setAvatar(main);
    }
  }, [charMedia]);

  // --UseEffect to load all the items on page load.
  useEffect(() => {
    getLootHistory();
  }, [pagination]);

  // Methods/Functions
  // --Function to fetch all the loot history from Ryan's API
  const getLootHistory = async () => {
    try {
      const params = {
        pageSize: pagination,
      };
      const response = await axios.get(`https://epgp-api.ryanwong.uk/api/Loot/region/${region}/realm/${realm}/character/${playerName}`, { params });
      setLootHistoryData(response.data);
    } catch (e) {
      console.log('Error in fetching loot information');
      console.error(e);
    }
  };

  // --Function to increase pagination
  const loadMoreLoot = () => {
    const nItems = 5;
    setPagination((prevCount) => prevCount + nItems);
  };

  return (
    <div className='h-full w-full'>
      <div className='flex flex-col mx-auto'>
        <div className='flex h-[800px]'>
          <div className='w-1/3 h-full'>
            {avatar && (
              <div className='bg-no-repeat bg-center h-full rounded-xl' style={{ backgroundImage: `url(${avatar})` }}></div>
              // <div className='h-96 object-contain'>
              //   <img src={avatar} alt='Character avatar' className='object-contain' />
              // </div>
            )}
          </div>
          <div className='w-2/3 h-full'>
            <div className='flex flex-col pl-4 space-y-4 place-items-left w-full h-full'>
              {/* <div className='flex flex-col w-full'> */}
              {/* Title and sub-title: */}
              <div>
                <h2 className='font-poppins font-black text-4xl'>{playerName + (playerName.endsWith('s') ? "'" : "'s")}</h2>{' '}
                <h1 className='font-poppins font-black text-4xl text-secondary'>Loot History</h1>
              </div>
              {/* Show loot history if loothistory gets updated, otherwise show loading div */}
              {lootHistoryData ? <LootCards lootHistoryData={lootHistoryData} /> : <div>Loading loot history...</div>}

              {/* Show a 'show more' button, unless the pagination is greater or equal to total number of loot for the player*/}
              {lootHistoryData && pagination >= lootHistoryData.totalNumberOfLoots ? (
                <div className='w-36 place-self-center'>
                  <div className='flex items-center py-4'>
                    {/* <!-- The left line --> */}
                    <div className='flex-grow w-full h-[1px] bg-secondary'></div>
                    {/* <!-- Your text here --> */}
                    <span className='flex-shrink text-sm text-gray-500 px-4 italic font-poppins'>End</span>
                    {/* <!-- The right line --> */}
                    <div className='flex-grow h-[1px] w-full bg-secondary'></div>
                  </div>
                </div>
              ) : (
                <button onClick={loadMoreLoot} className='font-poppins text-sm bg-secondary w-36 p-2 rounded-lg text-gray font-bold place-self-center'>
                  Load More
                </button>
              )}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
