# Financial Analyst Portfolio Roadmap

**Goal:** Transition from Accounting to Financial Analyst
**Timeline:** ~3 months
**Target Companies:** Banks, Big 4, Fortune 500, Fintech, Investment Firms
**Industries:** Tech, Healthcare, Crypto, IT Services, Trading

---

## Your Project Portfolio (3 Projects)

| Order | Project | Primary Skills | Employer Appeal |
|-------|---------|----------------|-----------------|
| 1 | SQL Financial Database | SQL, Data Modeling | Banks/Big 4 essential |
| 2 | Healthcare/Tech Sector Analysis | Python, Research, Valuation | Investment firms |
| 3 | Automated Financial Report Generator | Python, Automation, End-to-End | Shows production skills |

---

## Phase 1: SQL Financial Database (Weeks 1-3)

### What You'll Build
A relational database for financial data with complex analytical queries.

### Database Schema
```
Tables:
├── companies (id, name, ticker, sector, industry)
├── financial_statements (company_id, year, quarter, type)
├── income_statement (revenue, cogs, gross_profit, operating_income, net_income)
├── balance_sheet (total_assets, total_liabilities, equity, cash, debt)
├── cash_flow (operating_cf, investing_cf, financing_cf, free_cash_flow)
├── stock_prices (company_id, date, open, high, low, close, volume)
└── ratios (company_id, period, roe, roa, current_ratio, debt_to_equity, pe_ratio)
```

### Skills to Learn
- [ ] SQL fundamentals (SELECT, JOIN, WHERE, GROUP BY)
- [ ] Window functions (LAG, LEAD, ROW_NUMBER, RANK)
- [ ] CTEs (Common Table Expressions)
- [ ] Database design principles (normalization, keys, indexes)
- [ ] PostgreSQL or SQLite

### Data Sources
- **SEC EDGAR**: Free financial statement data
- **Kaggle**: "S&P 500 Stock Data", "Financial Statements Dataset"
- **Yahoo Finance**: Historical stock prices

### Sample Queries to Build
1. Year-over-year revenue growth by company
2. Top 10 companies by profit margin in each sector
3. Companies where debt-to-equity increased >20% YoY
4. Rolling 4-quarter average revenue
5. Rank companies by ROE within their industry

### Deliverables
- [ ] Database schema diagram (draw.io or dbdiagram.io)
- [ ] SQL scripts to create tables
- [ ] 10+ analytical queries with business context
- [ ] README explaining the project
- [ ] GitHub repository

### Resources
- **SQLBolt** (free interactive SQL tutorial)
- **Mode Analytics SQL Tutorial** (free, business-focused)
- **PostgreSQL Tutorial** (postgresqltutorial.com)

---

## Phase 2: Healthcare/Tech Sector Analysis (Weeks 4-7)

### What You'll Build
Deep analysis of 5-10 companies in healthcare AND tech sectors with:
- Financial statement analysis
- Valuation models (DCF, comparables)
- Interactive Streamlit dashboard
- Investment thesis

### Companies to Analyze (Suggestions)

**Healthcare:**
- UnitedHealth (UNH) - insurance
- Pfizer (PFE) - pharma
- Intuitive Surgical (ISRG) - med devices
- Teladoc (TDOC) - telehealth/fintech crossover

**Tech:**
- Microsoft (MSFT) - diversified
- Salesforce (CRM) - SaaS
- Nvidia (NVDA) - semiconductors
- Palantir (PLTR) - data/AI

### Skills to Learn
- [ ] Python pandas for data manipulation
- [ ] yfinance library for market data
- [ ] Financial ratio calculations in Python
- [ ] Basic DCF valuation model
- [ ] Streamlit for dashboards
- [ ] Plotly/Altair for charts

### Dashboard Features
1. **Company Overview**: Key metrics, stock price chart
2. **Financial Statements**: Income, Balance Sheet, Cash Flow (multi-year)
3. **Ratio Analysis**: Profitability, liquidity, leverage ratios
4. **Peer Comparison**: Side-by-side company comparisons
5. **Valuation**: Simple DCF or P/E-based fair value estimate
6. **Sector View**: Aggregate sector trends

### Python Libraries
```
pandas          # data manipulation
yfinance        # stock/financial data
streamlit       # dashboard
plotly          # interactive charts
numpy           # calculations
```

### Deliverables
- [ ] Streamlit dashboard (deployed on Streamlit Cloud - free)
- [ ] Jupyter notebook with analysis
- [ ] Written investment thesis (1-2 pages per company)
- [ ] GitHub repository with clean code
- [ ] Demo video or screenshots

### Resources
- **yfinance documentation**
- **Streamlit tutorials** (streamlit.io/gallery)
- **Aswath Damodaran** (YouTube - valuation fundamentals)
- **Kaggle "Fundamental Analysis" notebooks**

---

## Phase 3: Automated Financial Report Generator (Weeks 8-11)

### What You'll Build
End-to-end pipeline that:
1. Pulls financial data automatically
2. Runs analysis
3. Generates PDF report
4. Optionally emails report

### Pipeline Architecture
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Data Pull  │ →  │  Analysis   │ →  │  Generate   │ →  │   Output    │
│  (APIs)     │    │  (Python)   │    │  PDF Report │    │  (Email/S3) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Report Contents
1. Executive Summary (auto-generated key insights)
2. Financial Highlights (revenue, profit, key ratios)
3. Charts (trends, comparisons)
4. Variance Analysis (vs prior period, vs budget)
5. Risk Flags (metrics outside normal range)

### Skills to Learn
- [ ] Python scripting (functions, modules, error handling)
- [ ] API data fetching (requests library)
- [ ] PDF generation (ReportLab or WeasyPrint)
- [ ] Jinja2 templates (for report structure)
- [ ] Scheduling (cron or GitHub Actions)
- [ ] Optional: email automation (smtplib)

### Python Libraries
```
pandas          # data
requests        # API calls
jinja2          # templating
weasyprint      # HTML to PDF (or reportlab)
matplotlib      # charts for PDF
schedule        # job scheduling
```

### Deliverables
- [ ] Working Python script/module
- [ ] Sample PDF reports (2-3 examples)
- [ ] Documentation on how to configure
- [ ] GitHub repository with CI/CD (GitHub Actions)
- [ ] Streamlit UI to trigger reports (optional)

### Resources
- **ReportLab documentation**
- **WeasyPrint documentation** (easier for HTML/CSS people)
- **Automate the Boring Stuff with Python** (free online)
- **GitHub Actions documentation**

---

## Week-by-Week Schedule

| Week | Focus | Milestone |
|------|-------|-----------|
| 1 | SQL basics, set up PostgreSQL | Complete SQLBolt tutorial |
| 2 | Design database schema | Schema diagram complete |
| 3 | Load data, write queries | 10 queries complete, GitHub repo live |
| 4 | Python pandas basics | Can load and manipulate financial data |
| 5 | yfinance + analysis code | Pull data for 10 companies |
| 6 | Streamlit basics | First dashboard deployed |
| 7 | Polish dashboard + write thesis | Sector analysis complete |
| 8 | Python scripting, PDF generation | Generate first PDF report |
| 9 | Build full pipeline | End-to-end automation works |
| 10 | Add scheduling + error handling | Production-ready code |
| 11 | Polish, document, demo | All projects portfolio-ready |
| 12 | Interview prep | Practice presenting projects |

---

## Tools Setup

### Required (Free)
- **Python 3.10+** (Anaconda or standard)
- **VS Code** (with Python extension)
- **PostgreSQL** (local) or **SQLite** (simpler)
- **Git + GitHub** (version control)
- **Streamlit Cloud** (free dashboard hosting)

### Recommended
- **DBeaver** (free SQL GUI)
- **Jupyter Notebooks** (for exploration)
- **draw.io** (for diagrams)

---

## GitHub Portfolio Structure

```
github.com/[your-username]/
├── sql-financial-database/
│   ├── README.md
│   ├── schema/
│   ├── queries/
│   └── data/
├── sector-analysis-dashboard/
│   ├── README.md
│   ├── app.py (Streamlit)
│   ├── analysis/
│   └── notebooks/
└── financial-report-generator/
    ├── README.md
    ├── src/
    ├── templates/
    └── sample_reports/
```

---

## Interview Presentation Tips

### For Each Project, Prepare:
1. **30-second pitch**: "I built X to solve Y using Z"
2. **Business context**: Why this matters to companies
3. **Technical walkthrough**: Key code decisions
4. **Results/insights**: What you learned or discovered
5. **Challenges overcome**: Shows problem-solving

### Sample Pitch (SQL Database)
> "I built a financial database to practice the kind of analytical queries used in FP&A. It includes 5 years of data for 50 S&P 500 companies. I wrote queries for YoY growth analysis, peer comparisons, and anomaly detection. This taught me how to structure financial data for analysis and write efficient SQL."

### Sample Pitch (Sector Analysis)
> "I analyzed 10 companies across healthcare and tech to compare valuations and identify investment opportunities. I built an interactive dashboard in Streamlit that lets you compare companies side-by-side. For example, I found that healthcare companies trade at lower P/E ratios despite similar growth rates, which might indicate undervaluation."

---

## Skills Progress Tracker

### SQL
- [ ] Basic queries (SELECT, WHERE, JOIN)
- [ ] Aggregations (GROUP BY, HAVING)
- [ ] Window functions
- [ ] CTEs and subqueries
- [ ] Database design

### Python
- [ ] Variables, functions, loops
- [ ] pandas DataFrames
- [ ] Reading APIs with requests
- [ ] Data visualization (matplotlib/plotly)
- [ ] File I/O (CSV, JSON, PDF)
- [ ] Error handling

### Financial Analysis
- [ ] Financial statement analysis
- [ ] Ratio analysis (profitability, liquidity, leverage)
- [ ] Valuation basics (DCF, comparables)
- [ ] Sector/industry analysis

### Tools
- [ ] Git/GitHub
- [ ] Streamlit
- [ ] PostgreSQL/SQLite
- [ ] Jupyter notebooks

---

## Next Steps

1. **This week**: Set up development environment (Python, VS Code, PostgreSQL)
2. **Start learning**: SQLBolt tutorial (free, ~4 hours)
3. **First mini-project**: Create 3 tables, load sample data, write 5 queries

---

## Confirmed Settings

- **Time commitment**: 10-15 hours/week
- **Timeline**: 12 weeks (3 months) - realistic for your pace
- **SQL Database**: SQLite (simpler setup, no server needed)

---

# PROJECT 1 DETAILED SPEC: SQL Financial Database

## Overview

| Attribute | Value |
|-----------|-------|
| **Project Name** | Financial Data Warehouse |
| **Duration** | Weeks 1-3 (~30-45 hours) |
| **Database** | SQLite |
| **Data Source** | Kaggle + Yahoo Finance |
| **Output** | GitHub repo with schema, data, 15+ queries |

---

## Database Schema

### Table 1: companies
```sql
CREATE TABLE companies (
    company_id INTEGER PRIMARY KEY,
    ticker TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    sector TEXT,
    industry TEXT,
    market_cap_category TEXT,  -- Large/Mid/Small
    founded_year INTEGER,
    headquarters TEXT
);
```

### Table 2: income_statements
```sql
CREATE TABLE income_statements (
    id INTEGER PRIMARY KEY,
    company_id INTEGER NOT NULL,
    fiscal_year INTEGER NOT NULL,
    fiscal_quarter TEXT,  -- Q1, Q2, Q3, Q4, or FY for annual
    revenue REAL,
    cost_of_revenue REAL,
    gross_profit REAL,
    operating_expenses REAL,
    operating_income REAL,
    interest_expense REAL,
    income_before_tax REAL,
    income_tax REAL,
    net_income REAL,
    eps_basic REAL,
    eps_diluted REAL,
    shares_outstanding REAL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
```

### Table 3: balance_sheets
```sql
CREATE TABLE balance_sheets (
    id INTEGER PRIMARY KEY,
    company_id INTEGER NOT NULL,
    fiscal_year INTEGER NOT NULL,
    fiscal_quarter TEXT,
    -- Assets
    cash_and_equivalents REAL,
    short_term_investments REAL,
    accounts_receivable REAL,
    inventory REAL,
    total_current_assets REAL,
    property_plant_equipment REAL,
    goodwill REAL,
    intangible_assets REAL,
    total_assets REAL,
    -- Liabilities
    accounts_payable REAL,
    short_term_debt REAL,
    total_current_liabilities REAL,
    long_term_debt REAL,
    total_liabilities REAL,
    -- Equity
    common_stock REAL,
    retained_earnings REAL,
    total_equity REAL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
```

### Table 4: cash_flows
```sql
CREATE TABLE cash_flows (
    id INTEGER PRIMARY KEY,
    company_id INTEGER NOT NULL,
    fiscal_year INTEGER NOT NULL,
    fiscal_quarter TEXT,
    -- Operating
    net_income REAL,
    depreciation REAL,
    changes_in_working_capital REAL,
    cash_from_operations REAL,
    -- Investing
    capital_expenditures REAL,
    acquisitions REAL,
    cash_from_investing REAL,
    -- Financing
    debt_issued REAL,
    debt_repaid REAL,
    dividends_paid REAL,
    stock_repurchased REAL,
    cash_from_financing REAL,
    -- Summary
    net_change_in_cash REAL,
    free_cash_flow REAL,  -- cash_from_operations - capital_expenditures
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
```

### Table 5: stock_prices
```sql
CREATE TABLE stock_prices (
    id INTEGER PRIMARY KEY,
    company_id INTEGER NOT NULL,
    date TEXT NOT NULL,  -- YYYY-MM-DD
    open_price REAL,
    high_price REAL,
    low_price REAL,
    close_price REAL,
    adjusted_close REAL,
    volume INTEGER,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
```

### Table 6: calculated_ratios
```sql
CREATE TABLE calculated_ratios (
    id INTEGER PRIMARY KEY,
    company_id INTEGER NOT NULL,
    fiscal_year INTEGER NOT NULL,
    -- Profitability
    gross_margin REAL,        -- gross_profit / revenue
    operating_margin REAL,    -- operating_income / revenue
    net_margin REAL,          -- net_income / revenue
    roe REAL,                 -- net_income / total_equity
    roa REAL,                 -- net_income / total_assets
    -- Liquidity
    current_ratio REAL,       -- current_assets / current_liabilities
    quick_ratio REAL,         -- (current_assets - inventory) / current_liabilities
    -- Leverage
    debt_to_equity REAL,      -- total_liabilities / total_equity
    debt_to_assets REAL,      -- total_liabilities / total_assets
    interest_coverage REAL,   -- operating_income / interest_expense
    -- Valuation (requires stock price)
    pe_ratio REAL,
    price_to_book REAL,
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
```

---

## Data Sources

### Option A: Kaggle Datasets (Recommended for starting)
1. **"S&P 500 Financial Statements"** by Andrew-MH
   - URL: kaggle.com/datasets/andrewmvd/sp-500-stocks
   - Contains: Income statements, balance sheets for S&P 500

2. **"Stock Market Dataset"** by jacksoncrow
   - URL: kaggle.com/datasets/jacksoncrow/stock-market-dataset
   - Contains: Daily stock prices for major stocks

### Option B: Python Script (After you learn basics)
```python
# Week 2-3: Pull fresh data with yfinance
import yfinance as yf

ticker = yf.Ticker("AAPL")
income_stmt = ticker.financials
balance_sheet = ticker.balance_sheet
cash_flow = ticker.cashflow
```

### Companies to Include (Start with 20-30)
**Tech:** AAPL, MSFT, GOOGL, AMZN, META, NVDA, CRM, ADBE
**Healthcare:** UNH, JNJ, PFE, ABBV, MRK, ISRG
**Finance:** JPM, BAC, GS, V, MA
**Other:** WMT, HD, NKE, COST, DIS

---

## 15 Analytical Queries

### Basic Queries (Week 1)

**Query 1: Revenue by Company**
```sql
-- List all companies with their latest annual revenue
SELECT
    c.ticker,
    c.name,
    i.fiscal_year,
    i.revenue,
    i.net_income
FROM companies c
JOIN income_statements i ON c.company_id = i.company_id
WHERE i.fiscal_quarter = 'FY'
ORDER BY i.revenue DESC;
```

**Query 2: Sector Summary**
```sql
-- Total revenue by sector
SELECT
    c.sector,
    COUNT(DISTINCT c.company_id) as company_count,
    SUM(i.revenue) as total_revenue,
    AVG(i.net_income) as avg_net_income
FROM companies c
JOIN income_statements i ON c.company_id = i.company_id
WHERE i.fiscal_year = 2023 AND i.fiscal_quarter = 'FY'
GROUP BY c.sector
ORDER BY total_revenue DESC;
```

**Query 3: Profitable vs Unprofitable**
```sql
-- Companies with positive vs negative net income
SELECT
    c.ticker,
    c.sector,
    i.net_income,
    CASE
        WHEN i.net_income > 0 THEN 'Profitable'
        ELSE 'Unprofitable'
    END as profitability
FROM companies c
JOIN income_statements i ON c.company_id = i.company_id
WHERE i.fiscal_year = 2023 AND i.fiscal_quarter = 'FY';
```

### Intermediate Queries (Week 2)

**Query 4: Year-over-Year Revenue Growth**
```sql
-- Calculate YoY revenue growth for each company
WITH yearly_revenue AS (
    SELECT
        company_id,
        fiscal_year,
        revenue,
        LAG(revenue) OVER (PARTITION BY company_id ORDER BY fiscal_year) as prev_revenue
    FROM income_statements
    WHERE fiscal_quarter = 'FY'
)
SELECT
    c.ticker,
    yr.fiscal_year,
    yr.revenue,
    yr.prev_revenue,
    ROUND((yr.revenue - yr.prev_revenue) / yr.prev_revenue * 100, 2) as yoy_growth_pct
FROM yearly_revenue yr
JOIN companies c ON yr.company_id = c.company_id
WHERE yr.prev_revenue IS NOT NULL
ORDER BY c.ticker, yr.fiscal_year;
```

**Query 5: Rank Companies by Profit Margin within Sector**
```sql
-- Rank companies by net margin within their sector
SELECT
    c.ticker,
    c.sector,
    r.net_margin,
    RANK() OVER (PARTITION BY c.sector ORDER BY r.net_margin DESC) as margin_rank
FROM companies c
JOIN calculated_ratios r ON c.company_id = r.company_id
WHERE r.fiscal_year = 2023
ORDER BY c.sector, margin_rank;
```

**Query 6: Companies with Deteriorating Margins**
```sql
-- Find companies where margins decreased year-over-year
WITH margin_changes AS (
    SELECT
        company_id,
        fiscal_year,
        net_margin,
        LAG(net_margin) OVER (PARTITION BY company_id ORDER BY fiscal_year) as prev_margin
    FROM calculated_ratios
)
SELECT
    c.ticker,
    mc.fiscal_year,
    ROUND(mc.prev_margin * 100, 2) as prev_margin_pct,
    ROUND(mc.net_margin * 100, 2) as current_margin_pct,
    ROUND((mc.net_margin - mc.prev_margin) * 100, 2) as margin_change_pct
FROM margin_changes mc
JOIN companies c ON mc.company_id = c.company_id
WHERE mc.net_margin < mc.prev_margin
ORDER BY margin_change_pct ASC;
```

**Query 7: Debt Analysis**
```sql
-- Companies with high debt-to-equity (>1.5) and low interest coverage (<3)
SELECT
    c.ticker,
    c.sector,
    r.debt_to_equity,
    r.interest_coverage,
    CASE
        WHEN r.debt_to_equity > 2 AND r.interest_coverage < 2 THEN 'High Risk'
        WHEN r.debt_to_equity > 1.5 THEN 'Moderate Risk'
        ELSE 'Low Risk'
    END as debt_risk_level
FROM companies c
JOIN calculated_ratios r ON c.company_id = r.company_id
WHERE r.fiscal_year = 2023
ORDER BY r.debt_to_equity DESC;
```

### Advanced Queries (Week 3)

**Query 8: Rolling 4-Quarter Revenue**
```sql
-- Calculate rolling 4-quarter (TTM) revenue
SELECT
    c.ticker,
    i.fiscal_year,
    i.fiscal_quarter,
    i.revenue as quarterly_revenue,
    SUM(i.revenue) OVER (
        PARTITION BY c.company_id
        ORDER BY i.fiscal_year, i.fiscal_quarter
        ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
    ) as ttm_revenue
FROM companies c
JOIN income_statements i ON c.company_id = i.company_id
WHERE i.fiscal_quarter != 'FY'
ORDER BY c.ticker, i.fiscal_year, i.fiscal_quarter;
```

**Query 9: Free Cash Flow Trend**
```sql
-- Companies with consistent positive free cash flow (3+ years)
WITH fcf_years AS (
    SELECT
        company_id,
        COUNT(*) as positive_fcf_years
    FROM cash_flows
    WHERE fiscal_quarter = 'FY' AND free_cash_flow > 0
    GROUP BY company_id
)
SELECT
    c.ticker,
    c.name,
    fy.positive_fcf_years,
    cf.free_cash_flow as latest_fcf
FROM fcf_years fy
JOIN companies c ON fy.company_id = c.company_id
JOIN cash_flows cf ON c.company_id = cf.company_id
WHERE fy.positive_fcf_years >= 3
  AND cf.fiscal_year = 2023 AND cf.fiscal_quarter = 'FY'
ORDER BY cf.free_cash_flow DESC;
```

**Query 10: Peer Comparison**
```sql
-- Compare a company to its sector peers
WITH sector_stats AS (
    SELECT
        c.sector,
        AVG(r.net_margin) as avg_margin,
        AVG(r.roe) as avg_roe,
        AVG(r.debt_to_equity) as avg_dte
    FROM companies c
    JOIN calculated_ratios r ON c.company_id = r.company_id
    WHERE r.fiscal_year = 2023
    GROUP BY c.sector
)
SELECT
    c.ticker,
    c.sector,
    ROUND(r.net_margin * 100, 2) as net_margin_pct,
    ROUND(ss.avg_margin * 100, 2) as sector_avg_margin_pct,
    ROUND((r.net_margin - ss.avg_margin) * 100, 2) as vs_sector,
    CASE
        WHEN r.net_margin > ss.avg_margin THEN 'Above Average'
        ELSE 'Below Average'
    END as performance
FROM companies c
JOIN calculated_ratios r ON c.company_id = r.company_id
JOIN sector_stats ss ON c.sector = ss.sector
WHERE r.fiscal_year = 2023
ORDER BY vs_sector DESC;
```

**Query 11: Stock Price vs Fundamentals**
```sql
-- Compare latest stock price to book value
SELECT
    c.ticker,
    sp.close_price,
    b.total_equity / i.shares_outstanding as book_value_per_share,
    ROUND(sp.close_price / (b.total_equity / i.shares_outstanding), 2) as price_to_book
FROM companies c
JOIN stock_prices sp ON c.company_id = sp.company_id
JOIN balance_sheets b ON c.company_id = b.company_id
JOIN income_statements i ON c.company_id = i.company_id
WHERE sp.date = (SELECT MAX(date) FROM stock_prices)
  AND b.fiscal_year = 2023 AND b.fiscal_quarter = 'FY'
  AND i.fiscal_year = 2023 AND i.fiscal_quarter = 'FY'
ORDER BY price_to_book DESC;
```

**Query 12: Anomaly Detection - Revenue Spikes**
```sql
-- Find quarters with unusual revenue changes (>30% QoQ)
WITH quarterly_changes AS (
    SELECT
        company_id,
        fiscal_year,
        fiscal_quarter,
        revenue,
        LAG(revenue) OVER (PARTITION BY company_id ORDER BY fiscal_year, fiscal_quarter) as prev_revenue
    FROM income_statements
    WHERE fiscal_quarter != 'FY'
)
SELECT
    c.ticker,
    qc.fiscal_year,
    qc.fiscal_quarter,
    qc.revenue,
    qc.prev_revenue,
    ROUND((qc.revenue - qc.prev_revenue) / qc.prev_revenue * 100, 2) as qoq_change_pct
FROM quarterly_changes qc
JOIN companies c ON qc.company_id = c.company_id
WHERE ABS((qc.revenue - qc.prev_revenue) / qc.prev_revenue) > 0.30
ORDER BY ABS((qc.revenue - qc.prev_revenue) / qc.prev_revenue) DESC;
```

**Query 13: Investment Screen - Quality Companies**
```sql
-- Screen for "quality" companies: high ROE, low debt, positive FCF
SELECT
    c.ticker,
    c.name,
    c.sector,
    ROUND(r.roe * 100, 2) as roe_pct,
    ROUND(r.debt_to_equity, 2) as debt_to_equity,
    cf.free_cash_flow
FROM companies c
JOIN calculated_ratios r ON c.company_id = r.company_id
JOIN cash_flows cf ON c.company_id = cf.company_id
WHERE r.fiscal_year = 2023
  AND cf.fiscal_year = 2023 AND cf.fiscal_quarter = 'FY'
  AND r.roe > 0.15           -- ROE > 15%
  AND r.debt_to_equity < 1   -- Debt/Equity < 1
  AND cf.free_cash_flow > 0  -- Positive FCF
ORDER BY r.roe DESC;
```

**Query 14: Cash Position Analysis**
```sql
-- Companies with high cash relative to market cap
SELECT
    c.ticker,
    b.cash_and_equivalents + b.short_term_investments as total_cash,
    b.total_assets,
    ROUND((b.cash_and_equivalents + b.short_term_investments) / b.total_assets * 100, 2) as cash_pct_of_assets,
    ROUND((b.cash_and_equivalents + b.short_term_investments) - b.total_liabilities, 2) as net_cash
FROM companies c
JOIN balance_sheets b ON c.company_id = b.company_id
WHERE b.fiscal_year = 2023 AND b.fiscal_quarter = 'FY'
ORDER BY cash_pct_of_assets DESC;
```

**Query 15: Multi-Year Performance Summary**
```sql
-- 3-year compound annual growth rate (CAGR) for revenue
WITH revenue_endpoints AS (
    SELECT
        company_id,
        MAX(CASE WHEN fiscal_year = 2021 THEN revenue END) as revenue_2021,
        MAX(CASE WHEN fiscal_year = 2023 THEN revenue END) as revenue_2023
    FROM income_statements
    WHERE fiscal_quarter = 'FY'
    GROUP BY company_id
)
SELECT
    c.ticker,
    re.revenue_2021,
    re.revenue_2023,
    ROUND((POWER(re.revenue_2023 / re.revenue_2021, 1.0/2) - 1) * 100, 2) as revenue_cagr_pct
FROM revenue_endpoints re
JOIN companies c ON re.company_id = c.company_id
WHERE re.revenue_2021 > 0 AND re.revenue_2023 > 0
ORDER BY revenue_cagr_pct DESC;
```

---

## Week-by-Week Tasks for Project 1

### Week 1: Setup & Basics
- [ ] Install SQLite and DBeaver
- [ ] Complete SQLBolt tutorial (sections 1-12)
- [ ] Create database file: `financial_data.db`
- [ ] Create all 6 tables
- [ ] Download Kaggle dataset
- [ ] Load sample data (10 companies, 3 years)
- [ ] Write queries 1-3

### Week 2: Intermediate SQL
- [ ] Load full dataset (20-30 companies)
- [ ] Learn window functions (LAG, RANK, SUM OVER)
- [ ] Learn CTEs (WITH clauses)
- [ ] Write queries 4-7
- [ ] Create calculated_ratios table with formulas

### Week 3: Advanced & Polish
- [ ] Write queries 8-15
- [ ] Create schema diagram
- [ ] Write README with project explanation
- [ ] Add comments explaining business logic
- [ ] Push to GitHub
- [ ] Test all queries work correctly

---

## README Template for GitHub

```markdown
# SQL Financial Database

A relational database for financial analysis with 15+ analytical queries.

## Overview
This project demonstrates SQL skills applied to financial data:
- Database design for financial statements
- Complex analytical queries (CTEs, window functions)
- Ratio calculations and peer analysis

## Database Schema
[Include schema diagram image]

## Tables
- `companies` - Company metadata (ticker, sector, industry)
- `income_statements` - Revenue, expenses, net income
- `balance_sheets` - Assets, liabilities, equity
- `cash_flows` - Operating, investing, financing activities
- `stock_prices` - Historical daily prices
- `calculated_ratios` - Profitability, liquidity, leverage ratios

## Sample Queries

### YoY Revenue Growth
[Query code]

### Peer Comparison
[Query code]

## Data Sources
- S&P 500 Financial Statements (Kaggle)
- Historical stock prices (Yahoo Finance)

## How to Run
1. Install SQLite
2. Run `schema.sql` to create tables
3. Run `load_data.sql` to populate
4. Execute queries in `queries/` folder

## Author
[Your name] - Aspiring Financial Analyst
```

---

## Success Criteria for Project 1

- [ ] Database contains 20+ companies, 3+ years of data
- [ ] All 6 tables created with proper relationships
- [ ] 15 queries execute without errors
- [ ] Queries demonstrate: JOINs, aggregations, window functions, CTEs
- [ ] README clearly explains the project
- [ ] Code is on GitHub with clean commit history
