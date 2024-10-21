import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="name-container">
      <div className='border'>
        <h1 className="cdd-text">User Management System ?</h1>
        <p>
          A User Management System is a software solution designed to manage user accounts and their access to resources within an application or system.
        </p>
        <p>✦<b>The primary functions of such a system include</b>✦</p>
        <ul>
          <li>➢ User Registration and Login: Allow users to create accounts and authenticate themselves to access the system.</li>
          <li>➢ Profile Management: Enable users to view and update their personal information, such as name, email, password, and other relevant data.</li>
          <li>➢ Role-Based Access Control (RBAC): Assign different roles to users (e.g., admin, editor, viewer) and manage permissions based on these roles, ensuring that users have appropriate access to resources.</li>
          <li>➢ Password Management: Include features for password recovery, reset, and enforcement of password policies (e.g., complexity requirements).</li>
          <li>➢ Account Security: Implement measures like two-factor authentication (2FA) and activity logging to enhance security.</li>
          <li>➢ User Activity Tracking: Monitor user actions within the system for audit and analysis purposes.</li>
          <li>➢ User Deactivation and Deletion: Allow for the deactivation or permanent deletion of user accounts when necessary.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
