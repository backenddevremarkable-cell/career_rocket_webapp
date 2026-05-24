export const API_PATHS = {
  AUTH: {
    LOGIN: "/sendLoginOtp",
    VERIFY_OTP: "/verifyLoginOtp",
    PROFILE: "/getMyProfile",
    UPDATE_PROFILE: "/completeProfile",
    UPDATE_PROFILE_RE: "/edit-profile",
    PROFILE_RE: "/get-profile",
    MY_TEST: "/test-history"
  },
  COMMON: {
    COUNTRY_LIST: "/getAllCountries",
    STATE_LIST: "/getStateByCountryId",
    CITY_LIST: "/getCitiesByStateId",
    EDUCATION_LEVEL_LIST: "/getEducationLevels",
    TRUSTED_BY_LEADING: "/getOrganisationList",
  },

  HOME: {
    SERVICES: "/getAllServicesWithFilter",
    SHUFFLE_CAREER_CATEGORY: "/getShuffledCareerCategory",
    PRIVACY_POLICY: "/getAllCms",
    TERMS_CONDITIONS: "/getCmsById",
    STORIES_OF_SUCCESS: "/getSuccessStoryList",
    CAREER_GUIDANCE_PROGRAM: "/fetchGuidanceMoments",
    HOME_BANNER_LIST: "/getAllBannerListByType",
  },

  OTHER: {
    CAREER_CATEGORIES: "/getAllCareerCategories",
    CAREER_BY_CATID: "/getCareersByCareerCatId",

    CAREER_CATEGORIES_GENZ: "/getAllGenzCareerWithFilter",
    CAREER_BY_CATID_GENZ: "/getGenzCareerById",

    CAREER_BY_ID: "/getCareerById",
    CAREER_PARENT_ID: "/getDataByParentCareerId",
    GET_COUNSELLOR: "/getCounsellorbyServiceId",
    CONTACT_US: "/createCustomerQuery",
    SEO_PAGE: "/getSeoPageList",
    SEO_PAGE_SLUG: "/getSeoPageBySlug",
    GLOBAL_SEARCH: "/masterSearchForWeb "
  },

  COURSE: {
    LIST: "/getCourseListByCategory",
    MY_COURSES: "/purchasedCourseList",
    GET_MY_LIVE_CLASS: "/getPurchasedCourseLiveClasses",
    GET_MY_PURCHASE_HISTORY: "/getPurchaseHistory",
    BUY_NOW_COURSE: "/createOrder",
    BUY_FREE_COURSE: "/purchaseFreeCourse",
    SUCCESS_PAYMENT: "/fetchPaymentStatus",
    DETAILS: `/getCourseById`,
    SUBJECT_FROM_COURSE: `/fetchSubjectfromContentByCourseId`,
    COURSE_TOPICS_BY_SUBJECTS: `/getAllCourseTopicBySubjectId`,
    CONTENT_BY_TOPOIC_ID: `/getContentByTopicId`,
    // DETAILS: `/getCourseById`,
    // DETAILS: `/getCourseById`,

  },

};