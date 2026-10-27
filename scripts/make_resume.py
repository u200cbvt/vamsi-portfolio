# Regenerates public/resume.pdf (single-column, text-based, ATS-friendly). Run: python scripts/make_resume.py
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
B = ParagraphStyle("b", fontName="Helvetica", fontSize=10, leading=13.5)
H = ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=11, leading=14, spaceBefore=9, spaceAfter=2, textColor=colors.HexColor("#2b2f6e"))
N = ParagraphStyle("n", parent=B, fontName="Helvetica-Bold", fontSize=20, leading=24)
S = ParagraphStyle("s", parent=B, textColor=colors.HexColor("#444444"))
L = ParagraphStyle("l", parent=B, leftIndent=10, bulletIndent=0)
def sec(story, t): story += [Paragraph(t.upper(), H), HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#bbbbbb")), Spacer(1, 3)]
def bl(story, t): story.append(Paragraph(t, L, bulletText="\u2022"))
d = SimpleDocTemplate("public/resume.pdf", pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=15*mm, bottomMargin=14*mm, title="Vamsi Bodigadla - Resume", author="Vamsi Bodigadla")
s = [Paragraph("Vamsi Bodigadla", N), Paragraph("Aspiring Data Analyst / Business Analyst", S),
     Paragraph("Andhra Pradesh, India (open to Hyderabad and relocation) | beatsvamsi@gmail.com | linkedin.com/in/vamsi-bodigadla-717330244 | github.com/u200cbvt | vamsi-portfolio-pearl.vercel.app", S)]
sec(s, "Summary")
s.append(Paragraph("Data Analytics trainee and BCA graduate (2026, CGPA 8.2) who builds analyses in Python, SQL and Power BI and explains the findings in plain business language. A curious generalist who looks for relationships across topics and tests them with data. Seeking an entry-level Data Analyst or Business Analyst role.", B))
sec(s, "Skills")
for t in ["<b>Programming and querying:</b> Python (Pandas, NumPy), SQL (joins, CTEs, window functions), Streamlit",
          "<b>Business intelligence:</b> Power BI (DAX, dashboards, drill-through), Excel",
          "<b>Analysis:</b> Exploratory data analysis, descriptive statistics, web scraping"]: bl(s, t)
sec(s, "Projects")
for t in ["<b>Used Car Market Analysis (Cars24)</b> - Web scraping and EDA on used-car listings across 4 brands and 4 cities using Python, BeautifulSoup, Pandas and Regex. Analysed pricing by brand, city, age, fuel type and transmission and answered 8 business questions.",
          "<b>Global Retail Sales Dashboard</b> - Power BI dashboard on the Global Superstore dataset covering sales, profit, customer segments, regions and top-selling products.",
          "<b>Music Store Management (Chinook database)</b> - SQL analysis of customer purchasing behaviour, sales performance and music preferences.",
          "<b>Telco Customer Churn Analysis (in progress)</b> - Exploratory analysis of the IBM telco churn dataset in Google Colab, covering missing-value handling and outlier detection."]: bl(s, t)
sec(s, "Education and Training")
bl(s, "<b>Bachelor of Computer Applications (BCA)</b> - Elite Degree College, Dubacherla, Andhra Pradesh. 2026. CGPA 8.2.")
bl(s, "<b>Data Analytics training</b> - Innomatics Research Labs, Hyderabad. Completed.")
d.build(s)
