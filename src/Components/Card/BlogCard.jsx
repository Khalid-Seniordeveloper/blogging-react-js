import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const BlogCard = ({ userImage, userName, postTime, blogTitle, blogDescription }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteConfirmation = (response) => {
        if (response) {
            // Handle the deletion confirmation here
            console.log("Blog will be deleted"); // Replace this with your delete logic
        }
        setShowConfirm(false); // Close the confirmation modal
    };

    const styles = {
        card: {
            background: '#f9f9f9',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            margin: '20px auto',
            padding: '20px',
            maxWidth: '800px',
            width: '95%',
            position: 'relative',
        },
        profile: {
            display: 'flex',
            alignItems: 'center',
        },
        image: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            marginRight: '15px',
        },
        userInfo: {
            display: 'flex',
            flexDirection: 'column',
        },
        userName: {
            margin: '0',
            fontSize: '1.5em',
            fontWeight: 'bold',
        },
        postTime: {
            margin: '0',
            color: 'gray',
            fontSize: '0.9em',
        },
        title: {
            margin: '15px 0 5px',
            fontSize: '1.8em',
            fontWeight: '600',
        },
        description: {
            color: '#333',
            fontSize: '1.1em',
            lineHeight: '1.5',
        },
        deleteIcon: {
            position: 'absolute',
            top: '15px',
            right: '15px',
            cursor: 'pointer',
            color: '#e74c3c',
            fontSize: '1.5em',
        },
        modal: {
            display: showConfirm ? 'flex' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        confirmBox: {
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
        },
        button: {
            margin: '5px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#3498db',
            color: 'white',
            fontSize: '1em',
            transition: 'background-color 0.3s',
        },
        buttonNo: {
            backgroundColor: '#e74c3c',
        },
    };

    return (
        <div>
            <div style={styles.card}>
                <span style={styles.deleteIcon} onClick={() => setShowConfirm(true)} title="Delete Blog">
                    <FaTrash />
                </span>
                <div style={styles.profile}>
                    <img src={userImage} alt={userName} style={styles.image} />
                    <div style={styles.userInfo}>
                        <h4 style={styles.userName}>{userName}</h4>
                        <p style={styles.postTime}>{postTime}</p>
                    </div>
                </div>
                <h3 style={styles.title}>{blogTitle}</h3>
                <p style={styles.description}>{blogDescription}</p>
            </div>

            {showConfirm && (
                <div style={styles.modal}>
                    <div style={styles.confirmBox}>
                        <p>Do you really want to delete this blog?</p>
                        <button style={styles.button} onClick={() => handleDeleteConfirmation(true)}>Yes</button>
                        <button style={{ ...styles.button, ...styles.buttonNo }} onClick={() => handleDeleteConfirmation(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogCard;
