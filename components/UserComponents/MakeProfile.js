'use client'
import React, { useState } from 'react';
import axios from 'axios';

function MakeProfile({user}) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    githubLink: '',
    telegram: '',
    twitter: '',
    location: '',
    photo: null
  });

  const handleChange = (event) => {
    if (event.target.name === 'photo') {
      setProfile({
        ...profile,
        photo: event.target.files[0]
      });
    } else {
      setProfile({
        ...profile,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }

    try {
      const response = await axios.put(`/makeProfile/${user._id}`, formData);
      console.log(response.data);
      setProfile(response.data.user);
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <div className="w-full p-4 bg-gradient-to-br from-gray-700 via-cyan-900 via-40% to-gray-900 to-90% text-white shadow-2xl rounded mx-auto">
      <h1 className="text-center text-3xl font-bold mb-4">Profile Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out">Save</button>
      </form>
    </div>
  );
}

export default MakeProfile;