import React, { useState } from "react";

export default function App() {
  const [role, setRole] = useState("Admin");
  const [page, setPage] = useState("Dashboard");
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const menu = {
    Admin: ["Dashboard", "Students", "Teachers", "Activity Logs"],
    Teacher: ["Dashboard", "Attendance", "Marks & Results", "Notes", "Timetable"],
    Student: ["Dashboard", "My Attendance", "Results", "Mock Tests", "Study Notes", "Timetable"],
    Parent: ["Dashboard", "Admission", "Fees", "Student Progress"],
  };

  const [students, setStudents] = useState([
    { name: "Aarav Sharma", className: "Class 12", attendance: 92, marks: 86 },
    { name: "Ananya Singh", className: "Class 11", attendance: 96, marks: 91 },
    { name: "Rahul Verma", className: "Class 12", attendance: 84, marks: 78 },
  ]);

  const [newName, setNewName] = useState("");
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState(["Institute portal opened"]);
  const [testStarted, setTestStarted] = useState(false);
  const [answer, setAnswer] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const questions = [
    { q: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 },
    { q: "Which law explains F = ma?", options: ["Newton's first law", "Newton's second law", "Newton's third law", "Law of gravitation"], correct: 1 },
    { q: "What is the speed of light approximately?", options: ["3 × 10⁸ m/s", "300 m/s", "1500 m/s", "3 × 10⁵ m/s"], correct: 0 },
    { q: "Which quantity is measured in joules?", options: ["Force", "Power", "Energy", "Pressure"], correct: 2 },
    { q: "Which one is a vector quantity?", options: ["Mass", "Time", "Speed", "Velocity"], correct: 3 },
  ];

  function logActivity(text) {
    setLogs((previous) => [`${new Date().toLocaleTimeString()} — ${text}`, ...previous]);
  }

  function signIn(event) {
    event.preventDefault();
    setLoggedIn(true);
    logActivity(`${role} demo login: ${username || "Demo user"}`);
  }

  function addStudent(event) {
    if (!newName.trim()) return;
    setStudents((previous) => [
      ...previous,
      { name: newName.trim(), className: "Class 11", attendance: 0, marks: 0 },
    ]);
    logActivity(`Student added: ${newName.trim()}`);
    setNewName("");
  }

  function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;
    const text = message.trim();
    setChat((previous) => [...previous, { from: "You", text }]);
    setMessage("");
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "Please contact the institute office for more details.";
      if (lower.includes("fee")) reply = "For fee details, open the Fees section or contact the institute office.";
      else if (lower.includes("attendance")) reply = "Your attendance details are available in the Attendance section.";
      else if (lower.includes("test") || lower.includes("exam")) reply = "Open Mock Tests to try the sample Physics exam.";
      else if (lower.includes("result") || lower.includes("marks")) reply = "Your sample marks are available in Results.";
      else if (lower.includes("hello") || lower.includes("hi")) reply = "Hello! Welcome to Adhyayan Classes. How can I help you?";
      setChat((previous) => [...previous, { from: "Adhyayan Assistant", text: reply }]);
    }, 250);
  }

  if (!loggedIn) {
    return (
      <div className="login-page">
        <form className="login-card" onSubmit={signIn}>
          <div className="brand-mark">A</div>
          <p className="eyebrow">WELCOME TO</p>
          <h1>Adhyayan Classes</h1>
          <p className="muted">Institute Management Portal</p>
          <label>Choose your portal</label>
          <div className="role-grid">
            {Object.keys(menu).map((item) => (
              <button type="button" key={item} className={role === item ? "role-choice active" : "role-choice"} onClick={() => setRole(item)}>
                {item}
              </button>
            ))}
          </div>
          <label>Username or email</label>
          <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter any demo username" />
          <label>Password</label>
          <input type="password" placeholder="Enter any demo password" />
          <button className="primary-btn full-btn" type="submit">Login to {role} Portal →</button>
          <p className="small-note">Demo prototype only. Any username and password will work.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark small">A</span><div><strong>ADHYAYAN</strong><small>CLASSES PORTAL</small></div></div>
        <p className="nav-heading">WORKSPACE</p>
        {menu[role].map((item) => (
          <button key={item} className={page === item ? "nav-item selected" : "nav-item"} onClick={() => setPage(item)}>
            <span>{item === "Dashboard" ? "▦" : item.includes("Attendance") ? "✓" : item.includes("Test") ? "◷" : item.includes("Fees") ? "₹" : "◇"}</span>{item}
          </button>
        ))}
        <div className="sidebar-bottom"><span className="avatar">{(username || role).charAt(0).toUpperCase()}</span><div><strong>{username || "Demo User"}</strong><small>{role}</small></div><button className="logout" onClick={() => { setLoggedIn(false); setPage("Dashboard"); }}>↪</button></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><p className="eyebrow">ADHYAYAN CLASSES / {role.toUpperCase()}</p><h1>{page === "Dashboard" ? `Welcome back, ${role}` : page}</h1><p className="muted">Your institute workspace, all in one place.</p></div>
          <span className="role-pill">{role} Portal</span>
        </header>

        {page === "Dashboard" && (
          <>
            <section className="metric-grid">
              <Metric title="Total Students" value={students.length} icon="♙" />
              <Metric title="Teachers" value="8" icon="♧" />
              <Metric title="Attendance Today" value="92%" icon="✓" />
              <Metric title="Pending Fee Records" value="12" icon="₹" />
            </section>
            <section className="content-grid">
              <div className="panel"><div className="panel-head"><div><h2>Quick Actions</h2><p className="muted">Common tasks for your role</p></div></div><div className="quick-grid">{menu[role].filter((item) => item !== "Dashboard").slice(0, 4).map((item) => <button className="quick-action" key={item} onClick={() => setPage(item)}><span className="quick-icon">↗</span><strong>{item}</strong><small>Open section →</small></button>)}</div></div>
              <div className="panel"><h2>Institute Updates</h2><div className="notice"><strong>Weekly test</strong><p>Sample Physics mock test is available for practice.</p></div><div className="notice"><strong>Study resources</strong><p>Check the Notes and Study Materials section.</p></div><div className="notice"><strong>Parent information</strong><p>Admission and fee pages are demo screens.</p></div></div>
            </section>
          </>
        )}

        {page === "Students" && role === "Admin" && <section className="panel"><div className="panel-head"><div><h2>Student Directory</h2><p className="muted">Add students to the demo list.</p></div></div><form className="inline-form" onSubmit={(event) => { event.preventDefault(); addStudent(event); }}><input placeholder="Student full name" value={newName} onChange={(event) => setNewName(event.target.value)} /><button className="primary-btn">+ Add Student</button></form><StudentTable students={students} /></section>}

        {page === "Teachers" && role === "Admin" && <section className="panel"><h2>Teacher Management</h2><p className="muted">Demo teacher directory.</p><StudentTable students={[{ name: "Mr. Sharma", className: "Physics", attendance: 0, marks: 0 }, { name: "Ms. Gupta", className: "Mathematics", attendance: 0, marks: 0 }, { name: "Mr. Khan", className: "Chemistry", attendance: 0, marks: 0 }]} /></section>}

        {(page.includes("Attendance") || page === "My Attendance") && <section className="panel"><h2>Attendance</h2><div className="attendance-summary"><strong>{students[0]?.attendance || 0}%</strong><span>Sample attendance percentage</span></div><StudentTable students={students} /></section>}

        {(page.includes("Results") || page === "Marks & Results" || page === "Student Progress") && <section className="panel"><h2>Marks & Results</h2><StudentTable students={students} /></section>}

        {(page === "Notes" || page === "Study Notes") && <section className="panel"><h2>Study Notes & Resources</h2><div className="resource-list">{["Physics — Laws of Motion.pdf", "Mathematics — Calculus Notes.pdf", "Chemistry — Reactions Revision.pdf"].map((item) => <div className="resource" key={item}><span>▤</span><div><strong>{item}</strong><small>Sample resource · PDF</small></div><button className="outline-btn" onClick={() => alert("This is a demo resource. Connect file storage to provide downloads.")}>View</button></div>)}</div></section>}

        {page === "Timetable" && <section className="panel"><h2>Class Timetable</h2><DataTable headers={["TIME", "CLASS", "SUBJECT", "TEACHER"]} rows={[["08:00 AM", "Class 12", "Physics", "Mr. Sharma"], ["09:30 AM", "Class 11", "Mathematics", "Ms. Gupta"], ["11:00 AM", "Class 12", "Chemistry", "Mr. Khan"], ["02:00 PM", "Class 11", "Physics", "Mr. Sharma"], ["04:00 PM", "Class 12", "Mathematics", "Ms. Gupta"]]} /></section>}

        {page === "Mock Tests" && <section className="panel"><h2>Mock Test Simulation</h2><p className="muted">Sample Physics quiz · {questions.length} MCQs · 1 mark each</p>{!testStarted ? <button className="primary-btn" onClick={() => { setTestStarted(true); setTestSubmitted(false); setAnswer({}); }}>Start Mock Test →</button> : <><div className="test-top"><span>Physics Practice Test</span><span>{Object.keys(answer).length}/{questions.length} answered</span></div>{questions.map((question, index) => <div className="question" key={question.q}><strong>Q{index + 1}. {question.q}</strong>{question.options.map((option, optionIndex) => <label className="option" key={option}><input type="radio" name={`question-${index}`} checked={answer[index] === optionIndex} disabled={testSubmitted} onChange={() => setAnswer((previous) => ({ ...previous, [index]: optionIndex }))} />{option}</label>)}</div>)}{!testSubmitted ? <button className="primary-btn" onClick={() => setTestSubmitted(true)}>Submit Test</button> : <div className="result-box"><h3>Test submitted!</h3><p>Your sample score: {questions.filter((question, index) => answer[index] === question.correct).length} / {questions.length}</p><button className="outline-btn" onClick={() => { setTestStarted(false); setTestSubmitted(false); }}>Try Again</button></div>}</>}</section>}

        {page === "Activity Logs" && role === "Admin" && <section className="panel"><h2>Activity Logs</h2><p className="muted">Recent demo actions during this browser session.</p>{logs.map((item, index) => <div className="log-item" key={`${item}-${index}`}><span className="log-dot" />{item}</div>)}</section>}

        {(page === "Fees" || page === "Admission" || page === "Student Progress") && role === "Parent" && <section className="panel"><h2>{page}</h2>{page === "Admission" ? <form className="form-grid" onSubmit={(event) => { event.preventDefault(); alert("Demo admission enquiry submitted."); }}><label>Parent name<input required placeholder="Full name" /></label><label>Student name<input required placeholder="Student name" /></label><label>Class<select><option>Class 11</option><option>Class 12</option></select></label><label>Contact number<input required placeholder="Phone number" /></label><button className="primary-btn">Submit Admission Enquiry</button></form> : <><div className="notice"><strong>Fee status: Pending (demo)</strong><p>Contact the institute office for fee details and payment instructions.</p></div><StudentTable students={students.slice(0, 1)} /></>}</section>}

        {page === "Dashboard" && role === "Teacher" && <section className="panel"><h2>Teacher Tools</h2><div className="quick-grid">{["Attendance", "Marks & Results", "Notes", "Timetable"].map((item) => <button className="quick-action" key={item} onClick={() => setPage(item)}><strong>{item}</strong><small>Manage {item.toLowerCase()}</small></button>)}</div></section>}

        <section className="panel chat-panel"><div className="panel-head"><div><h2>Adhyayan Assistant</h2><p className="muted">Demo chatbot · Messages update without refreshing</p></div><span className="online-dot">● Online</span></div><div className="chat-messages">{chat.length === 0 && <p className="muted">Try asking: “How do I check my attendance?”</p>}{chat.map((item, index) => <div key={index} className={item.from === "You" ? "chat-bubble mine" : "chat-bubble"}><small>{item.from}</small><p>{item.text}</p></div>)}</div><form className="chat-form" onSubmit={sendMessage}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about attendance, fees, tests..." /><button className="primary-btn">Send ↑</button></form></section>

        <footer className="footer">Adhyayan Classes · Institute Management Prototype · Demo data only</footer>
      </main>
    </div>
  );
}

function Metric({ title, value, icon }) {
  return <div className="metric-card"><span className="metric-icon">{icon}</span><p>{title}</p><strong>{value}</strong></div>;
}

function StudentTable({ students }) {
  return <div className="table-wrap"><table><thead><tr><th>NAME</th><th>CLASS / SUBJECT</th><th>ATTENDANCE</th><th>MARKS</th></tr></thead><tbody>{students.map((student, index) => <tr key={`${student.name}-${index}`}><td><strong>{student.name}</strong></td><td>{student.className}</td><td>{student.attendance}%</td><td>{student.marks}/100</td></tr>)}</tbody></table></div>;
}

function DataTable({ headers, rows }) {
  return <div className="table-wrap"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
