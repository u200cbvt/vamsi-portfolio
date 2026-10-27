// Editable site content. Only facts you have confirmed belong here. Move to the database in Stage 3.
export const site = {
  name: "Vamsi",
  role: "Data Analyst & Business Analyst (entry level)",
  headline: "Turning complex data into decisions that move businesses forward.",
  intro: "I analyse data with Python, SQL, Power BI and Excel, and I explain the result in plain business terms. I am looking for my first Data Analyst or Business Analyst role.",
  location: "Andhra Pradesh, India",
  about: [
    "I completed a Bachelor of Computer Applications and then a Data Analytics training programme at Innomatics Research Labs, Hyderabad.",
    "I enjoy turning a vague business question into a clear analysis: understand the question, clean and explore the data, then present what it means and where it falls short.",
    "I am targeting entry-level Data Analyst and Business Analyst roles, where I can keep building practical experience on real business problems.",
  ],
  email: "beatsvamsi@gmail.com",
  linkedin: "https://www.linkedin.com/in/vamsi-bodigadla-717330244",
  github: "https://github.com/u200cbvt", // verify this handle
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "",
};
export const skillGroups = [
  { title: "Programming and querying", items: ["Python (Pandas, NumPy)", "SQL"] },
  { title: "Business intelligence", items: ["Power BI", "Excel"] },
  { title: "Analysis and statistics", items: ["Descriptive statistics", "Exploratory data analysis", "Web scraping"] },
];
export const education = [
  { title: "Bachelor of Computer Applications (BCA)", place: "Elite Degree College, Dubacherla, Andhra Pradesh", note: "Completed 2026" },
  { title: "Data Analytics training", place: "Innomatics Research Labs, Hyderabad", note: "Completed" },
];
export const aboutCards = [
  { title: "Background", text: "BCA graduate, then Data Analytics training at Innomatics Research Labs, Hyderabad." },
  { title: "How I work", text: "Understand the business question, clean and explore the data, then explain what it means and where it falls short." },
  { title: "What I want next", text: "An entry-level Data Analyst, Business Analyst or MIS role where I keep learning on real business problems." },
];
