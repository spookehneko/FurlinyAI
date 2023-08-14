"user client"

import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";

function UserAvatar() {
  const { user } = useUser()
  

  return (
    <Avatar className="h-12 w-12">
        <AvatarImage className="object-cover" src={user?.imageUrl} />
    </Avatar>
  )
}

export default UserAvatar