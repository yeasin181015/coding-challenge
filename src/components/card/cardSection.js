import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ProfileCard from "./profileCard";

const CardSection = () => {
  const { data: profileCollection = [] } = useQuery(
    ["profile"],
    async () => {
      const res = await fetch(
        "https://coding-challenge-server-khaki.vercel.app/allprofiles"
      );
      const data = await res.json();
      return data;
    },
    {
      refetchInterval: 3000,
    }
  );

  return (
    <div className="grid gap-2 mb-5 lg:grid-cols-3 md:grid-cols-2 md:gap-2 lg:gap-3">
      {profileCollection.map((data, index) => (
        <ProfileCard key={index} data={data}></ProfileCard>
      ))}
    </div>
  );
};

export default CardSection;
