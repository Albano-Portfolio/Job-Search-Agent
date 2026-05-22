import { useEffect, useMemo, useState } from "react";

const JASON_PROFILE = {
  name: "Jason Albano",
  location: "Nashville, TN",
  targetTitles: [
    "Healthcare Data Analyst",
    "Senior Healthcare Data Analyst",
    "AI Data Analyst",
    "Business Intelligence Analyst",
    "Clinical Data Analyst",
    "Claims Data Analyst",
    "Medical Economics Analyst",
    "Healthcare Analytics Consultant",
  ],
  healthcareKeywords: [
    "healthcare", "claims", "provider", "utilization", "medical cost",
    "cost containment", "clinical", "payer", "health plan", "cms",
    "hedis", "fraud", "waste", "abuse", "quality improvement"
  ],
  analyticsKeywords: [
    "sql", "tableau", "power bi", "databricks", "python", "sas",
    "looker", "dashboard", "reporting", "kpi", "data visualization",
    "business intelligence", "data warehouse", "ssrs", "ssas", "excel"
  ],
  aiKeywords: [
    "ai", "generative ai", "copilot", "prompt engineering", "automation",
    "databricks genie", "cursor ai", "machine learning"
  ],
  seniorityKeywords: [
    "senior", "advisor", "lead", "consultant", "principal", "manager", "sme"
  ],
  experienceSummary:
    "healthcare claims analytics, provider performance, utilization analysis, cost containment, executive reporting, SQL, Tableau, Power BI, Databricks, Python, SAS, Looker, Databricks Genie, Microsoft Copilot, Cursor AI, prompt engineering, dashboard development, and AI-enabled analytics",
};

const STATUS_OPTIONS = [
  "Saved",
  "Qualified",
  "Applied",
  "Outreach Sent",
  "Interviewing",
  "Rejected",
  "Skip",
];

const EMPTY_JOB = {
  company: "",
  title: "",
  location: "",
  workType: "Remote",
  employmentType: "Full-time",
  postedAge: "",
  applicantCount: "",
  jobUrl: "",
  companyCareerUrl: "",
  description: "",
  hiringManagerName: "",
  hiringManagerTitle: "",
  hiringManagerUrl: "",
  recruiterName: "",
  status: "Saved",
  dateSaved: new Date().toISOString().slice(0, 10),
  notes: "",
};

const SAMPLE_JOBS = [
  {
    id: "sample-1",
    company: "Cigna",
    title: "Senior Healthcare Data Analyst",
    location: "Nashville, TN",
    workType: "Remote",
    employmentType: "Full-time",
    postedAge: "24 hours ago",
    applicantCount: "42",
    jobUrl: "https://www.linkedin.com/jobs/search/",
    companyCareerUrl: "https://jobs.thecignagroup.com/",
    description:
      "Analyze healthcare claims, provider performance, utilization trends, total medical cost, SQL, Tableau, Power BI, Databricks, executive dashboards, and reporting optimization.",
    hiringManagerName: "",
    hiringManagerTitle: "Analytics Manager / Director",
    hiringManagerUrl:
      "https://www.linkedin.com/search/results/people/?keywords=Cigna%20healthcare%20analytics%20manager",
    recruiterName: "",
    status: "Applied",
    dateSaved: "2026-05-22",
    notes: "Very strong fit based on healthcare claims, cost containment, SQL, Tableau, Power BI, and Databricks.",
  },
  {
    id: "sample-2",
    company: "HCA Healthcare",
    title: "Business Intelligence Analyst",
    location: "Nashville, TN",
    workType: "Hybrid",
    employmentType: "Full-time",
    postedAge: "1 day ago",
    applicantCount: "85",
    jobUrl: "https://www.linkedin.com/jobs/search/",
    companyCareerUrl: "https://careers.hcahealthcare.com/",
    description:
      "Develop dashboards, SQL queries, KPI reports, operational reporting, executive analytics, Power BI, Tableau, healthcare data, stakeholder communication.",
    hiringManagerName: "",
    hiringManagerTitle: "BI Manager / Analytics Leader",
    hiringManagerUrl:
      "https://www.linkedin.com/search/results/people/?keywords=HCA%20Healthcare%20business%20intelligence%20manager",
    recruiterName: "",
    status: "Qualified",
    dateSaved: "2026-05-22",
    notes: "Strong Nashville healthcare BI fit. Verify if hybrid schedule works.",
  },
];

function normalize(text) {
  return String(text || "").toLowerCase();
}

function countMatches(text, keywords) {
  const lower = normalize(text);
  return keywords.filter((keyword) => lower.includes(keyword.toLowerCase()));
}

function buildLinkedInJobSearchUrl() {
  const keywords = encodeURIComponent(JASON_PROFILE.targetTitles.join(" OR "));
  const location = encodeURIComponent(JASON_PROFILE.location);
  return `https://www.linkedin.com/jobs/search/?keywords=${keywords}&location=${location}&f_TPR=r172800&f_JT=F&f_WT=2%2C3%2C1`;
}

function buildHiringManagerSearchUrl(company, title) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
    `${company} ${title} analytics manager director hiring manager recruiter talent acquisition`
  )}`;
}

function getPostedHours(postedAge) {
  const text = normalize(postedAge);
  const number = Number((text.match(/\d+/) || [0])[0]);
  if (text.includes("hour")) return number || 0;
  if (text.includes("day")) return (number || 1) * 24;
  if (text.includes("week")) return (number || 1) * 168;
  return 999;
}

function evaluateJob(job) {
  const combined = `${job.title} ${job.company} ${job.location} ${job.workType} ${job.description} ${job.notes}`;
  const healthcareMatches = countMatches(combined, JASON_PROFILE.healthcareKeywords);
  const analyticsMatches = countMatches(combined, JASON_PROFILE.analyticsKeywords);
  const aiMatches = countMatches(combined, JASON_PROFILE.aiKeywords);
  const seniorityMatches = countMatches(combined, JASON_PROFILE.seniorityKeywords);

  const healthcareScore = Math.min(25, healthcareMatches.length * 4);
  const analyticsScore = Math.min(25, analyticsMatches.length * 3);
  const aiScore = Math.min(15, aiMatches.length * 4);
  const seniorityScore = Math.min(15, seniorityMatches.length * 5);

  const titleScore = JASON_PROFILE.targetTitles.some((title) =>
    normalize(job.title).includes(normalize(title.split(" ")[0]))
  )
    ? 10
    : 4;

  const locationScore =
    normalize(job.workType).includes("remote") ||
    normalize(job.location).includes("nashville") ||
    normalize(job.location).includes("tn")
      ? 10
      : normalize(job.workType).includes("hybrid")
      ? 7
      : 3;

  const score = Math.min(
    100,
    healthcareScore + analyticsScore + aiScore + seniorityScore + titleScore + locationScore
  );

  const decision = score >= 85 ? "Apply Today" : score >= 70 ? "Apply If Time Permits" : "Skip or Treat as Stretch";

  return {
    score,
    decision,
    healthcareMatches,
    analyticsMatches,
    aiMatches,
    seniorityMatches,
  };
}

function evaluateGhostRisk(job) {
  let points = 0;
  const reasons = [];
  const postedHours = getPostedHours(job.postedAge);
  const applicants = Number(job.applicantCount || 0);
  const description = normalize(job.description);
  const jobUrl = normalize(job.jobUrl);

  if (postedHours > 48) {
    points += 3;
    reasons.push("Posting appears older than the 48-hour target.");
  }

  if (!job.companyCareerUrl) {
    points += 2;
    reasons.push("No company career-site link has been added for verification.");
  }

  if (!job.hiringManagerName && !job.recruiterName) {
    points += 2;
    reasons.push("No recruiter or likely hiring manager has been identified yet.");
  }

  if (applicants >= 100) {
    points += 2;
    reasons.push("High applicant count may reduce response odds.");
  }

  if (description.length < 180) {
    points += 2;
    reasons.push("Job description is short or vague.");
  }

  if (
    description.includes("always hiring") ||
    description.includes("pipeline") ||
    description.includes("talent community") ||
    description.includes("evergreen") ||
    description.includes("future opportunities")
  ) {
    points += 4;
    reasons.push("Description contains pipeline/evergreen language.");
  }

  if (!jobUrl.includes("linkedin.com")) {
    points += 2;
    reasons.push("Job URL is not a LinkedIn job link.");
  }

  if (points >= 7) return { risk: "High", points, reasons };
  if (points >= 4) return { risk: "Medium", points, reasons };
  return {
    risk: "Low",
    points,
    reasons: reasons.length ? reasons : ["No major ghost-job warning signs entered so far."],
  };
}

function generateFitExplanation(job, evaluation) {
  const parts = [];

  if (evaluation.healthcareMatches.length) {
    parts.push(`The role matches Jason's healthcare background through: ${evaluation.healthcareMatches.slice(0, 5).join(", ")}.`);
  }

  if (evaluation.analyticsMatches.length) {
    parts.push(`It also aligns with his analytics stack: ${evaluation.analyticsMatches.slice(0, 6).join(", ")}.`);
  }

  if (evaluation.aiMatches.length) {
    parts.push(`The AI/automation language is a plus because his resume includes AI-enabled analytics, Copilot, Databricks Genie, Cursor AI, and prompt engineering.`);
  }

  if (normalize(job.workType).includes("remote") || normalize(job.location).includes("nashville")) {
    parts.push(`The work arrangement fits his preference because it is ${job.workType} and/or near Nashville.`);
  }

  if (!parts.length) {
    parts.push("This role needs more job description detail before the app can explain the fit clearly.");
  }

  return parts.join(" ");
}

function generateHiringManagerMessage(job) {
  const greeting = job.hiringManagerName ? `Hi ${job.hiringManagerName},` : "Hi,";

  return `${greeting}

I recently applied for the ${job.title} role at ${job.company} and wanted to briefly introduce myself. My background includes ${JASON_PROFILE.experienceSummary}, and I’m very interested in contributing to your healthcare analytics team.

Thank you for your time, and I would appreciate your consideration.

Best,
${JASON_PROFILE.name}`;
}

function generateResumeKeywords(evaluation) {
  const keywords = [
    ...evaluation.healthcareMatches,
    ...evaluation.analyticsMatches,
    ...evaluation.aiMatches,
    "Healthcare Analytics",
    "Claims Analytics",
    "Executive Reporting",
    "AI-Enabled Analytics",
  ];
  return [...new Set(keywords)].slice(0, 12);
}

function calculateRoi(evaluation, ghostRisk, job) {
  let roi = evaluation.score;
  if (ghostRisk.risk === "High") roi -= 25;
  if (ghostRisk.risk === "Medium") roi -= 10;
  if (getPostedHours(job.postedAge) <= 48) roi += 5;
  if (normalize(job.workType).includes("remote")) roi += 5;

  roi = Math.max(0, Math.min(100, roi));
  const label = roi >= 85 ? "High ROI" : roi >= 70 ? "Good ROI" : roi >= 50 ? "Possible" : "Low ROI";
  return { roi, label };
}

export default function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("linkedin-healthcare-job-agent");
    return saved ? JSON.parse(saved) : SAMPLE_JOBS;
  });

  const [form, setForm] = useState(EMPTY_JOB);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    localStorage.setItem("linkedin-healthcare-job-agent", JSON.stringify(jobs));
  }, [jobs]);

  const enrichedJobs = useMemo(() => {
    return jobs.map((job) => {
      const evaluation = evaluateJob(job);
      const ghostRisk = evaluateGhostRisk(job);
      const roi = calculateRoi(evaluation, ghostRisk, job);

      return {
        ...job,
        evaluation,
        ghostRisk,
        roi,
        fitExplanation: generateFitExplanation(job, evaluation),
        hiringMessage: generateHiringManagerMessage(job),
        resumeKeywords: generateResumeKeywords(evaluation),
      };
    });
  }, [jobs]);

  const filteredJobs = enrichedJobs.filter((job) => {
    const text = `${job.company} ${job.title} ${job.location} ${job.status} ${job.description} ${job.notes}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const dashboard = useMemo(() => {
    const total = enrichedJobs.length;
    const avgFit = total
      ? Math.round(enrichedJobs.reduce((sum, job) => sum + job.evaluation.score, 0) / total)
      : 0;
    const ghostHigh = enrichedJobs.filter((job) => job.ghostRisk.risk === "High").length;
    const highRoi = enrichedJobs.filter((job) => job.roi.label === "High ROI").length;

    return {
      total,
      avgFit,
      ghostHigh,
      highRoi,
      applied: enrichedJobs.filter((job) => job.status === "Applied").length,
      outreach: enrichedJobs.filter((job) => job.status === "Outreach Sent").length,
    };
  }, [enrichedJobs]);

  function updateForm(field, value) {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "company" || field === "title") {
        next.hiringManagerUrl = buildHiringManagerSearchUrl(
          field === "company" ? value : next.company,
          field === "title" ? value : next.title
        );
      }
      return next;
    });
  }

  function addJob(event) {
    event.preventDefault();
    if (!form.company.trim() || !form.title.trim() || !form.jobUrl.trim()) {
      alert("Please enter at least company, job title, and LinkedIn job URL.");
      return;
    }

    const newJob = {
      ...form,
      id: crypto.randomUUID(),
      employmentType: "Full-time",
      source: "LinkedIn",
    };

    setJobs((current) => [newJob, ...current]);
    setForm(EMPTY_JOB);
  }

  function updateStatus(id, status) {
    setJobs((current) => current.map((job) => (job.id === id ? { ...job, status } : job)));
  }

  function deleteJob(id) {
    if (!confirm("Delete this job?")) return;
    setJobs((current) => current.filter((job) => job.id !== id));
  }

  async function copyText(id, text) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 1800);
  }

  function exportCsv() {
    const headers = [
      "Company",
      "Title",
      "Location",
      "Work Type",
      "Employment Type",
      "Posted Age",
      "Applicant Count",
      "Fit Score",
      "Decision",
      "ROI",
      "Ghost Risk",
      "Ghost Reasons",
      "Why Jason Fits",
      "Resume Keywords",
      "Hiring Manager Message",
      "LinkedIn Job URL",
      "Hiring Manager Search URL",
      "Company Career URL",
      "Status",
      "Notes",
    ];

    const rows = enrichedJobs.map((job) => [
      job.company,
      job.title,
      job.location,
      job.workType,
      job.employmentType,
      job.postedAge,
      job.applicantCount,
      job.evaluation.score,
      job.evaluation.decision,
      `${job.roi.label} (${job.roi.roi})`,
      job.ghostRisk.risk,
      job.ghostRisk.reasons.join(" | "),
      job.fitExplanation,
      job.resumeKeywords.join(", "),
      job.hiringMessage,
      job.jobUrl,
      job.hiringManagerUrl,
      job.companyCareerUrl,
      job.status,
      job.notes,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "linkedin-healthcare-job-agent.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">Resume-aware multi-agent workflow</p>
          <h1>LinkedIn Healthcare Job Agent</h1>
          <p>
            A portfolio-ready React app that helps Jason find recent LinkedIn healthcare analytics roles,
            score fit, flag ghost-job risk, find likely hiring managers, and generate outreach messages.
          </p>
        </div>

        <div className="hero-actions">
          <a className="primary-button" href={buildLinkedInJobSearchUrl()} target="_blank" rel="noreferrer">
            Open LinkedIn 48-Hour Search
          </a>
          <button className="secondary-button" onClick={exportCsv}>Export CSV</button>
        </div>
      </section>

      <section className="notice">
        <strong>Important:</strong> This app does not scrape LinkedIn. It opens a filtered LinkedIn search and lets you paste job details into a resume-aware job agent. Full LinkedIn automation requires approved LinkedIn API access or a licensed data provider.
      </section>

      <section className="dashboard-grid">
        <DashboardCard label="Saved Jobs" value={dashboard.total} />
        <DashboardCard label="Average Fit" value={`${dashboard.avgFit}%`} />
        <DashboardCard label="High ROI" value={dashboard.highRoi} />
        <DashboardCard label="High Ghost Risk" value={dashboard.ghostHigh} />
        <DashboardCard label="Applied" value={dashboard.applied} />
        <DashboardCard label="Outreach Sent" value={dashboard.outreach} />
      </section>

      <section className="agent-map panel">
        <h2>Agent Orchestration Map</h2>
        <div className="agent-grid">
          <AgentCard number="1" title="Job Discovery" text="Opens LinkedIn with full-time, 48-hour, healthcare analytics search filters." />
          <AgentCard number="2" title="Resume Match" text="Scores each job against Jason's healthcare analytics resume profile." />
          <AgentCard number="3" title="Ghost Job Risk" text="Flags suspicious or low-value postings based on practical warning signs." />
          <AgentCard number="4" title="Hiring Manager Search" text="Creates LinkedIn people-search links for likely managers and recruiters." />
          <AgentCard number="5" title="Outreach Generator" text="Creates a short message to send after applying." />
          <AgentCard number="6" title="Decision Agent" text="Combines fit, risk, freshness, and work preference into a recommended action." />
        </div>
      </section>

      <section className="main-grid">
        <form className="panel form-panel" onSubmit={addJob}>
          <h2>Add LinkedIn Job</h2>
          <p className="helper">Open LinkedIn, copy the job details, then paste them here for fit scoring and ghost-job review.</p>

          <label>Company<input value={form.company} onChange={(e) => updateForm("company", e.target.value)} placeholder="Example: Cigna" /></label>
          <label>Job Title<input value={form.title} onChange={(e) => updateForm("title", e.target.value)} placeholder="Example: Senior Healthcare Data Analyst" /></label>
          <label>Location<input value={form.location} onChange={(e) => updateForm("location", e.target.value)} placeholder="Example: Nashville, TN" /></label>

          <label>Work Type
            <select value={form.workType} onChange={(e) => updateForm("workType", e.target.value)}>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </label>

          <label>Posted Age<input value={form.postedAge} onChange={(e) => updateForm("postedAge", e.target.value)} placeholder="Example: 18 hours ago" /></label>
          <label>Applicant Count<input value={form.applicantCount} onChange={(e) => updateForm("applicantCount", e.target.value)} placeholder="Example: 42" /></label>
          <label>LinkedIn Job URL<input value={form.jobUrl} onChange={(e) => updateForm("jobUrl", e.target.value)} placeholder="Paste LinkedIn job URL" /></label>
          <label>Company Career Site URL<input value={form.companyCareerUrl} onChange={(e) => updateForm("companyCareerUrl", e.target.value)} placeholder="Optional but helps verify job is real" /></label>
          <label>Hiring Manager Name<input value={form.hiringManagerName} onChange={(e) => updateForm("hiringManagerName", e.target.value)} placeholder="Optional" /></label>
          <label>Hiring Manager Title<input value={form.hiringManagerTitle} onChange={(e) => updateForm("hiringManagerTitle", e.target.value)} placeholder="Example: Director of Analytics" /></label>
          <label>Hiring Manager Search URL<input value={form.hiringManagerUrl} onChange={(e) => updateForm("hiringManagerUrl", e.target.value)} /></label>
          <label>Recruiter Name<input value={form.recruiterName} onChange={(e) => updateForm("recruiterName", e.target.value)} placeholder="Optional" /></label>

          <label>Status
            <select value={form.status} onChange={(e) => updateForm("status", e.target.value)}>
              {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>

          <label>Job Description<textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} placeholder="Paste the job description here." /></label>
          <label>Notes<textarea value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} placeholder="Any extra observations." /></label>

          <button className="primary-button" type="submit">Analyze and Save Job</button>
        </form>

        <section className="panel job-panel">
          <div className="section-header">
            <div>
              <h2>Analyzed LinkedIn Jobs</h2>
              <p>{filteredJobs.length} result(s)</p>
            </div>
            <div className="filters">
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search jobs..." />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All</option>
                {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
              </select>
            </div>
          </div>

          <div className="job-list">
            {filteredJobs.map((job) => (
              <article className="job-card" key={job.id}>
                <div className="job-top">
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company} • {job.location} • {job.workType} • {job.employmentType}</p>
                  </div>
                  <div className="score-stack">
                    <span className="score">{job.evaluation.score}% fit</span>
                    <span className={`ghost ${job.ghostRisk.risk.toLowerCase()}`}>{job.ghostRisk.risk} ghost risk</span>
                  </div>
                </div>

                <div className="tags">
                  <span>{job.evaluation.decision}</span>
                  <span>{job.roi.label}: {job.roi.roi}</span>
                  <span>{job.postedAge || "Posted age missing"}</span>
                </div>

                <div className="analysis-box">
                  <h4>Why Jason is a good fit</h4>
                  <p>{job.fitExplanation}</p>
                </div>

                <div className="analysis-box">
                  <h4>Ghost-job warning signs</h4>
                  <ul>
                    {job.ghostRisk.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                  </ul>
                </div>

                <div className="analysis-box">
                  <h4>Resume keywords to emphasize</h4>
                  <p>{job.resumeKeywords.join(", ")}</p>
                </div>

                <div className="message-box">
                  <h4>Short message to hiring manager</h4>
                  <textarea readOnly value={job.hiringMessage} />
                </div>

                <div className="job-actions">
                  <select value={job.status} onChange={(e) => updateStatus(job.id, e.target.value)}>
                    {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <a href={job.jobUrl} target="_blank" rel="noreferrer">Open Job</a>
                  <a href={job.hiringManagerUrl || buildHiringManagerSearchUrl(job.company, job.title)} target="_blank" rel="noreferrer">Find Hiring Manager</a>
                  {job.companyCareerUrl && <a href={job.companyCareerUrl} target="_blank" rel="noreferrer">Verify Career Site</a>}
                  <button className="copy-button" onClick={() => copyText(`msg-${job.id}`, job.hiringMessage)}>
                    {copiedId === `msg-${job.id}` ? "Copied!" : "Copy Message"}
                  </button>
                  <button className="delete-button" onClick={() => deleteJob(job.id)}>Delete</button>
                </div>
              </article>
            ))}

            {filteredJobs.length === 0 && (
              <div className="empty-state">
                <h3>No jobs found</h3>
                <p>Try clearing your search or changing the status filter.</p>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function DashboardCard({ label, value }) {
  return (
    <div className="dashboard-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function AgentCard({ number, title, text }) {
  return (
    <div className="agent-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
