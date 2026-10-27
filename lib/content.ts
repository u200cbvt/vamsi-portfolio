// Editable site content, taken from the owner's own resume.
export const site = {
  name: "Vamsi", fullName: "Vamsi Bodigadla",
  role: "Data Analyst & Business Analyst (entry level)",
  headline: "I turn complex data into clear business decisions.",
  sub: "A polymath who connects ideas across fields to find what the numbers really mean.",
  intro: "I analyse data with SQL, Python, Power BI and Excel and explain it in plain business language. I am looking for my first Data Analyst or Business Analyst role.",
  location: "Hyderabad, Telangana, India · open to relocation",
  email: "beatsvamsi@gmail.com",
  linkedin: "https://www.linkedin.com/in/vamsi-bodigadla-717330244",
  github: "https://github.com/u200cbvt",
  resumeUrl: "/resume.pdf",
};
export const about = "I am a polymath at heart. I enjoy learning across many fields and, above all, finding the relationships between them. Data gave me a way to test those connections instead of guessing. I like keeping things simple: observe carefully, find the pattern, explain it clearly.";
export const aboutCards = [
  { icon: "compass", title: "Curious across fields", text: "I learn widely, from technology and business to how people and systems behave, because good questions often come from somewhere unexpected." },
  { icon: "link", title: "Connects the dots", text: "I look for how things relate to each other, then check the relationship with data instead of assuming it." },
  { icon: "eye", title: "Strategic observer", text: "I study how a situation works before I act, then turn the finding into a simple recommendation someone can decide on." },
];
export const skillGroups = [
  { icon: "database", title: "SQL and databases", items: [{ name: "MySQL", keys: ["sql", "queries"] }, { name: "Joins and subqueries", keys: [] }, { name: "CTEs", keys: [] }, { name: "Window functions", keys: [] }, { name: "Data modelling", keys: [] }] },
  { icon: "code", title: "Python", items: [{ name: "Pandas and NumPy", keys: ["python", "pandas"] }, { name: "Matplotlib and Seaborn", keys: [] }, { name: "Web scraping", keys: ["scrap", "beautifulsoup"] }, { name: "Streamlit apps", keys: [] }, { name: "Report automation", keys: [] }] },
  { icon: "chart", title: "BI and spreadsheets", items: [{ name: "Power BI", keys: ["power bi", "dashboard"] }, { name: "DAX measures", keys: [] }, { name: "KPI design", keys: [] }, { name: "Drill-through reports", keys: [] }, { name: "Advanced Excel", keys: [] }, { name: "Google Sheets", keys: [] }] },
  { icon: "sigma", title: "Statistics and analysis", items: [{ name: "Descriptive statistics", keys: [] }, { name: "Exploratory analysis", keys: ["eda", "analysis"] }, { name: "Correlation", keys: [] }, { name: "Outlier detection", keys: [] }, { name: "Segment and cohort analysis", keys: [] }, { name: "Data quality checks", keys: [] }] },
  { icon: "bulb", title: "Business and thinking", items: [{ name: "Understanding business problems", keys: [] }, { name: "Pattern recognition", keys: [] }, { name: "Connecting patterns across topics", keys: [] }, { name: "Polymath thinking", keys: [] }, { name: "Logical thinking", keys: [] }, { name: "Stakeholder negotiation", keys: [] }, { name: "Stakeholder communication", keys: [] }] },
];
export const education = [
  { title: "Bachelor of Computer Applications (BCA)", place: "Elite Degree College, Dubacherla, Andhra Pradesh", note: "2023 – 2026 · CGPA 8.2" },
  { title: "Data Analytics Training Program", place: "Innomatics Research Labs, Hyderabad", note: "Excel, SQL, Python, Power BI, Statistics" },
  { title: "Intermediate (CSE)", place: "Elite Junior College, Dubacherla, A.P.", note: "2021 – 2023" },
  { title: "SSC", place: "ZPO High School, G. Kothapalle, A.P.", note: "2020 – 2021" },
];
export const certs = ["AI Fluency: Prompt Design and Effective AI Usage, certified by Anthropic", "Typing Expert certification", "Published a Medium article on descriptive statistics"];
export const languages = "English (fluent) · Telugu (native) · Hindi (working proficiency)";
// Projects that have no public repository link yet.
export const extraProjects = [
  { key: "telco-churn", title: "Customer Churn Analysis: Telecom", summary: "Profiled churn drivers across contract type, tenure, service add-ons and billing method using segment and correlation analysis, then turned the findings into retention recommendations for high-risk segments.", category: "Python · Pandas · Seaborn" },
  { key: "expense-tracker", title: "Personal Expense Tracker", summary: "A Streamlit app with validated data entry, category-wise spend analytics and automated summaries.", category: "Python · Streamlit" },
];
