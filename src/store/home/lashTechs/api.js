import { fetch } from "../../../utils";

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME;

export const getBestLashTech = data => {
  return fetch(`${HOSTNAME}/getBestLashTech`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(payload => {
      return payload;
    })
    .catch(error => {
      throw error;
    });
};
