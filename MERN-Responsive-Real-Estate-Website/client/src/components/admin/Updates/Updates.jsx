import React, { useState, useEffect } from "react";
import "./Updates.css";
import { request } from "../../../util/fetchAPI";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { format } from 'timeago.js'

import { BsTrash } from 'react-icons/bs'
import person from '../../../assets/person.jpg'

const Updates = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const [propertyIds, setPropertyIds] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const propertyData = await request(`/property/getAll`, "GET");
        const propertyIds = propertyData.map((property) => property._id);
        setPropertyIds(propertyIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentPromises = propertyIds.map(async (propertyId) => {
          const data = await request(`/comment/${propertyId}`, "GET");
          return data;
        });

        const commentsData = await Promise.all(commentPromises);
        const flattenedComments = commentsData.flat().filter((comment) => comment !== null && comment !== undefined);
        setComments(flattenedComments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [propertyIds]);

  // Select the last 5 comments
  const lastFiveComments = comments.slice(-5);

  return (
    <div className="Updates">
      {lastFiveComments.map((comment) => (
        <div key={comment._id} className="update">
          <img src={comment?.author?.profileImg ? `http://localhost:5000/images/${comment?.author?.profileImg}` : person} alt='' />
          <div className="noti">
            <div style={{ marginBottom: '0.5rem' }}>
              <span>{comment?.author?.username.toUpperCase()}</span>
              <span>{comment?.text} </span>
            </div>
            <span>{format(comment?.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Updates;
