/**
 * Fleet Vehicles Mock API
 * Simulates vehicle fleet management endpoints
 */

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: {
    lat: number;
    lng: number;
  };
  driverId?: string;
  fuelLevel: number;
}

export interface VehicleResponse {
  success: boolean;
  data: Vehicle[];
  message: string;
}

/**
 * Get all active vehicles
 */
export const getVehicles = (): VehicleResponse => {
  return {
    success: true,
    data: [
      {
        id: 'VEH-001',
        name: 'Delivery Van Alpha',
        plate: 'FLEET-001',
        status: 'active',
        location: { lat: 52.5200, lng: 13.4050 }, // Berlin
        fuelLevel: 85,
        driverId: 'DRV-001'
      },
      {
        id: 'VEH-002',
        name: 'Service Truck Beta',
        plate: 'FLEET-002',
        status: 'active',
        location: { lat: 51.1657, lng: 10.4515 }, // Hamburg
        fuelLevel: 92
      },
      {
        id: 'VEH-003',
        name: 'Cargo Transport Gamma',
        plate: 'FLEET-003',
        status: 'maintenance',
        location: { lat: 48.1351, lng: 11.5820 }, // Munich
        fuelLevel: 45
      }
    ],
    message: 'Active vehicles retrieved successfully'
  };
};

/**
 * Get vehicle by ID
 */
export const getVehicleById = (id: string): VehicleResponse | null => {
  const mockVehicles = [
    { id: 'VEH-001', name: 'Delivery Van Alpha', plate: 'FLEET-001', status: 'active' },
    { id: 'VEH-002', name: 'Service Truck Beta', plate: 'FLEET-002', status: 'maintenance' },
    { id: 'VEH-003', name: 'Cargo Transport Gamma', plate: 'FLEET-003', status: 'inactive' }
  ];

  const vehicle = mockVehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return {
      success: false,
      data: [],
      message: `Vehicle ${id} not found`
    };
  }

  return {
    success: true,
    data: [vehicle],
    message: 'Vehicle details retrieved'
  };
};