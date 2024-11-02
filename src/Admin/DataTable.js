import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DataTable = ({ data, fields, title, isStudent }) => {
  const [filterInput, setFilterInput] = useState('');
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      ...fields.map(field =>
        columnHelper.accessor(field.key, { header: field.label })
      ),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <button
            onClick={() => handleEditItem(row.original)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600"
          >
            Edit
          </button>
        ),
      }),
    ],
    [fields]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFilterChange = (e) => {
    setGlobalFilter(e.target.value);
    setFilterInput(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateItem = () => {
    if (isEditing) {
      toast.success(`${title} successfully updated!`);
    } else {
      toast.success(`${title} successfully added!`);
    }
    setShowModal(false);
    resetCurrentItem();
  };

  const handleEditItem = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetCurrentItem = () => {
    setCurrentItem({});
    setIsEditing(false);
  };

  const getClassSections = (className) => {
    if (className === 'Nursery' || className === 'LKG' || className === 'UKG') {
      return ['A'];
    } else if (parseInt(className) >= 1 && parseInt(className) <= 5) {
      return ['A', 'B', 'C'];
    } else if (parseInt(className) >= 6 && parseInt(className) <= 10) {
      return ['A', 'B'];
    }
    return [];
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      <button
        onClick={() => {
          resetCurrentItem();
          setShowModal(true);
        }}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg transition duration-300 hover:bg-green-600"
      >
        Add {title}
      </button>

      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={`Search by ${fields[0].label}`}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />

      <table className="min-w-full bg-white border border-gray-300 shadow-lg">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-blue-500 text-white">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼'
                      ) : null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b hover:bg-blue-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 transition-transform transform scale-95 animate-modal">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {isEditing ? `Edit ${title}` : `Add New ${title}`}
            </h2>
            {fields.map((field) => {
              if (field.key === 'className') {
                return (
                  <select
                    key={field.key}
                    name={field.key}
                    value={currentItem[field.key] || ''}
                    onChange={(e) => {
                      handleInputChange(e);
                      // Reset section when class changes
                      setCurrentItem((prev) => ({ ...prev, classSection: '' }));
                    }}
                    required
                    className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="">Select Class</option>
                    {['Nursery', 'LKG', 'UKG', ...Array.from({ length: 10 }, (_, i) => i + 1)].map((classOption) => (
                      <option key={classOption} value={classOption}>
                        {classOption}
                      </option>
                    ))}
                  </select>
                );
              } else if (field.key === 'classSection') {
                return (
                  <select
                    key={field.key}
                    name={field.key}
                    value={currentItem[field.key] || ''}
                    onChange={handleInputChange}
                    required
                    className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="">Select Section</option>
                    {getClassSections(currentItem.className).map(section => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                );
              }
              return (
                <input
                  key={field.key}
                  type="text"
                  name={field.key}
                  placeholder={field.label}
                  value={currentItem[field.key] || ''}
                  onChange={handleInputChange}
                  required
                  className="mb-2 p-2 border border-gray-300 rounded-lg w-full"
                />
              );
            })}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddOrUpdateItem}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-600"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
