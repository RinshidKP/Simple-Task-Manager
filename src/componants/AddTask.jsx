import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddTask = ({onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    plannedDate: '',
    plannedTime: '',
    status: '',
    priority: 'High',
  });

  const [error, setError] = useState({
    title: false,
    description: false,
    plannedDate: false,
    plannedTime: false,
  });

  const validateField = (fieldName, fieldValue) => {
    switch (fieldName) {
      case 'title':
      case 'description':
        return fieldValue.trim() !== '';
      case 'plannedDate':
        return /^\d{4}-\d{2}-\d{2}$/.test(fieldValue);
      case 'plannedTime':
        return /^\d{2}:\d{2}$/.test(fieldValue); 
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/(\w)\1{7,}/.test(value)) {
      e.preventDefault();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please avoid typing long sequences of the same character.',
      });
    }
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });

    setError({
      ...error,
      [name]: !validateField(name, value),
    });

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title || !formData.description || !formData.plannedDate || !formData.plannedTime) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all required fields!',
      });
      return;
    }
    const currentTime = new Date().getTime();
    const plannedDateTime = new Date(`${formData.plannedDate}T${formData.plannedTime}`);
        
    const setStatus = () => {
      if (plannedDateTime.getTime() < currentTime) {
        return 'Overdue' ;
      } else {
        return 'Upcoming' ;
      }
    }
    const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
    const updatedFormData = { ...formData, id: randomId,status: setStatus() };
    onSave(updatedFormData)
    setFormData({
      id: '',
      title: '',
      description: '',
      plannedDate: '',
      plannedTime: '',
      status: '',
      priority: 'High',
    });
    console.log(updatedFormData)
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <form className="w-full max-w-lg bg-white p-8 rounded-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Title
              </label>
              <input name='title' required onChange={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${error.title?'border-red-500':''} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-first-name" type="text" placeholder="Jane" />
              {error.title&&<p className="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="priority">
                Priority
              </label>
              <div className="relative">
                <select name='priority'  onChange={handleChange} defaultValue="High" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="priority">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className={`block uppercase tracking-wide text-gray-700  text-xs font-bold mb-2`} htmlFor="description">
                Description
              </label>
              <textarea name='description' onChange={handleChange} className={`appearance-none ${error.description?'border-red-500':''} block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="description" placeholder="Enter description..."></textarea>
              {error.description&&<p className="text-red-600 text-xs italic">Provide a detailed description of the task.</p>}
            </div>

          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="time">
                Time
              </label>
              <input name='plannedTime' onSelect={handleChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${error.plannedDate?'border-red-500':''} border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="time" type="time" />
              {error.plannedTime&&<p className="text-red-600 text-xs italic">Please select a valid time.</p>}
            </div>

            <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
              <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
                Date
              </label>
              <div className="relative">
                <input name='plannedDate' onSelect={handleChange} className={`block appearance-none w-full bg-gray-200 border border-gray-200 ${error.plannedDate?'border-red-500':''} text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} type="date" id="date" />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
              {error.plannedDate&&<p className="text-red-600 text-xs italic">Please select a valid date.</p>}
            </div>

          </div>

          <div className="flex justify-around mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTask;
