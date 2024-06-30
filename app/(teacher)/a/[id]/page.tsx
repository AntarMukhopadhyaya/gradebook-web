"use client";
import Loading from "@/components/Loading";
import { getData } from "@/utils/getData";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  const _fetch = async () => {
    setLoading(true);
    try {
      const res = await getData(`/a/${id}`);
      setAssignment(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _fetch();
  }, [id]);

  const isTomorrow = (dueDate) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const due = new Date(dueDate);
    return due.toDateString() === tomorrow.toDateString();
  };

  if (loading) return <Loading />;
  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Subject: {assignment.subject}</h2>
          <p>Author ID: {assignment.authorId}</p>
          <p>Created At: {new Date(assignment.createdAt).toLocaleString()}</p>
          <p>Due Date: {new Date(assignment.dueDate).toLocaleString()}</p>
          {isTomorrow(assignment.dueDate) && (
            <p className="text-red-500 font-bold">Due Date is Tomorrow!</p>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Questions:</h3>
            {assignment.questions.map((question) => (
              <div
                key={question._id}
                className="border p-4 rounded-lg mb-4 bg-base-200"
              >
                <p className="font-semibold">Q. {question.question}</p>
                <p className="">Ans: {question.answer}</p>
                <p className="text-xs text-gray-500">Topic: {question.topic}</p>
                <p className="text-xs text-gray-500">
                  Created At: {new Date(question.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
