import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = `
*[_type == "startup" && defined(slug.current) && (
  !defined($search) || 
  title match $search || 
  author->name match $search || 
  category match $search
)] | order(_createdAt desc) {
  category,
  description,
  title,
  _createdAt,
  _id,
  slug,
  views,
  image,
  author -> {
    _id,
    image,
    name,
    bio
  }
}
`;

export const STARTUPS_QUERY_BY_ID = `
*[_type == "startup"  &&  _id==$id] [0]
{
  category,
  description,
  title,
  _createdAt,
  _id,
  slug,
  views,
  image,
  author -> {_id, image, name, bio, username},
  pitch
}`;

export const STARTUPS_VIEWS_QUERY = `
*[_type == "startup"  &&  _id==$id] [0]
{
  _id,
  views,
}`;

export const AUTHOR_BY_GITHUB_ID_QUERY = `
*[_type == "author"  &&  id==$id] [0]
{
  _id,
  id,
  name,
  username,
  bio,
  email,
  image
}`;

export const AUTHOR_BY_ID_QUERY = `
*[_type == "author"  &&  _id==$id] [0]
{
  _id,
  id,
  name,
  username,
  bio,
  email,
  image
}`;

export const STARTUPS_BY_AUTHOR_QUERY = `
*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  category,
  description,
  title,
  _createdAt,
  _id,
  slug,
  views,
  image,
  author -> {
    _id,
    image,
    name,
    bio
  }
}
`;

export const PLAYLISTS_BY_SLUG_QUERY = `
*[_type == "playlist" && slug.current == $slug] [0] {
  _id,
  title,
  slug,
  select[]->  {
  _createdAt,
  _id,
  slug,
  title,
  views,
  image,
  category,
  description,
  pitch,
  author -> {
    _id,
    image,
    name,
    bio,
    slug,
  }
}
}
`;
