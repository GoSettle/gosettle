import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AuthModal from './components/AuthModal'
import LandingPage from './pages/LandingPage'
import SearchPage from './pages/SearchPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import PgDashboard from './pages/owner/PgDashboard'
import RestaurantDashboard from './pages/owner/RestaurantDashboard'
import AddPropertyPage from './pages/owner/AddPropertyPage'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthModal />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/dashboard/pg" element={<PgDashboard />} />
          <Route path="/dashboard/restaurant" element={<RestaurantDashboard />} />
          <Route path="/dashboard/add-property" element={<AddPropertyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
