# Tinder for Expenses

A fun way to review and improve your spending habits

## Problem

Tracking expenses is easy — reviewing them is hard and boring. Services like Anyfin and most banks offer categorized spending overviews, but they rarely help you reflect on whether you made good choices. Was that night out worth it? Was the course literature overpriced? Most tools give you data but no real insight.

## Solution

Gamified expense reviews.

Each expense appears as a card — similar to Tinder — displaying information such as:

- Amount spent
- Category
- Date
- Inferred description of the purchased items
- Total spent on this type of item last month / year
- Total spent in this category last month / year
- Estimated CO₂ impact of the purchase

You swipe through your expenses and sort them into categories. The default categories are *Worth it* and *Not worth it*, but you can create your own. Some suggestions:

- Regret
- Impulse buy
- Necessary
- Overpriced
- Forgotten subscription

Over time, you can track how your spending patterns shift across categories.

## Feasibility

- Getting meaningful item-level data from raw bank transactions is difficult. Without knowing what was actually purchased, users can't make well-informed classifications — itemized receipts would likely be required.
- The financial data space is heavily regulated, which could present integration challenges.

## Could this be scoped to grocery shopping?

Grocery shopping is the most obvious starting point — digital receipts are already mainstream. ICA, Coop, and Willys all have apps that generate itemized receipts, which solves the core technical challenge: instead of just seeing “ICA Maxi,” you'd know it was oat milk and pasta. That makes CO₂ estimates genuinely feasible and turns the “was this worth it?” question into something concrete. It would also open the door to additional insights, such as price comparisons against competitors or nutritional factors.
