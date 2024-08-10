import React, { FC } from "react";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
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
  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Personal information</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="max-w-3xl mt-6">
          <FileUpload />
        </div>
        <div className="flex md:flex-row flex-col-reverse">
          <div className="flex-grow mt-10 md:mt-0 max-w-3xl space-y-6">
            <div>
              <Label>Name</Label>
              <Input
                className="mt-1.5 bg-gray-200 dark:bg-gray-600"
                defaultValue=""
                disabled
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5 bg-gray-200 dark:bg-gray-600"
                defaultValue=""
                disabled
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Country</Label>
              <Input className="mt-1.5" defaultValue="" />
            </div>
            {/* ---- */}
            <div>
              <Label>City</Label>
              <Input className="mt-1.5" defaultValue="" />
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
              <Input className="mt-1.5" defaultValue="" />
            </div>
            {/* ---- */}
            <div>
              <Label>Current level</Label>
              <Select className="mt-1.5">
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
                defaultValue=""
                min="1"
                max="100"
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Summary</Label>
              <Textarea className="mt-1.5" defaultValue="" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 sm:space-y-8 mt-12">
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
                    {renderNoInclude("ReactJS")}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
                  <Input className="!h-full" placeholder="" />
                  <ButtonPrimary className="flex-shrink-0">
                    <i className="text-xl las la-plus"></i>
                    <span className="ml-3">Add skill</span>
                  </ButtonPrimary>
                </div>
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>Languages</Label>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Checkbox label="English" name="English" defaultChecked />
                <Checkbox label="Chinese (Mandarin)" name="Chinese" />
                <Checkbox label="Spanish" name="Spanish" />
                <Checkbox label="Hindi" name="Hindi" />
                <Checkbox label="Arabic" name="Arabic" />
                <Checkbox label="French" name="French" />
                <Checkbox label="Portuguese" name="Portuguese" />
                <Checkbox label="Russian" name="Russian" />
                <Checkbox label="Japanese" name="Japanese" />
                <Checkbox label="German" name="German" />
                <Checkbox label="Korean" name="Korean" />
                <Checkbox label="Italian" name="Italian" />
              </div>
            </div>
            {/* ---- */}
            <div className="pt-2">
              <ButtonPrimary>Update info</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
