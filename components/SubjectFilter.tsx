"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { subjects } from "@/constants";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSubject = searchParams.get("subject") || "";
  const [selectedSubject, setSelectedSubject] = useState(currentSubject);

  useEffect(() => {
    setSelectedSubject(currentSubject);
  }, [currentSubject]);

  const handleValueChange = (value: string) => {
    setSelectedSubject(value);
    if (value && value !== "all") {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value,
      });
      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
        router.push(newUrl, { scroll: false });
      }
    }
  };

  return (
    <Select value={selectedSubject || "all"} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] border-black">
        <SelectValue placeholder="Select Subjects" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem value={subject} key={subject}>
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
