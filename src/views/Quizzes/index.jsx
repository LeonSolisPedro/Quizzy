import { Link } from "react-router-dom";
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useState } from "react";


// Sample data
const initialData = [
  { id: 1, name: 'John Doe', age: 28 },
  { id: 2, name: 'Jane Smith', age: 34 },
  { id: 3, name: 'Sam Johnson', age: 22 },
];


export default function Index() {
  const [data, setData] = useState(initialData); // Table data state

  // Define columns
  const columns = [
    {
      accessorKey: 'name', // Access the "name" key in the data
      header: 'Name',
    },
    {
      accessorKey: 'age', // Access the "age" key in the data
      header: 'Age',
    },
    {
      header: "Uwu", // The custom "Uwu" column
      cell: ({ row }) => (
        <button onClick={() => handleDelete(row)}>Delete</button>
      ),
    },
  ];

  const handleDelete = (rowId) => {
    debugger
    console.log(rowId)
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <p>This is the index of Quizzes</p>
      <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      <Link to={`1`}>Go to quizz 1</Link>
    </div>
  )
}