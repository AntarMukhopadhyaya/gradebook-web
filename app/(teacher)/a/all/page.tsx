"use client";
import AsgCard from "@/components/AsgCard";
import Loading from "@/components/Loading";
import { getData } from "@/utils/getData";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [asg, setAsg] = useState<[object] | []>([]);
  const [loading, setLoading] = useState(false);
  const _fetch = async () => {
    const res = await getData(`/a/all`);
    setAsg(res.assignments);
    console.log(res);
  };
  useEffect(() => {
    setLoading(true);
    _fetch();
    setLoading(false);
  }, []);
  if (loading) return <Loading />;
  return <div>{asg.length !== 0 && <AsgCard data={asg} />}</div>;
};

export default Page;
