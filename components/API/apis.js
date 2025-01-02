import Axios from "../config/config.js";
// export const storage = '';


const requestOtp = async (data) => {
  await Axios.post('add-health-goal/', data)
      .then(response => {
          console.log('apils ka on call Response Data:', response.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
};




export const google_webClientId =
  "896882638088-agu668plvrennjkc7s0f26o5qji119jm.apps.googleusercontent.com";

export const ADD_OTP = async (body) => {
  try {
    /// console.log(body)
    const response = await Axios.post("request-otp/", body);
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const VERIFY_OTP = async (body) => {
  try {
    const response = await Axios.post("verify-otp/", body);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const ADD_GOAL = async (body) => {
  try {
    const response = await Axios.post("add-health-goal/", body);
    return response;
  } catch (error) {
    console.error('Axios error:', error.response ? error.response.data : error.message);
  }
};

export const add_profile_information = async (body) => {
  try {
    const response = await Axios.post("create-user/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const SELECT_DIAGNOSIS_BY_USER = async (body) => {
  try {
    const response = await Axios.post("diagnosis-list/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const DIAGNOSIS_LISTING = async (body) => {
  try {
    const response = await Axios.post("diagnosis-list/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const CREATE_DIAGNOSIS = async (body) => {
  try {
    const response = await Axios.post("create-diagnosis/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const ADD_USER_DIAGONSIS = async (body) => {
  try {
    const response = await Axios.post("add-user-diagonsis/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const USER_DIAGNOSIS_LISTING = async (body) => {
  try {
    const response = await Axios.post("user-diagonsis-list/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const DELETE_USER_DIAGONSIS = async (body) => {
  try {
    const response = await Axios.post("delete-user-diagonsis/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const SYMPTOPS_LISTING = async (body) => {
  try {
    const response = await Axios.post("symptoms-list/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const CREATE_SYMPTOPS = async (body) => {
  try {
    const response = await Axios.post("create-symptoms/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const ADD_USER_SYMPTOPS = async (body) => {
  try {
    const response = await Axios.post("add-user-symptoms/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const USER_SYMPTOPS_LISTING = async (body) => {
  try {
    const response = await Axios.post("user-symptoms-list/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const DELETE_USER_SYMPTOPS = async (body) => {
  try {
    const response = await Axios.post("delete-user-symptoms/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const SYMPTOPS_DIAGNOSIS_LIST = async (body) => {
  try {
    const response = await Axios.post("symptoms-diagnosis-list/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const ADD_SYSMPTOMS_DIAGNOSIS = async (body) => {
  try {
    console.log(body)
    const response = await Axios.post("add-severity/", body);
    return response;
  } catch (error) {
    console.error('Axios error:', error.response ? error.response.data : error.message);
  }
};

export const ADD_HEALTH_STYLE = async (body) => {
  try {
    console.log(body)
    const response = await Axios.post("add-health-style/", body);
    return response;
  } catch (error) {
    console.error('Axios error:', error.response ? error.response.data : error.message);
  }
};


export const CREATE_STORY_POST = async (body) => {
 try{
  console.log(body)
  const response = await Axios.post("create-story-post/",body);
  return response;
 }
 catch (error) {
  console.error('Axios error:',error.response ? error.response.data : error.message);
 }
};


export const add_user_post_information = async (body) => {
  try {
    const response = await Axios.post("create-post/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const feed_post_list = async (body) => {
  try {
    const response = await Axios.post("feed-post-list/", body);
    return response;
  } catch (error) {
    console.error(error);
  }
};