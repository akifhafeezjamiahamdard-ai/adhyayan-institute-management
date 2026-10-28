# Adhyayan Classes — Institute Management Prototype

A responsive React + Vite frontend prototype for a coaching institute. It demonstrates separate Admin, Teacher, Student and Parent portals, mock test simulation, study resources, attendance, results, timetable, fee status, admission enquiry, activity logs and an instant local demo chatbot.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the localhost URL printed in the terminal.

## Demo login

Choose any role on the login page. Enter any username/email and any password; this is a demo login and does not validate credentials.

## Features in this prototype

- Role picker and separate dashboard/menu experience for Admin, Teacher, Student and Parent.
- Admin can add student/teacher demo records, update attendance and fee statuses, create mock-test listings and review activity logs.
- Teacher dashboard shortcuts for attendance, marks/results, study notes and timetable.
- Student dashboard shows sample attendance, marks, study notes, timetable and mock tests.
- Parent dashboard includes learner progress, fee status and admission enquiry form.
- Timed-style exam simulation UI with question palette, answer selection, submission and instant sample score.
- Chat UI and simple assistant replies update React state immediately without refreshing the page.
- Responsive layout for desktop and mobile.

## Important limitations

This is a frontend prototype only. Demo data is held in browser memory and resets on refresh. It does not include a backend, real authentication, permissions enforcement, database, file uploads, payment processing, real notifications, or a deployed server. The mock-test simulator currently uses five built-in sample Physics questions; other tests are demo listings. Test duration is displayed but not enforced by a countdown timer.

### Shocked.io live chat

The chat screens demonstrate immediate no-refresh messaging locally. They are **not connected to Shocked.io**. A real Shocked.io integration requires the institute's account/widget embed code or the exact SDK/API setup and must be added after confirming the service's current integration instructions. Do not paste private API secrets into frontend code.

## Suggested production next steps

1. Add backend API and database (e.g. PostgreSQL/Supabase or another approved stack).
2. Implement secure authentication, role-based authorization and password reset.
3. Persist students, teacher assignments, attendance, marks, fees, admission enquiries and activity logs.
4. Add real file upload/storage for study notes.
5. Add server-backed exam creation, question bank, timer, attempts and results.
6. Integrate a verified Shocked.io chat widget or approved real-time chat service.
7. Add consent, privacy policy, backup and access controls before storing real student/parent information.
