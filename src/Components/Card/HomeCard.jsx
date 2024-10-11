import React from 'react';

const HomeCard = ({ userImage, userName, postTime, blogTitle, blogDescription }) => {
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
    };

    return (
        <>


        <div>
      
            <div style={styles.card}>
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
        </div>
        </>
    );
};

export default HomeCard;
