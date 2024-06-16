import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add_comment, delete_complaint } from "../redux/complaintSlice";
import axios from "axios";
import styled, { keyframes } from 'styled-components';
import "../css/Complaintcard.css";




// Apply the animation to the CardContainer
const CardContainer = styled.div`
  background-color: transparent;
  border: 1px solid blue;
  border-radius: 20px;
  box-shadow: inset 0 0 6px 0px rgb(210, 214, 191);
  transition: background-color 0.3s ease;
  /* Adjust the duration as needed */

  &:hover {
    background-color: ${props => props.solved ? 'rgba(0, 128, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;


const Complaintcard = ({ complaint, showMyComplaints }) => {
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentsOnCard, setShowCommentsOnCard] = useState(false); 
  const [studentName, setStudentName] = useState("");
  const [solved,setSolved] = useState(false);
  const dispatch = useDispatch();
  const studentDetails_name = useSelector( state => state.students.name);
  const wardenData = useSelector( state => state.wardens.name);

  // console.log("complaint card",complaint,showMyComplaints);


  useEffect(() => {
    const fetchStudentName = async () => {
      // console.log("hi from inside")
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/student/getStudent/${complaint.studentId}`
        );
        // console.log("student details",response);
        setStudentName(response.data.studentName);
      } catch (error) {
        console.error("Error fetching student name:", error);
      }
    };

    fetchStudentName();
  }, [complaint.studentId]);


  const openComment = () => {
    setShowCommentsOnCard((prev) => !prev);
  };

  const handleSolved = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACK_END_URL}/warden/resolveComplaint`, {complaintId: complaint._id})
      .then((res) => {
        console.log("solved response",res);
      })
      .catch((err) => {
        console.log("Can't solve:", err);
      });
    setSolved(true);
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (confirmDelete) {
      dispatch(delete_complaint(complaint._id));

      axios
        .delete(`${process.env.REACT_APP_BACK_END_URL}/student/deleteComplaint/${complaint._id}`)
        .then(() => {
          console.log("complaint deleted");
        })
        .catch((error) => {
          console.error("Error deleting complaint on the server:", error);
        });
    }
  };

  const openCommentPopup = () => {
    setShowCommentPopup(true);
  };

  const closeCommentPopup = () => {
    setShowCommentPopup(false);
  };

  const handleAddComment = () => {
    axios
      .post(`${process.env.REACT_APP_BACK_END_URL}/student/addComment`, {
        complaintId: complaint._id,
        comment: newComment,
        writtenBy: studentName,
      })
      .then((res) => {
        console.log("inside comment",res);
        dispatch(add_comment(res.data.data.comments));
        console.log("Comment added");
      })
      .catch((err) => {
        console.log("Can't add comment:", err);
      });
    closeCommentPopup();
  };

  const handleUpClick = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/student/upvote`, {
          complaintId: complaint._id
        });
        console.log('Upvote Response:', response.data);
    } catch (error) {
        console.error('Error in upvoting:', error);
    }
}

const handleDownClick = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/student/downvote`, {
          complaintId: complaint._id
        });
        console.log('Downvote Response:', response.data);
    } catch (error) {
        console.error('Error in downvoting:', error);
    }
  }
  const formattedDate = new Date(complaint.updatedAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const formattedTime = new Date(complaint.updatedAt).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  return (
    <div className="card-component shadow-lg">
      <CardContainer className="card container card_part">
        <div className="card-body">
          <div className="card-title-txt">
            <h3 className="card-title">{complaint.title}</h3>
            <span
              style={{
                borderRadius: "5px",
                color: "white",
                padding:"2px",
                fontSize:'small',
                display:'flex',
                justifyContent:'flex-end'
              }}
            >
              {formattedDate} | {formattedTime}
            </span>
          </div>
          <hr />
          <div className="description">
            <p className="card-text fs-6 fw-light">{complaint.description}</p>
          </div>
        </div>
        <div className="com-card">
          <div className="votebtn">
            <h4>
              <i
                className="fa-solid fa-circle-up"
                onClick={handleUpClick}
              ></i>{" "}
              {complaint.upvoteId.length}
            </h4>
            <h4>
              <i
                className="fa-solid fa-circle-down"
                onClick={handleDownClick}
              ></i>{" "}
              {complaint.downvoteId.length}
            </h4>
          </div>
          <div className="">
            <p className="text-light" style={{ fontSize: "15px" }}>
              By : {complaint.studentName}
              <br />
              <i className="text-primary">[Reg No.: {complaint.studentRegNo}]</i>
            </p>
            {wardenData && (
              <Button
                style={{backgroundColor: 'green', color: 'white'}}
                size="sm"
                onClick={handleSolved}
                className="shadow-lg"
                disabled={solved}
              >
                solved
              </Button>
            )}
            {showMyComplaints && (
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                className="shadow-lg"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
        <a href={complaint.proofImg} target="_blank" style={{display:'flex',justifyContent:'center',alignItems:'center'}}><p style={{color:'white'}}>view image</p></a>
        <div className="comment text-decoration-none text-lowercase">
          <Button
            variant="link"
            className="text-decoration-none text-lowercase fs-6"
            onClick={openComment}
          >
            {showCommentsOnCard ? "Hide comments" : "View all comments"}
          </Button>
          {!wardenData && (
              <Button
              variant="link"
              className="text-decoration-none text-lowercase fs-6"
              onClick={openCommentPopup}
            >
              Add comment
            </Button>
            )}
          {showCommentsOnCard && (
            <div className="comments">
              <hr />
              <ul>
                {complaint.comments.map((comment, index) => (
                  <li key={index} style={{ fontWeight: "bold", color: "white" }}>
                    {comment.comment}
                    <pre style={{ color: "grey", fontWeight: "normal" }}>
                      <i>Comment By: {comment.writtenBy}</i>
                    </pre>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContainer>

      <Modal show={showCommentPopup} onHide={closeCommentPopup}>
        <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
          <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Add a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label style={{ display: 'block', marginBottom: '10px' }}>Type your comment here:</label>
          <textarea
            style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
            placeholder="Type your comment here"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddComment} style={{ borderRadius: '5px' }}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Complaintcard;
