import React, { useEffect, useState } from "react"
import { Pagination, Input } from 'antd';
import 'antd/dist/antd.css';

import { TPost } from "../../types/Posts.type"
import { Suggestions } from "../Suggestions/Suggestions";
import { Posts } from "./Posts";
import './Posts.css'
import { Notification } from "../Notification/Notification";

const getUrl = 'http://localhost:3000/posts';
const { Search } = Input;

export const PostsPage = () => {
  const [postsData, setPostData] = useState<TPost[]>([{ id: 0, title: '', author: '' }]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPosts, setCurrentPosts] = useState<TPost[]>([{ id: 0, title: '', author: '' }]);
  const [searchedWord, setSearchedWord] = useState<string>('');
  const [suggestions, setSuggestions] = useState<TPost[]>([{ id: 0, title: 'a', author: 'a' }]);
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    fetch(getUrl, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      setPostData(data);
      setCurrentPosts(data.slice(currentPage * 10 - 10, currentPage * 10));
    });
  }, [postsData, currentPage]);

  useEffect(() => {
    const arr = [...postsData.slice(currentPage * 10 - 10, currentPage * 10)];
    setCurrentPosts(arr);
  }, [currentPage, postsData]);

  useEffect(() => {
    const arr = [...postsData.filter((el: TPost) => el.title
      .slice(0, searchedWord.length)
      .toLowerCase() === searchedWord.toLowerCase())];
    if (arr.length > 0) setSuggestions(arr);

    setInterval(() => {
      setNotification(false);
    }, 5000)
  }, [searchedWord]);

  return (
    <>
      <div className="postSearchInput">
        <Search 
          onChange={(e) => {
            if(e.currentTarget.value.length === 0) setIsSearching(false)
          }}
          placeholder="input search text"  
          onSearch={(value) => {
            setSearchedWord(value);
            setIsSearching(true);
            setNotification(true);
          }}
        />
      </div>
      { 
        isSearching &&
        <Suggestions posts={suggestions} /> 
      }
      <Posts 
        posts={currentPosts} 
        currentPage={currentPage}
      />
      <Pagination className="pagination" onChange={(page) => setCurrentPage(page)} defaultCurrent={1} total={50} />
      { 
        notification && <Notification word={searchedWord} />
      }
    </>
  )
}