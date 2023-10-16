import { AddUsers } from "@/components/ui/addUsers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function page() {
  return (
    <div className="flex items-center justify-center p-24">
      <div className="flex items-center gap-2"></div>
      <div className="w-96 border">
        <Card className="p-2">
          <CardHeader>Add Users</CardHeader>
          <CardContent>
            <AddUsers />
          </CardContent>
        </Card>
      </div>
      <div className=""></div>
    </div>
  );
}
