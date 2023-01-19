import { API_HOST } from "../../app/constants";

export function fetchPosts() {
  return fetch(`${API_HOST}/posts`);
}

export function fetchPostDetails(id) {
  return fetch(`${API_HOST}/posts/${id}`);
}