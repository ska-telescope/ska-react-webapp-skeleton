import React from 'react';
import { useMsal } from '@azure/msal-react';

export function UserProfile() {
  const { accounts } = useMsal();
  const homeAccountId = accounts.length > 0 ? accounts[0].homeAccountId : '';
  const username = accounts.length > 0 ? accounts[0].username : '';
  const displayName = accounts.length > 0 ? accounts[0].name : '';

  return (
    <div id="profile-div">
      <p>
        <strong>ID</strong> {homeAccountId}
      </p>
      <p>
        <strong>Username</strong> {username}
      </p>
      <p>
        <strong>Display name</strong> {displayName}
      </p>
    </div>
  );
}
