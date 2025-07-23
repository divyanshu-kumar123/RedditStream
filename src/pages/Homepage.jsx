import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import fetchRedditPosts from "../services/reddit";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

const POST_LIMIT = 15;

function Homepage() {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(false);
    try {
      const response = await fetchRedditPosts(after, POST_LIMIT);
      setPosts((prev) => [...prev, ...response.posts]);
      setAfter(response.after);
      setHasMore(Boolean(response.after));
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [after, loading, hasMore]);

  // THIS useEffect IS NOW REMOVED
  // useEffect(() => {
  //   loadPosts();
  // }, []);

  const loadMoreTriggerRef = useCallback(
    (node) => {
      // Don't create a new observer if we are already loading
      if (loading) return;
      
      // Disconnect the old observer
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadPosts();
          }
        },
        {
          rootMargin: "400px", // Trigger when 400px away from the viewport
        }
      );
      
      // Observe the new node
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadPosts] // Dependencies are correct
  );
  useEffect(()=>{
  
    console.log(posts[1]);
  })

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Reddit Posts
      </Typography>

      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard {...post} />
          </Grid>
        ))}
      </Grid>
      
      {/* The ref is attached to this div.
        On first render, it's at the top of the page and immediately visible,
        triggering the very first `loadPosts` call.
      */}
      <div ref={loadMoreTriggerRef} />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Loader />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          Failed to load posts. Please try again.
        </Typography>
      )}

      {!hasMore && !loading && posts.length > 0 && (
        <Typography align="center" sx={{ mt: 4, color: 'text.secondary' }}>
          You've reached the end! 👋
        </Typography>
      )}
    </Container>
  );
}

export default Homepage;