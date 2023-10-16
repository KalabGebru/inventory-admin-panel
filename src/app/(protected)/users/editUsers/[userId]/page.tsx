import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EditUsers } from "@/components/ui/editUsers";
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
    userId: string;
  };
};

export default async function page({ params }: Props) {
  console.log(params.userId);
  const userData = (await services.GetUserById(params.userId)) as User;
  if (!userData) return null;
  const user = {
    role: userData.role,
    username: userData.username,
    image: userData.image,
    email: userData.email,
    docId: userData.docId,
  };
  return (
    <div className="flex items-center justify-center p-24">
      <div className="flex items-center gap-2"></div>
      <div className="w-96 border">
        <Card className="p-2">
          <CardHeader>Edit Users</CardHeader>
          <CardContent>
            <EditUsers user={user} />
          </CardContent>
        </Card>
      </div>
      <div className=""></div>
    </div>
  );
}
