# Office Space Management Tool Specification

## Domain Model

```typescript
interface Building {
  id: string;
  name: string;
  address: string;
  floors: Floor[];
}

interface Floor {
  id: string;
  name: string;
  building: Building;
  employeeSeats: EmployeeSeat[];
  conferenceRooms: ConferenceRoom[];
}

interface EmployeeSeat {
  id: string;
  code: string;  // e.g., "F2-123" (Floor 2, Desk 123)
  status: SeatStatus;
  attributes: SeatAttribute[];
  occupiedBy?: EmployeeOccupancy;
}

interface EmployeeOccupancy {
  employee: Employee;
  since: Date;
  until?: Date;  // undefined means still employed and using the seat
}

enum SeatStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE"
}

interface ConferenceRoom {
  id: string;
  name: string;
  code: string;  // e.g., "F2-CONF1"
  capacity: number;
  attributes: RoomAttribute[];
  reservations: RoomReservation[];
}

interface RoomReservation {
  id: string;
  title: string;
  organizer: Employee;
  startTime: Date;
  endTime: Date;
  attendees: Employee[];
  purpose: ReservationPurpose;
}

enum ReservationPurpose {
  MEETING = "MEETING",
  WORKSHOP = "WORKSHOP",
  INTERVIEW = "INTERVIEW",
  TRAINING = "TRAINING",
  OTHER = "OTHER"
}

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  hireDate: Date;
  terminationDate?: Date;
  currentSeat?: EmployeeSeat;
}

type SeatAttribute = 
  | "STANDING_DESK"
  | "MONITOR"
  | "DOCK_STATION"
  | "ERGONOMIC_CHAIR"
  | "NEAR_WINDOW";

type RoomAttribute =
  | "PROJECTOR"
  | "TV_SCREEN"
  | "WHITEBOARD"
  | "VIDEO_CONFERENCE"
  | "PHONE_BOOTH";
```

## Features

### 1. Floor Plan Visualization
- Interactive floor plan showing both employee seats and conference rooms
- Color-coded status indicators
- Quick filters for different resource types
- Hover information showing details

### 2. Employee Seat Management
- View seat details and current occupant
- Track employee seat history
- Handle maintenance periods
- Add/remove seat attributes

### 3. Conference Room Management
- View room schedule
- Make reservations
- Cancel/modify reservations
- Handle recurring bookings
- Prevent double-booking

### 4. Employee Management
- Track current seat assignment
- Handle new hires (seat assignment)
- Handle departures (seat release)
- View seating history

### 5. Reporting & Analytics
- Seat occupancy rates
- Conference room utilization
- Department distribution
- Resource availability forecasting

## UI Structure

### Main Layout
```
+----------------------------------+
|             Header               |
|  [Floor Select] [Global Search]  |
+----------------------------------+
|        |                        |
| Nav    |      Floor Plan        |
| Panel  |                        |
|        |                        |
|        |                        |
+----------------------------------+
```

### Employee Seat Details Panel
```
+----------------------------------+
| Seat F2-123                     |
+----------------------------------+
| Status: OCCUPIED                 |
| Attributes: [Monitor][Standing]  |
+----------------------------------+
| Current Occupant                |
| - John Doe                      |
| - Since: 2023-01-15             |
| - Until: Not specified          |
+----------------------------------+
| Actions                         |
| [Reassign] [Maintenance]        |
+----------------------------------+
```

### Conference Room Details Panel
```
+----------------------------------+
| Room: Jupiter (F2-CONF1)        |
+----------------------------------+
| Capacity: 8 people              |
| Attributes: [TV][Whiteboard]    |
+----------------------------------+
| Today's Schedule                |
| 09:00 - 10:00 Team Meeting     |
| 11:00 - 12:00 Interview        |
+----------------------------------+
| Actions                         |
| [Book Room] [View Schedule]     |
+----------------------------------+
```

## Key Interactions

1. **Employee Seat Assignment**
   - Select employee
   - Choose available seat
   - Set start date
   - Confirm assignment

2. **Conference Room Booking**
   - Select room
   - Choose time slot
   - Add meeting details
   - Invite attendees
   - Confirm booking

3. **Employee Departure**
   - Set termination date
   - Automatically mark seat as "soon available"
   - Track seat availability date

4. **Maintenance Handling**
   - Mark resource for maintenance
   - Set maintenance period
   - Relocate affected employees if needed
