import { useEffect, useState } from "react";
import { BlizzAPI } from "blizzapi";
import { useParams } from "react-router-dom";
import axios from "axios";
import LootCards from "../../components/UI/LootCards";

export default function PlayerPage() {
  // Params
  const params = useParams();
  const region = params.region;
  const realm = params.realm;
  const playerName = params.playerName;

  // States
  const [lootHistoryData, setLootHistoryData] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [charMedia, setCharMedia] = useState([]);
  const [avatar, setAvatar] = useState("");

  // Use Effects:
  // --UseEffect to get the media asset (basically a render img of the character)
  useEffect(() => {
    const api = new BlizzAPI({
      region: "eu",
      clientId: "1f1c7f5814a04308a026093aeb6f9e3f",
      clientSecret: "IEe8WPqcf7h2M1fEBPD4OyVkjsbMnVzH",
    });

    api.getAccessToken().then(async (accessToken) => {
      console.log(accessToken);
      const characterQuery = await api.query(
        `/profile/wow/character/${realm.toLowerCase()}/${playerName.toLowerCase()}/character-media?namespace=profile-eu`
      );
      setCharMedia(characterQuery.assets);
    });
  }, []);

  // --UseEffect to change the state of the 'avatar' based on what was received in the previous useEffect
  useEffect(() => {
    if (charMedia.length > 0) {
      const main = charMedia.find((item) => item.key === "main").value;
      setAvatar(main);
    }
  }, [charMedia]);

  // --UseEffect to load all the items on page load.
  useEffect(() => {
    getLootHistory();
  }, [pagination]);

  // Methods/Functions
  // --Function to fetch all the loot history from Ryan's API
  const getLootHistory = async (numOfItems) => {
    try {
      const params = {
        pageSize: pagination,
      };
      const response = await axios.get(
        `https://epgp-api.ryanwong.uk/api/Loot/region/${region}/realm/${realm}/character/${playerName}`,
        { params }
      );
      setLootHistoryData(response.data);
    } catch (e) {
      console.log("Error in fetching loot information");
      console.error(e);
    }
  };

  // --Function to increase pagination
  const loadMoreLoot = () => {
    const nItems = 1;
    setPagination((prevCount) => prevCount + nItems);
  };

  return (
    <div className="bg-bg text-text min-h-screen min-w-screen h-full w-full">
      <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex">
          <div className="w-1/3 h-[700px]">
            {avatar && (
              <div
                className="bg-no-repeat bg-center h-full"
                style={{ backgroundImage: `url(${avatar})` }}
              ></div>
            )}
          </div>
          <div className="w-2/3">
            <div className="flex flex-col pl-4 space-y-4 place-items-center">
              <div className="flex flex-col w-full">
                <span className="font-poppins font-black text-4xl ">
                  {playerName}'s{" "}
                </span>
                <span className="font-poppins font-black text-4xl text-secondary">
                  Loot History
                </span>
              </div>

              {/* Show loot history if loothistory gets updated, otherwise show loading div */}
              {lootHistoryData ? (
                <LootCards lootHistoryData={lootHistoryData} />
              ) : (
                <div>Loading loot history...</div>
              )}
              <button
                onClick={loadMoreLoot}
                className="font-poppins text-sm bg-secondary w-36 p-2 rounded-lg"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
