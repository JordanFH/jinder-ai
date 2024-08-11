"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import FileUpload from "@/components/FileUpload";
import { useUser } from "@/providers/UserProvider";
import { updateUserByEmail } from "@/utils/userUtils";

export interface AccountPageProps {}

const renderLabel = (text: string, onRemove: () => void) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-neutral-600 dark:text-neutral-400 text-sm">
        {text}
      </span>
      <i
        className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
        onClick={onRemove}
      ></i>
    </div>
  );
};

const AccountPage = () => {
  const user = useUser();

  const { professionalDetails, abilities } = user.userData;

  // Config
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // User CV file
  const [file, setFile] = useState<File | null>(null);
  const [cvData, setCvData] = useState<any | null>(null);
  // Personal information
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  // Professional details
  const [specialty, setSpecialty] = useState<string>("");
  const [currentLevel, setCurrentLevel] = useState<string>("");
  const [yearsExperience, setYearsExperience] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  // Abilities and skills
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const handleRemoveLabel = (index: number, isLanguage = false) => {
    if (isLanguage) {
      setLanguages(languages.filter((_, i) => i !== index));
    } else {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const handleUpdateInfo = () => {
    setLoading(true);
    setDisabled(true);

    const updatedUser = {
      ...user,
      country,
      city,
      userData: {
        ...user.userData,
        professionalDetails: {
          specialty,
          currentLevel,
          yearsExperience,
          summary,
        },
        abilities: {
          skills,
          languages,
        },
      },
    };

    updateUserByEmail(user.email, updatedUser)
      .then(() => {
        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setLoading(false);
        setDisabled(false);
      });
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setCountry(user.country);
    setCity(user.city);
    setSpecialty(professionalDetails.specialty);
    setCurrentLevel(professionalDetails.currentLevel);
    setYearsExperience(professionalDetails.yearsExperience);
    setSummary(professionalDetails.summary);
    setSkills(abilities.skills);
    setLanguages(abilities.languages);
  }, [user]);

  useEffect(() => {
    if (cvData) {
      const newData = cvData.jsonCv;
      const { abilities, professionalDetails } = newData;

      setSkills(abilities.skills);
      setLanguages(abilities.languages);

      setSpecialty(professionalDetails.specialty);
      setCurrentLevel(professionalDetails.currentLevel);
      setYearsExperience(professionalDetails.yearsExperience);
      setSummary(professionalDetails.summary);
    }
  }, [cvData]);

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Personal information</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="max-w-3xl mt-6">
          <FileUpload
            file={file}
            setFile={setFile}
            setCvData={setCvData}
            setLoading={setLoading}
            setDisabled={setDisabled}
          />
        </div>
        <div className="flex md:flex-row flex-col-reverse">
          <div className="flex-grow mt-0 max-w-3xl space-y-6">
            <div>
              <Label>Name</Label>
              <Input
                className="mt-1.5 bg-gray-300 dark:bg-gray-400 cursor-not-allowed"
                defaultValue={name}
                disabled
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5 bg-gray-300 dark:bg-gray-400 cursor-not-allowed"
                defaultValue={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Country</Label>
              <Input
                className="mt-1.5"
                defaultValue={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <p className="text-primary-600 mt-2">
                * This field is very important for the job search. Please make
                sure to update it.
              </p>
            </div>
            {/* ---- */}
            <div>
              <Label>City</Label>
              <Input
                className="mt-1.5"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 sm:space-y-8 mt-16">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Professional details</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0 max-w-3xl space-y-6">
            <div>
              <Label>Specialty</Label>
              <Input
                className="mt-1.5"
                defaultValue={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
              <p className="text-primary-600 mt-2">
                * This field is very important for the job search. Please make
                sure to update it.
              </p>
            </div>
            {/* ---- */}
            <div>
              <Label>Current level</Label>
              <Input
                className="mt-1.5"
                defaultValue={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Years of experience</Label>
              <Input
                className="mt-1.5"
                defaultValue={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Summary</Label>
              <Textarea
                className="mt-1.5"
                defaultValue={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 sm:space-y-8 mt-16">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Abilities and skills</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0 max-w-3xl space-y-6">
            <div>
              <Label>Skills</Label>
              <div className={`space-y-8 ${skills.length > 0 ? "mt-6" : ""}`}>
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                    {skills.map((skill, index) =>
                      renderLabel(skill, () => handleRemoveLabel(index))
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
                  <Input
                    className="!h-full"
                    placeholder="Add a new skill"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setSkills([...skills, e.currentTarget.value]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <ButtonPrimary
                    className="flex-shrink-0"
                    onClick={() => {
                      const newSkill = document.querySelector(
                        "input[placeholder='Add a new skill']"
                      ) as HTMLInputElement;
                      if (newSkill.value) {
                        setSkills([...skills, newSkill.value]);
                        newSkill.value = "";
                      }
                    }}
                  >
                    <i className="text-xl las la-plus"></i>
                    <span className="ml-3">Add</span>
                  </ButtonPrimary>
                </div>
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>Languages</Label>
              <div
                className={`space-y-8 ${languages.length > 0 ? "mt-6" : ""}`}
              >
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                    {languages.map((language, index) =>
                      renderLabel(language, () =>
                        handleRemoveLabel(index, true)
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
                  <Input
                    className="!h-full"
                    placeholder="Add a new language"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setLanguages([...languages, e.currentTarget.value]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <ButtonPrimary
                    className="flex-shrink-0"
                    onClick={() => {
                      const newLanguage = document.querySelector(
                        "input[placeholder='Add a new language']"
                      ) as HTMLInputElement;
                      if (newLanguage.value) {
                        setLanguages([...languages, newLanguage.value]);
                        newLanguage.value = "";
                      }
                    }}
                  >
                    <i className="text-xl las la-plus"></i>
                    <span className="ml-3">Add</span>
                  </ButtonPrimary>
                </div>
              </div>
            </div>
            {/* ---- */}
            <div className="pt-2">
              <ButtonPrimary
                onClick={() => handleUpdateInfo()}
                loading={loading}
                disabled={disabled}
              >
                Update info
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
