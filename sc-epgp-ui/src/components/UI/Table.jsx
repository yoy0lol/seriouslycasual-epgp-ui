import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { BsArrowDownUp, BsArrowRightShort } from 'react-icons/bs';
import { getClassColor } from '../../utils/getClassColor';
import classNames from 'classnames';

export default function Table() {
  // States
  const [scApiData, setScApiData] = useState({});
  const [lastUploadedDate, setLastUploadedDate] = useState('');

  // Data Fetches
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://epgp-api.ryanwong.uk/api/Points/raider/all');
      setScApiData(response.data);
    }
    fetchData();
  }, []);

  // UseEffects
  // --UseEffect to set the date in a readable format.
  useEffect(() => {
    if (scApiData && Object.keys(scApiData).length > 0) {
      console.log(scApiData);
      // Format the date
      const unformattedDate = scApiData.lastUploadedDate;

      const date = new Date(unformattedDate);

      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      //Set the formatted date in the state
      setLastUploadedDate(formattedDate);
    }
  }, [scApiData]);

  // Columns

  // Function to style/format the point differences
  const renderPointDiff = (points, diff, isGpDiff) => {
    // Styles for the span with the differences:
    const diffStyles = classNames([
      'text-[10px] font-semibold w-10 py-[2px] rounded-sm px-1 text-center', // Default styles
      { 'bg-green/60': isGpDiff ? diff > 0 : diff < 0 }, // if positive, go green
      { 'bg-red/60': isGpDiff ? diff < 0 : diff > 0 }, // if positive, go green
      { 'bg-secondary/60': diff === 0 }, //if positive, keep yellow
    ]);
    return (
      <div className='flex justify-end items-center space-x-1'>
        {/* Points here */}
        <span className='pr-2'>{points}</span>
        {/* Diff Span here */}
        <span className={diffStyles}>{diff > 0 ? '+' + diff : diff}</span>
      </div>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Player',
        accessor: 'player',
        Cell: ({ row }) => <span style={{ color: getClassColor(row.original.class) }}>{row.values.player}</span>,
        headerClassName: 'text-left',
      },
      {
        Header: 'EP',
        accessor: 'ep',
        headerClassName: 'text-right',
        cellClassName: 'text-right',
        Cell: ({ row }) => {
          return renderPointDiff(row.original.ep, row.original.epDiff, true);
        },
      },
      {
        Header: 'GP',
        accessor: 'gp',
        headerClassName: 'text-right',
        cellClassName: 'text-right',
        Cell: ({ row }) => {
          return renderPointDiff(row.original.gp, row.original.gpDiff, false);
        },
      },
      {
        Header: 'PR',
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
          epDiff: el.points.effortPointsDifference,
          gp: el.points.gearPoints,
          gpDiff: el.points.gearPointsDifference,
          pr: el.points.priority.toFixed(4),
        };
      });
    }
    return [];
  }, [scApiData]);

  // Defined Table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div className='flex flex-col flex-grow space-y-2'>
      <div>
        <div className='flex flex-col w-full'>
          <h2 className='font-poppins font-black text-4xl '>Points Table</h2>
          {scApiData && lastUploadedDate ? (
            <div className='flex-grow block text-left text-[12px] font-poppins font-semibold'>
              <span className=''>Last updated on </span>
              <span className='text-secondary'>{lastUploadedDate}</span>
            </div>
          ) : null}
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps({ style: { width: 100 } })} className={column.headerClassName + ` h-10 font-poppins text-secondary text-md`}>
                  {column.render('Header')}
                  <button
                    className='pl-3'
                    onClick={() => {
                      column.toggleSortBy(!column.isSortedDesc); //Sort by descending if already ascending, and vice versa
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
                    <td {...cell.getCellProps()} className={`${cell.column.cellClassName} font-poppins text-md border-y-[1px] border-y-secondary/50 py-0.5`}>
                      {cell.column.id === 'player' ? (
                        <Link to={`/characters/${row.original.region}/${row.original.realm}/${row.original.player}`}>{cell.render('Cell')}</Link>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
