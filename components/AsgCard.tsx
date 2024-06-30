import { useRouter } from "next/navigation";
import React from "react";

const isTomorrow = (dueDate) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const due = new Date(dueDate);
  return due.toDateString() === tomorrow.toDateString();
};

const AsgCard = ({ data }: { data: [any] }) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item, index) => (
        <div
          onClick={() => {
            router.push(`/a/${item._id}`);
          }}
          key={index}
          className="card w-96 bg-base-100 hover:bg-base-200 shadow-xl m-4"
        >
          <div className="card-body">
            <h2 className="card-title">Topic: {item.subject}</h2>
            <p className="">
              Created At: {new Date(item.createdAt).toLocaleString()}
            </p>
            <p className="">
              Due Date: {new Date(item.dueDate).toLocaleString()}
            </p>
            {isTomorrow(item.dueDate) && (
              <p className="text-red-500 font-bold">Due Date is Tomorrow!</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AsgCard;
