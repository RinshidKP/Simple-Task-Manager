import React, { useState } from 'react'
import EditTask from './EditTask';
import { SquareCheckBig, SquareX } from 'lucide-react';
import Swal from 'sweetalert2';
const AllTasks = ({ status, priority, tasks, onEdit, onDelete }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const [isEdit, setIsEdit] = useState(false)
  const filteredTasks = tasks.filter(task => {
    const statusMatch = status === 'All' || task.status === status;
    const priorityMatch = priority === 'All' || task.priority === priority;
    return statusMatch && priorityMatch;
  }).slice(indexOfFirstTask, indexOfLastTask);

  const handleComplete = (task) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to mark this task as completed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark it as completed!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTask = { ...task, status: 'Completed' };
        onEdit(updatedTask);
        Swal.fire(
          'Completed!',
          'The task has been marked as completed.',
          'success'
        );
      }
    });
  };

  const handleEditClick = (task) => {
    setIsEdit(task)
  }

  const onEditClose = () => {
    setIsEdit(false)
  }
  const onEditSave = (task) => {
    onEdit(task)
    setIsEdit(false)
  }
  return (
    <div className='w-full overflow-x-auto font-mono shadow-xl'>
      {isEdit && <EditTask task={isEdit} onClose={onEditClose} onSave={onEditSave} />}
      {filteredTasks ? (
        <table className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <thead className="bg-white">
            <tr>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-6 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>TITLE</th>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-6 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>PRIORITY</th>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-6 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>DESCRIPTION</th>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-6 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>TIME</th>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-8 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>DATE</th>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-6 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>STATUS</th>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-6 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>EDIT</th>
              <th scope={'col'} className='bg-white border-b dark:bg-gray-800 px-6 py-3 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index} className={'bg-white'}>
                <td className='bg-white border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm text-clip-end'>{task.title}</td>
                <td className='bg-white border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{task.priority}</td>
                <td className='bg-white border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm text-clip-end'>{task.description}</td>
                <td className='bg-white border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{task.plannedTime}</td>
                <td className='bg-white border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>{task.plannedDate}</td>
                <td className={`px-4 py-2 border flex justify-between w-full items-center ${task.status === 'Completed' ? ' text-green-700' : task.status === 'Upcoming' ? ' text-yellow-700' : ' text-orange-600'}`}>
                  <div className='font-mono' >{task.status}</div>
                  {task.status === 'Completed' ? (
                    <SquareCheckBig className={'text-center'} />
                  ) : task.status === 'Upcoming' ? (
                    <SquareX onClick={() => handleComplete(task)} className={'hover:bg-zinc-200 rounded text-center'} />
                  ) : (
                    <SquareX onClick={() => handleComplete(task)} className={'hover:bg-zinc-200 rounded text-center'} />
                  )}
                </td>

                <td onClick={() => handleEditClick(task)} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-50 dark:hover:bg-gray-600 relative '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:bg-zinc-200 rounded mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </td>
                <td onClick={() => onDelete(task.id)} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 relative '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:bg-zinc-200 rounded mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>



      ) : (
        <div>No Tasks</div>
      )}

      <div className="pagination bg-transparent">
        {filteredTasks.length > 0 && (
          <nav className="flex justify-center">
            <ul className="pagination-list flex space-x-2">
              {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`pagination-link px-3 py-1 border border-gray-300 rounded-md focus:outline-none ${currentPage === index + 1 ? 'pagination-current bg-gray-500 text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

    </div>
  );
};



export default AllTasks
