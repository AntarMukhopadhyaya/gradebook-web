import React from "react";

const AssignmentForm = () => {
  return (
    <div className="flex flex-col items-center mt-10 h-screen">
      <div className="bg-gray-200 p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Create Assignment</h1>
        <form className="space-y-6">
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
              id="number_of_questions"
              name="number_of_questions"
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
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="class_selector"
              className="block text-gray-800 font-bold mb-2"
            >
              Class
            </label>
            <select
              id="class_selector"
              name="class_selector"
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="english">English</option>
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
