"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/index";

type UserStateType = {
  name: string;
  email: string;
  instagram: string;
  checker: boolean;
};

const initialUserState: UserStateType = {
  name: "",
  email: "",
  instagram: "",
  checker: false,
};
const RequestAccess = () => {
  const [userDetails, setUserDetails] =
    useState<UserStateType>(initialUserState);
  const [currentState, setCurrentState] = useState<number>(2);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'early-access'), userDetails)
      console.log("User details uploaded to Firebase");
    } catch (error) {
      console.error("Error uploading user details to Firebase:", error);
    }
  };

  return (
    <div className="text-white flex justify-center items-center h-screen font-sans">
      <div className="max-w-xl w-full">
        <h1 className="mb-1 text-gray-400">Request early access</h1>
        <div className="bg-[#2e2e2e] rounded-md p-4 w-full py-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {currentState === 1 && (
              <>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  required
                  placeholder="Email address"
                  className="bg-transparent px-2 py-2 outline-none border-b"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  required
                  placeholder="Name"
                  className="bg-transparent p-2 outline-none border-b"
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="bg-blue-500 px-10 mt-8 self-end py-2 rounded-md"
                  onClick={() => setCurrentState(currentState + 1)}
                >
                  Next
                </button>
              </>
            )}
            {currentState === 2 && (
              <>
                <input
                  type="text"
                  name="instagram"
                  value={userDetails.instagram}
                  required
                  placeholder="Instagram handle"
                  className="bg-transparent p-2 outline-none border-b focus:border-white border-gray-500"
                  onChange={handleInputChange}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={userDetails.checker}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        checker: !userDetails.checker,
                      }))
                    }
                    required
                    className="bg-transparent "
                  />
                  <label
                    htmlFor="checkbox-user-permisison"
                    className="text-gray-300 text-sm"
                  >
                    I accept the{" "}
                    <a href="xyz.com">
                      <span className="text-blue-400 underline">
                        terms and conditions
                      </span>
                    </a>
                    .
                  </label>
                </div>
                <button
                  type="submit"
                  className="px-10 py-2 self-end bg-blue-500 rounded-md"
                >
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestAccess;
