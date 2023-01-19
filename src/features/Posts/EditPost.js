import { useSelector } from "react-redux";
import PostForm from "./PostForm";
import { selectDetails } from "./postsSlice";

export default function EditPost() {
  const selectedPost = useSelector(selectDetails);
  return <div>
    <PostForm title="Edit Post" post={selectedPost} />
  </div>
}