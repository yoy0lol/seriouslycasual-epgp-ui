import classNames from 'classnames';
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { BsArrowDownUp } from 'react-icons/bs';

export default function Table() {
  const getClassColor = (wowClass) => {
    switch (wowClass) {
      case 'Death Knight':
        return '#C41E3A';
      case 'Demon Hunter':
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
        return '#000000';
    }
  };

  // Columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Player',
        accessor: 'player',
        Cell: ({ row }) => <span style={{ color: getClassColor(row.original.class) }}>{row.values.player}</span>,
      },
      {
        Header: 'Effort Points (EP)',
        accessor: 'ep',
      },
      {
        Header: 'Gear Points (GP)',
        accessor: 'gp',
      },
      {
        Header: 'Loot Priority (PR)',
        accessor: 'pr',
      },
    ],
    []
  );

  // Data
  const data = React.useMemo(
    () => [
      {
        player: 'Yoyolol',
        class: 'Demon Hunter',
        ep: 1811,
        gp: 2506,
        pr: 0.722,
      },
      {
        player: 'Jahim',
        class: 'Hunter',
        ep: 900,
        gp: 473,
        pr: 0.23,
      },
      {
        player: 'Ryan',
        class: 'Rogue',
        ep: 3923,
        gp: 1723,
        pr: 0.92,
      },
      {
        player: 'Abradaxe',
        class: 'Warrior',
        ep: 3923,
        gp: 1723,
        pr: 0.92,
      },
    ],
    []
  );

  // Define Table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Table Styles
  const tableHeaderStyling = classNames([
    'bg-secondary', // background color
  ]);
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps({ style: { width: 100 } })} className={'h-16 font-lora text-secondary text-left text-lg'}>
                {column.render('Header')}
                <button
                  className='pl-2 h-10 w-10'
                  onClick={() => {
                    // Sort the table by the "player" column in ascending order when the button is clicked
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
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={'text-md border-y-[1px] border-y-secondary py-3'}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
