import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { API_HOST } from "../../app/constants";
import { selectDetails } from "./postsSlice";

const Container = styled.div`
  padding: 10px;
`;

const Comments = () => {
  const [comments, setComments] = useState([]);
  const addComment = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const comment = Object.fromEntries(Array.from(data));
    setComments([comment, ...comments]);
    e.target.reset();
  };
  return (
    <div>
      <Typography variant="h6">Comments</Typography>
      <Box sx={{ mb: 1 }}>
        <form onSubmit={addComment}>
          <TextField title="Add Comment" name="comment" />
          <Button type="submit">Add Comment</Button>
        </form>
      </Box>
      <div>
        <List>
          {comments.map((comment, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={comment.comment} secondary="User" />
            </ListItem>
          ))}
        </List>
        {comments.length === 0 && <div>No comments</div>}
      </div>
    </div>
  );
};

const ConfirmDialog = ({ open, handleClose, confirmDelete }) => {
  const [busy, setBusy] = useState(false);
  const onDelete = () => {
    setBusy(true);
    confirmDelete();
  }
  return <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Once deleted, the post cannot be restored.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={onDelete} color="error" disabled={busy}>Confirm</Button>
    </DialogActions>
  </Dialog>
}

const View = ({ post }) => {
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const onDelete = () => {
    setConfirm(true);
  }
  const onClose = () => setConfirm(false);
  const confirmDelete = () => {
    fetch(`${API_HOST}/posts/${post.id}`, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        navigate('/posts');
      }
    })
  }
  return (
    <div>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Breadcrumbs>
          <Link to="/posts">Posts</Link>
          <Typography color="text.primary">{post.title}</Typography>
        </Breadcrumbs>
        <Stack gap={1} direction="row">
          <Button
            component={Link}
            to={`/posts/${post.id}/edit`}
            variant="outlined"
          >
            Edit Post
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Delete Post
          </Button>
        </Stack>
      </Stack>
      <Box sx={{ maxWidth: "800px" }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {post.title}
          </Typography>
          <Typography>{post.body}</Typography>
        </Box>
        <Comments />
      </Box>
      <ConfirmDialog open={confirm} handleClose={onClose} confirmDelete={confirmDelete} />
    </div>
  );
};

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectDetails);
  // useEffect(() => {
  //   dispatch(fetchDetails(id));
  // }, [id]);
  return (
    <Container>{post ? <View post={post} /> : <div>Loading</div>}</Container>
  );
}
