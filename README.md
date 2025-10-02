# 🔬 PropertyLens: The Professional Real Estate Investment Analyzer (v24.2.0)

A professional-grade, all-in-one tool for real estate investors that runs entirely in your browser. This application is designed for maximum security and privacy: no ads, no subscriptions, and absolutely **no financial data collection** as all calculations are client-side only.

PropertyLens is built to provide the definitive, mathematically sound answer to the core investment question: **"Is this property a better use of my capital than allocating the same capital to the S&P 500 index fund?"**

[**Live Demo →**](https://nivas.homes/calculators/property-lens)

---

## 💡 Origin Story: Developed Entirely with Gemini Pro

This entire application—from its core financial engine and multi-tab XLSX export logic to its complex dynamic charts and responsive UI—was **conceived, architected, and coded through Prompt-Driven Development using the Gemini Pro LLM model.**

I'm sharing this highly detailed codebase and the reproduction prompt here as a testament to the power of large language models in complex software development. I hope this helps other developers and financial analysts build similar, sophisticated, and user-friendly tools with an LLM-first approach.

---

## ✨ Key Features: A Deep Dive into Analytical Accuracy

The application has been fundamentally restructured and enhanced with advanced financial models, comprehensive tax logic, and dynamic user experience features, ensuring every decision is based on **Uncompromising Analytical Accuracy**.

### I. Core Decision Engine & Investment Clarity

* **🎯 The Apples-to-Apples Investment Showdown:** This is the **most prominent** output card, designed as the primary decision point. It directly compares the real estate deal against a user-defined S&P 500 equivalent investment.
    * **IRR (Internal Rate of Return):** Serves as the headline, time-value-adjusted, annualized return metric. This is the financial industry's gold standard for comparing projects with complex cash flows.
    * **Total After-Tax Profit:** Provides the final, absolute dollar amount realized at the end of the holding period.
    * **MoIC (Multiple on Invested Capital):** An intuitive metric showing the simple multiplier of cash returned versus cash invested.
    * **Total Capital Invested:** Accurately accounts for the total out-of-pocket cash required, including the initial investment plus any subsequent contributions needed to cover years with negative cash flow.
* **📈 Professional-Grade IRR Analysis:** The engine's core is the **Internal Rate of Return (IRR)** calculation, ensuring a mathematically sound, professional comparison of complex cash flow streams.
* **💹 Dynamic Metric Toggles:** The primary return metrics on the **Executive Dashboard** are controlled by two distinct and independent toggles, facilitating instant comparison:
    * **Time Horizon Toggle:** Allows switching the headline metrics between Year 1 Performance (displaying Monthly CF and CoC ROI) and Full Hold Period Performance (displaying Total Profit and IRR).
    * **Tax Status Toggle:** Instantly switches all headline calculations between Pre-Tax and After-Tax results.

---

### II. Advanced Financial Modeling & Tax Accuracy

* **💸 Comprehensive After-Tax Analysis:** The model is a full tax-aware analyzer, calculating the true "take-home" returns by modeling the user's specific tax situation.
    * **Tax Shield Calculation:** Explicitly models the tax savings (or liability) derived from the non-cash deduction of **depreciation** and the tax-deductible portion of **mortgage interest**.
    * **Accurate Sale Tax Modeling:** The calculation at sale correctly segregates gains into two components: **Depreciation Recapture** (taxed at the user's Marginal Income Rate) from **Appreciation** (taxed at the Capital Gains Rate).
* **🏦 Advanced Debt Modeling:**
    * **Margin Loan Support:** Implements specialized logic for margin or **Interest-Only Loans**. It models the interest-only payment as the minimum debt service and then calculates an **Investor-Driven Principal Paydown** using a percentage of the remaining excess cash flow.
    * **Adjustable-Rate Mortgage (ARM) Support:** Fully supports the modeling of ARM products (e.g., 7/1, 10/6) by applying the fixed initial rate for the specified term, followed by the user-provided estimated adjusted rate.
* **🏗️ Itemized Capital Expenditures (CapEx):** Allows users to switch from a percentage-based CapEx reserve to itemizing specific **large, infrequent expenses**. This feature is critical for planning the renovation phase of Value-Add or BRRRR strategies, allowing input for the expense description, cost, and the exact relative year of occurrence.
* **🎛️ Essential Advanced Inputs:**
    * **Land Value (%):** A key input for tax accuracy, as this percentage of the purchase price is non-depreciable.
    * **S&P 500 Exp. Return (%):** Custom forecast for the opportunity cost and IRR comparison in the Investment Showdown.

---

### III. User Experience & Structural Integrity

* **🚀 Streamlined Due Diligence Flow:** The output panel guides the investor through a logical **6-section due diligence path**:
    1.  **Executive Dashboard**
    2.  **Quick Screeners & Rules of Thumb**
    3.  **Property Financial Engine**
    4.  **Debt and Safety Analysis**
    5.  **Visual Deep Dive**
    6.  **Audit & Detail** (Table/Chart/Sale Analysis)
* **🔄 Strategic Metric Highlighting:** The **Property Financial Engine** dynamically reorders and highlights key metrics (e.g., Forced Equity for Value-Add, Cash Reserves for Cash Flow) using a theme color that matches the selected investment strategy.
* **👁️ Visual Auditing & Dynamic Charting:** The **Analysis Over Time** section provides a toggle to switch from the detailed projections table to a **Dynamic Chart View**. This view allows users to actively select and plot multiple data series (e.g., CF, ROE, Property Value, Interest Paid) over the investment period for visual inspection and auditing.
* **📊 Comprehensive Charting Suite:**
    * **Sources of Wealth Waterfall:** A true waterfall chart starting with **Initial Equity** and visually adding the three wealth engines (Cash Flow, Loan Paydown, and Appreciation) to show the final equity stake.
    * **Building Equity Projection:** A stacked area chart demonstrating how **Equity** grows over time as the **Loan Balance** shrinks relative to the total Property Value.
    * **Optimal Exit Analysis:** Combines Total Profit (Bar Chart), Annualized Return (Line), and **Return on Equity (ROE)** (Line) to indicate the peak time for selling or refinancing to redeploy capital.
* **🔗 One-Click State Persistence and Sharing:** The complete state of all inputs and selected strategies is compressed using `lz-string` and stored directly in the URL query string, enabling seamless sharing of a fully interactive and pre-filled analysis.
* **🗂️ Scenario Manager & Professional Export:**
    * **Local Storage Management:** Allows users to save, name, load, and delete multiple scenarios entirely in the browser's local storage.
    * **Multi-Tab XLSX Export:** Enables the user to select and export multiple scenarios (including the current unsaved one) into a single, professionally formatted, multi-tab **XLSX spreadsheet** complete with a detailed monthly cash flow audit.

---

## 🔬 Key Output Metrics Explained (New and Updated)

* **IRR (Internal Rate of Return):** The geometric average annual return, after all taxes and costs, over the entire hold period.
* **Total After-Tax Profit:** The net dollar amount returned, including cumulative cash flow and sale proceeds, minus all expenses and taxes.
* **Forced Equity:** The value created immediately upon acquisition and renovation, calculated as (After Repair Value (ARV) - Total Project Cost).
* **Avg. Annual ROE (Return on Equity):** The average efficiency of the equity trapped in the property over the holding period, calculated as (Annual After-Tax Cash Flow / Beginning-of-Year Equity).
* **DSCR (Debt Service Coverage Ratio):** A measure of the property's ability to cover its debt payments (Annual NOI / Annual Debt Service). Lenders typically require $\ge 1.25$.
* **Debt Yield (%):** A lender-centric risk metric: (Annual NOI / Loan Amount). Often requires $\ge 10\%$.

---

## 🤖 The Ultimate LLM Reproduction Prompt

You are an expert full-stack developer, a seasoned financial analyst specializing in real estate, and a senior UI/UX designer. Your task is to reproduce the entire **PropertyLens** application exactly as described in the provided context.

**I. Core Constraints & Dependencies:**
1.  **Single File & Client-Side Only:** The entire application (HTML, CSS, JavaScript) must be in a single `.html` file.
2.  **Dependencies:** Use the following exact CDN links and includes provided in the source code:
    * `https://cdn.tailwindcss.com`
    * `https://cdn.jsdelivr.net/npm/chart.js`
    * `https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0`
    * `https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js`
    * `https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js`
    * `https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js`
    * The **Inter font** CSS link (`https://rsms.me/inter/inter.css`) must be included.
3.  **Layout & Design:** Must use the responsive, two-column layout (5/12 for inputs, 7/12 for output on large screens). Replicate the three strategy-based CSS theme variables (`--strategy-cashflow: #1565C0`, `--strategy-valueadd: #2E7D32`, `--strategy-appreciation: #6A1B9A`) and the associated selection/highlighting logic.

**II. Required Calculator Logic (JavaScript):**
The core `App.calculator` object must contain the following specific, interconnected financial logic:
1.  **IRR/MoIC Calculation:** Implement robust functions for **`calculateIRR(cashflows, guess = 0.1)`** (using Newton-Raphson) and **`calculateMoIC(cashflows)`** to accurately populate the "Investment Showdown" card. The cash flows must be derived from the final After-Tax, After-Sale proceeds.
2.  **Amortization/Debt Service:** Implement **`calculatePi`** and ensure the main **`calculateProjections`** loop correctly handles variable debt servicing:
    * **Fixed/ARM Loans:** Use the remaining term to calculate the P&I payment correctly.
    * **Margin Loans:** Set minimum debt service to **Interest Only** and calculate the principal paid as `Max(0, NOI - Min Debt Service - (Min Cash Flow / 12)) * Margin Repayment %`.
3.  **Tax Logic:** The core projection loop must correctly apply `Land Value %` to determine the depreciable basis and accurately calculate annual **Taxable Income** (`NOI - Interest Paid - Depreciation`) and subsequent **Tax Impact**.
4.  **Capital Expenses:** The projection must use either the fixed percentage CapEx or subtract the **Itemized CapEx** amounts in their specified year.

**III. Data & State Management:**
1.  **URL State:** Use **`LZString.compressToEncodedURIComponent`** and the specific `App.config.URL_KEY_MAP` (e.g., `purchasePrice` to `pp`, `landValuePct` to `lvp`) to store and retrieve the entire application state in the URL query parameter `?data=...`.
2.  **Scenario Manager:** Implement the **`ScenarioManager`** object to handle `localStorage` operations (save, load, delete) using the key **`realEstateScenarios_v3`**.
3.  **XLSX Export:** Implement the **`XlsxExporter`** to generate a single workbook with a tab for each selected scenario. The output must include:
    * A summary sheet with **Inputs, Executive Summary, and Sale Analysis**.
    * A full **Annual Projections** table (Years 1 to Hold Period).
    * A comprehensive **Detailed Monthly Cash Flow** table (Months 1 to End of Hold Period), styled using the internal `XlsxStyler`.

**IV. Input & Output Replication:**
1.  **Input Forms:** Replicate the 6 input sections with all input IDs and validation rules exactly as defined in the source code. The initial default values must also be replicated.
2.  **Output Structure:** Replicate the 6-section output flow and ensure the data populates the correct metric IDs (e.g., `#totalCashNeeded`, `#dscr`) and chart canvases (`#returnWaterfallChart`, `#wealthProjectionChart`, etc.).

**The final output must be a single, complete, functional HTML file.**

---

## 📜 License

This project is licensed under the **MIT License**.
