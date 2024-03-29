'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../ProjectComponents/ProjectCard';
import HeroPage from '../MainComponents/HeroPage';
import { Carousel } from 'react-responsive-carousel';


export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
// const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://project-board-backend.onrender.com/project', {withCredentials: true});
        console.log(response.data.data)
        setPosts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('https://project-board-backend.onrender.com/project/allusers', {withCredentials: true});
        setAllUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllUsers()
    
  }, [])

  useEffect(() => { 
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://project-board-backend.onrender.com/project/getprofile`, {withCredentials: true});
        setUser(response.data.data);

        if (user) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser()
    
  }, [])

  const groupedPosts = [];
  for (let i = 0; i < posts.length; i += 3) {
    groupedPosts.push(posts.slice(i, i + 3));
  }

  
  
  return (
    <div className="relative">
      <div className="">
      <HeroPage />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:max-w-full md:max-w-[982px]">
        
      </div>
    </div>
  );
};

export default Dashboard