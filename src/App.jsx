import { useState } from 'react'
import './App.css'
import TaskWrapper from './componants/TaskWrapper'

function App() {

  return (
    <div style={{ backgroundColor: '#b9eaff' }} className=' h-screen w-full flex justify-center'>
      <TaskWrapper/>
    </div>
  )
}

export default App
