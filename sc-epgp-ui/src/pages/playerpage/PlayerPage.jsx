import { useParams } from 'react-router-dom';

export default function PlayerPage() {
  const { playerName } = useParams();
  console.log(playerName);

  return (
    <div>
      <p>hi</p>
      <p>hi</p>
    </div>
  );
}
