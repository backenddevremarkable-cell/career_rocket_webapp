import type { NextConfig } from "next";

const appPages = [
  { "url": 'ideal-career-test', "page": "idealCareerTest" },
  { "url": "dashboard", "page": "dashboard" },
  { "url": "community", "page": "community" },
  { "url": "my-test", "page": "myTest" },
  { "url": "purchase-history", "page": "myCourse/purchaseHistory" },
  { "url": "live-classes", "page": "myCourse/liveClasses" },
  { "url": "certificate", "page": "myCourse/certificate" },
  { "url": "my-course", "page": "myCourse" },
  { "url": "scholarship-test", "page": "scholarshipTest" },
  { "url": "personality-test", "page": "personalityTest" },
  { "url": "profile", "page": "profile" },
  { "url": "reports", "page": "reports" },
  { "url": "resources", "page": "resources" },
  { "url": "skill-test", "page": "skillTest" },
  { "url": "edit-profile", "page": "editProfile" },
  { "url": "logout", "page": "logout" },
  { "url": "attempt-test/:slug", "page": "attemp-ideal-career-test/page?slug=:slu" },
  { "url": "course-subject/:slug", "page": "myCourse/subjects?slug=:slu" },
  { "url": "course-subject-topics/:slug", "page": "myCourse/subjectsTopics?slug=:slu" },
  { "url": "course-topic-contents/:slug", "page": "myCourse/topicContents?slug=:slu" },
]

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // {
      //   source: "/career-detail/:slug",
      //   destination: "/career-detail?slug=:slug",
      // },
      {
        source: "/career-library",
        destination: "/career-library/career/career-library",
      },
      {
        source: "/career-library-gen-z",
        destination: "/career-library/career-zen-z/career-library",
      },
      //   {
      //   source: "/career-generation-z/:slug",
      //   destination: "/career-library/career-zen-z/details/?slug=:slug",
      // },

      {
        source: "/counselors",
        destination: "/career-counselors/page",
      },
      // {
      //   source: "/career/:slug",
      //   destination: "/career?slug=:slug",
      // },
      {
        source: "/sign-up",
        destination: "/auth/sign-up",
      },
      {
        source: "/courses",
        destination: "/course/courses",
      },
      {
        source: "/course-detail",
        destination: "/course/course-detail",
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
      },
      {
        source: "/contact-us",
        destination: "/other/contact-us",
      },
      {
        source: "/about-us",
        destination: "/legal/about-us",
      },
      {
        source: "/terms-and-conditions",
        destination: "/legal/terms-and-conditions",
      },
      // {
      //   source: "/dashboard",
      //   destination: "/app/dashboard",
      // },
      ...appPages.map((e) => ({
        source: `/${e.url}`,
        destination: `/app/${e.page}`,
      })),
    ];
  },
  /* config options here */
  output: 'export',
  // basePath: '/career-rocket',
  // assetPrefix: '/career-rocket/',
  trailingSlash: true,   // IMPORTANT FIX
  skipTrailingSlashRedirect: true,
  devIndicators: false,
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,   // ⭐ VERY IMPORTANT
  }
};

export default nextConfig;
