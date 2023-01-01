import { Helmet } from 'react-helmet';

export default function PlayerPage() {
  return (
    <div>
      <Helmet>
        <script>{`const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};`}</script>
        <script src='https://wow.zamimg.com/js/tooltips.js'></script>
      </Helmet>
      <div className='text-5xl'>
        <p>hi</p>
      </div>
      <a href='https://www.wowhead.com/item=25697' className='q3' data-wowhead='gems=23121&amp;ench=2647&amp;pcs=25695:25696:25697'>
        [Felstalker Bracers]
      </a>
    </div>
  );
}
