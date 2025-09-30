# 🔬 PropertyLens: The Real Estate Investment Analyzer

A professional-grade, all-in-one tool for real estate investors that runs entirely in your browser. No ads, no subscriptions, no data collection. **100% private and secure.**

[**Live Demo →**](https://nivas.homes/calculators/property-lens)

---

## 🤔 Why PropertyLens?

In the world of real estate investing, answering one core question is harder than it looks: **"Is this property a better use of my capital than just investing in the stock market?"**

Most analysis tools fail to answer this accurately. They either:
1.  **Oversimplify:** Focusing only on pre-tax cash flow, ignoring taxes, depreciation, and the time value of money.
2.  **Mis-compare:** Using flawed metrics that create an "apples-to-oranges" comparison between a real estate deal and a passive index fund.

**PropertyLens** was built to provide a definitive answer. It's a professional-grade tool that provides a true "apples-to-apples" comparison using the industry-standard **Internal Rate of Return (IRR)**. It operates on three core principles: **Transparency, Speed, and Uncompromising Analytical Accuracy.**

---

## ✨ Key Features

PropertyLens is packed with features designed to provide deep, actionable insights and lead to confident decisions.

-   **🎯 Apples-to-Apples Investment Showdown:** The entire UI is built around a central "Showdown" card that compares your property deal against the S&P 500 on the metrics that matter, giving you a clear verdict.
-   **📈 Professional-Grade IRR Analysis:** The engine uses the **Internal Rate of Return (IRR)**, the financial industry's gold standard for comparing investments with complex cash flows. This ensures a mathematically sound comparison that accounts for the time value of money.
-   **🔒 100% Private & Secure:** All calculations happen in your browser. Your financial data is never sent over the internet.
-   **📊 Intuitive Wealth Storytelling:** Charts are designed to tell a story, not just display data.
    -   **Building Equity Over Time:** A powerful stacked area chart visually shows your equity growing as the loan balance shrinks.
    -   **Sources of Wealth:** A true waterfall chart illustrates how your initial investment is built up by the three engines of real estate: cash flow, loan paydown, and appreciation.
-   **💸 Comprehensive Tax Analysis:** This is not a simple pre-tax calculator. The engine models your specific tax situation to reveal true, after-tax returns.
    -   Calculates the **"tax shield"** from depreciation and mortgage interest deductions.
    -   Correctly models **Depreciation Recapture** at your marginal income tax rate and **Appreciation** at the capital gains rate.
-   **🎛️ Flexible Assumption Modeling:** Take control of your analysis.
    -   **Land Value %:** A crucial input for tax accuracy, allowing you to specify the land's portion of the purchase price to fine-tune your depreciation calculations.
    -   **S&P 500 Forecast:** Model different market conditions by setting your own expected annual return for the S&P 500.
-   **🔗 One-Click Scenario Sharing:** The entire state of your analysis is compressed and stored in the URL. Share a fully interactive, pre-filled version of your analysis with a partner or client just by sending a link.
-   **🗂️ Advanced Scenario Management & Multi-Export:** Save, name, and manage multiple scenarios. Select and export them to a single, professionally formatted multi-tab Excel file.
-   **📱 Fully Responsive Design:** Optimized for all screen sizes, from mobile phones to desktop monitors.

---

## 🚀 Getting Started

1.  Download the `propertylens.html` file.
2.  Open it in any modern web browser.

That's it. You're ready to start analyzing deals.

---

## 🔬 A Deep Dive: Understanding the Metrics

### ➤ Input Metrics (The "Levers" of Your Analysis)

#### Purchase & Loan Details
-   **Purchase Price, Rehab Costs, Closing Costs, ARV:** Standard inputs for the total project cost and value.
-   **Down Payment (%), Loan Type, Interest Rates:** Define your financing structure.

#### Income & Expenses
-   **Gross Monthly Rent, Other Monthly Income:** The top-line income drivers for the property.
-   **All Expense Fields (Property Tax, Insurance, %-based, etc.):** Model your operating costs.

#### Tax & Projections
-   **Hold Period (Years):** The duration of your analysis.
-   **Growth Rates (%):** Your assumptions for how income, expenses, and property value will change over time.
-   **Tax Rates (%):** Your marginal income and capital gains tax rates, used for precise after-tax calculations.
-   **Land Value (%):** **(New)** The percentage of the Purchase Price attributed to the land itself. Land does not depreciate. This is a crucial input for accurate tax modeling. **Benchmark:** A common rule of thumb is 20%, but this can vary dramatically by location.
-   **S&P 500 Exp. Return (%):** **(New)** Your personal forecast for the stock market's average annual return. This is used for the "Investment Showdown" comparison. **Benchmark:** The historical long-term average is around 8-10%.

### ➤ Output Metrics (The "Gauges" of Your Investment)

#### Metrics from "Investment Showdown"

This is the new heart of the application, designed to give you a clear, final answer.

* **IRR (Internal Rate of Return):** The 'true' annualized return of an investment, considering all cash inflows and outflows over time. This is the professional standard for comparing projects with complex cash flows, making it the most accurate metric for an "apples-to-apples" comparison.
* **Total After-Tax Profit:** The absolute amount of money in your pocket at the end of the hold period after every single cost and tax has been paid.
* **MoIC (Multiple on Invested Capital):** An intuitive metric answering, "How many times did I get my money back?" Calculated as (Total Cash Returned / Total Capital Invested). A MoIC of 2.5x means you received $2.50 for every $1 you put in.
* **Total Capital Invested:** The total out-of-pocket cash required over the entire hold period. This includes your initial investment plus any capital needed to cover years with negative cash flow.

### ➤ Interpreting the Showdown: Rate vs. Amount

A common question when looking at the "Investment Showdown" is: **how can the property have a higher total profit but a lower IRR (annualized return) than the S&P 500?** This hits on a subtle but crucial concept in investment analysis.

Think of it like two runners in a race:

* 💰 **Total Profit** is the **total distance** each runner covered. The Property runner might cover more ground.
* 📈 **IRR (Annualized Return)** is the **average speed** of each runner. The S&P 500 runner might have a higher average speed.

The question becomes, "How did the slower runner cover more ground?" The answer lies in the concept of **Total Capital Invested**.

* **The S&P 500 Investment (Simple & Efficient):** This is a simple "lump sum" investment. An initial amount of capital is invested on Day 1, and no more money is ever needed. It compounds efficiently from a fixed capital base.
* **The Real Estate Investment (Complex & Capital Intensive):** A rental property is rarely a simple "lump sum" investment. In some years, especially at the beginning, the after-tax cash flow may be negative. To cover these losses, you have to contribute **more capital** out-of-pocket.

The `Total Capital Invested` metric correctly accounts for this by adding your initial investment and any subsequent contributions. Because the denominator for the property's return calculation can be larger, its calculated *rate* of return (IRR) can be lower, even if the final profit (the numerator) is higher.

This is a perfect illustration of why looking at a single metric is never enough. PropertyLens shows you both the **rate (IRR)** and the **amount (Total Profit)** because they tell you different, and equally valid, parts of the story.

#### Metrics from "Building Equity Over Time" Chart

This chart replaces the old "Debt & Amortization" view. It's a stacked area chart showing the total **Property Value** on top. The area is divided into two sections:
* **Your Equity:** The green area at the top, representing your share of the asset.
* **Loan Balance:** The gray area at the bottom, representing the bank's share.
* **The Story:** You can visually track how your ownership stake grows over time as the loan is paid down and the property appreciates.

#### Metrics from "Sources of Wealth" Chart

This chart replaces the old "Profit Waterfall" view. It's a true waterfall chart that answers, "How was my wealth created?" It starts with your **Initial Equity** and then adds the three wealth-building components as positive blocks:
1.  **Total Cash Flow**
2.  **Loan Paydown** (Equity gained through amortization)
3.  **Appreciation** (Equity gained from market growth)

The final bar represents your **Total Equity** at the end of the hold period.

---

## 🛠️ Technical Deep Dive & Design Decisions

-   **Vanilla JavaScript "Engine":** All logic is written in clean, modern, dependency-free JavaScript. This includes a new, robust function to calculate the **Internal Rate of Return (IRR)** using the Newton-Raphson method, ensuring financial accuracy.
-   **URL-Based State Management:** The application's state, including all new inputs like Land Value and S&P 500 Return, is compressed and stored in the URL for seamless sharing.

---

## 🗺️ Contributing & Future Roadmap

Contributions are welcome! Some features on the roadmap:
-   **Refinance Modeling:** Allow the user to input a "Refinance Event" to more accurately model the BRRRR strategy.
-   **Partnership & Waterfall Calculations:** Add an input section to model deals with multiple partners.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤖 The Ultimate LLM Prompt (Updated for New Features)

This prompt has been updated to reflect the new, more powerful requirements of the application.

You are an expert full-stack developer, a seasoned financial analyst specializing in real estate, and a senior UI/UX designer. Your task is to create a comprehensive, single-file Real Estate Investment Analyzer application called **PropertyLens**.

**I. Core Philosophy:**
The primary goal of this tool is to provide a user with a clear, definitive, and financially sound answer to the question: "Is this rental property a better investment than putting the same money into an S&P 500 index fund?" The entire UI and all calculations must serve this purpose.

**II. Core Constraints:**
1.  **Single File & Client-Side Only:** The entire application (HTML, CSS, JavaScript) must be in a single `.html` file with no backend.
2.  **Dependencies:** Use CDN links for Tailwind CSS and Chart.js.

**III. Layout & Structure:**
-   Use a full-height, two-column layout that stacks on mobile.

**IV. Input Pane:**
-   Create collapsible sections for all standard inputs (Purchase, Loan, Income, Expenses).
-   **Crucially, add two advanced inputs in the "Tax & Projections" section:**
    1.  `Land Value (%)`: Defaults to 20%. This will be used to calculate the depreciable basis (`Purchase Price * (1 - Land Value %)`).
    2.  `S&P 500 Expected Annual Return (%)`: Defaults to 8%. This will be used for the opportunity cost calculation.

**V. Output Pane (The Decision Engine):**
1.  **"Investment Showdown" Card:** This is the FIRST and MOST IMPORTANT output card.
    -   It must be a clean table comparing "This Property" vs. "S&P 500".
    -   **It MUST use these four metrics:**
        1.  **IRR (Internal Rate of Return):** The headline metric.
        2.  **Total After-Tax Profit:** The final dollar amount.
        3.  **MoIC (Multiple on Invested Capital):** The simple multiplier.
        4.  **Total Capital Invested:** To provide context.
    -   It must include a clear, written "Verdict" summarizing the comparison.
    -   It must also contain the original "Property Viability Checklist" (Go/No-Go based on user criteria like cash flow and DSCR).
2.  **"Building Equity Over Time" Chart:** A stacked area chart showing the growth of `Property Value`, composed of two stacked series: `Equity` and `Loan Balance`.
3.  **"Sources of Wealth" Chart:** A true waterfall chart that starts with `Initial Equity` and adds `Total Cash Flow`, `Loan Paydown`, and `Appreciation` to arrive at a `Final Equity` bar.

**VI. Calculator Logic (JavaScript):**
1.  **Implement an IRR Function:** The core of the new logic. Create a function `calculateIRR(cashflows)` that can solve for the internal rate of return, likely using the Newton-Raphson method.
2.  **Implement MoIC and Capital Calculations:** Create helpers to calculate MoIC and the true Total Capital Invested (which includes initial cash plus any negative cash flow years).
3.  **Generate Cash Flow Streams:** For both the property and the S&P 500, generate the year-by-year cash flow streams needed for the IRR calculation.
4.  **Update All Financial Formulas:** Ensure the new `Land Value %` input is used to calculate the depreciable basis for all tax-related calculations. The S&P 500 calculation must now use the new user-provided expected return.
5.  **Tax Logic:** The tax-on-sale calculation must remain highly accurate, correctly separating depreciation recapture (taxed at marginal rate) from appreciation (taxed at capital gains rate).

**VII. Interactivity & State Management (JavaScript):**
-   All new inputs must trigger live updates.
-   Use `lz-string` to compress the application state into the URL hash for sharing. This state MUST include the new `Land Value %` and `S&P 500 Return %` inputs.
-   The `localStorage`-based scenario manager must save and load all new inputs.
-   **The XLSX exporter must be updated** to include the new input fields in its "Assumptions" sheet.
