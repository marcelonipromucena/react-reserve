import React from 'react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import { Header, Checkbox, Table, Icon } from 'semantic-ui-react';

function AccountPermissions() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  });

  async function getUsers() {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get('token');
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  }
  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="settings" />
        User Permissions
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <UserPermission user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function UserPermission({ user }) {}

export default AccountPermissions;
