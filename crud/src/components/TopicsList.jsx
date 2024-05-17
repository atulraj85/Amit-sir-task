"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import RemoveBtn from "./atoms/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        let url = "http://localhost:3000/api/topics/search";
        // Append query parameters based on selected sorting option and search term
        let queryParams = [];
        if (sortBy !== 'default') {
          queryParams.push(`sort=${sortBy}`);
        }
        if (searchTerm) {
          queryParams.push(`search=${encodeURIComponent(searchTerm)}`); // Encode search term
        }
        if (queryParams.length > 0) {
          url += `?${queryParams.join('&')}`;
        }


        console.log(url)



        const res = await fetch(url, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        setTopics(data.topics);
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };

    fetchTopics();
  }, [sortBy, searchTerm]); // Fetch topics whenever sorting option or search term changes

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <select value={sortBy} onChange={handleSortChange} className="my-4">
        <option value="default">Default</option>
        <option value="title">Title</option>
        <option value="createdAt">Date Created</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="my-4"
      />

      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
