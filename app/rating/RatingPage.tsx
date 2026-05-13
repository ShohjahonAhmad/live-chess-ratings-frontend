import { useEffect, useState } from "react";
import type { User } from "~/types/User";
import RatingTable from "./RatingTable";
import { columns } from "./columns";
import { getStdRatings } from "~/api/getStdRatings";

export default function RatingPage() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    getStdRatings().then((data) => setData(data));
  }, []);

  return (
    <div>
      <RatingTable data={data} columns={columns} />
    </div>
  );
}
