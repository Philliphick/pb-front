"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import FullPost from './FullPost';

const ProjectCard = () => {

  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState('');

  useEffect(() => {
    // Fetch posts
    axios.get('http://localhost:5000/')
    .then(res => {
      const { data } = res.data;
      setPosts(data);
      console.log(data)
      
    })

    .catch(error => {
      console.error('Error fetching books:', error);
    });
    
  }, []) 

  const handleButtonClick = (currentId) => {
    setPostId(currentId);
    console.log({postId})
  }


  return (
    <>
    
    {posts.map(post => (

      <div className="p-4 bg-white shadow rounded" key={post._id}>
      <h2 className="text-xl mb-2">{post.name}</h2>
      <h3 className="text-lg mb-2">Tags: {post.tags.join(', ')}</h3>
      <p className="mb-2">Repo: {post.repoLink}</p>
      <p className="mb-2">Timeframe: {post.timeframe}</p>
      <button onClick={() => handleButtonClick(post._id)}>View Full Post</button>
      
    </div>)
    )}

        {postId && <FullPost postId={ postId } />}

   </> 
  )
}

export default ProjectCard

