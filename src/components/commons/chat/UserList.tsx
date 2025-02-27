import { useState, useEffect } from "react";
type UserType = {
  id:number,
  name:string,
  email:string,
  avatar:string
}
type UserProps = {
  showUserList:boolean,
}

function UserList(props:UserProps) {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    // Fetch the list of users from an API or a mock data source
    const data = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "https://i.pravatar.cc/50?u=1" },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "https://i.pravatar.cc/50?u=2" },
      { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", avatar: "https://i.pravatar.cc/50?u=3" },
      { id: 4, name: "John Doe", email: "john.doe@example.com", avatar: "https://i.pravatar.cc/50?u=1" },
      { id: 5, name: "Jane Smith", email: "jane.smith@example.com", avatar: "https://i.pravatar.cc/50?u=2" },
      { id: 6, name: "Bob Johnson", email: "bob.johnson@example.com", avatar: "https://i.pravatar.cc/50?u=3" },
    ];
    setUsers(data);
  }, []);

  return (
    <div className={`flex flex-col  ${props.showUserList?'mr-0':'mr-4'}`}>
      {users.map((user) => (
        <User key={user.id} {...user} showUserName={props.showUserList}/>
      ))}
    </div>
  );
}

function User({ name, email, avatar ,showUserName}:{name:string,email:string,avatar:string,showUserName:boolean}) {
  return (
    <div className=" rounded-lg  py-2 px-4 flex items-center  cursor-pointer hover:bg-custom_orange-800 hover:shadow-md">
      
      <img className={`w-10 h-10 ${showUserName?'mr-0':'mr-2'} rounded-full `} src={avatar} alt={name} />
      <div className={`text-center ${showUserName?'hidden':''} transition duration-200 ease-in-out `}>
        <h2 className="text-sm text-custom_black-200">{name}</h2>
      </div>
    </div>
  );
}

export default UserList;