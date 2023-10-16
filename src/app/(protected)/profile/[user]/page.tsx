import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EditUsers } from "@/components/ui/editUsers";
import Profile from "@/components/ui/profile";
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

export default async function page({ params }: Props) {
  const username = params.user.replace("%20", " ");
  console.log(username);

  const userData = (await services.GetAllUsers()) as User[];

  if (!userData) return null;
  const currentUser = userData.find((user) => user.username == username);
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
