import Post from "~/templates/Post";

export default function JobSeeker() {
  return (
    <Post>
      <Post.Card>
        <Post.Card.Title>The idea</Post.Card.Title>
        <Post.Card.Body>
          A job search platform where candidates define{" "}
          <em>what matters to them</em> and <em>how much it matters</em>, then
          get a ranked list of jobs scored against those criteria.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Who it's for</Post.Card.Title>
        <Post.Card.Body>
          Candidates who want more control than keyword filters allow — people
          who care about specific, sometimes unconventional things (founder
          background, company vision, team culture) and want each of them
          weighted into the match score.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Core mechanic</Post.Card.Title>
        <Post.Card.Body>
          Each parameter has three parts:
          <Post.List ordered>
            <li>
              <strong>Description</strong> — a short explanation of what the
              parameter measures.
            </li>
            <li>
              <strong>Match criteria</strong> — what the user is looking for
              (free text, structured, or chosen from defaults).
            </li>
            <li>
              <strong>Importance weight (1–10)</strong> — how much this
              parameter influences the overall score.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          Users start with a small set of default parameters (e.g. Location,
          Role, Salary) and can add their own. Some defaults are smart — e.g.
          Location offers "Remote" or a map picker.
        </Post.Card.Body>
        <Post.Card.Body>
          The platform produces a ranked list of jobs with a composite score and
          a per-parameter breakdown.
        </Post.Card.Body>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>
          Example: parameters one candidate might add
        </Post.Card.Title>
        <Post.Card.Body>
          The sections below illustrate parameters a single candidate might
          configure for themselves — not platform-provided defaults. They show
          the range from conventional filters (role, salary) to softer signals
          (founder background, team culture) that traditional job boards don't
          surface.
        </Post.Card.Body>

        <Post.Card>
          <Post.Card.Title>Job basics</Post.Card.Title>
          <Post.Card.Body>
            <strong>Role Type</strong>
            <Post.List>
              <li>
                <em>Description:</em> Job title or function
              </li>
              <li>
                <em>Match against:</em> Software engineer, developer, product
                development
              </li>
              <li>
                <em>Importance:</em> 9
              </li>
            </Post.List>
            <strong>Salary</strong>
            <Post.List>
              <li>
                <em>Description:</em> Monthly gross salary
              </li>
              <li>
                <em>Match against:</em> &gt;40,000 SEK/month
              </li>
              <li>
                <em>Importance:</em> 5
              </li>
            </Post.List>
            <strong>Employment Type</strong>
            <Post.List>
              <li>
                <em>Description:</em> Contract form
              </li>
              <li>
                <em>Match against:</em> Full-time permanent employment
              </li>
              <li>
                <em>Importance:</em> 7
              </li>
            </Post.List>
            <strong>Location</strong>
            <Post.List>
              <li>
                <em>Description:</em> Where the job is based and commute
                constraints
              </li>
              <li>
                <em>Match against:</em> Within 40 min commute of KTH Royal
                Institute of Technology
              </li>
              <li>
                <em>Importance:</em> 6
              </li>
            </Post.List>
            <strong>Company Type</strong>
            <Post.List>
              <li>
                <em>Description:</em> What the company does and what kind of
                product it sells
              </li>
              <li>
                <em>Match against:</em> SaaS product that clearly benefits
                society — solves real problems, creates opportunities, saves
                time or money. Automates processes, provides tools, simplifies
                communication, surfaces insights, or similar.
              </li>
              <li>
                <em>Importance:</em> 8
              </li>
            </Post.List>
            <strong>Company Vision</strong>
            <Post.List>
              <li>
                <em>Description:</em> The vision the company communicates on its
                website, social media, or elsewhere
              </li>
              <li>
                <em>Match against:</em> Ambitious but realistic vision that goes
                beyond revenue — aims to meaningfully improve a process or part
                of society.
              </li>
              <li>
                <em>Importance:</em> 6
              </li>
            </Post.List>
          </Post.Card.Body>
        </Post.Card>

        <Post.Card>
          <Post.Card.Title>Team experience & skills</Post.Card.Title>
          <Post.Card.Body>
            <strong>Founder Domain Expertise</strong>
            <Post.List>
              <li>
                <em>Description:</em> Does the founder have deep knowledge of
                the problem the product solves?
              </li>
              <li>
                <em>Match against:</em> Founder has direct, hands-on experience
                in the problem domain (not just adjacent industry experience).
              </li>
              <li>
                <em>Importance:</em> 7
              </li>
            </Post.List>
            <strong>Founder Role</strong>
            <Post.List>
              <li>
                <em>Description:</em> The founder's involvement in the company
              </li>
              <li>
                <em>Match against:</em> Founder(s) are active in leadership
                roles within product development, sales, or similar.
              </li>
              <li>
                <em>Importance:</em> 7
              </li>
            </Post.List>
            <strong>CTO / Technical Lead Background</strong>
            <Post.List>
              <li>
                <em>Description:</em> Track record of the technical leader
              </li>
              <li>
                <em>Match against:</em> CTO has prior experience building and
                shipping SaaS products, ideally through at least one full
                product lifecycle.
              </li>
              <li>
                <em>Importance:</em> 6
              </li>
            </Post.List>
            <strong>Startup Experience in Team</strong>
            <Post.List>
              <li>
                <em>Description:</em> Whether anyone on the team has worked at
                an early-stage company before
              </li>
              <li>
                <em>Match against:</em> At least one team member has been part
                of a startup (seed to Series B stage).
              </li>
              <li>
                <em>Importance:</em> 5
              </li>
            </Post.List>
            <strong>Engineering Team Depth</strong>
            <Post.List>
              <li>
                <em>Description:</em> Technical skill profile of the dev team
              </li>
              <li>
                <em>Match against:</em> Engineers have either deep expertise in
                a relevant technology stack or broad product development
                experience. At least one senior-level engineer on the team.
              </li>
              <li>
                <em>Importance:</em> 6
              </li>
            </Post.List>
            <strong>Leadership Experience</strong>
            <Post.List>
              <li>
                <em>Description:</em> Whether people in management roles have
                led teams of comparable or greater size
              </li>
              <li>
                <em>Match against:</em> The person in a leadership role has
                managed a team at least as large as the current company, or has
                led within a larger organization.
              </li>
              <li>
                <em>Importance:</em> 5
              </li>
            </Post.List>
          </Post.Card.Body>
        </Post.Card>

        <Post.Card>
          <Post.Card.Title>Team culture & personality</Post.Card.Title>
          <Post.Card.Body>
            <strong>Team Diversity</strong>
            <Post.List>
              <li>
                <em>Description:</em> Composition of the team
              </li>
              <li>
                <em>Match against:</em> Mixed gender and age representation
                across the team.
              </li>
              <li>
                <em>Importance:</em> 4
              </li>
            </Post.List>
            <strong>Culture Signals</strong>
            <Post.List>
              <li>
                <em>Description:</em> Observable signs of company culture
              </li>
              <li>
                <em>Match against:</em> Visible signs that team members are
                driven and intellectually curious — e.g. side projects, writing,
                talks, humour in public communication, a non-corporate tone.
              </li>
              <li>
                <em>Importance:</em> 5
              </li>
            </Post.List>
          </Post.Card.Body>
        </Post.Card>
      </Post.Card>

      <Post.Card>
        <Post.Card.Title>Services solving the same problem</Post.Card.Title>
        <Post.Card.Body>
          <Post.List>
            <li>
              <Post.Link href="https://www.welcometothejungle.com/">
                Welcome to the Jungle (formerly Otta)
              </Post.Link>{" "}
              — A candidate-first job platform where users set preferences
              (target role, salary, company stage, culture, work style) and an
              ML engine ranks roles by fit. Closest in spirit to JobSeeker, but
              importance weights are implicit and the soft signals (founder
              background, CTO track record, team diversity) aren't first-class
              match parameters.
            </li>
            <li>
              <Post.Link href="https://www.tealhq.com/">Teal</Post.Link> — A
              job-search and career-tracking tool that lets candidates score and
              prioritize roles against their own criteria via a "Match Score"
              against the job description. Overlaps on the idea of a per-job
              composite score, but the weighting is mostly skill/keyword-based
              rather than user-defined parameters with explicit 1–10 importance.
            </li>
          </Post.List>
        </Post.Card.Body>
        <Post.Card.Body>
          There is a wide range of AI matching tools (Phenom Fit Score,
          iSmartRecruit, Affinda, Recruiterflow), but most are built for
          employers ranking candidates rather than candidates ranking jobs by
          their own weighted criteria — which is where JobSeeker's angle
          differs.
        </Post.Card.Body>
      </Post.Card>
    </Post>
  );
}
