import * as Icons from 'react-icons/md';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './home/index.tsx';
import ChatAgent from './chat/index.tsx';

export default function App() {
  return (
    <Router>
      <div className='d-flex flex-row' style={{height: '100vh'}}>
        <div className='col-3 bg-light rounded m-2 p-3'>
          <Link className='btn btn-outline-primary w-100 mb-2' to='/'>  <Icons.MdHome /> Home</Link>
          <Link className='btn btn-outline-primary w-100 mb-2' to='/chat'>  <Icons.MdChat /> Chat Agent</Link>
        </div>
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<ChatAgent />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

