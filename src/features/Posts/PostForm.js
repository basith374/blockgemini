import {
  Breadcrumbs,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_HOST } from "../../app/constants";

const Container = styled.div`
  padding: 1em;
  width: 400px;
`;

export default function PostForm({ title: formTitle, post }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const form = useRef();
  useEffect(() => {
    if (post) {
      const elements = form.current.elements;
      elements.title.value = post.title;
      elements.body.value = post.body;
    }
  }, [post]);
  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    const data = new FormData(e.target);
    const body = JSON.stringify(Object.fromEntries(Array.from(data)));
    if (post) {
      fetch(`${API_HOST}/posts/${post.id}`, { method: "PATCH", body, })
        .then((response) => {
          if (response.ok) {
            navigate(`/posts/${post.id}`);
          } else {
            setBusy(false);
          }
        })
        .catch((error) => {
          setBusy(false);
          console.log(error);
        });
    } else {
      fetch(`${API_HOST}/posts`, { method: "POST", body })
        .then((response) => {
          if (response.ok) {
            navigate("/posts");
          } else {
            setBusy(false);
          }
        })
        .catch((error) => {
          setBusy(false);
          console.log(error);
        });
    }
  };
  return (
    <Container>
      <form onSubmit={submit} ref={form}>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link href="/posts">Posts</Link>
          <Typography color="text.primary">{formTitle}</Typography>
        </Breadcrumbs>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {formTitle}
        </Typography>
        <div>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            sx={{ mb: 1 }}
            fullWidth
          />
        </div>
        <div>
          <TextField
            name="body"
            variant="outlined"
            label="Content"
            sx={{ mb: 1 }}
            fullWidth
            multiline
            rows={5}
          />
        </div>
        <Stack direction="row" gap={1}>
          <Button variant="outlined" onClick={() => setBusy(false)}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={busy}>
            Save
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
