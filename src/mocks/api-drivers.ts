/**
 * Fleet Drivers Mock API
 * Simulates driver management endpoints
 */

export interface Driver {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'on-duty' | 'off-duty';
  licenseNumber: string;
  experienceYears: number;
  rating: number;
}

export interface DriverResponse {
  success: boolean;
  data: Driver[];
  message: string;
}

/**
 * Get all active drivers
 */
export const getDrivers = (): DriverResponse => {
  return {
    success: true,
    data: [
      {
        id: 'DRV-001',
        name: 'John Anderson',
        email: 'john.anderson@fleetman.com',
        status: 'on-duty',
        licenseNumber: 'BE-AN-2018-001',
        experienceYears: 8,
        rating: 4.8
      },
      {
        id: 'DRV-002',
        name: 'Maria Schmidt',
        email: 'maria.schmidt@fleetman.com',
        status: 'active',
        licenseNumber: 'DE-MS-2019-042',
        experienceYears: 5,
        rating: 4.6
      },
      {
        id: 'DRV-003',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@fleetman.com',
        status: 'on-duty',
        licenseNumber: 'AT-AH-2020-118',
        experienceYears: 6,
        rating: 4.9
      },
      {
        id: 'DRV-004',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@fleetman.com',
        status: 'off-duty',
        licenseNumber: 'GB-SW-2017-089',
        experienceYears: 10,
        rating: 4.7
      }
    ],
    message: 'Active drivers retrieved successfully'
  };
};

/**
 * Assign vehicle to driver
 */
export const assignVehicleToDriver = (driverId: string, vehicleId: string): { success: boolean; message: string } => {
  // Mock assignment logic
  return {
    success: true,
    message: `Vehicle ${vehicleId} assigned to driver ${driverId}`
  };
};

/**
 * Get driver by ID
 */
export const getDriverById = (id: string): DriverResponse | null => {
  const mockDrivers = [
    { id: 'DRV-001', name: 'John Anderson', status: 'on-duty' },
    { id: 'DRV-002', name: 'Maria Schmidt', status: 'active' },
    { id: 'DRV-003', name: 'Ahmed Hassan', status: 'on-duty' }
  ];

  const driver = mockDrivers.find(d => d.id === id);
  
  if (!driver) {
    return null;
  }

  return {
    success: true,
    data: [driver],
    message: 'Driver details retrieved'
  };
};