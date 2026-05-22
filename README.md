# LinkedIn Healthcare Job Agent

A resume-aware React portfolio project that helps Jason Albano find and prioritize LinkedIn healthcare analytics jobs.

This app is designed around Jason's latest resume profile: healthcare analytics, claims analysis, provider performance, utilization analysis, cost containment, SQL, Tableau, Power BI, Databricks, Python, SAS, Looker, AI-enabled analytics, Databricks Genie, Microsoft Copilot, Cursor AI, prompt engineering, executive reporting, and dashboard development.

## What This App Does

This app helps you:

- Search LinkedIn for healthcare analytics roles posted within the last 48 hours
- Focus on full-time remote roles, plus hybrid/on-site roles around Nashville
- Save LinkedIn job postings
- Score each job against Jason's resume
- Explain why Jason is a good fit
- Flag possible ghost-job risk
- Generate LinkedIn hiring-manager search links
- Generate a short message to send to a hiring manager after applying
- Recommend whether to apply, skip, or treat the job as a stretch
- Export the job pipeline to CSV

## Important Limitation

This app does not scrape LinkedIn.

That is intentional. LinkedIn does not generally allow public scraping or automatic job extraction without approved API access or a licensed data provider.

Instead, this app opens a filtered LinkedIn search and lets you paste job details into the app. The app then analyzes the role using resume-aware logic.

## Why This Shows Agent Orchestration

This app acts like a coordinated multi-agent workflow:

1. Job Discovery Agent  
   Opens LinkedIn with filters for recent, full-time, healthcare analytics jobs.

2. Resume Match Agent  
   Scores the job against Jason's healthcare analytics resume profile.

3. Ghost Job Risk Agent  
   Flags suspicious job postings using practical warning signs.

4. Hiring Manager Search Agent  
   Creates LinkedIn people-search links for likely hiring managers and recruiters.

5. Outreach Agent  
   Generates a short professional message to send after applying.

6. Decision Agent  
   Combines fit, risk, freshness, and work preference into a recommendation.

## Files Included

```text
linkedin-healthcare-job-agent/
├── package.json
├── index.html
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── App.css
```

## Step 1: Install Node.js

Go to the Node.js website and install the LTS version.

After installing, open Terminal, Command Prompt, or PowerShell and run:

```bash
node -v
npm -v
```

If both commands return version numbers, you are ready.

## Step 2: Unzip the Project

Unzip the downloaded file.

You should see a folder named:

```text
linkedin-healthcare-job-agent
```

## Step 3: Open the Project Folder

In Terminal or PowerShell, go into the project folder:

```bash
cd linkedin-healthcare-job-agent
```

## Step 4: Install Dependencies

Run:

```bash
npm install
```

This downloads the packages needed to run the app.

## Step 5: Run the App Locally

Run:

```bash
npm run dev
```

Vite will show a local address, usually:

```text
http://localhost:5173
```

Open that link in your browser.

## Step 6: How to Use the App

### 1. Click "Open LinkedIn 48-Hour Search"

This opens LinkedIn with these filters:

- Healthcare analytics-style roles
- Nashville, TN
- Posted within 48 hours
- Full-time
- Remote, hybrid, or on-site

### 2. Review Jobs on LinkedIn

Look for roles that match:

- Healthcare Data Analyst
- Senior Healthcare Data Analyst
- AI Data Analyst
- Business Intelligence Analyst
- Clinical Data Analyst
- Claims Data Analyst
- Medical Economics Analyst
- Healthcare Analytics Consultant

### 3. Copy Job Details into the App

For each role, paste:

- Company
- Job title
- Location
- Work type
- Posted age
- Applicant count
- LinkedIn job URL
- Company career site URL, if available
- Job description
- Notes

### 4. Click "Analyze and Save Job"

The app will automatically create:

- Fit score
- Apply/skip recommendation
- Ghost-job risk flag
- Explanation of why Jason is a good fit
- Resume keywords to emphasize
- Hiring manager search link
- Short message to send after applying

### 5. Verify the Job

If the app flags a ghost-job risk, check:

- Is the job also on the company career site?
- Is the posting older than 48 hours?
- Is the description vague?
- Is the applicant count very high?
- Can you find a recruiter or hiring manager?
- Does the job look like a pipeline or evergreen posting?

### 6. Apply and Send Outreach

After applying:

1. Click "Find Hiring Manager"
2. Look for likely contacts:
   - Analytics Manager
   - Director of Analytics
   - BI Manager
   - Healthcare Analytics Leader
   - Talent Acquisition Partner
3. Copy the generated message
4. Send it through LinkedIn

## Sample Hiring Manager Message

```text
Hi,

I recently applied for the Senior Healthcare Data Analyst role at Cigna and wanted to briefly introduce myself. My background includes healthcare claims analytics, provider performance, utilization analysis, cost containment, executive reporting, SQL, Tableau, Power BI, Databricks, Python, SAS, Looker, Databricks Genie, Microsoft Copilot, Cursor AI, prompt engineering, dashboard development, and AI-enabled analytics, and I’m very interested in contributing to your healthcare analytics team.

Thank you for your time, and I would appreciate your consideration.

Best,
Jason Albano
```

## Step 7: Export Your Pipeline

Click:

```text
Export CSV
```

This downloads your job pipeline with:

- Fit score
- Ghost risk
- Why Jason fits
- Resume keywords
- Hiring manager message
- Status
- Links
- Notes

## Step 8: Upload to GitHub

Create a new GitHub repository named:

```text
linkedin-healthcare-job-agent
```

Then run these commands inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit - LinkedIn healthcare job agent"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/linkedin-healthcare-job-agent.git
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with your GitHub username.

## Step 9: Deploy to GitHub Pages

### 1. Update package.json

Open `package.json`.

Change this line:

```json
"homepage": "https://YOUR-GITHUB-USERNAME.github.io/linkedin-healthcare-job-agent"
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

### 2. Deploy

Run:

```bash
npm run deploy
```

### 3. Turn on GitHub Pages

In GitHub:

```text
Settings → Pages → Source → Deploy from branch → gh-pages
```

Your app should publish at:

```text
https://YOUR-GITHUB-USERNAME.github.io/linkedin-healthcare-job-agent
```

## How to Explain This in an Interview

You can say:

```text
I built a resume-aware LinkedIn healthcare job agent using React. The app demonstrates agent orchestration patterns by coordinating multiple specialized workflows: job discovery, resume qualification scoring, ghost-job risk detection, hiring-manager search, outreach message generation, and opportunity prioritization. It uses my healthcare analytics resume profile to explain why I am a fit for each role and helps me decide which jobs are worth applying to.
```

## Suggested Resume Bullet

```text
Designed and built a resume-aware multi-agent job intelligence application using React that orchestrates job discovery, qualification scoring, ghost-job risk detection, hiring-manager research, outreach generation, and opportunity prioritization for healthcare analytics roles.
```

## Suggested LinkedIn Project Description

```text
Built a React-based LinkedIn Healthcare Job Agent that uses resume-aware scoring to evaluate healthcare analytics roles, explain fit, flag potential ghost jobs, generate hiring-manager outreach, and prioritize applications. The project demonstrates agent orchestration concepts by coordinating multiple specialized workflows in a single job-search dashboard.
```

## Future Improvements

- Paste LinkedIn URL and auto-extract job details using an approved API
- Add OpenAI or Azure OpenAI integration
- Add resume upload
- Add real authentication
- Add a database
- Add calendar reminders
- Add email drafting
- Add interview question generation
- Add company research summaries
