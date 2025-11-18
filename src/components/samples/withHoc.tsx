import React, { useState, useEffect } from "react";
import withLoader from "./hoc";

type User = {
  id: number;
  name: string;
};

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => (
  <ul>
    {users.map((u) => (
      <li key={u.id}>{u.name}</li>
    ))}
  </ul>
);

// Wrap with HOC
const UserListWithLoader = withLoader<UserListProps>(UserList);

const HocComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate API call
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data: User[]) => setUsers(data))
        .catch(() => setError("Failed to load users"))
        .finally(() => setIsLoading(false));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <UserListWithLoader users={users} isLoading={isLoading} error={error} />
    </div>
  );
};

export default HocComponent;
