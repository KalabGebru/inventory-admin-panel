"use client";
import Profile from "@/components/ui/profile";
import { useTodo } from "@/hooks/useContextData";
import services from "@/services/connect";

type User = {
  role: string;
  username: string;
  image: string;
  email: string;
  docId: string;
  datetime: string;
};

type Props = {
  params: {
    user: string;
  };
};

export default function ProfilePage({ params }: Props) {
  const { users } = useTodo();

  const username = params.user.replace("%20", " ");
  console.log(username);

  if (!users) return null;
  const currentUser = users.find((user: User) => user.username == username);
  if (!currentUser) return <div className="">No User by that username</div>;
  const user = {
    role: currentUser.role,
    username: currentUser.username,
    image: currentUser.image,
    email: currentUser.email,
    docId: currentUser.docId,
  };
  return (
    <div className="">
      <Profile user={user} />
    </div>
  );
}
