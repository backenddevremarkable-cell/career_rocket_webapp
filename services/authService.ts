import { API_PATHS } from "./apiPaths";
import { apiGet, apiPost } from "./apiMethods";

export const loginUser = async (data: { mobileNo: string; countryId: string }) => {
  return await apiPost(API_PATHS.AUTH.LOGIN, data);
};

export const otpVerify = async (data: { mobileNo: string; otp: string }) => {
  return await apiPost(API_PATHS.AUTH.VERIFY_OTP, data);
};//

export const updateProfile = async (data: { mobileNo: string; otp: string }) => {
  return await apiPost(API_PATHS.AUTH.UPDATE_PROFILE, data);
};

export const getCounselor = async (data: string) => {
  return await apiPost(API_PATHS.OTHER.GET_COUNSELLOR, data);
};


export const getCourses = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.LIST, data);
}

export const getCoursesDetail = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.DETAILS, data);
};

export const buyCourse = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.BUY_NOW_COURSE, data);
}

export const buyFreeCourse = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.BUY_FREE_COURSE, data);
}


export const myCourse = async () => {
  return await apiPost(API_PATHS.COURSE.MY_COURSES);
}

export const successPayment = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.SUCCESS_PAYMENT, data);
}

export const subjectFromCourse = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.SUBJECT_FROM_COURSE, data);
}

export const courseTopicsBySubject = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.COURSE_TOPICS_BY_SUBJECTS, data);
}

export const contentByTopicId = async (data: string) => {
  return await apiPost(API_PATHS.COURSE.CONTENT_BY_TOPOIC_ID, data);
}

export const getLiveClass = async () => {
  return await apiPost(API_PATHS.COURSE.GET_MY_LIVE_CLASS);
}

export const getPurchaseHistory = async () => {
  return await apiPost(API_PATHS.COURSE.GET_MY_PURCHASE_HISTORY);
}


export const updateProfileRe = async (data: { name: string; mail: string, educationLevel: string, mobile: string }) => {
  const updatepayload = {
    student_name: data?.name,
    student_email: data?.mail,
    mobile: data?.mobile,
    student_education_level: data?.educationLevel
  }
  return await apiPost(API_PATHS.AUTH.UPDATE_PROFILE_RE, updatepayload);
};




export const getProfile = async () => {
  return await apiPost(API_PATHS.AUTH.PROFILE);
}

// ==========================
// COUNTRY / STATE / CITY
// ==========================
export const getCountries = async () => {
  return await apiGet(API_PATHS.COMMON.COUNTRY_LIST);
};

export const getStates = async (countryId: string) => {
  return await apiPost(API_PATHS.COMMON.STATE_LIST, {
    countryId,
  });
};

export const getCities = async (stateId: string) => {
  return await apiPost(API_PATHS.COMMON.CITY_LIST, {
    stateId,
  });
};


export const careerCategory = async (data: string) => {
  return await apiPost(API_PATHS.OTHER.CAREER_CATEGORIES, data);
}

export const careerBycatId = async (data: string) => {
  return await apiPost(API_PATHS.OTHER.CAREER_BY_CATID, data);
}

export const careerById = async (data: string) => {
  return await apiPost(API_PATHS.OTHER.CAREER_BY_ID, data);
}

// ==========================
// EDUCATION LEVEL
// ==========================
export const getEducationLevels = async () => {
  return await apiPost(API_PATHS.COMMON.EDUCATION_LEVEL_LIST);
};