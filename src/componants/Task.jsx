import React, { useEffect, useReducer, useState } from 'react'
import { priorityReducer, statusReducer } from '../constants/reducer'
import AllTasks from './AllTasks'
import AddTask from './AddTask'
import Swal from 'sweetalert2'

const Task = ({ search }) => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [task, setTask] = useState(storedTasks)
  const [animateSpin, setAnimateSpin] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [showTask, dispatch] = useReducer(statusReducer, { state: "All" })
  const [showPriority, priorityDispatch] = useReducer(priorityReducer, { state: "All" })

  const filteredTasks = task.filter(task => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    if (animateSpin) {
      const timer = setTimeout(() => {
        setAnimateSpin(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animateSpin]);

  const addTasks = () => {
    setAnimateSpin(true)
    setIsModal(true)
  }

  const assignStatusToTasks = (updatedTask) => {
    const currentTime = new Date().getTime();

    const updatedTasks = task.map(task => {
      if (task.status === 'Completed') {
        return task;
      } else {
        const plannedDateTime = new Date(`${task.plannedDate}T${task.plannedTime}`);

        if (plannedDateTime.getTime() < currentTime) {
          return { ...task, status: 'Overdue' };
        } else {
          return { ...task, status: 'Upcoming' };
        }
      }
    });

    setTask(updatedTasks);
  };

  useEffect(() => {
    assignStatusToTasks();
  }, []);

  const onSave = (newTask) => {
    setTask(prevTask => {
      const updatedTask = [...prevTask, newTask];
      console.log(updatedTask);
      assignStatusToTasks(updatedTask);
      return updatedTask;
    });
  };

  const updateTask = (updatedTaskData) => {
    setTask(prevTasks => {
      console.log(updatedTaskData)
      const updatedTasks = prevTasks.map(task => {
        if (task.id === updatedTaskData.id) {
          console.log(task)
          return { ...task, ...updatedTaskData };
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const deleteTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTask(prevTasks => {
          const filteredTasks = prevTasks.filter(task => task.id !== taskId);
          return filteredTasks;
        });
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  };

  return (
    <div className='max-h-screen m-20 rounded overflow-hidden shadow-lg'>
      <div style={{ backgroundColor: '#F1B9FF' }} className='flex w-full justify-center '>
        <h1 className='w-4/5 text-center py-2 px-2'>{showTask.state}</h1>

        <select className='w-1/5  bg-purple-100 text-purple-700' onChange={(e) => priorityDispatch({ type: e.target.value })} name="select" id="select">
          <option className='p-2' value='All'>
            Choose Priority
          </option>
          <option className='p-2' value='High'>
            High
          </option>
          <option className='p-2' value='Medium'>
            Medium
          </option>
          <option className='p-2' value='Low'>
            Low
          </option>
        </select>


        <div className={`py-2 px-2 ${animateSpin ? 'animate-spin animate-once' : ''}`} onClick={addTasks}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:bg-zinc-300 rounded">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>

        <select className='w-1/5  bg-purple-100 text-purple-700' onChange={(e) => dispatch({ type: e.target.value })} name="select" id="select">
          <option className='p-2' value="ALL">
            Choose Status
          </option>
          <option className='p-2' value="Completed">
            Completed
          </option>
          <option className='p-2' value="Overdue">
            Overdue
          </option>
          <option className='p-2' value="Upcoming">
            Upcoming
          </option>
        </select>
      </div>
      {isModal && <AddTask onSave={onSave} onClose={() => setIsModal(false)} />}
      <div  className='flex justify-evenly items-start'>
        <AllTasks status={showTask.state} priority={showPriority.state} tasks={filteredTasks} onEdit={updateTask} onDelete={deleteTask} />
      </div>
    </div>
  )
}

export default Task
