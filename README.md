
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
    6.  *

