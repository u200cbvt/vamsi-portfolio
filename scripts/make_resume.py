# Regenerates public/resume.pdf from the owner's resume text. Run: python scripts/make_resume.py
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
B = ParagraphStyle("b", fontName="Helvetica", fontSize=9.4, leading=12.4)
H = ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=10.5, leading=13, spaceBefore=8, spaceAfter=2, textColor=colors.HexColor("#0f4c5c"))
N = ParagraphStyle("n", parent=B, fontName="Helvetica-Bold", fontSize=20, leading=24)
T = ParagraphStyle("t", parent=B, fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=colors.HexColor("#0f4c5c"))
S = ParagraphStyle("s", parent=B, textColor=colors.HexColor("#444444"))
P = ParagraphStyle("p", parent=B, fontName="Helvetica-Bold", spaceBefore=4)
L = ParagraphStyle("l", parent=B, leftIndent=10)
def sec(s, t): s += [Paragraph(t, H), HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#bbbbbb")), Spacer(1, 3)]
def bl(s, t): s.append(Paragraph(t, L, bulletText="\u2022"))
d = SimpleDocTemplate("public/resume.pdf", pagesize=A4, leftMargin=17*mm, rightMargin=17*mm, topMargin=13*mm, bottomMargin=12*mm, title="Vamsi Bodigadla - Resume", author="Vamsi Bodigadla")
s = [Paragraph("VAMSI BODIGADLA", N), Paragraph("Data Analyst | SQL \u2022 Python \u2022 Power BI \u2022 Advanced Excel \u2022 Statistics", T),
     Paragraph("Hyderabad, Telangana, India | Open to relocation | +91 90144 13204 | beatsvamsi@gmail.com", S),
     Paragraph("linkedin.com/in/vamsi-bodigadla-717330244 | github.com/u200cbvt", S)]
sec(s, "PROFESSIONAL SUMMARY")
s.append(Paragraph("Data Analyst (BCA, 2026) trained through an intensive industry data analytics program in SQL, Python, Power BI, Advanced Excel and Statistics. Built 6+ end-to-end analytics projects covering the full data lifecycle \u2014 web scraping and collection, cleaning and validation, exploratory data analysis, KPI design and interactive dashboards. Strong at writing complex SQL against multi-table schemas, automating repetitive reporting in Python, and translating analysis into decision-ready recommendations for non-technical stakeholders. Anthropic AI Fluency certified.", B))
sec(s, "TECHNICAL SKILLS")
for t in ["<b>SQL &amp; Databases:</b> MySQL \u2014 joins, subqueries, CTEs, window functions (DENSE_RANK, ROW_NUMBER), aggregations, GROUP BY/HAVING, DDL/DML, table and schema design, data modelling",
 "<b>Programming:</b> Python \u2014 Pandas, NumPy, Matplotlib, Seaborn for data cleaning, merging, feature engineering and EDA; BeautifulSoup/Requests web scraping; openpyxl report automation; Streamlit apps; Java (basics)",
 "<b>BI &amp; Visualisation:</b> Power BI \u2014 data modelling, DAX measures, KPI cards, slicers, gauge and scatter visuals, drill-through pages, executive vs. analyst report layers; dashboard design and storytelling",
 "<b>Spreadsheets:</b> Advanced Excel &amp; Google Sheets \u2014 pivot tables, VLOOKUP/XLOOKUP, INDEX-MATCH, conditional formatting, data validation, charting, Power Query basics, Python-driven report automation",
 "<b>Statistics &amp; Analytics:</b> Descriptive statistics, distributions, correlation, outlier and anomaly detection, cohort and segment analysis, trend and pattern identification, data quality and integrity checks, KPI definition",
 "<b>Tools &amp; Workflow:</b> Jupyter Notebook, Google Colab, VS Code, Git &amp; GitHub, MySQL Workbench, Google Workspace, AI-assisted analysis and prompt design (Anthropic AI Fluency certified); currently strengthening Tableau, hypothesis testing and Azure data fundamentals"]: bl(s, t)
sec(s, "ANALYTICS PROJECTS")
for h, bs in [("Used-Car Market Analysis \u2014 Capstone (Cars24) | Python, Pandas, BeautifulSoup, Regex, Matplotlib", ["Scraped and consolidated 4,000+ used-car listings across 4 brands and 4 cities into a single analysis-ready dataset via a repeatable scraping routine.", "Cleaned and standardised raw records with regex rules and Pandas \u2014 resolving anomalies, duplicates and inconsistent formats \u2014 and engineered features (age, price band, km bucket).", "Analysed pricing and depreciation trends by brand, city, fuel type and ownership, and presented findings in a 25-slide stakeholder deck with actionable pricing recommendations."]),
 ("Global Superstore Sales Dashboard | Power BI, DAX, Excel", ["Built an end-to-end Power BI dashboard with KPI cards, interactive slicers, a gauge visual and drill-through pages, turning a raw sales dataset into self-service reporting for business users.", "Designed dual-layer reporting \u2014 executive summary plus analyst drill-down \u2014 tracking segment profitability, category performance and delivery timeliness, and flagging loss-making transactions."]),
 ("Music Store Analytics | MySQL, GitHub \u2014 github.com/u200cbvt/Music_store_Management", ["Answered 11 business questions on sales, geography and customer purchasing behaviour using joins, CTEs and window functions across a multi-table relational database (Chinook schema).", "Documented query logic and findings in a 20-slide report and published the full project to GitHub."]),
 ("Customer Churn Analysis \u2014 Telecom | Python, Pandas, Seaborn, Google Colab", ["Profiled churn drivers across contract type, tenure, service add-ons and billing method using segment and correlation analysis, converting the findings into retention recommendations for high-risk segments."])]:
    s.append(Paragraph(h, P)); [bl(s, b) for b in bs]
s.append(Paragraph("<b>Personal Expense Tracker | Python, Streamlit</b> \u2014 validated data entry, category-wise spend analytics, automated summaries.", ParagraphStyle("x", parent=B, spaceBefore=4)))
sec(s, "TRAINING &amp; CERTIFICATIONS")
bl(s, "Data Analytics Training Program \u2014 Innomatics Research Labs, Hyderabad (Excel, SQL, Python, Power BI, Statistics; NASSCOM FutureSkills Prime aligned)")
bl(s, "AI Fluency: Prompt Design and Effective AI Usage \u2014 certified by Anthropic | Typing Expert Certification (high-accuracy touch-typing) | Published a Medium article on descriptive statistics")
sec(s, "EDUCATION")
bl(s, "<b>Bachelor of Computer Applications (BCA)</b> | Elite Degree College, Dubacherla, Andhra Pradesh | 2023 \u2013 2026. Relevant coursework: Statistics, Data Analytics, Database Concepts, Programming Fundamentals")
bl(s, "Intermediate (CSE), 2021\u20132023 \u2014 Elite Junior College, Dubacherla, A.P. | SSC, 2020\u20132021 \u2014 ZPO High School, G. Kothapalle, A.P.")
sec(s, "ADDITIONAL INFORMATION")
s.append(Paragraph("<b>Strengths:</b> Analytical problem-solving, attention to detail and data accuracy, stakeholder communication, documentation discipline", B))
s.append(Paragraph("<b>Languages:</b> English (fluent) | Telugu (native) | Hindi (working proficiency) &nbsp;&nbsp; <b>Availability:</b> Immediate joiner; open to relocation", B))
d.build(s)
