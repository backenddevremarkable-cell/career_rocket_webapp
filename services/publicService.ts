import { API_PATHS } from "./apiPaths";
import { apiPost } from "./apiMethods";


export const getServices = async () => {
  return await apiPost(API_PATHS.HOME.SERVICES);
}

export const homeBanner = async () => {
  return await apiPost(API_PATHS.HOME.HOME_BANNER_LIST);
}

export const suffleCategory = async () => {
  return await apiPost(API_PATHS.HOME.SHUFFLE_CAREER_CATEGORY);
}

export const careerProgram = async (data:string) => {
  return await apiPost(API_PATHS.HOME.CAREER_GUIDANCE_PROGRAM,data);
}

export const contactUs = async (data:string) => {
  return await apiPost(API_PATHS.OTHER.CONTACT_US,data);
}

export const seoPage = async (data:string) => {
  return await apiPost(API_PATHS.OTHER.SEO_PAGE,data);
}

export const seoPageSlug = async (data:string) => {
  return await apiPost(API_PATHS.OTHER.SEO_PAGE_SLUG,data)
}

export const storiesSuccess = async (data:string) => {
  return await apiPost(API_PATHS.HOME.STORIES_OF_SUCCESS,data);
}

export const termsCondition = async (data:string) => {
  return await apiPost(API_PATHS.HOME.TERMS_CONDITIONS,data);
}

export const privacyPolicy = async () => {
  return await apiPost(API_PATHS.HOME.PRIVACY_POLICY);
}


export const careerCategoryGenZ = async (data : string) => {
  return await apiPost(API_PATHS.OTHER.CAREER_CATEGORIES_GENZ, data);
}

export const careerBycatIdGenZ = async (data : string) => {
  return await apiPost(API_PATHS.OTHER.CAREER_BY_CATID_GENZ, data);
}

export const globalSearch = async (data : string) => {
  return await apiPost(API_PATHS.OTHER.GLOBAL_SEARCH, data);
}

