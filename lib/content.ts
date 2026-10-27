// Editable site content. Only confirmed facts belong here.
export const site = {
  name: "Vamsi",
  fullName: "Vamsi Bodigadla",
  role: "Data Analyst & Business Analyst (entry level)",
  headline: "I turn complex data into clear business decisions.",
  sub: "A polymath who connects ideas across fields to find what the numbers really mean.",
  intro: "I analyse data with Python, SQL, Power BI and Excel and explain it in plain business language. I am looking for my first Data Analyst or Business Analyst role.",
  location: "Andhra Pradesh, India",
  email: "beatsvamsi@gmail.com",
  linkedin: "https://www.linkedin.com/in/vamsi-bodigadla-717330244",
  github: "https://github.com/u200cbvt",
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf",
};
export const about = "I am a polymath at heart. I enjoy learning across many fields and, above all, finding the relationships between them. Data gave me a way to test those connections instead of guessing. I like keeping things simple: observe carefully, find the pattern, explain it clearly.";
export const aboutCards = [
  { title: "Curious across fields", text: "I learn widely, from technology and business to how people and systems behave, because good questions often come from somewhere unexpected." },
  { title: "Connects the dots", text: "I look for how things relate to each other, then check the relationship with data instead of assuming it." },
  { title: "Strategic observer", text: "I study how a situation works before I act, then turn the finding into a simple recommendation someone can decide on." },
];
export const skillGroups = [
  { title: "Programming and querying", items: [{ name: "Python (Pandas, NumPy)", keys: ["python", "pandas"] }, { name: "SQL (joins, CTEs, window functions)", keys: ["sql", "queries"] }, { name: "Streamlit", keys: [] }] },
  { title: "Business intelligence", items: [{ name: "Power BI (DAX, dashboards)", keys: ["power bi", "dashboard"] }, { name: "Excel", keys: [] }] },
  { title: "Analysis and statistics", items: [{ name: "Exploratory data analysis", keys: ["eda", "analysis"] }, { name: "Descriptive statistics", keys: [] }, { name: "Web scraping", keys: ["scrap", "beautifulsoup"] }] },
];
export const education = [
  { title: "Bachelor of Computer Applications (BCA)", place: "Elite Degree College, Dubacherla, Andhra Pradesh", note: "Completed 2026 · CGPA 8.2" },
  { title: "Data Analytics training", place: "Innomatics Research Labs, Hyderabad", note: "Completed" },
];
// Work not yet on GitHub. No findings are claimed until they exist.
export const inProgress = [
  { key: "telco-churn", title: "Telco Customer Churn Analysis", summary: "Exploratory analysis of the IBM telco churn dataset in Google Colab, framed for the Indian telecom market. Currently working through missing values and outliers.", category: "EDA · Python", badge: "In progress" },
];
