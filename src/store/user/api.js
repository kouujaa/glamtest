import { fetch } from "../../utils";

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME;

export const signupUser = data => {
  return fetch(`${HOSTNAME}/session/signup`, {
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

export const disableSalon = data => {
  return fetch(`${HOSTNAME}/disableSalon`, {
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

export const loginUser = credentials => {
  return fetch(`${HOSTNAME}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
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

export const getSignUpData = data => {
  return fetch(`${HOSTNAME}/getSignUpData`, {
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

export const submitEmailAddress = data => {
  return fetch(`${HOSTNAME}/submitEmailAddress`, {
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

export const getNewsLetterEmail = data => {
  return fetch(
    `${HOSTNAME}/getNewsLetterEmail?page=${data.page}&text=${data.text}`,
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

export const getUser = data => {
  return fetch(`${HOSTNAME}/getUser`, {
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

export const getSalonOrdersById = data => {
  return fetch(
    `${HOSTNAME}/getSalonOrders?page=${data.page}&text=${data.text}`,
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

export const deleteFavoriteSalon = data => {
  return fetch(`${HOSTNAME}/deleteFavoriteSalon/${data}`, {
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

export const getAllFavSalonById = data => {
  return fetch(
    `${HOSTNAME}/getAllFavSalonById?page=${data.page}&text=${data.text}`,
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

export const getContactInfo = data => {
  return fetch(
    `${HOSTNAME}/getContactInfo?page=${data.page}&text=${data.text}`,
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

export const EditUser = data => {
  return fetch(`${HOSTNAME}/EditUser`, {
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

export const UpdatePassword = data => {
  return fetch(`${HOSTNAME}/UpdatePassword`, {
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

export const UpdateUserStatus = data => {
  return fetch(`${HOSTNAME}/UpdateUserStatus`, {
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

export const UpdateSalonsStatus = data => {
  return fetch(`${HOSTNAME}/UpdateSalonsStatus`, {
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

export const UpdateOrderStatus = data => {
  return fetch(`${HOSTNAME}/UpdateOrderStatus`, {
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

export const ResetPasswordLink = data => {
  return fetch(`${HOSTNAME}/ResetPasswordLink?email=${data.email}`, {
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

export const UpdatePasswordByLink = data => {
  return fetch(`${HOSTNAME}/UpdatePasswordByLink`, {
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

export const subscriptionPayment = data => {
  return fetch(`${HOSTNAME}/addSubscriptionPayment`, {
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

export const getServiceStyles = data => {
  return fetch(`${HOSTNAME}/getServiceStyles?service=${data}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
    //body: JSON.stringify(data)
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

export const landingPageNotify = data => {
  return fetch(`${HOSTNAME}/addlandingpageemail`, {
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

export const getPaymentDataById = data => {
  return fetch(`${HOSTNAME}/getPaymentData`, {
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

export const addContactInfo = data => {
  return fetch(`${HOSTNAME}/contact_us`, {
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
