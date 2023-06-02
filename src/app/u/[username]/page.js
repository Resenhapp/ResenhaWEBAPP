import React from 'react'

const profileId = "davilas";

export const metadata = {
  title: `Resenha.app • ${profileId}`,
  description: `View the profile of ${profileId} on Resenha.app. Explore their posts, reviews, and interactions.`,
  keywords: `${profileId}, Resenha.app, User profile, Reviews, Social Platform`,
};

const profileid = () => {
  return (
    <div><h1>{profileId}</h1></div>
  )
}

export default profileid