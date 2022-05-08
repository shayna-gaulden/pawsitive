import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import ManagerPortal from './pages/managerPortal';
import ManagerSignup from './pages/managerSignup';
import ManagerView from './pages/managerView';
import UserSignup from './pages/signup';
import ServiceForm from './pages/AddService';
import EditServiceForm from './pages/editService'
import CustomerView from './pages/cutomerView';
import EmployeeView from './pages/employeeView'
import {RecoilRoot} from 'recoil';
import {Route,Routes} from "react-router-dom";
import BookingView from './pages/setBooking';

function App() {
  return (
      <div className="App">
        <RecoilRoot>
            <Routes>

        <Route path='/login/user' exact element={<Home />} />
        <Route path='/signup/user' exact element={<UserSignup />} />
        <Route path='/login/manager' exact element={<ManagerPortal />} />
        <Route path='/signup/manager' exact element={<ManagerSignup />} />
        <Route path='/managerView' exact element={<ManagerView />} />
        <Route path='/serviceForm' exact element={<ServiceForm />} />
        <Route path='/editServiceForm/:serviceId' element={<EditServiceForm />} />
        <Route path='/customerView/:user' element={<CustomerView />} />
        <Route path='/employeeView/:user' element={<EmployeeView />} />
        <Route path='/customerView/:user/:employee/:empId/:department/:time/:subId' element={<BookingView />} />



        </Routes>
        </RecoilRoot>

      </div>
  );
}

export default App;
