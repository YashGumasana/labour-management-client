import './App.css';
import Register from './pages/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Alert from './components/alert/Alert';
// import Loading from './components/alert/Loading';
// import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { refreshToken } from './redux/actions/authAction';
import UploadDoc from './pages/labour/UploadDoc';
import OfficerHome from './pages/officer/Home';
import OfficerNavbar from './pages/OfficerNavbar';
import { GLOBALTYPES } from './redux/actions/globalTypes';
// import { getLabourList } from './redux/actions/Officer/labourDetailAction';
// import PrivateRouter from './customRouter/PrivateRouter';
import PageRender from './customRouter/PageRender';
import { refreshToken } from './redux/actions/authAction';
import PrivateRouter from './customRouter/PrivateRouter';
import Check from './pages/officer/check/[id]';
import Loading from './components/alert/Loading';
import StatusCheck from './pages/labour/StatusCheck';
import LabourNavbar from './pages/LabourNavbar';
import ContractorNavbar from './pages/ContractorNavbar';
import ContractorHome from './pages/contractor/ContractorHome';
import NotFound from './components/NotFound';
import LabourHome from './pages/labour/LabourHome';



function App() {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

  }, [dispatch])

  console.log(auth?.labDocStatusRes);
  console.log(auth?.labDocStatusRes?.docStatus[0]);
  console.log('auth detail', auth?.token, auth?.user?.category);
  return (
    <>
      <Router>
        <Alert />
        {auth?.token && auth?.user?.category === 0 && auth?.labDocStatusRes?.docStatus[0]?.docStatus?.every((value) => value === 1) && <LabourNavbar />}
        {auth?.token && auth?.user?.category === 1 && <ContractorNavbar />}
        {auth?.token && auth?.user?.category === 2 && <OfficerNavbar />}

        <Routes>
          <Route exact path='/' element={auth?.token
            ? (
              auth?.user?.category === 0
                ? auth?.labDocStatusRes?.docStatus[0]?.documents.length !== 4
                  ? <UploadDoc />
                  : auth?.labDocStatusRes?.docStatus[0]?.docStatus?.every((value) => value === 1)
                    ? <LabourHome />
                    : <StatusCheck />
                : auth?.user?.category === 2
                  ? <OfficerHome />
                  : auth?.user?.category === 1
                    ? <ContractorHome />
                    : <NotFound />)
            : <Login />} >
          </Route>
          <Route exact path='/register' element={<Register />} ></Route>
          <Route exact path='/:page' element={<PrivateRouter />}>
            <Route exact path='/:page' element={<PageRender />} />
          </Route>
          <Route exact path='/:page/:id' element={<PrivateRouter />}>
            <Route exact path='/:page/:id' element={<PageRender />} />
          </Route>
        </Routes>
      </Router >
    </>
  );
}

export default App;

