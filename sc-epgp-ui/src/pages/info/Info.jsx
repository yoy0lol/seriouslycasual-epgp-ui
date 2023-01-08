import { Link } from 'react-router-dom';

export default function Info() {
  return (
    <div className='font-poppins flex-grow flex flex-col space-y-3'>
      <h1 className='font-poppins font-black text-4xl pb-3'>How We Handle Loot at SeriouslyCasual</h1>
      <p>We use EPGP to handle our main raid loot.</p>
      <p>
        Optional raids be dependant on what type of raid it is - If it's an extra raid for progression, we'll continue to use EPGP otherwise it'll be
        Need/Greed. No EP will be awarded for these raids but GP will be used for the loot dropped.
      </p>
      <h2 className='font-poppins text-secondary font-black text-3xl pt-3'>What is EPGP?</h2>
      <p>
        Most of you probably know already, but EPGP is <span className='text-secondary'>Effort Points/Gear Points</span> . EP are the points you earn for doing
        good things (signing, raiding, benching, etc). GP track how much gear you've received. The person with the highest PR (priority ratio = EP/GP) gets
        first pick to buy a piece of loot for GP.
      </p>
      <h2 className='font-poppins text-secondary font-black text-3xl pt-3'>Why EPGP?</h2>
      <p>With the change to group loot in DF, we have to change our loot system to solve the problems that PL used to solve for us. We picked EPGP because:</p>
      <div className='flex flex-row items-center'>
        <p className='flex w-6 h-6 items-center justify-center mr-5 leading-none bg-secondary rounded-lg text-gray font-bold'>1</p>
        <p>It is a transparent and hopefully fair method of loot distribution.</p>
      </div>
      <div className='flex flex-row items-center'>
        <p className='flex w-6 h-6 items-center justify-center mr-5 leading-none bg-secondary rounded-lg text-gray font-bold'>2</p>
        <p> It's a way to remind raiders to do those things we should be doing anyway such as signing for raids.</p>
      </div>
      <h2 className='font-poppins text-secondary font-black text-3xl pt-3'>How Will it Work?</h2>
      <p>Our planned scoring system is as follows. The maximum EP is 1030 per week, and we expect everyone to reach this on most (if not all) weeks.</p>
      {/* Sign ups */}
      <div className='grid grid-flow-row grid-cols-6 gap-y-6 gap-x-10'>
        <div className='self-center flex-col text-center'>
          <h3 className='text-xl font-semibold text-secondary col-span-1'>Sign Ups</h3>
          <p className='text-sm'>Up to 600 EP per week</p>
        </div>
        <div className='col-span-5 my-5 flex flex-col'>
          <table class='table-fixed text-left my-5'>
            <thead>
              <tr className='text-secondary'>
                <th className='pb-2'>Effort</th>
                <th className='pb-2 w-44'>EP Awarded</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-b-2 border-secondary py-2'>{`Sign up >24 hours before raid`}</td>
                <td className='border-b-2 border-secondary py-2'>200</td>
              </tr>
              <tr>
                <td className='border-b-2 border-secondary py-2'>Signed "Present" and on time for raid start</td>
                <td className='border-b-2 border-secondary py-2'>100</td>
              </tr>
              <tr>
                <td className='border-b-2 border-secondary py-2'>Signed "Decline"</td>
                <td className='border-b-2 border-secondary py-2'>10</td>
              </tr>
              <tr>
                <td className='border-b-2 border-secondary py-2'>Signed "Tentative" or "Late"</td>
                <td className='border-b-2 border-secondary py-2'>0</td>
              </tr>
            </tbody>
          </table>
          <p className='col-start-2 col-span-full italic text-sm'>
            {`If you sign "Present" and are late, you will lose 50 (<15 mins late) or all (>15 mins late) of the sign up points. If you're not present for the whole raid, you will also lose the sign up points. Use tentative if you might have to go.`}
          </p>
        </div>

        {/* Raid Attendance */}
        <div className='self-center flex-col text-center'>
          <h3 className='text-xl font-semibold text-secondary col-span-1'>Raid Attendance</h3>
          <p className='text-sm'>Up to 180 EP per week</p>
        </div>
        <div className='col-span-5 my-5 flex flex-col'>
          <table class='table-fixed text-left my-5'>
            <thead>
              <tr className='text-secondary'>
                <th className='pb-2'>Effort</th>
                <th className='pb-2 w-44'>EP Awarded</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-b-2 border-secondary py-2'>Raiding with the group</td>
                <td className='border-b-2 border-secondary py-2'>90 per full raid</td>
              </tr>
              <tr>
                <td className='border-b-2 border-secondary py-2'>Available on bench</td>
                <td className='border-b-2 border-secondary py-2'>90 per full raid</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Raid Attendance */}
        <div className='self-center flex-col text-center'>
          <h3 className='text-xl font-semibold text-secondary col-span-1'>Raid Consumables</h3>
          <p className='text-sm'>Up to 50 EP per week</p>
        </div>
        <div className='col-span-5 my-5 flex flex-col'>
          <table class='table-fixed text-left my-5'>
            <thead>
              <tr className='text-secondary'>
                <th className='pb-2'>Effort</th>
                <th className='pb-2 w-44'>EP Awarded</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-b-2 border-secondary py-2'>Full consumables as per raid instructions</td>
                <td className='border-b-2 border-secondary py-2'>25 per full raid</td>
              </tr>
            </tbody>
          </table>
          <p className='col-start-2 col-span-full italic text-sm'>Benched players also get this</p>
        </div>

        {/* Weekly Activities */}
        <div className='self-center flex-col text-center'>
          <h3 className='text-xl font-semibold text-secondary col-span-1'>Weekly Activities</h3>
          <p className='text-sm'>Up to 200 EP per week</p>
        </div>
        <div className='col-span-5 my-5 flex flex-col'>
          <table class='table-fixed text-left my-5'>
            <thead>
              <tr className='text-secondary'>
                <th className='pb-2'>Effort</th>
                <th className='pb-2 w-44'>EP Awarded</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-b-2 border-secondary py-2'>1 appropriate level M+ key</td>
                <td className='border-b-2 border-secondary py-2'>100</td>
              </tr>
              <tr>
                <td className='border-b-2 border-secondary py-2'>Up to date on gear progression</td>
                <td className='border-b-2 border-secondary py-2'>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2 className='font-poppins text-secondary font-black text-3xl pt-3'>I'm a Dual Wielder, What Are We Doing For Weapons?</h2>
      <p>
        Dual wield weapons originally had 2 costs depending on whether they were equippable as MH or OH, to ensure that everyone had the same total weapons
        cost. Now that 1 handers melee weapons can be equipped in either slot, they will cost an average of MH + OH GP. For example, if a dual wield weapon
        shows up as 1500 GP as MH / 500 GP as OH, then it will cost 1000 GP.
      </p>
      <p>
        Fury warriors historically paid more for their dual wield 2 handers (e.g. 2000 GP for the MH and 500 GP for the OH). They will also pay an average price
        (e.g. 1250 GP for both MH and OH), meaning they still pay slightly more in total like before.
      </p>

      <h2 className='font-poppins text-secondary font-black text-3xl pt-3'>BoEs</h2>
      <p>
        BoEs will go to the Guild Bank by default - these will be sold to fund guild consumables. Raiders will be able to buy guild BoEs at a 50% discount, and
        Veteran Raiders get a 60% discount. If multiple raiders want an item then they will /roll. BoEs will not cost GP.
      </p>
      <p>
        During the initial period where BoEs are BoP, we need to see how they drop. If they drop via group loot then we will handle them just like any other
        boss drop (i.e. EPGP), if they drop via personal loot then they will not cost GP to the looter (but will if traded away and distributed via EPGP).
      </p>

      <h2 className='font-poppins text-secondary font-black text-3xl pt-3'>Mounts</h2>
      <p>
        We are assuming that mounts will drop as personal loot, so the plan is that if a mount drops for you in raid then you can keep it if you want (no GP).
      </p>
      <p>If you do not want it then it will be rolled out with Veterans having priority: with the following priority: </p>
      <div className='flex flex-row space-x-3 w-max-full place-items-center justify-center text-center bg-navBarBg/50 p-5 rounded-lg'>
        <p className='w-[30%]'>Veteran Raider (Casual Senior rank)</p>
        <span className='text-secondary font-bold text-center'>{`>`}</span>
        <p className='w-[30%]'>Raider who has been on the active roster since the start of that tier</p>
        <span className='text-secondary font-bold'>{`>`}</span>
        <p className='w-[30%]'>Raider joined during tier</p>
      </div>
      <p>When making rosters for mount farms, we will also prioritise bringing Veterans.</p>
      <p>
        EPGP will be uploaded to EPGP Web after every raid.{' '}
        <Link className='text-secondary' to={'/'}>
          See it here.
        </Link>
      </p>
    </div>
  );
}
