// src/components/PostCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Avatar, Chip, Box } from '@mui/material';
import { ArrowUpward, ArrowDownward, ChatBubbleOutline, Share, BookmarkBorder } from '@mui/icons-material';
import './PostCard.css'; // Import the CSS file

// Utility to decode HTML entities from URLs
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Utility to format large numbers
const formatCount = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};

// Updated utility to handle UTC timestamps (in seconds)
const timeAgo = (utcSeconds) => {
  const date = new Date(utcSeconds * 1000); // Convert seconds to milliseconds
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const PostCard = ({ post }) => {
  // Map API data to component variables
  const {
    id,
    title,
    author,
    subreddit_name_prefixed: subreddit,
    ups,
    num_comments: comments,
    created_utc: createdAt,
    url_overridden_by_dest: postUrl,
    permalink,
    over_18: isNSFW,
    stickied: isSticky,
    preview,
    thumbnail,
  } = post;

  const [vote, setVote] = useState(0);
  const [currentUpvotes, setCurrentUpvotes] = useState(ups);

  const handleVote = (newVoteType) => {
    if (newVoteType === vote) {
      setVote(0);
      setCurrentUpvotes(ups);
      return;
    }
    let newUpvotes = ups;
    if (vote === 1) newUpvotes -= 1;
    if (vote === -1) newUpvotes += 1;
    if (newVoteType === 1) newUpvotes += 1;
    if (newVoteType === -1) newUpvotes -= 1;
    setVote(newVoteType);
    setCurrentUpvotes(newUpvotes);
  };

  // Logic to get the best quality image URL
  const getImageUrl = () => {
    if (preview?.images?.[0]?.source?.url) {
      return decodeHtml(preview.images[0].source.url);
    }
    if (thumbnail && thumbnail !== 'self' && thumbnail !== 'default') {
      return thumbnail;
    }
    return null; // No image available
  };
  
  const imageUrl = getImageUrl();
  const finalUrl = postUrl || `https://www.reddit.com${permalink}`;

  return (
    <Card className="interactive-card" sx={{ maxWidth: 380, m: 2 }}>
      {imageUrl && (
        <Box className="card-thumbnail-container">
          <img
            className="card-thumbnail"
            src={imageUrl}
            alt={title}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </Box>
      )}
      
      <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 1 }}>
        {isSticky && <Chip label="Sticky" color="primary" size="small" sx={{fontWeight: 'bold'}} />}
        {isNSFW && <Chip label="NSFW" color="error" size="small" sx={{fontWeight: 'bold'}} />}
      </Box>
      
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
            {subreddit.charAt(2).toUpperCase()}
          </Avatar>
          <Typography variant="body2">
            <a href={`https://reddit.com/${subreddit}`} target="_blank" rel="noopener noreferrer" className="subreddit-link">{subreddit}</a>
            <span style={{ margin: '0 4px' }}>•</span>
            Posted by <a href={`https://reddit.com/user/${author}`} target="_blank" rel="noopener noreferrer" className="author-link">u/{author}</a>
          </Typography>
        </Box>
        
        <Typography gutterBottom variant="h5" component="div" className="post-title">
          <a href={finalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            {title}
          </a>
        </Typography>
        
        <Typography variant="caption" color="text.secondary">
          {timeAgo(createdAt)}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', background: '#374151', borderRadius: '9999px', p: '2px' }}>
          <IconButton aria-label="upvote" onClick={() => handleVote(1)} className={`action-button ${vote === 1 ? 'upvoted' : ''}`}>
            <ArrowUpward />
          </IconButton>
          <Typography className="vote-count">{formatCount(currentUpvotes)}</Typography>
          <IconButton aria-label="downvote" onClick={() => handleVote(-1)} className={`action-button ${vote === -1 ? 'downvoted' : ''}`}>
            <ArrowDownward />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           <IconButton aria-label="comments" className="action-button">
              <ChatBubbleOutline />
              <Typography sx={{ ml: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>{formatCount(comments)}</Typography>
           </IconButton>
           <IconButton aria-label="share" className="action-button">
              <Share />
           </IconButton>
           <IconButton aria-label="save" className="action-button">
              <BookmarkBorder />
           </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;