import React from 'react';
import './FleetDashboard.css';

interface FleetDashboardProps {
  vehicles: any[];
  drivers: any[];
  onSelectVehicle: (vehicleId: string) => void;
  onSelectDriver: (driverId: string) => void;
}

export const FleetDashboard: React.FC<FleetDashboardProps> = ({ 
  vehicles, 
  drivers,
  onSelectVehicle,
  onSelectDriver 
}) => {
  return (
    <div className="fleet-dashboard">
      <header className="dashboard-header">
        <h1>Fleet Management Dashboard</h1>
        <div className="status-indicator active">System Online ✓</div>
      </header>

      <main className="dashboard-main">
        <section className="vehicle-section">
          <h2>Active Vehicles ({vehicles.length})</h2>
          {vehicles.map((vehicle) => (
            <button 
              key={vehicle.id}
              className={`vehicle-card ${vehicle.status}`}
              onClick={() => onSelectVehicle(vehicle.id)}
            >
              <div className="card-header">
                <span className="vehicle-name">{vehicle.name}</span>
                <span className={`status-badge ${vehicle.status}`}>{vehicle.status}</span>
              </div>
              <div className="card-details">
                <p><strong>Plate:</strong> {vehicle.plate}</p>
                <p><strong>Location:</strong> {vehicle.location.lat.toFixed(2)}, {vehicle.location.lng.toFixed(2)}</p>
                <p><strong>Fuel:</strong> {vehicle.fuelLevel}%</p>
              </div>
            </button>
          ))}
        </section>

        <section className="driver-section">
          <h2>Active Drivers ({drivers.length})</h2>
          {drivers.map((driver) => (
            <button 
              key={driver.id}
              className={`driver-card ${driver.status}`}
              onClick={() => onSelectDriver(driver.id)}
            >
              <div className="card-header">
                <span className="driver-name">{driver.name}</span>
                <span className={`status-badge ${driver.status}`}>{driver.status}</span>
              </div>
              <div className="card-details">
                <p><strong>License:</strong> {driver.licenseNumber}</p>
                <p><strong>Experience:</strong> {driver.experienceYears} years</p>
                <p><strong>Rating:</strong> ⭐ {driver.rating}/5.0</p>
              </div>
            </button>
          ))}
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>Fleet Management System v1.0.0 • Powered by AI Skills 🤖</p>
      </footer>
    </div>
  );
};

export default FleetDashboard;