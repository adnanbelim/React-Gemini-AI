import { useState } from 'react'
import assets from './assets/assets.js';
import Sidebar from './component/sidebar/Sidebar.jsx';
import Main from './component/main/Main.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen flex'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
