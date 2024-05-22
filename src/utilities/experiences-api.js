import sendRequest from "./send-request";
const BASE_URL = "/api/experiences";

export async function saveExperience(experienceData) {
  return sendRequest(BASE_URL, "POST", experienceData);
}

export async function getExperiences() {
  return sendRequest(BASE_URL, "GET");
}
