"use client";

import React, { useEffect, useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Textarea from "@/shared/Textarea";
import Checkbox from "@/shared/Checkbox";
import FileUpload from "@/components/FileUpload";

export interface AccountPageProps {}

const renderNoInclude = (text: string) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-neutral-600 dark:text-neutral-400 text-sm">
        {text}
      </span>
      <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
    </div>
  );
};

const AccountPage = () => {
  // User CV file
  const [file, setFile] = useState<File | null>(null);
  // Personal information
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  // Professional details
  const [specialty, setSpecialty] = useState<string>("");
  const [currentLevel, setCurrentLevel] = useState<string>("Junior");
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(1);
  const [summary, setSummary] = useState<string>("");
  // Abilities and skills
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log({
  //     name,
  //     email,
  //     country,
  //     city,
  //     specialty,
  //     currentLevel,
  //     yearsOfExperience,
  //     summary,
  //     skills,
  //     languages,
  //   });
  // }, [
  //   name,
  //   email,
  //   country,
  //   city,
  //   specialty,
  //   currentLevel,
  //   yearsOfExperience,
  //   summary,
  //   skills,
  //   languages,
  // ]);

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Personal information</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="max-w-3xl mt-6">
          <FileUpload file={file} setFile={setFile} />
        </div>
        <div className="flex md:flex-row flex-col-reverse">
          <div className="flex-grow mt-0 max-w-3xl space-y-6">
            <div>
              <Label>Name</Label>
              <Input
                className="mt-1.5 bg-gray-300 dark:bg-gray-500"
                defaultValue={name}
                disabled
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5 bg-gray-300 dark:bg-gray-500"
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
            </div>
            {/* ---- */}
            <div>
              <Label>Current level</Label>
              <Select
                className="mt-1.5"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
              >
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
              </Select>
            </div>
            {/* ---- */}
            <div>
              <Label>Years of experience</Label>
              <Input
                className="mt-1.5"
                type="number"
                defaultValue={yearsOfExperience.toString()}
                min="1"
                max="100"
                onChange={(e) => setYearsOfExperience(Number(e.target.value))}
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
              <div className="mt-6 space-y-8">
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                    {skills.map((skill, index) => renderNoInclude(skill))}
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
                    <span className="ml-3">Add skill</span>
                  </ButtonPrimary>
                </div>
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>Languages</Label>
              {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {languages.map((language, index) => (
                  <Checkbox 
                    key={index} 
                    label={language} 
                    name={language} 
                    defaultChecked 
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setLanguages(languages.filter(l => l !== language));
                      }
                    }}
                  />
                ))}
                <Checkbox label="Add new language" name="newLanguage" onChange={(e) => {
                  if (e.target.checked) {
                    const newLanguage = prompt("Enter new language:");
                    if (newLanguage) {
                      setLanguages([...languages, newLanguage]);
                    }
                  }
                }} />
              </div> */}
            </div>
            {/* ---- */}
            <div className="pt-2">
              <ButtonPrimary onClick={() => console.log("Update info clicked")}>
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
