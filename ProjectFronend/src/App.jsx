import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import CampaignList from './pages/CampaignList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CampaignDetails from './pages/CampaignDetails';
import NavigationBar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import NewCampaignform from './pages/NewCampaignform';
import InvestmentList from './pages/InvestmentList';
import InvestmentDetails from './pages/InvestmentDetails';
import MyCampaigns from './pages/MyCampaigns';
import MyCampaignDetails from './pages/MyCampaignDetails';
import InvestmentPaymentsPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentFailPage';

function App() {

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>

        <Route path="/" element={<CampaignList />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/campaign/:id' element={<CampaignDetails />} />
        <Route path="/failure" element={<PaymentCancelPage />} />
        <Route path="/start-campaign" element={<PrivateRoute element={<NewCampaignform />} allowedRoles={["Fundraiser"]} />} />
        <Route path="/my-campaigns" element={<PrivateRoute element={<MyCampaigns />} allowedRoles={["Fundraiser"]} />} />
        <Route path="/my-campaigns/:campaignId" element={<PrivateRoute element={<MyCampaignDetails />} allowedRoles={["Fundraiser"]} />} />
        <Route path="/investor/investments" element={<PrivateRoute element={<InvestmentList />} allowedRoles={["Investor"]} />} />
        <Route path="/investment/:campaignId" element={<PrivateRoute element={<InvestmentDetails />} allowedRoles={["Investor"]} />} />
        <Route path="/investment-payments" element={<PrivateRoute element={<InvestmentPaymentsPage />} allowedRoles={["Investor"]} />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
