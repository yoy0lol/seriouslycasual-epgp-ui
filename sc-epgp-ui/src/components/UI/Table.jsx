import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { BsArrowDownUp } from 'react-icons/bs';
import axios from 'axios';

export default function Table() {
  // States
  const [scApiData, setScApiData] = useState([]);

  // Data Fetches
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://epgp-api.ryanwong.uk/api/Points/raider/all');
      setScApiData(response.data);
      console.log(response.data.raiders);
    }
    fetchData();
  }, []);

  const getClassColor = (wowClass) => {
    switch (wowClass) {
      case 'DeathKnight':
        return '#C41E3A';
      case 'DemonHunter':
        return '#A330C9';
      case 'Druid':
        return '#FF7C0A';
      case 'Evoker':
        return '#33937F';
      case 'Hunter':
        return '#AAD372';
      case 'Mage':
        return '#3FC7EB';
      case 'Monk':
        return '#00FF98';
      case 'Paladin':
        return '#F48CBA';
      case 'Priest':
        return '#FFFFFF';
      case 'Rogue':
        return '#FFF468';
      case 'Shaman':
        return '#0070DD';
      case 'Warlock':
        return '#8788EE';
      case 'Warrior':
        return '#C69B6D';
      default:
        return '#FFFFFF';
    }
  };

  // Columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Player',
        accessor: 'player',
        Cell: ({ row }) => <span style={{ color: getClassColor(row.original.class) }}>{row.values.player}</span>,
        headerClassName: 'text-left',
      },
      {
        Header: 'Effort Points (EP)',
        accessor: 'ep',
        headerClassName: 'text-right',
        cellClassName: 'text-right',
      },
      {
        Header: 'Gear Points (GP)',
        accessor: 'gp',
        headerClassName: 'text-right',
        cellClassName: 'text-right',
      },
      {
        Header: 'Loot Priority (PR)',
        accessor: 'pr',
        headerClassName: 'text-right',
        cellClassName: 'text-right',
      },
    ],
    []
  );

  // Rows
  const data = React.useMemo(() => {
    if (scApiData.raiders && scApiData.raiders.length > 0) {
      return scApiData.raiders.map((el) => {
        return {
          region: el.region,
          realm: el.realm,
          player: el.characterName,
          class: el.class,
          ep: el.points.effortPoints,
          gp: el.points.gearPoints,
          pr: el.points.priority.toFixed(4),
        };
      });
    }
    return [];
  }, [scApiData]);

  // Define Table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps({ style: { width: 100 } })} className={column.headerClassName + ` h-16 font-poppins text-secondary text-lg`}>
                  {column.render('Header')}
                  <button
                    className='pl-3'
                    onClick={() => {
                      column.toggleSortBy();
                    }}
                  >
                    <BsArrowDownUp />
                  </button>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className='hover:bg-secondary/10 transition ease-in-out delay-25' {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className={`${cell.column.cellClassName} font-poppins text-md border-y-[2px] border-y-secondary py-3`}>
                      {cell.column.id === 'player' ? (
                        <Link to={`/characters/${row.original.region}/${row.original.realm}/${row.original.player}`}>{cell.render('Cell')}</Link>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>

                    // <Route path='/characters/:region/:realm/:playerName' element={<PlayerPage />}></Route>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
