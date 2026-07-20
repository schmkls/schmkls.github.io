import Post from "~/templates/Post";
import TinderForExpensesDemo from "./TinderForExpensesDemo";

export default function TinderForExpenses() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>Problem</Post.Card.Title>
        <Post.Card.Body>
          Tracking expenses is easy — reviewing them is hard and boring.
          Services like Anyfin and most banks offer categorized spending
          overviews, but they rarely help you reflect on whether you made good
          choices. Was that night out worth it? Was the course literature
          overpriced? Most tools give you data but no real insight.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Solution</Post.Card.Title>
        <Post.Card.Body>Gamified expense reviews.</Post.Card.Body>
        <Post.Card.Body>
          Each expense appears as a card — similar to Tinder — displaying
          information such as:
          <Post.List>
            <li>Amount spent</li>
            <li>Category</li>
            <li>Date</li>
            <li>Inferred description of the purchased items</li>
            <li>Total spent on this type of item last month / year</li>
            <li>Total spent in this category last month / year</li>
            <li>Estimated CO₂ impact of the purchase</li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          You swipe through your expenses and sort them into categories. The
          default categories are <em>Worth it</em> and <em>Not worth it</em>,
          but you can create your own. Some suggestions:
          <Post.List>
            <li>Regret</li>
            <li>Impulse buy</li>
            <li>Necessary</li>
            <li>Overpriced</li>
            <li>Forgotten subscription</li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          Over time, you can track how your spending patterns shift across
          categories.
        </Post.Card.Body>
        <Post.DemoButton>
          <TinderForExpensesDemo />
        </Post.DemoButton>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Feasibility</Post.Card.Title>
        <Post.Card.Body>
          <Post.List>
            <li>
              Getting meaningful item-level data from raw bank transactions is
              difficult. Without knowing what was actually purchased, users
              can't make well-informed classifications — itemized receipts would
              likely be required.
            </li>
            <li>
              The financial data space is heavily regulated, which could present
              integration challenges.
            </li>
          </Post.List>
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>
          Could this be scoped to grocery shopping?
        </Post.Card.Title>
        <Post.Card.Body>
          Grocery shopping is the most obvious starting point — digital receipts
          are already mainstream. ICA, Coop, and Willys all have apps that
          generate itemized receipts, which solves the core technical challenge:
          instead of just seeing “ICA Maxi,” you'd know it was oat milk and
          pasta. That makes CO₂ estimates genuinely feasible and turns the “was
          this worth it?” question into something concrete. It would also open
          the door to additional insights, such as price comparisons against
          competitors or nutritional factors.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
