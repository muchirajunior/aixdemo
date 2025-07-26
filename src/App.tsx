import * as Icons from 'react-icons/md';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './home/index.tsx';
import ChatAgent from './chat/index.tsx';
import AgentChat from './agent/index.tsx';

export default function App() {
  return (
    <Router>
      <div className='d-flex flex-row' style={{height: '100vh'}}>
        <div className='col-3 bg-light rounded m-2 p-3' style={{maxWidth:"200px"}}>
          <span className='fw-bold fs-4' >AIX DEMO</span>
          <hr />
          <Link className='nav-link w-100 mb-3 text-muted' to='/'>  <Icons.MdHome className='fs-3 me-2' /> Home</Link>
          <Link className='nav-link w-100 mb-3 text-muted' to='/chat' >  <Icons.MdChat className='fs-4 me-2' /> Chat</Link>
          <Link className='nav-link w-100 mb-3 text-muted' to='/agent' >  <Icons.MdListAlt className='fs-4 me-2' /> Agent</Link>
        </div>
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<ChatAgent />} />
            <Route path='/agent' element={<AgentChat />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

