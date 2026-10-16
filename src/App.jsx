import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { WarehouseList } from './pages/WarehouseList';
import { WarehouseDetails } from './pages/WarehouseDetails';
import { GroupMarketplace } from './pages/GroupMarketplace';
import { Calculator } from './pages/Calculator';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Help } from './pages/Help';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#fafaf7] text-slate-800 antialiased selection:bg-krishi-500 selection:text-white">
          {/* Top Demo Session Control Banner */}
          <DemoBanner />

          {/* Sticky Header with 22 Indian Language Selector */}
          <Navbar />

          {/* Main Routing Container */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/warehouses" element={<WarehouseList />} />
              <Route path="/warehouses/:id" element={<WarehouseDetails />} />
              <Route path="/marketplace" element={<GroupMarketplace />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Comprehensive Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
