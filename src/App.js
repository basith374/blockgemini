import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import EditPost from "./features/Posts/EditPost";
import NewPost from "./features/Posts/NewPost";
import PostDetails from "./features/Posts/PostDetails";
import Posts from "./features/Posts/Posts";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'posts/new',
        element: <NewPost />
      },
      {
        path: 'posts/:id',
        element: <PostDetails />
      },
      {
        path: 'posts/:id/edit',
        element: <EditPost />
      },
    ]
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
