# How to View the Specialist Dashboard

## Quick Start

### Option 1: Direct Navigation

1. Open your browser and go to: `http://localhost:4200/specialist`
2. You should see the specialist dashboard with:
   - **Pending Consultation Requests** (3 requests on the left)
   - **Accept/Reject Request** section (on the right)
   - **Consultation History** (4 accepted consultations at the bottom)

### Option 2: Via Navigation (if available)

- Navigate through your app's menu to the Specialist section
- You'll be taken to the dashboard

## If You See "No pending requests" or "No consultation history"

### Clear Browser Cache:

1. Open **Browser Developer Tools** (F12)
2. Go to **Application** tab
3. Click **Local Storage**
4. Find your domain and delete the `bookings` entry
5. Refresh the page (F5)

### Or Use Console:

1. Open **Developer Console** (F12)
2. Paste this command:
   ```javascript
   localStorage.removeItem("bookings");
   location.reload();
   ```

## What You Should See

### Header

- Welcome message: "Welcome, Dr. Akinwande!"
- Online/Offline toggle button

### Pending Requests Section (Left)

Shows 3 pending consultation requests:

1. **Chukwu Isioma** - Chest pain complaint (Online)
2. **Adenike Adebayo** - Cardiac follow-up (Online)
3. **Emeka Okonkwo** - High blood pressure (In-Person)

Each request card shows:

- Patient name
- Phone number
- Email
- Consultation type
- "Review" button

### Accept/Reject Section (Right)

- Instructions to select a request
- Once selected, shows:
  - Full patient information (name, email, phone, age, location, gender, complaint)
  - Appointment time input field
  - "Accept & Set Time" button
  - "Reject" button

### Consultation History (Bottom)

Shows 4 accepted consultations in a table:

1. **Okoro Chioma** - Online - Appointment in 2 days
2. **Adeyemi Kunle** - In-Person - Appointment in 1 day
3. **Ngozi Eze** - Online - Appointment in 5 days
4. **Oluwaseun Afolabi** - Online - Past appointment (completed)

Each row has a "View Details" button.

## Features to Test

1. **Toggle Availability**
   - Click the Online/Offline button to change specialist availability

2. **Review Request**
   - Click "Review" on any pending request to see full patient details

3. **Accept Consultation**
   - Select a request, set an appointment time, and click "Accept & Set Time"
   - The request moves to consultation history

4. **Reject Consultation**
   - Click "Review" on any request, then click "Reject"
   - The request disappears from pending list

5. **View Patient Details**
   - In consultation history, click "View Details" to see patient information

## Debug Info

If you want to see console logs:

1. Open Developer Tools (F12)
2. Go to **Console** tab
3. You'll see logs like:
   ```
   Specialist Dashboard Loaded: { fullName: 'Dr. Akinwande', ... }
   Dummy data initialized: [ { id: 'booking-001', ... }, ... ]
   Pending Requests: [ { fullName: 'Chukwu Isioma', ... }, ... ]
   Accepted Consultations: [ { fullName: 'Okoro Chioma', ... }, ... ]
   ```

## File Locations

- **Component TypeScript**: [src/app/specialist/dashboard/dashboard.component.ts](src/app/specialist/dashboard/dashboard.component.ts)
- **Component Template**: [src/app/specialist/dashboard/dashboard.component.html](src/app/specialist/dashboard/dashboard.component.html)
- **Component Styles**: [src/app/specialist/dashboard/dashboard.component.css](src/app/specialist/dashboard/dashboard.component.css)
- **Specialist Module**: [src/app/specialist/specialist.module.ts](src/app/specialist/specialist.module.ts)

## Notes

- All dummy data is stored in browser **localStorage** under key `bookings`
- Data persists across page refreshes
- The specialist profile defaults to "Dr. Akinwande" with "Cardiology" specialty
- Appointment times are calculated relative to the current date/time
- All phone numbers use Nigerian +234 format
