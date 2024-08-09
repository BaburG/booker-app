export interface Booking {
    id: number; // Adjust the type based on your unique identifier
    name: string;
    description: string;
    start: string;
    end: string;
    username: string; // Use string if it's a date-time string
  }