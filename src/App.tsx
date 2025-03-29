import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login, UsersList} from "@/pages";
import { ProtectedRoute } from './components/protected-route';

function App() {

  return (
   <Router>
      <Routes>
        <Route path='/' element={<Navigate to="login" replace/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/users-list' element={<UsersList />}></Route>
        </Route>   
      </Routes>
   </Router>
  )
}

export default App
