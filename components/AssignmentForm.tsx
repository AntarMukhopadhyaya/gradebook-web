"use client";
import { getData, getDataByPost } from "@/utils/getData";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";

const AssignmentForm = () => {
  const [formData, setFormData] = useState({});
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const _fetch = async () => {
    const res = await getData("/c/list");
    const data = res.classes.map((item: any) => ({
      name: item.name,
      id: item._id,
    }));
    setClasses(data);
  };
  useEffect(() => {
    _fetch();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    formData.due_date = new Date(formData.due_date).toISOString();
    console.log("Form Data:", formData);
    const res = await getDataByPost(formData, "/a/create");
    console.log(res);
    toast.success("Assignment created successfully");
    setFormData({});
    setLoading(false);
  };
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      <div className="bg-gray-200 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Create Assignment</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="topic"
              className="block text-gray-800 font-bold mb-2"
            >
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter assignment topic"
            />
          </div>
          <div>
            <label
              htmlFor="number_of_questions"
              className="block text-gray-800 font-bold mb-2"
            >
              Number of Questions
            </label>
            <input
              type="number"
              id="number_of_question"
              name="number_of_question"
              value={formData.number_of_question}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter number of questions"
            />
          </div>
          <div>
            <label
              htmlFor="due_date"
              className="block text-gray-800 font-bold mb-2"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="classAssigned"
              className="block text-gray-800 font-bold mb-2"
            >
              Class
            </label>
            <select
              id="classAssigned"
              name="classAssigned"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={formData.classAssigned}
              onChange={handleChange}
            >
              <option key={"default"} value="select">
                select
              </option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-3xl bg-black px-6 py-2 text-xl font-medium uppercase text-white"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentForm;
