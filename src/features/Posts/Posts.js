import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPost, selectPosts } from "./postsSlice";
import { Box, Button, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const navigate = useNavigate();
  console.log(posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const openPost = (post) => {
    dispatch(selectPost(post));
    navigate(`/posts/${post.id}`);
  }
  return (
    <Box sx={{ p: 4 }}>
      <Stack flex direction="row" justifyContent="space-between">
        <Typography variant="h4">Posts</Typography>
        <Button variant="outlined" component={Link} to="/posts/new">Add new</Button>
      </Stack>
      <List sx={{ maxWidth: '800px' }}>
        {posts.map((post) => (
          <ListItem key={post.id} onClick={() => openPost(post)}>
            <ListItemText primary={post.title} secondary={post.body} primaryTypographyProps={{ color: '#000' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
