import React from 'react'
import { useLocation } from 'react-router-dom';

const List = () => {
    const location = useLocation();
    const { id, category } = location.state || {};
  return (
    <div>List{id} {category}</div>
  )
}

export default List