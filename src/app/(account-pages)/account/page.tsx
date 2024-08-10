import React, { FC } from "react";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Textarea from "@/shared/Textarea";

export interface AccountPageProps {}

const AccountPage = () => {
  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Personal information</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="flex md:flex-row flex-col-reverse">
          <div className="flex-grow mt-10 md:mt-0 md:pr-16 max-w-3xl space-y-6">
            <div>
              <Label>Name</Label>
              <Input className="mt-1.5 bg-gray-200 dark:bg-gray-600" defaultValue="" disabled />
            </div>
            {/* ---- */}
            <div>
              <Label>Email</Label>
              <Input className="mt-1.5 bg-gray-200 dark:bg-gray-600" defaultValue="" disabled />
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
          <div className="flex-shrink-0 flex items-start">
            <div className="relative rounded-full overflow-hidden flex">
              <Avatar sizeClass="w-32 h-32" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 sm:space-y-8 mt-16">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Professional details</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0 md:pr-16 max-w-3xl space-y-6">
            <div>
              <Label>Name</Label>
              <Input className="mt-1.5" defaultValue="Eden Tuan" />
            </div>
            {/* ---- */}
            <div>
              <Label>Username</Label>
              <Input className="mt-1.5" defaultValue="@eden_tuan" />
            </div>
            {/* ---- */}
            <div>
              <Label>Email</Label>
              <Input className="mt-1.5" defaultValue="example@email.com" />
            </div>
            {/* ---- */}
            <div className="">
              <Label>Date of birth</Label>
              <Input className="mt-1.5" type="date" defaultValue="1990-07-22" />
            </div>
            {/* ---- */}
            <div>
              <Label>Addess</Label>
              <Input className="mt-1.5" defaultValue="New york, USA" />
            </div>
            {/* ---- */}
            <div>
              <Label>Phone number</Label>
              <Input className="mt-1.5" defaultValue="003 888 232" />
            </div>
            {/* ---- */}
            <div>
              <Label>About you</Label>
              <Textarea className="mt-1.5" defaultValue="..." />
            </div>
            {/* ---- */}
            <div>
              <Label>Gender</Label>
              <Select className="mt-1.5">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 sm:space-y-8 mt-12">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Abilities and skills</h2>
        <div className="w-14 border-b border-2 border-neutral-400 dark:border-neutral-700"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0 md:pr-16 max-w-3xl space-y-6">
            <div>
              <Label>Name</Label>
              <Input className="mt-1.5" defaultValue="Eden Tuan" />
            </div>
            {/* ---- */}
            <div>
              <Label>Username</Label>
              <Input className="mt-1.5" defaultValue="@eden_tuan" />
            </div>
            {/* ---- */}
            <div>
              <Label>Email</Label>
              <Input className="mt-1.5" defaultValue="example@email.com" />
            </div>
            {/* ---- */}
            <div className="">
              <Label>Date of birth</Label>
              <Input className="mt-1.5" type="date" defaultValue="1990-07-22" />
            </div>
            {/* ---- */}
            <div>
              <Label>Addess</Label>
              <Input className="mt-1.5" defaultValue="New york, USA" />
            </div>
            {/* ---- */}
            <div>
              <Label>Phone number</Label>
              <Input className="mt-1.5" defaultValue="003 888 232" />
            </div>
            {/* ---- */}
            <div>
              <Label>About you</Label>
              <Textarea className="mt-1.5" defaultValue="..." />
            </div>
            {/* ---- */}
            <div>
              <Label>Gender</Label>
              <Select className="mt-1.5">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
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
