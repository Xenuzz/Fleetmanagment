import React from 'react';
import { FleetDashboard } from './components/FleetDashboard';
import { getVehicles, getDrivers } from './mocks/api-vehicles';
import type { Driver } from './mocks/api-drivers';
import { getDrivers as getAllDrivers } from './mocks/api-drivers';

const vehicles = getVehicles().data;
const drivers = getAllDrivers().data;

export function App() {
  const handleVehicleClick = (vehicleId: string) => {
    console.log('🚗 Vehicle selected:', vehicleId);
  };

  const handleDriverClick = (driverId: string) => {
    console.log('👤 Driver selected:', driverId);
  };

  return (
    <div id="app-root" style={{ minHeight: '100vh', backgroundColor: '#1a1a2e' }}>
      <FleetDashboard 
        vehicles={vehicles} 
        drivers={drivers}
        onSelectVehicle={handleVehicleClick}
        onSelectDriver={handleDriverClick}
      />
    </div>
  );
}

export default App;