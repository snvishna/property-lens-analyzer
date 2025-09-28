# 🔬 PropertyLens: The Real Estate Investment Analyzer

A professional-grade, all-in-one tool for real estate investors that runs entirely in your browser. No ads, no subscriptions, no data collection. **100% private and secure.**

[**Live Demo →**](https://nivas.homes/calculators/property-lens)

<img src="data:image/svg+xml,%3Csvg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cmarker id='arrow' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='2.75' markerHeight='2.75' orient='auto-start-reverse'%3E%3Cpath d='M 0 0 L 10 5 L 0 10 z' fill='%23F39C12'/%3E%3C/marker%3E%3C/defs%3E%3Ccircle cx='256' cy='256' r='256' fill='%232C3E50'/%3E%3Cpath d='M392 232L256 112L120 232V400H392V232Z' fill='%23FFFBEB'/%3E%3Cpath d='M120 400L224 272L288 352L378 172' stroke='%23F39C12' stroke-width='22' stroke-linecap='round' stroke-linejoin='round' marker-end='url(%23arrow)'/%3E%3C/svg%3E" alt="PropertyLens Logo" width="64">

---

## 🤔 Why PropertyLens?

In the world of real estate investing, most analysis tools fall into two categories:
1.  **Oversimplified Calculators:** They only look at pre-tax cash flow, ignoring the massive impact of taxes, depreciation, and long-term appreciation. They miss the full picture.
2.  **Expensive Subscription Software:** Powerful, but they lock your data on their servers and charge recurring fees.

**PropertyLens** was built to bridge that gap. It's a professional-grade tool that provides a complete, 360-degree after-tax analysis of any rental property deal while being private and portable. It operates on three core principles: **Transparency, Speed, and Comprehensive Analysis.**

---

## ✨ Key Features

PropertyLens is packed with features designed to provide deep, actionable insights.

-   **🔒 100% Private & Secure:** All calculations happen in your browser. Your financial data is never sent over the internet. Your deals stay your deals.
-   ** portability 🚚 Single-File Portability:** The entire app is a single `.html` file. Save it, email it to a partner, run it on a laptop with no internet. It just works.
-   **📊 Intuitive "Storytelling" UI:** The output isn't just a data dump; it's a story. Cards are arranged to follow an investor's natural thought process: from the high-level **Verdict**, to year-one **Key Metrics**, to the **Debt Structure**, long-term **Wealth Projections**, and finally the **Exit Analysis**.
-   **💸 Comprehensive Tax Analysis:** This is not a simple pre-tax calculator. The engine models your specific tax situation to reveal the true, after-tax returns.
    -   Calculates **After-Tax Cash Flow** by factoring in the powerful "tax shield" from depreciation and mortgage interest deductions.
    -   Models both **Marginal Income Tax** and **Capital Gains Tax**.
    -   Includes standard **27.5-Year Residential Depreciation**.
-   **📈 NEW! Debt & Amortization Analysis:** A brand-new chart that visualizes your loan structure over time.
    -   For **Fixed/ARM loans**, it shows a stacked graph of your remaining Principal vs. cumulative Interest Paid. It also automatically pinpoints the "Crossover Point" where your principal payments start exceeding interest.
    -   For **Margin loans**, it dynamically adapts to show the projected loan balance over your hold period.
-   **🏠 Flexible Expense Modeling (Bug Fixed!):** Every property is different. The tool allows you to model expenses in two ways, and the calculation engine now correctly deducts itemized expenses to accurately model value-add strategies.
    -   **Percentage-Based:** A quick way to budget for CapEx and repairs as a percentage of income.
    -   **Itemized CapEx:** For a more precise forecast, you can itemize large capital expenditures (e.g., "New Roof - $15,000 - Year 5").
-   **🗂️ Advanced Scenario Management & Multi-Export:** The heart of a powerful analysis workflow.
    -   **Save & Name Scenarios:** Save your current analysis with a descriptive name (e.g., "123 Main St - Conservative Case").
    -   **Load & Delete:** Easily manage and load your saved scenarios.
    -   **Multi-Scenario XLSX Export:** Select multiple saved scenarios and export them to a single, professionally formatted multi-tab Excel file.
-   **💡 In-Depth Tooltips & Metric Breakdowns**: Every metric includes a detailed tooltip explaining the formula, what it means, and crucially, *how to interpret it* with common benchmarks.

---

## 🚀 Getting Started

It's as simple as it gets.
1.  Download the `propertylens.html` file from this repository.
2.  Open it in your web browser.

That's it. You're ready to start analyzing deals.

---

## 🔬 A Deep Dive: Understanding the Metrics

This is your comprehensive guide to every input and output in PropertyLens.

### ➤ Input Metrics (The "Levers" of Your Analysis)

Each input is a lever you can pull to see how it affects the investment's performance.

#### Purchase & Loan Details
-   **Purchase Price:** The total price you are paying for the property. This is the starting point for most calculations and forms the basis for your loan, down payment, and depreciation.
-   **Rehab Costs ($):** The total cost of initial repairs and renovations to get the property rent-ready. This is part of your initial investment (Total Cash Needed) and is crucial for value-add or BRRRR strategies.
-   **Closing Costs ($):** One-time fees paid to close the deal (e.g., title, legal, appraisal). This adds to your initial cash outlay. **Benchmark:** Typically 2-5% of the Purchase Price.
-   **After Repair Value (ARV):** The estimated market value of the property *after* all planned repairs and improvements are completed. This is essential for calculating 'Forced Equity' and is the cornerstone of a BRRRR or value-add strategy.
-   **Down Payment (%):** The percentage of the Purchase Price you pay out-of-pocket. A larger down payment reduces your loan amount and risk, but also reduces leverage and may lower your CoC ROI. **Benchmark:** Typically 20-25% for investment properties.
-   **Interest Rate (%):** The annual interest rate for your loan. This is a major driver of your monthly payment and overall profitability.

#### Income & Expenses
-   **Gross Monthly Rent:** The total rent collected from all units each month, before any expenses. This is the primary driver of your property's income.
-   **Other Monthly Income:** Any additional income from the property, such as coin laundry, parking fees, pet fees, or storage unit rentals.
-   **Vacancy (%):** A crucial budget for when the property is vacant between tenants. This protects your cash flow and is a key part of conservative underwriting. **Benchmark:** 5-10% of Gross Rent is a common estimate, depending on the market.
-   **Repairs (%):** A budget for ongoing repairs and maintenance (e.g., leaky faucets, small fixes). This is different from CapEx. **Benchmark:** 5-10% of Gross Rent is a safe starting point. Older properties may require a higher percentage.
-   **Mgmt. (%):** The cost of hiring a property manager. If you self-manage, it's wise to still include this cost to pay yourself for your time. **Benchmark:** 8-12% of collected rent is typical.
-   **CapEx / Repairs Modeling:**
    -   **Percentage-Based:** A savings fund for large, infrequent expenses like a new roof or HVAC. **Benchmark:** 5-10% of Gross Rent is a wise budget.
    -   **Itemized:** Model a value-add plan by forecasting specific large costs that will occur in certain years. These will be subtracted from cash flow in the specified year.

#### Tax & Long-Term Assumptions
-   **Hold Period (Years):** The number of years you plan to own the property. The analysis will show detailed projections for this duration.
-   **Value Growth (%):** The estimated annual appreciation rate of the property's market value. This is a major driver of long-term wealth but does not affect monthly cash flow. **Benchmark:** Historically, 3-4% is a conservative long-term average for the US market.
-   **Marginal Tax Rate (%):** Your combined federal and state marginal income tax rate. This is the rate you pay on your *next dollar* of income and is used to calculate the tax impact of the property's income/loss.
-   **Capital Gains Rate (%):** Your long-term capital gains tax rate (federal + state). This is used to calculate the tax due on the property's appreciation when sold.

### ➤ Output Metrics (The "Gauges" of Your Investment)

The output UI is designed to tell a story, guiding you from a high-level verdict to the granular details. Here is a breakdown of every metric you will see.

#### Metrics from "Key Metrics (Year 1)"

This card shows the immediate, first-year health of your investment.

* **After-Tax Cash Flow:** This is your true "in-pocket" profit per month. It's your rental income minus all operating expenses, minus mortgage payments, *plus* any tax savings you get from deductions. Because of the "tax shield" from depreciation, this can sometimes be higher than your pre-tax cash flow.
* **After-Tax Cash-on-Cash (CoC) ROI:** Perhaps the most important metric for cash flow investors.
    * **Formula:** `(After-Tax Annual Cash Flow / Total Cash Needed)`
    * **Interpretation:** This is your annual return on the actual cash you invested. A higher CoC ROI means your cash is working harder for you.
* **Pre-Tax Cash Flow:** The money left over each month after all expenses, including the mortgage, have been paid (but before taxes).
* **Pre-Tax CoC ROI:** The pre-tax annual return on the actual cash you invested. This is a common metric for quick comparisons, but After-Tax CoC ROI is more accurate.
* **NOI (Net Operating Income):** The property's total annual income after all operating expenses but *before* mortgage payments.
    * **Formula:** `(Effective Annual Income - Annual Operating Expenses)`
    * **Interpretation:** This is a key metric for determining a property's profitability, independent of your financing choice.
* **Cap Rate (Capitalization Rate):**
    * **Formula:** `Annual NOI / Purchase Price`
    * **Interpretation:** The unleveraged annual return of the property. It varies greatly by market. A higher cap rate generally indicates higher risk and/or a less desirable area, while a lower cap rate indicates lower risk and a more desirable area. Use it to compare similar properties in the same market.
* **Total Cash Needed:** The total amount of cash you need to bring to closing. This is the denominator for your CoC ROI calculation.
    * **Formula:** `Down Payment + Closing Costs + Rehab Costs`
* **Forced Equity:** The equity created immediately upon purchase and renovation by buying a property below its after-repair market value.
    * **Formula:** `After Repair Value - (Purchase Price + Rehab + Closing Costs)`
    * **Interpretation:** This is a key metric for Value-Add and BRRRR investors, as it represents profit created "on day one."

#### Metrics from "Key Ratios & Rules of Thumb"

This card provides classic real estate ratios for quick deal analysis and to check if your assumptions are reasonable.

* **DSCR (Debt Service Coverage Ratio):**
    * **Formula:** `Annual NOI / Annual Debt Service`
    * **Interpretation:** This is a primary metric for lenders. It shows if the property's income can cover its debt payments. Lenders typically require a DSCR of **1.25 or higher**. Higher is better.
* **GRM (Gross Rent Multiplier):**
    * **Formula:** `Purchase Price / Gross Annual Rent`
    * **Interpretation:** A rough measure of a property's value relative to its income. Lower is generally better. A GRM of **8-12 is often considered reasonable**, but this is highly market-dependent. Use it to compare similar properties in the same area.
* **1% Rule:**
    * **Formula:** `Gross Monthly Rent / Purchase Price`
    * **Interpretation:** A classic quick check for cash flow potential. A value **greater than 1% is considered strong**, though this is increasingly difficult to find in many markets.
* **50% Rule:**
    * **Formula:** `Total Monthly Operating Expenses / Gross Monthly Income`
    * **Interpretation:** A classic sanity check. It suggests that, on average, your operating expenses (excluding the mortgage) should be around 50% of your income. If your value is far below 50%, you may be underestimating expenses.
* **Debt Yield:**
    * **Formula:** `Annual NOI / Loan Amount`
    * **Interpretation:** A measure of the lender's risk. It is the return they would receive if they had to foreclose on day one. Lenders often look for a Debt Yield of **10% or higher**.
* **LTV / LTC (Loan-to-Value / Loan-to-Cost):** Two ratios lenders use to assess risk.
    * **LTV Formula:** `Loan Amount / Purchase Price`
    * **LTC Formula:** `Loan Amount / (Purchase Price + Rehab Costs)`
    * **Interpretation:** Lenders typically cap LTV/LTC at 75-80% for investment properties.

#### Metrics from Other Sections

* **ROE (Return on Equity):** Found in the `Optimal Exit Analysis` chart.
    * **Formula:** `Annual Cash Flow / Equity at Start of Year`
    * **Interpretation:** Measures how efficiently your *trapped equity* is working. A declining ROE over time is a critical signal that you have "lazy" capital and may want to consider selling or refinancing to redeploy that equity.
* **Net Cash in Pocket:** The final result of the `Sale Analysis` card. This is the actual amount of money you will receive in your bank account after you sell the property, pay off the loan, cover all selling costs, and—most importantly—pay all taxes on your gains (including depreciation recapture).

---

## 🛠️ Technical Deep Dive & Design Decisions

For those interested in the code, here are some key decisions that make PropertyLens work:

-   **Single-File Architecture:** The entire application—HTML, CSS, and JavaScript—is contained in a single `.html` file. This makes it incredibly portable and easy to distribute. There's no backend, no database, and no build process required. It just works.
-   **Vanilla JavaScript "Engine":** All logic is written in clean, modern, dependency-free JavaScript. This ensures maximum performance and longevity. Libraries are used only for specific, non-core functionalities (Charting, XLSX export).
-   **Absolute Positioning Layout:** After extensive testing, a CSS Grid layout proved unstable during rapid DOM updates. A more robust **Absolute Positioning** strategy was used for the dual panes, ensuring the layout remains stable and bug-free.
-   **URL-Based State Management:** The application's state is compressed (using `lz-string`) and stored in the URL. This allows you to share a complete, pre-filled analysis simply by copying and pasting the link.

---

## 🗺️ Contributing & Future Roadmap

This tool is powerful, but it can always be better. Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

Here are some features on the current roadmap that would make great contributions:

-   **1031 Exchange Modeling:** Add a toggle in the "Sale Analysis" section to simulate a 1031 exchange, deferring capital gains and depreciation recapture taxes.
-   **Refinance Modeling:** Allow the user to input a "Refinance Event" with a specific year, new loan amount, and terms to model the BRRRR strategy more accurately.
-   **Partnership & Waterfall Calculations:** Add an input section to model deals with multiple partners, including capital contributions and profit-sharing structures.

---

## 🤖 The Ultimate LLM Prompt (For Replication)

### A Note on Prompt-Driven Development

You might be wondering why the final section of a README is a giant prompt. The reason is simple: **PropertyLens was built almost entirely using prompt-driven development in a conversation with Google's Gemini Pro.**

Instead of writing thousands of lines of code by hand, this entire application was specified, designed, debugged, and refined through a series of detailed instructions and feedback loops, just like a conversation between a product manager and an expert engineering team.

I'm sharing the final, refined prompt as a transparent look into this powerful new way of creating software. My hope is that it serves as a roadmap and inspiration for other developers, students, and entrepreneurs. You can use it to understand the app's architecture, to replicate it yourself, or as a template to build your own amazing ideas. Welcome to the future of development!

### The Prompt

You are an expert full-stack developer, a seasoned financial analyst specializing in real estate, and a senior UI/UX designer. Your task is to re-create a comprehensive, single-file Real Estate Investment Analyzer application called **PropertyLens**.

**I. Core Constraints & Philosophy:**
1.  **Single File:** The entire application (HTML, CSS, JavaScript) must be contained within a single `propertylens.html` file.
2.  **Client-Side Only:** No backend or server is required. All logic must run in the user's browser.
3.  **Dependencies:** Use CDN links for Tailwind CSS, Chart.js (and its datalabels plugin), and `lz-string`.
4.  **Core Goal:** The tool must provide a comprehensive analysis of a real estate investment's performance, including detailed after-tax metrics and an intuitive UI flow.

**II. Layout & Structure:**
1.  Use a full-height, two-column layout on desktop using **Absolute Positioning** for the main input/output sections to ensure stability. The two sections should stack vertically on mobile.
2.  The header must contain the app icon, the name 'PropertyLens', a professional subtitle, and a 'Scenarios' button with an icon. The icon should be a dark blue circle containing a cream-colored house, with a gold 'N'-shaped line chart inside.

**III. Left Pane (Inputs):**
Create collapsible accordion sections for the following inputs. Each input must have a clear label and a detailed tooltip explaining what it is and providing common benchmarks.
1.  **Purchase & Loan:** Purchase Price, Rehab Costs, Closing Costs, After Repair Value (ARV), Down Payment (%), Loan Type, Interest Rates.
2.  **Income & Expenses:** Gross Monthly Rent, Other Income, Property Tax, Insurance, HOA, Vacancy (%), Repairs (%), Management (%).
3.  **CapEx Modeling:** A toggle to switch between "Percentage of Income" and "Itemize Large Expenses" (with dynamic rows for Description, Cost, Year).
4.  **Tax & Projections:** Hold Period, Value Growth (%), Income/Expense Growth (%), Marginal & Capital Gains Tax Rates, Selling Costs (%).

**IV. Right Pane (Outputs):**
Create output cards ordered in this specific logical flow:
1.  **Verdict & Key Insights:** A high-level "GO"/"NO-GO" verdict, a criteria checklist, recommended cash reserves, and an opportunity cost comparison vs. the S&P 500.
2.  **Key Metrics (Year 1):** After-Tax Cash Flow, After-Tax CoC ROI, Pre-Tax values, NOI, Cap Rate, etc.
3.  **Monthly Breakdown Chart:** A toggleable donut chart for expenses vs. income.
4.  **Debt & Amortization Chart:** A new chart showing Principal vs. Interest over time with a "Crossover Point" for Fixed/ARM loans. The tooltip on this chart must show both yearly and cumulative values.
5.  **Long-Term Wealth Projection Chart:** An area chart showing Property Value vs. Loan Balance, with an overlay for annual Cash Flow.
6.  **Optimal Exit Analysis Chart:** A combo chart showing Profit if Sold (bars) vs. Annualized Return and ROE (lines).
7.  **Sale Analysis Card:** A detailed waterfall breakdown of the sale, including tax calculations.
8.  **Profit Waterfall Chart:** A chart showing the sources of profit: Cash Flow, Loan Paydown, and Appreciation.
9.  **Key Ratios & Rules of Thumb:** A grid for DSCR, GRM, 1% Rule, 50% Rule, etc.
10. **Analysis Over Time Table:** A detailed year-by-year data table.
11. **Scenarios Modal:** The modal must use a clean, single-column layout with an inline form for saving new scenarios, avoiding the use of a native `prompt()` dialog.

**V. Calculator Logic (JavaScript):**
1.  The projection engine must loop from Year 1 to the end of the holding period.
2.  **Crucially, it must correctly handle itemized CapEx.** When the itemized toggle is active, percentage-based CapEx must be zero, and any itemized expenses for a given year must be subtracted from that year's cash flow.
3.  The S&P 500 opportunity cost calculation must apply the user's capital gains tax rate for a true after-tax comparison.

**VI. Interactivity & State Management (JavaScript):**
1.  All inputs must trigger live updates.
2.  Use `lz-string` to compress the application state into the URL hash for sharing. The URL state must correctly serialize all inputs, including the itemized expenses list and its toggle state.
3.  Implement `localStorage`-based scenario management with multi-select XLSX export (using SheetJS).

**VII. Styling & UX:**
1.  Use Tailwind CSS for a clean, modern, and fully responsive interface.
2.  Use detailed tooltips for all financial terms.
3.  For the circular tooltip help icon (`.help-icon`), add `transform: translateY(-0.5px);` to ensure perfect visual centering.
