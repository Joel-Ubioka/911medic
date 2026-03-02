# Specialist Dashboard - Dummy Data Guide

## Overview

Dummy data has been integrated into the Specialist Dashboard component for testing and demonstration purposes. The data is automatically loaded from `localStorage` or generated if no data exists.

---

## Dummy Data Structure

### 1. **Pending Consultation Requests** (3 requests)

These are consultation requests waiting for the specialist to accept or reject.

#### Request 1: Chukwu Isioma

- **ID:** booking-001
- **Email:** isioma.chukwu@email.com
- **Phone:** +234 706 234 5678
- **Age:** 45 | **Gender:** Male
- **Location:** Lagos, Nigeria
- **Type:** Online
- **Complaint:** Experiencing chest pain and shortness of breath. Need urgent consultation.
- **Status:** Pending
- **Requested:** 2 hours ago

#### Request 2: Adenike Adebayo

- **ID:** booking-002
- **Email:** adenike.a@email.com
- **Phone:** +234 701 987 6543
- **Age:** 38 | **Gender:** Female
- **Location:** Abuja, Nigeria
- **Type:** Online
- **Complaint:** Follow-up on previous cardiac issues. Recent ECG shows irregularities.
- **Status:** Pending
- **Requested:** 4 hours ago

#### Request 3: Emeka Okonkwo

- **ID:** booking-003
- **Email:** emeka.okonkwo@email.com
- **Phone:** +234 805 456 7890
- **Age:** 52 | **Gender:** Male
- **Location:** Port Harcourt, Nigeria
- **Type:** In-Person
- **Complaint:** High blood pressure concerns. Needs comprehensive cardiac evaluation.
- **Status:** Pending
- **Requested:** 6 hours ago

---

### 2. **Accepted Consultations / Consultation History** (4 consultations)

These are consultations the specialist has already accepted with scheduled appointment times.

#### Consultation 1: Okoro Chioma

- **ID:** booking-101
- **Email:** chioma.okoro@email.com
- **Phone:** +234 703 111 2222
- **Age:** 41 | **Gender:** Female
- **Location:** Lagos, Nigeria
- **Type:** Online
- **Complaint:** Heart palpitations and dizziness during exercise.
- **Status:** Accepted
- **Appointment Time:** 2 days from now
- **Accepted By:** Dr. Akinwande
- **Accepted:** 2 days ago

#### Consultation 2: Adeyemi Kunle

- **ID:** booking-102
- **Email:** kunle.adeyemi@email.com
- **Phone:** +234 810 333 4444
- **Age:** 55 | **Gender:** Male
- **Location:** Ibadan, Nigeria
- **Type:** In-Person
- **Complaint:** Post-surgery follow-up after coronary artery bypass.
- **Status:** Accepted
- **Appointment Time:** 1 day from now
- **Accepted By:** Dr. Akinwande
- **Accepted:** 4 days ago

#### Consultation 3: Ngozi Eze

- **ID:** booking-103
- **Email:** ngozi.eze@email.com
- **Phone:** +234 815 555 6666
- **Age:** 48 | **Gender:** Female
- **Location:** Enugu, Nigeria
- **Type:** Online
- **Complaint:** Monitoring of hypertension and medication adjustment.
- **Status:** Accepted
- **Appointment Time:** 5 days from now
- **Accepted By:** Dr. Akinwande
- **Accepted:** 6 days ago

#### Consultation 4: Oluwaseun Afolabi (Completed)

- **ID:** booking-104
- **Email:** seun.afolabi@email.com
- **Phone:** +234 802 777 8888
- **Age:** 35 | **Gender:** Male
- **Location:** Kano, Nigeria
- **Type:** Online
- **Complaint:** Preventive cardiac screening and lifestyle consultation.
- **Status:** Accepted (Completed)
- **Appointment Time:** 2 days ago (past consultation)
- **Accepted By:** Dr. Akinwande
- **Accepted:** 9 days ago
- **Completed:** Yes

---

### 3. **Specialist Profile** (Demo Specialist)

A default specialist profile is used for testing:

```
Name: Dr. Akinwande
Specialty: Cardiology
Email: dr.akinwande@911medic.com
Phone: +234 809 123 4567
ID: spec-001
```

---

## How the Dummy Data Works

### Data Initialization Flow:

1. **Component OnInit:**
   - Checks if a specialist is logged in via `localStorage`
   - If not, uses the default dummy specialist (Dr. Akinwande)

2. **Load Consultation Requests:**
   - Checks `localStorage` for bookings
   - If empty, generates dummy pending requests and stores them
   - Filters to show only pending requests for the specialist's specialty

3. **Load Accepted Consultations:**
   - Retrieves bookings from `localStorage`
   - If empty, generates both pending and accepted dummy data
   - Filters to show only accepted consultations

### Data Persistence:

- All data is stored in browser `localStorage` under the key `bookings`
- Data persists across page refreshes
- Accepting/rejecting requests updates the `localStorage` data
- You can clear the data by opening browser DevTools Console and running:
  ```javascript
  localStorage.removeItem("bookings");
  ```

---

## Specialist Workflow Features

### 1. **Availability Toggle**

- **Online (Green):** Specialist is available for consultations
- **Offline:** Specialist is unavailable
- Visual toggle in the header

### 2. **Pending Requests Management**

- View all pending consultation requests
- Click "Review" to select a request and see full patient details
- Review patient biodata (name, email, phone, age, location, gender, complaint)

### 3. **Accept/Reject Consultations**

- **Accept:** Set an appointment time and accept the request
  - Patient details are immediately displayed
  - Appointment time is stored and relayed to the patient
  - Status changes from "pending" to "accepted"
- **Reject:** Decline the consultation request
  - Status changes to "rejected"
  - Request removed from pending list

### 4. **Consultation History**

- View all accepted consultations in a table format
- Shows patient name, consultation type, appointment time, and status
- "View Details" button displays complete patient biodata

---

## Testing Instructions

1. **Start the Application:**

   ```bash
   npm start
   ```

2. **Navigate to Specialist Dashboard:**
   - Login or navigate to `/specialist/dashboard`

3. **Test Pending Requests:**
   - You'll see 3 pending consultation requests
   - Click "Review" on any request to view full patient details
   - Set an appointment time and click "Accept & Set Time"
   - The request moves from pending to consultation history

4. **Test Rejection:**
   - Click "Review" on any pending request
   - Click "Reject" to decline the consultation

5. **View Consultation History:**
   - Scroll down to see accepted consultations
   - Click "View Details" to see patient information
   - Note that some appointments are in the future and some in the past

6. **Toggle Availability:**
   - Click the "Online/Offline" button in the header
   - Visual state changes from green (Online) to gray (Offline)

---

## Data Customization

To modify the dummy data, edit the following methods in [dashboard.component.ts](src/app/specialist/dashboard/dashboard.component.ts):

- `getDummyPendingRequests()` - Modify pending consultation requests
- `getDummyAcceptedConsultations()` - Modify accepted consultations
- Specialist profile in `ngOnInit()` method

All changes will be reflected automatically when the component initializes.

---

## Notes

- All phone numbers use Nigerian +234 format (can be changed as needed)
- Appointment times are dynamically calculated relative to current date/time
- The specialist specialty must match for consultations to appear
- Patient details include all necessary biodata for the specialist to review
