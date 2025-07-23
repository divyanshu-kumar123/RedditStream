import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Typography } from "@mui/material";
import fetchRedditPosts from "../services/reddit";
import Loader from "../components/Loader";

function Homepage() {
  //All the states
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(); // IntersectionObserver instance ref

  //A function to load posts
  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    console.log("Calling loadPosts...");
    setLoading(true);
    const response = await fetchRedditPosts(after);

    if (response.error) {
      setError(true);
      setLoading(false);
      return;
    }

    setPosts((prev) => {
      const updatedPosts = [...prev, ...response.posts];
      console.log("Updated posts:", updatedPosts); // log posts here
      return updatedPosts;
    });

    setAfter(response.after);
    setHasMore(Boolean(response.after));
    setLoading(false);
  }, [after, loading, hasMore]);

  //To load initial posts
  useEffect(() => {
    loadPosts();
  }, []);

  //Lazy loading on scroll (with cleanup)
  const observerRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadPosts]
  );

  return (
    
    <Container maxWidth="md" sx={{ py: 4 }}>
      {loading? <Loader /> : 
      <Typography variant="h4" align="center" sx={{ height: "100vh" }}>
        Hello
      </Typography>
}
      {/* Future: map posts here */}
      {/* <PostCard post={...} /> */}

      {/* Loader trigger div for IntersectionObserver */}
      <div ref={observerRef} style={{ height: 1 }}>bottom</div>
    </Container>
  );
}

export default Homepage;
