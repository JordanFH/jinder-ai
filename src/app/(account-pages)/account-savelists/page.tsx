"use client";

import { Tab } from "@headlessui/react";
import CarCard from "@/components/CarCard";
import React, { Fragment, useEffect, useState } from "react";
import { useUser } from "@/providers/UserProvider";
import { getUserByEmail, updateUserByEmail } from "@/utils/userUtils";
import toast from "react-hot-toast";

const AccountSavelists = () => {
  const user = useUser();
  let [categories] = useState(["Jobs", "Courses"]);

  // COURSES
  const [savedCourses, setSavedCourses] = useState<any>(null);

  useEffect(() => {
    if (!savedCourses) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          const { courses } = user.preferences.saved;
          setSavedCourses(courses);
        }
      });
    }
  }, [user, savedCourses]);

  const handleSaveCourse = (data: any) => {
    if (savedCourses) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          toast.loading("Saving...");
          const newSaved = [...savedCourses, data];

          const updatedUser = {
            ...user,
            preferences: {
              ...user.preferences,
              saved: {
                ...user.preferences.saved,
                courses: newSaved,
              },
            },
          };

          updateUserByEmail(user.email, updatedUser)
            .then(() => {
              setSavedCourses(newSaved);
              toast.dismiss();
              toast.success("Saved successfully!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              toast.dismiss();
              toast.error("Failed to save");
            });
        }
      });
    }
  };

  const handleRemoveCourse = (data: any) => {
    if (savedCourses) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          toast.loading("Removing...");
          const newSaved = savedCourses.filter(
            (item: any) => item.title !== data.title
          );

          const updatedUser = {
            ...user,
            preferences: {
              ...user.preferences,
              saved: {
                ...user.preferences.saved,
                courses: newSaved,
              },
            },
          };

          updateUserByEmail(user.email, updatedUser)
            .then(() => {
              setSavedCourses(newSaved);
              toast.dismiss();
              toast.success("Removed successfully!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              toast.dismiss();
              toast.error("Failed to remove");
            });
        }
      });
    }
  };

  // JOBS
  const [savedJobs, setSavedJobs] = useState<any>(null);

  useEffect(() => {
    if (!savedJobs) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          const { jobs } = user.preferences.saved;
          setSavedJobs(jobs);
        }
      });
    }
  }, [user, savedJobs]);

  const handleSaveJob = (data: any) => {
    if (savedJobs) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          toast.loading("Saving...");
          const newSaved = [...savedJobs, data];

          const updatedUser = {
            ...user,
            preferences: {
              ...user.preferences,
              saved: {
                ...user.preferences.saved,
                jobs: newSaved,
              },
            },
          };

          updateUserByEmail(user.email, updatedUser)
            .then(() => {
              setSavedJobs(newSaved);
              toast.dismiss();
              toast.success("Saved successfully!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              toast.dismiss();
              toast.error("Failed to save");
            });
        }
      });
    }
  };

  const handleRemoveJob = (data: any) => {
    if (savedJobs) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          toast.loading("Removing...");
          const newSaved = savedJobs.filter(
            (item: any) => item.title !== data.title
          );

          const updatedUser = {
            ...user,
            preferences: {
              ...user.preferences,
              saved: {
                ...user.preferences.saved,
                jobs: newSaved,
              },
            },
          };

          updateUserByEmail(user.email, updatedUser)
            .then(() => {
              setSavedJobs(newSaved);
              toast.dismiss();
              toast.success("Removed successfully!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              toast.dismiss();
              toast.error("Failed to remove");
            });
        }
      });
    }
  };

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Save lists</h2>
        </div>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {savedJobs?.map((job: any) => (
                    <CarCard
                      key={job.id}
                      data={job}
                      isLiked={true}
                      handleSave={handleSaveJob}
                      handleRemove={handleRemoveJob}
                    />
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {savedCourses?.map((course: any) => (
                    <CarCard
                      key={course.id}
                      data={course}
                      isLiked={true}
                      handleSave={handleSaveCourse}
                      handleRemove={handleRemoveCourse}
                    />
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
