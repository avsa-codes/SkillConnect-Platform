import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-gray">
           <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
<p className="text-muted-foreground mb-8">Last updated: December 2025</p>

{/* PART I — TASKER TERMS */}
<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">Part I: Terms and Conditions for Taskers (Students)</h2>
</section>

{/* 1. Tasker Profile, Screening, and Verification */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">1. Tasker Profile, Screening, and Verification</h2>

  <p className="text-muted-foreground mb-4">
    <strong>1.1. Registration and Profile Accuracy:</strong> The Tasker must provide accurate and complete personal details,
    educational background, skills, certifications, and availability during registration and profile creation.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>1.2. Mandatory Verification:</strong> The Tasker agrees to undergo all mandatory screening and verification processes,
    which may include skill tests, interviews, identity/college verification, and review of documents/certificates.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>1.3. Categorization and Matching:</strong> Upon approval, the Tasker will be categorized by skill, availability, and experience,
    which will be used by the SkillConnect team for automated and manual task matching with Organizations.
  </p>

  <p className="text-muted-foreground">
    <strong>1.4. Availability Commitment:</strong> The Tasker must keep their stated availability (daily/weekly/monthly) up-to-date.
    Misrepresentation of availability leading to a no-show or task failure may result in penalties, including suspension or removal
    from the platform.
  </p>
</section>

{/* 2. Task Engagement, Performance, and Compensation */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">2. Task Engagement, Performance, and Compensation</h2>

  <p className="text-muted-foreground mb-4">
    <strong>2.1. Task Acceptance:</strong> Acceptance of a task confirms the Tasker's commitment to the specified skills, duration,
    salary, and location.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>2.2. Attendance and Commencement:</strong> The Tasker is obligated to show up and commence the task on the confirmed
    start date and time. Failure to do so constitutes a "No-Show."
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>2.3. Performance Standards:</strong> The Tasker agrees to maintain a high standard of quality, meet deadlines,
    and adhere to professional requirements. Repeated performance issues or "red flags" will impact eligibility and rating.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>2.4. Compensation Structure:</strong>
  </p>
  <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
    <li><strong>Gross Salary:</strong> Paid by the Organization as agreed upon.</li>
    <li><strong>InstaTask Processing Fee (Salary Cut):</strong> The Tasker agrees to a 5–10% deduction from the gross salary to cover processing and documentation.</li>
    <li><strong>Net Payout:</strong> The Tasker receives the remaining amount after deductions.</li>
  </ul>

  <p className="text-muted-foreground mb-4">
    <strong>2.5. Salary Disclosure (MANDATORY):</strong> Under no circumstances may the Tasker ask the Organization about salary details. All salary communication is
    exclusively handled by InstaTask. Violations may lead to suspension.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>2.6. Payment Processing:</strong> InstaTask processes salary after task completion and organizational verification, subject to standard payroll cycles.
  </p>

  <p className="text-muted-foreground">
    <strong>2.7. Certificate Issuance:</strong> Upon satisfactory completion, InstaTask will issue a standardized Task Completion Certificate.
  </p>
</section>

{/* 3. Confidentiality and Intellectual Property */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">3. Confidentiality and Intellectual Property</h2>

  <p className="text-muted-foreground mb-4">
    <strong>3.1. Confidentiality Agreement:</strong> The Tasker must maintain confidentiality of all sensitive company information and trade secrets obtained during the task.
  </p>

  <p className="text-muted-foreground">
    <strong>3.2. Intellectual Property:</strong> Unless otherwise specified, all work produced by the Tasker belongs exclusively to the hiring Organization.
  </p>
</section>

{/* 4. Ratings, Feedback, and Dispute Resolution */}
<section className="mb-12">
  <h2 className="text-2xl font-bold mb-4">4. Ratings, Feedback, and Dispute Resolution</h2>

  <p className="text-muted-foreground mb-4">
    <strong>4.1. Performance Tracking:</strong> Tasker performance will be rated and tracked, contributing to the SkillConnect Score.
  </p>

  <p className="text-muted-foreground">
    <strong>4.2. Dispute Resolution:</strong> All disputes must be submitted to the InstaTask Admin Team, whose decision is final and binding.
  </p>
</section>

{/* PART II — ORGANIZATION TERMS */}
<section className="mb-12">
  <h2 className="text-3xl font-bold mb-6">Part II: Terms and Conditions for Organizations</h2>
</section>

{/* 1. Registration, Posting, Matching */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">1. Registration, Task Posting, and Tasker Matching</h2>

  <p className="text-muted-foreground mb-4">
    <strong>1.1. Registration and Verification:</strong> Organizations must provide accurate company information for verification.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>1.2. Task Posting Accuracy:</strong> Organizations must clearly define task requirements, duration, skills, and gross salary.
  </p>

  <p className="text-muted-foreground">
    <strong>1.3. Matching Process:</strong> SkillConnect will shortlist 2–3 pre-screened Taskers for the Organization to select from.
  </p>
</section>

{/* 2. Financial and Payment Obligations */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">2. Financial and Payment Obligations</h2>

  <p className="text-muted-foreground mb-4">
    <strong>2.1. Placement Fee:</strong> A fixed Placement Fee is due upon Tasker selection, covering screening and the Replacement Guarantee.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>2.2. Salary Payment:</strong> Organizations must pay the full gross salary amount to InstaTask for payroll processing.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>2.3. Salary Disclosure Prohibition (MANDATORY):</strong> Organizations are strictly prohibited from discussing salary details with Taskers.
  </p>

  <p className="text-muted-foreground">
    <strong>2.4. Subscription/Retainer:</strong> Organizations opting for priority access may be charged a Subscription or Retainer fee.
  </p>
</section>

{/* 3. Task Duration and Over-Term Policy */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">3. Task Duration and Over-Term Policy (MANDATORY)</h2>

  <p className="text-muted-foreground mb-4">
    <strong>3.1. Defined Duration:</strong> All tasks must have a confirmed start and end date.
  </p>

  <p className="text-muted-foreground">
    <strong>3.2. Over-Term Penalty:</strong> If an Organization keeps a Tasker even one (1) day beyond agreed duration,
    they must immediately pay InstaTask the equivalent of two (2) months of Tasker salary.
  </p>
</section>

{/* 4. Replacement and Guarantee Policy */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">4. Replacement and Guarantee Policy</h2>

  <p className="text-muted-foreground mb-4">
    <strong>4.1. No-Show Replacement:</strong> If a Tasker fails to show up, InstaTask will provide a replacement within 48 hours.
  </p>

  <p className="text-muted-foreground">
    <strong>4.2. Unsatisfactory Performance:</strong> If Tasker's performance is unsatisfactory, a replacement will be provided within 48–72 hours after review.
  </p>
</section>

{/* 5. Feedback, Confidentiality, and Dispute Resolution */}
<section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">5. Feedback, Confidentiality, and Dispute Resolution</h2>

  <p className="text-muted-foreground mb-4">
    <strong>5.1. Feedback Obligation:</strong> Organizations must provide timely feedback and performance ratings upon task completion.
  </p>

  <p className="text-muted-foreground mb-4">
    <strong>5.2. Confidentiality:</strong> Organizations agree to protect salary confidentiality and Tasker personal information.
  </p>

  <p className="text-muted-foreground">
    <strong>5.3. Dispute Resolution:</strong> All disputes will be handled by the InstaTask Admin Team, whose decision is final.
  </p>
</section>


            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at support@instatask.in.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
