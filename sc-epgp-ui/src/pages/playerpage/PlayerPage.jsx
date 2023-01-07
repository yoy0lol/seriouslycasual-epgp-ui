import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LootCards from '../../components/UI/LootCards';
import { useCallback } from 'react';
import { battleNet as battleNetConfig, epgpApi } from '../../../config.json';

export default function PlayerPage() {
	// Params
	const params = useParams();
	const region = params.region;
	const realm = params.realm;
	const playerName = params.playerName;

	// States
	const [lootHistoryData, setLootHistoryData] = useState(null);
	const [pagination, setPagination] = useState(5);
	const [avatar, setAvatar] = useState('');
	const [accessToken, setAccessToken] = useState('');

	const navigate = useNavigate();

	// Use Effects:
	// --UseEffect to get the media asset (basically a render img of the character)
	useEffect(() => {
		const params = new URLSearchParams({ grant_type: 'client_credentials' });

		axios
			.request({
				url: '/token',
				method: 'post',
				baseURL: 'https://oauth.battle.net',
				auth: {
					username: battleNetConfig.clientId, // This is the client_id
					password: battleNetConfig.clientSecret, // This is the client_secret
				},
				data: {},
				params,
			})
			.then((response) => {
				setAccessToken(response.data.access_token);
			})
			.catch((error) => console.error(error));
	}, []);

	const getAvatar = useCallback(() => {
		if (accessToken) {
			const config = {
				headers: { Authorization: `Bearer ${accessToken}` },
				withCredentials: false,
			};
			const baseUrl = 'https://eu.api.blizzard.com';
			const url = `${baseUrl}/profile/wow/character/${realm.toLowerCase()}/${playerName.toLowerCase()}/character-media?namespace=profile-eu`;
			axios
				.get(url, config)
				.then((response) => {
					if (response) {
						const main = response.data.assets.find(
							(item) => item.key === 'main',
						).value;
						setAvatar(main);
					}
				})
				.catch((error) => console.error(error));
		}
	}, [accessToken]);

	// --UseEffect to load all the items on page load.
	useEffect(() => {
		getLootHistory();
		getAvatar();
	}, [pagination, accessToken]);

	// Methods/Functions
	// --Function to fetch all the loot history from Ryan's API
	const getLootHistory = async () => {
		const params = {
			pageSize: pagination,
		};
		axios
			.get(
				`${epgpApi.baseUrl}/Loot/region/${region}/realm/${realm}/character/${playerName}`,
				{ params },
			)
			.then((response) => {
				console.log(response.status);
				setLootHistoryData(response.data);
			})
			.catch((error) => {
				navigate('/error/notFound');
			});
	};

	// --Function to increase pagination
	const loadMoreLoot = () => {
		const nItems = 5;
		setPagination((prevCount) => prevCount + nItems);
	};

	return (
		<div className="flex flex-col flex-grow">
			<div className="grid grid-cols-5 flex-grow h-8 gap-6">
				{/* Portion for avatar */}
				<div className="hidden md:block md:col-start-1 col-span-2">
					{avatar && (
						<div
							className="bg-no-repeat bg-center h-full rounded-3xl "
							style={{ backgroundImage: `url(${avatar})` }}
						></div>
					)}
					{!avatar && (
						<div className="bg-secondary/10 h-full rounded-xl flex place-items-center justify-center items-center">
							<div
								className="spinner-border animate-spin inline-block w-12 h-12 border-8 rounded-full text-secondary"
								role="status"
							></div>
						</div>
					)}
				</div>
				{/* Portion for loot history */}
				<div className="col-end-6 col-span-full sm:col-span-3 flex flex-col overflow-y-auto">
					{/* Title and sub-title: */}
					<div className="pb-5">
						<h2 className="font-poppins font-black text-4xl">
							{playerName + (playerName.endsWith('s') ? "'" : "'s")}
						</h2>{' '}
						<h1 className="font-poppins font-black text-4xl text-secondary">
							Loot History
						</h1>
					</div>
					{/* Show loot history if loothistory gets updated, otherwise show loading div */}
					{lootHistoryData ? (
						<LootCards lootHistoryData={lootHistoryData} />
					) : (
						<div>Loading loot history...</div>
					)}
					{/* Show a 'show more' button, unless the pagination is greater or equal to total number of loot for the player*/}
					{lootHistoryData &&
						pagination < lootHistoryData.totalNumberOfLoots &&
						lootHistoryData.totalNumberOfLoots !== 0 && (
							<button
								onClick={loadMoreLoot}
								className="font-poppins text-sm bg-secondary w-36 p-2 rounded-lg text-gray font-bold place-self-center"
							>
								Load More
							</button>
						)}
					{/* If there is loot data + pagination > total number of loots + loot is NOT at zero then show the 'END' line */}
					{lootHistoryData &&
						pagination >= lootHistoryData.totalNumberOfLoots &&
						lootHistoryData.totalNumberOfLoots !== 0 && (
							<div className="w-36 place-self-center">
								<div className="flex items-center py-4">
									{/* <!-- The left line --> */}
									<div className="flex-grow w-full h-[1px] bg-secondary"></div>
									{/* <!-- Your text here --> */}
									<span className="flex-shrink text-sm text-gray-500 px-4 italic font-poppins">
										End
									</span>
									{/* <!-- The right line --> */}
									<div className="flex-grow h-[1px] w-full bg-secondary"></div>
								</div>
							</div>
						)}
					{/* If there is loot data + total loot is = 0 then show tell the user there's no loot here*/}
					{lootHistoryData && lootHistoryData.totalNumberOfLoots === 0 && (
						<div className="flex flex-col max-w-fit place-self-center">
							<img
								className="w-[150px] mb-3 place-self-center"
								src="/sadge_png.png"
								alt=""
							/>
							<span className="font-poppins">Theres no loot for you here yet.</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
