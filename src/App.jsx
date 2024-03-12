import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import  UserRoute from '../../front-end/src/Routes/User/UserRoute'
import AdminRoute from './Routes/Admin/AdminRoute'
import PropertyRoute from './Routes/Property/PropertyRoute'


function App() {
 

  return (
    <Router>
    <Routes>
      <Route path="/*" element={<UserRoute />}/>
      <Route path="/admin/*" element={<AdminRoute />}/>
      <Route path="/property/*" element={<PropertyRoute />}/>
     
    </Routes>
  </Router>

  )
}
export default App
