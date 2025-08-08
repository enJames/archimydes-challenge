import { UserList } from "@/component/UserList/UserList";
import { useUsers } from "@/hooks/useUsers";

const Home = () => {
  const {
    users,
    isLoading,
    isError,
    error,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <UserList
      users={users}
      onCreateUser={createUser}
      onUpdateUser={updateUser}
      onDeleteUser={deleteUser}
    />
  );
};

export default Home;
