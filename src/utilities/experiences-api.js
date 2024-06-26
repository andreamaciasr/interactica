import sendRequest from "./send-request";
const BASE_URL = "/api/experiences";

const KEY = process.env.NASA_KEY;

export async function saveExperience(experienceData) {
  return sendRequest(BASE_URL, "POST", experienceData);
}

export async function createComment(commentData, experience_id) {
  return sendRequest(
    `${BASE_URL}/${experience_id}/create_comment`,
    "POST",
    commentData
  );
}

export async function getExperiences() {
  return sendRequest(BASE_URL, "GET");
}

export async function getOne(id) {
  return sendRequest(`${BASE_URL}/${id}`, "GET");
}

export async function getImage() {
  return sendRequest(`${BASE_URL}/get-nasa-image`, "GET");
}

export async function getComments(experience_id) {
  return sendRequest(`${BASE_URL}/${experience_id}/get-comments`, "GET");
}

export async function deleteComment(experience_id, comment_id) {
  return sendRequest(`${BASE_URL}/${experience_id}/${comment_id}`, "DELETE");
}
