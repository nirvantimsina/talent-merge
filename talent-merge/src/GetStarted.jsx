import { useState } from 'react';
import './getstarted.css';

export default function GetStarted() {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('job-seeker');

  return (
    <div className="container">
      <div className="card">
        <h1 className="header">TalentMerge</h1>
        <p className="subheader">
          {activeTab === 'login' ? 'Welcome back!' : 'Join our community'}
        </p>

        <div className="tabs">
          <button className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            Login
          </button>
          <button className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>
            Sign Up
          </button>
        </div>

        <div className="user-type-toggle">
          <button className={`toggle-btn ${userType === 'job-seeker' ? 'active' : ''}`} onClick={() => setUserType('job-seeker')}>
            Job Seeker
          </button>
          <button className={`toggle-btn ${userType === 'organization' ? 'active' : ''}`} onClick={() => setUserType('organization')}>
            Organization
          </button>
        </div>

        <div className="form-container">
          {activeTab === 'login' ? (
            <LoginForm userType={userType} />
          ) : (
            <SignupForm userType={userType} />
          )}
        </div>
      </div>
    </div>
  );
}

function LoginForm({ userType }) {
  return (
    <form className="form">
      <h2>Login as {userType === 'job-seeker' ? 'Job Seeker' : 'Organization'}</h2>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

function SignupForm({ userType }) {
  return (
    <form className="form">
      <h2>Sign Up as {userType === 'job-seeker' ? 'Job Seeker' : 'Organization'}</h2>
      <input type="text" placeholder={userType === 'job-seeker' ? "Full Name" : "Organization Name"} required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
      
    </form>
  );
}