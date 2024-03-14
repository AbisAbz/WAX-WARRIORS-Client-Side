   import { MagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/outline";
   import { useEffect, useState } from "react";
   import { fetchUsers } from "../../Api/AdminApi";
   import DialogDefault from "../AdminComponents/UserBlockModal";
   import { 
    Avatar,
    Button, 
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Chip, 
    Input, 
    Tooltip, 
    Typography 
   }from "@material-tailwind/react";



const MembersTable = () => {
  const [userData, setUserData] = useState([]);
  const [action, setAction]     = useState([]);

  function status(para){
      setAction(para)
      
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUsers();
        console.log("iam the reposnse ", response);
        const userDetails = response.data.users;

        setUserData(userDetails);
        setAction(false)
      } catch (error) {
        console.log("Error occurred during data fetching:", error);
      }
    };

    fetchUserData();
  }, [action]);

  // Define the table headers
  const TABLE_HEAD = [" Users " , " Email ", "Mobile", "Status", "Action"];



  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              USERS LIST
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all USERS
            </Typography>
          </div>

        </div>
        <div className="mr-6">
             <Input
               label="Search"
             icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
            </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.name}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar src={"https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"} alt={user.name} size="sm" />
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.name}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.email}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.mobile}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={user.is_block ? "Blocked" : "Active"}
                      color={user.is_block ? "green" : "blue-gray"}
                    />
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Edit User">
                  <DialogDefault id={user._id} is_block= {user.is_block} statusFunction={status} />
                  </Tooltip>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MembersTable;