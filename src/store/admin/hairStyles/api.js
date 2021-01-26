import { fetch } from "../../../utils";

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME;

export const addHairStyles = data => {
  return fetch(`${HOSTNAME}/hairStylist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
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

export const getHairStyles = data => {
  return fetch(
    `${HOSTNAME}/getHairStylist?page=${data.page}&text=${data.text}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
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

export const editHairStyles = data => {
  return fetch(`${HOSTNAME}/EditHairStylist/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
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

export const deleteHairStyles = data => {
  return fetch(`${HOSTNAME}/deleteHairStylist/${data}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
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
