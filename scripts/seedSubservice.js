require("dotenv").config();
const mongoose = require("mongoose");
const SubService = require("../models/SubService");

// Company Registration Data
const companyRegistrationData = [
    {
      category: "Company Registration",
      sub_category: "Private Limited Company",
      title: "Private Limited Company",
      description: "Private Limited Company registration in India is the most common type of company setup.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN Card", description: "PAN is mandatory for all Directors." },
            { title: "Aadhaar Card", description: "Aadhaar is mandatory for Indian Directors." },
            { title: "Passport (Foreign Nationals Only)", description: "Foreign Directors need to submit Passport." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Regulations in India",
          description: "Private Limited Companies are governed under the Companies Act, 2013.",
          points: [
            { title: "Uniqueness", description: "The name must be unique and distinct from other registered companies." },
            { title: "Shareholder Limit", description: "A minimum of 2 shareholders and 2 directors are required." },
          ],
        },
      ],
    },
    {
        category: "Company Registration",
        sub_category: "LLP Registration",
        title: "LLP Registration",
        description: "LLP is a popular form of business structure for small and medium enterprises in India.",
        headings: [
          {
            headingTitle: "Documents Required",
            content: [
              { title: "PAN Card", description: "PAN is mandatory for all partners." },
              { title: "Passport (Foreign Nationals Only)", description: "Passport is required for foreign partners." }
            ]
          }
        ],
        regulations: [
          {
            headingTitle: "LLP Regulation in India",
            description: "The legal framework for LLP registration in India is governed by the Limited Liability Partnership Act, 2008.",
            points: [
              { title: "Unique Name", description: "The name of the LLP must be unique and distinct." },
              { title: "Filing Requirements", description: "LLPs are required to file annual returns with the Registrar of Companies." }
            ]
          }
        ]
    },
    {
      category: "Company Registration",
      sub_category: "One Person Company",
      title: "One Person Company (OPC)",
      description: "An OPC allows a single entrepreneur to operate a corporate entity with limited liability.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN Card", description: "PAN is required for the sole director and shareholder." },
            { title: "Address Proof", description: "Bank statement, electricity bill, or telephone bill." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Companies Act, 2013",
          description: "OPCs are governed under Section 2(62) of the Companies Act, 2013.",
          points: [
            { title: "Single Ownership", description: "Only one person can be a director and shareholder." },
            { title: "Nominee", description: "A nominee must be appointed during incorporation." },
          ],
        },
      ],
    },
    {
      category: "Company Registration",
      sub_category: "Section 8 Company",
      title: "Section 8 Company (NGO)",
      description: "Section 8 Companies are established for promoting charitable and not-for-profit objectives.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Identity Proof", description: "Aadhaar, PAN, or Passport for directors." },
            { title: "Office Address Proof", description: "Electricity bill or rental agreement." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Companies Act, 2013",
          description: "Section 8 Companies are governed under the Companies Act, 2013.",
          points: [
            { title: "No Profit Distribution", description: "Profits cannot be distributed among members." },
            { title: "Tax Exemptions", description: "Eligible for tax exemptions under section 12A and 80G of the Income Tax Act." },
          ],
        },
      ],
    },
    {
      category: "Company Registration",
      sub_category: "Public Limited Company",
      title: "Public Limited Company",
      description: "A Public Limited Company allows large-scale businesses to raise capital from the public via shares.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN Card", description: "PAN is required for all directors and shareholders." },
            { title: "DIN (Director Identification Number)", description: "DIN is mandatory for company directors." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Companies Act, 2013",
          description: "Public Limited Companies are governed under the Companies Act, 2013.",
          points: [
            { title: "Minimum Capital", description: "Minimum paid-up capital of ₹5 lakhs is required." },
            { title: "Board of Directors", description: "At least three directors are required." },
          ],
        },
      ],
    },
    {
      category: "Company Registration",
      sub_category: "Nidhi Company",
      title: "Nidhi Company",
      description: "Nidhi Companies operate as non-banking financial institutions, providing mutual benefit schemes.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN Card", description: "PAN is required for all promoters." },
            { title: "Proof of Registered Office", description: "Rental agreement or property papers." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Nidhi Rules, 2014",
          description: "Nidhi Companies are governed under the Nidhi Rules, 2014.",
          points: [
            { title: "Minimum Members", description: "At least 200 members are required within a year of incorporation." },
            { title: "Loan Restrictions", description: "Loans can only be given to members." },
          ],
        },
      ],
    },
    {
      category: "Company Registration",
      sub_category: "Indian Subsidiary Registration",
      title: "Indian Subsidiary Registration",
      description: "Foreign companies can set up their subsidiary in India to expand their business operations.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Parent Company Certificate", description: "Certificate of Incorporation of the parent company." },
            { title: "Director Details", description: "PAN and passport copies of Indian and foreign directors." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Companies Act, 2013 & FEMA Regulations",
          description: "Subsidiary companies must comply with Indian corporate laws.",
          points: [
            { title: "Foreign Direct Investment (FDI)", description: "Subject to FDI regulations in India." },
            { title: "Compliance Requirements", description: "Annual filing and statutory compliance are mandatory." },
          ],
        },
      ],
    },
    {
      category: "Company Registration",
      sub_category: "Society Registration",
      title: "Society Registration",
      description: "Societies are registered for social welfare and charitable objectives under the Societies Registration Act.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Memorandum of Association", description: "Defines the objectives and governance of the society." },
            { title: "List of Members", description: "Names and addresses of all members forming the society." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Societies Registration Act, 1860",
          description: "Governs the registration and functioning of societies in India.",
          points: [
            { title: "Minimum Members", description: "At least 7 members are required for registration." },
            { title: "Non-Profit Nature", description: "Surplus funds cannot be distributed among members." },
          ],
        },
      ],
    },
    {
      category: "Company Registration",
      sub_category: "Trust Registration",
      title: "Trust Registration",
      description: "Trust registration in India is essential for establishing a charitable or religious organization.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title : "Trust Deed", description: "A trust deed outlining the objectives and rules is mandatory." },
            { title: "PAN Card", description: "PAN is required for the trust and trustees." },
            { title: "Address Proof", description: "Proof of the registered office address of the trust." },
            { title: "Trustee ID Proof", description: "Aadhaar, Passport, or Voter ID of all trustees." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "Regulations in India",
          description: "Trusts in India are governed under the Indian Trusts Act, 1882 (for private trusts) and relevant state laws (for public trusts).",
          points: [
            { title: "Minimum Trustees", description: "A minimum of two trustees are required to form a trust." },
            { title: "Purpose", description: "Trusts must operate for a charitable, religious, or social purpose." }
          ]
        }
      ]
    }
    
  ];

  const compliancesAndReturnsData = [
    {
      category: "Compliances and Returns",
      sub_category: "Company Secretarial Compliance",
      title: "Company Secretarial Compliance",
      description: "Ensuring compliance with company secretarial obligations, including maintaining statutory registers, filing annual returns, and conducting board meetings.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Incorporation Certificate", description: "Certificate of incorporation of the company." },
            { title: "MOA & AOA", description: "Memorandum and Articles of Association of the company." },
            { title: "Board Resolutions", description: "Resolutions passed for company decisions." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Companies Act, 2013",
          description: "Companies must comply with the Companies Act, 2013 for secretarial compliance.",
          points: [
            { title: "Annual Filings", description: "Annual returns and financial statements must be filed with the Registrar of Companies (ROC)." },
            { title: "Board Meetings", description: "Mandatory board and general meetings must be conducted as per law." },
          ],
        },
      ],
    },
    {
      category: "Compliances and Returns",
      sub_category: "Auditing Compliance",
      title: "Auditing Compliance",
      description: "Auditing compliance ensures that financial records are verified and meet statutory requirements.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Financial Statements", description: "Balance sheet, profit & loss statement, and cash flow statement." },
            { title: "Bank Statements", description: "Bank transaction details for audit verification." },
            { title: "Invoices and Bills", description: "Purchase and sales invoices for verification." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Audit Regulations",
          description: "Auditing is governed under the Companies Act, 2013 and Income Tax Act, 1961.",
          points: [
            { title: "Statutory Audit", description: "Companies must undergo statutory audits by certified auditors." },
            { title: "Tax Audit", description: "Businesses exceeding turnover limits must comply with tax audits." },
          ],
        },
      ],
    },
    {
      category: "Compliances and Returns",
      sub_category: "Tax Compliance",
      title: "Tax Compliance",
      description: "Ensuring timely tax payments and filings to avoid penalties and legal consequences.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN & TAN", description: "Permanent Account Number (PAN) and Tax Deduction and Collection Account Number (TAN)." },
            { title: "Income Tax Returns", description: "Past tax returns for reference." },
            { title: "Financial Records", description: "Business transactions and profit/loss statements." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Income Tax Act, 1961",
          description: "Tax compliance in India is regulated by the Income Tax Act, 1961.",
          points: [
            { title: "Quarterly Filings", description: "Advance tax payments must be made quarterly." },
            { title: "Penalty for Non-Compliance", description: "Failure to comply results in penalties and interest charges." },
          ],
        },
      ],
    },
    {
      category: "Compliances and Returns",
      sub_category: "GST Filing",
      title: "GST Filing",
      description: "Regular filing of GST returns to comply with tax regulations and claim input tax credits.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "GSTIN", description: "GST Identification Number (GSTIN) of the business." },
            { title: "Invoices", description: "Invoices for sales and purchases." },
            { title: "E-way Bills", description: "E-way bills for movement of goods above prescribed limits." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "GST Compliance Rules",
          description: "Goods and Services Tax (GST) compliance is mandatory for registered businesses.",
          points: [
            { title: "Monthly/Quarterly Filing", description: "GSTR-1, GSTR-3B, and other required filings must be submitted." },
            { title: "Penalty for Late Filing", description: "Late filing attracts penalties and interest on unpaid tax." },
          ],
        },
      ],
    },
    {
      category: "Compliances and Returns",
      sub_category: "TDS Return Filing Assistance",
      title: "TDS Return Filing Assistance",
      description: "Assisting businesses with timely filing of Tax Deducted at Source (TDS) returns.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "TAN", description: "Tax Deduction and Collection Account Number (TAN)." },
            { title: "Challan Details", description: "TDS challans paid to the government." },
            { title: "Employee Salary Slips", description: "Salary records for tax deduction." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Income Tax Act, 1961 - TDS Rules",
          description: "Businesses must deduct and deposit TDS as per Income Tax Act guidelines.",
          points: [
            { title: "Quarterly Returns", description: "TDS returns must be filed every quarter (Form 24Q, 26Q, etc.)." },
            { title: "Penalty for Delay", description: "Late payment of TDS attracts penalties and interest." },
          ],
        },
      ],
    },
    {
      category: "Compliances and Returns",
      sub_category: "Income Tax Registration",
      title: "Income Tax Registration",
      description: "Registering businesses and individuals for Income Tax compliance.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN Card", description: "Permanent Account Number (PAN) of the applicant." },
            { title: "Aadhaar Card", description: "Aadhaar for individual registration." },
            { title: "Proof of Address", description: "Business address proof like utility bills." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Income Tax Act, 1961",
          description: "Income Tax registration is required for tax compliance in India.",
          points: [
            { title: "Mandatory for Businesses", description: "All businesses and individuals earning above taxable limits must register." },
            { title: "Tax Payment Obligation", description: "Once registered, regular tax filings and payments are mandatory." },
          ],
        },
      ],
    },
    {
      category: "Compliances and Returns",
      sub_category: "Annual Return Filing",
      title: "Annual Return Filing",
      description: "Filing annual returns for companies and LLPs to maintain compliance.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Financial Statements", description: "Audited financial statements for the year." },
            { title: "Director's Report", description: "Report from directors about company operations." },
            { title: "Annual General Meeting (AGM) Details", description: "Minutes of the AGM conducted during the year." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Companies Act, 2013",
          description: "Annual return filing is mandatory under the Companies Act, 2013.",
          points: [
            { title: "ROC Filing", description: "Companies must file returns with the Registrar of Companies (ROC)." },
            { title: "Penalty for Non-Filing", description: "Failure to file annual returns leads to fines and disqualification of directors." },
          ],
        },
      ],
    }
  ];

  const iprRegistrationData = [
    {
      category: "IPR Registration",
      sub_category: "Trademark Registration",
      title: "Trademark Registration",
      description: "Trademark registration provides legal protection for brand names, logos, and slogans.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Applicant's Identity Proof", description: "PAN, Aadhaar, or Passport for individuals." },
            { title: "Business Registration Proof", description: "Certificate of Incorporation for companies." },
            { title: "Trademark Logo", description: "High-resolution image of the trademark (if applicable)." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Trademark Act, 1999",
          description: "Governs trademark registration and protection in India.",
          points: [
            { title: "Validity", description: "Trademark registration is valid for 10 years and renewable indefinitely." },
            { title: "Exclusive Rights", description: "Owners have exclusive rights to use and protect the trademark." },
          ],
        },
      ],
    },
    {
      category: "IPR Registration",
      sub_category: "Copyright Registration",
      title: "Copyright Registration",
      description: "Copyright registration provides legal protection for literary, artistic, and creative works.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Identity Proof", description: "PAN, Aadhaar, or Passport of the author or owner." },
            { title: "Work Sample", description: "A copy of the creative work being copyrighted." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Copyright Act, 1957",
          description: "Governs copyright protection in India.",
          points: [
            { title: "Duration", description: "Copyright is valid for the lifetime of the author plus 60 years." },
            { title: "Ownership Rights", description: "Provides exclusive rights to reproduce and distribute the work." },
          ],
        },
      ],
    },
    {
      category: "IPR Registration",
      sub_category: "Patent Registration",
      title: "Patent Registration",
      description: "Patent registration grants exclusive rights to an inventor for a novel invention.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Patent Specification", description: "Detailed description and claims of the invention." },
            { title: "Applicant’s Identity Proof", description: "PAN, Aadhaar, or Passport." },
            { title: "Power of Attorney", description: "Required if the application is filed by a patent agent." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Patent Act, 1970",
          description: "Governs patent filing and protection in India.",
          points: [
            { title: "Validity", description: "Patents are granted for 20 years from the date of filing." },
            { title: "Novelty Requirement", description: "Invention must be new, non-obvious, and industrially applicable." },
          ],
        },
      ],
    },
    {
      category: "IPR Registration",
      sub_category: "Design Registration",
      title: "Design Registration",
      description: "Design registration protects the visual appearance of a product.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Drawings or Images", description: "Clear illustrations showing different views of the design." },
            { title: "Applicant’s Identity Proof", description: "PAN, Aadhaar, or Passport of the owner." },
            { title: "Declaration of Novelty", description: "Statement confirming that the design is new and original." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Designs Act, 2000",
          description: "Regulates the protection of industrial designs in India.",
          points: [
            { title: "Validity", description: "Designs are protected for 10 years, extendable by 5 more years." },
            { title: "Exclusivity", description: "Grants the owner exclusive rights to use and sell the design." },
          ],
        },
      ],
    },
  ];
  
  const legalAndBusinessConsultancyData = [
    {
      category: "Legal and Business Consultancy",
      sub_category: "Legal Consultancy",
      title: "Legal Consultancy Services",
      description: "Providing expert legal advice on corporate, civil, and criminal matters to businesses and individuals.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Identity Proof", description: "Aadhaar, PAN, or Passport for individuals." },
            { title: "Legal Documents", description: "Existing contracts, agreements, and any legal notices." },
            { title: "Company Incorporation Papers", description: "For businesses, Certificate of Incorporation and MOA/AOA." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Legal Compliance Regulations",
          description: "Legal services are governed under various Indian laws including the Advocates Act, 1961.",
          points: [
            { title: "Confidentiality", description: "All legal consultations are protected under attorney-client privilege." },
            { title: "Advisory Services", description: "Legal consultants provide advisory but do not litigate in court." },
          ],
        },
      ],
    },
    {
      category: "Legal and Business Consultancy",
      sub_category: "Society_Trust_NGO Consultancy",
      title: "Society/Trust/NGO Consultancy",
      description: "Guidance on registration, compliance, and operations of societies, trusts, and non-profit organizations.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Identity Proof of Trustees/Members", description: "Aadhaar, PAN, or Passport." },
            { title: "Memorandum of Association (MOA)", description: "Defines the objectives and governance of the NGO." },
            { title: "Address Proof", description: "Electricity bill, lease agreement, or ownership proof." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Non-Profit Regulations",
          description: "Governed under the Societies Registration Act, 1860 and Trusts Act, 1882.",
          points: [
            { title: "Tax Exemptions", description: "Eligible for tax benefits under Section 12A and 80G of the Income Tax Act." },
            { title: "Annual Filing Requirements", description: "Annual returns and audit reports must be submitted to maintain compliance." },
          ],
        },
      ],
    },
    {
      category: "Legal and Business Consultancy",
      sub_category: "Contract Drafting and Due Diligence",
      title: "Contract Drafting and Due Diligence",
      description: "Professional legal drafting and thorough review of business contracts, agreements, and compliance checks.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Existing Contracts", description: "Copies of agreements that require drafting or review." },
            { title: "Company Details", description: "Incorporation certificate, GST registration, and business profile." },
            { title: "Parties Involved", description: "Legal identities of all parties signing the contract." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Contract Law Compliance",
          description: "Contracts must comply with the Indian Contract Act, 1872.",
          points: [
            { title: "Legally Binding", description: "Contracts must be enforceable and clearly define the obligations of parties." },
            { title: "Risk Mitigation", description: "Due diligence ensures that legal risks are minimized before signing agreements." },
          ],
        },
      ],
    },
    {
      category: "Legal and Business Consultancy",
      sub_category: "Business Consultancy",
      title: "Business Consultancy",
      description: "Expert guidance for startups, SMEs, and large enterprises on business strategy, operations, and expansion.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Plan", description: "Detailed business model, projections, and financial estimates." },
            { title: "Company Registration", description: "Certificate of Incorporation and business licenses." },
            { title: "Market Research Reports", description: "Industry trends, competitor analysis, and feasibility studies." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Business Regulations",
          description: "Business consultancy services must comply with corporate governance norms and SEBI regulations.",
          points: [
            { title: "Legal Compliance", description: "All business structures must adhere to tax, labor, and operational regulations." },
            { title: "Risk Assessment", description: "Consultants conduct SWOT analysis and compliance checks to minimize risks." },
          ],
        },
      ],
    },
    {
      category: "Legal and Business Consultancy",
      sub_category: "Legal Drafting Services",
      title: "Legal Drafting Services",
      description: "Drafting legally sound documents such as contracts, agreements, notices, and policies.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Contract Details", description: "Information regarding the parties involved in the agreement." },
            { title: "Terms and Conditions", description: "List of obligations, responsibilities, and penalties in the contract." },
            { title: "Legal Precedents", description: "References to existing laws and case studies." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Legal Drafting Compliance",
          description: "Legal documents must align with the Indian Contract Act, 1872 and Companies Act, 2013.",
          points: [
            { title: "Clarity and Precision", description: "Contracts should be free from ambiguity and legally enforceable." },
            { title: "Regulatory Compliance", description: "Drafting must consider sector-specific regulations and legal precedents." },
          ],
        },
      ],
    }
  ];

  const licensesAndCertificationData = [
    {
      category: "Licenses and Certification",
      sub_category: "FSSAI Registration,Renewal,Modification",
      title: "FSSAI Registration, Renewal, and Modification",
      description: "Food businesses in India must register with the Food Safety and Standards Authority of India (FSSAI) to ensure food safety compliance.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Identity Proof", description: "PAN/Aadhaar card of the owner." },
            { title: "Business Registration Proof", description: "Certificate of Incorporation or partnership deed." },
            { title: "Food Safety Management Plan", description: "Details of food safety procedures followed by the business." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "FSSAI Act, 2006",
          description: "All food businesses must obtain an FSSAI license under the Food Safety and Standards Act, 2006.",
          points: [
            { title: "License Types", description: "Basic, State, or Central FSSAI licenses depending on business size." },
            { title: "Annual Renewal", description: "FSSAI licenses must be renewed periodically to maintain compliance." },
          ],
        },
      ],
    },
    {
      category: "Licenses and Certification",
      sub_category: "Import Export Code",
      title: "Import Export Code (IEC)",
      description: "Businesses engaged in import and export activities must obtain an Import Export Code (IEC) from the Directorate General of Foreign Trade (DGFT).",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN Card", description: "PAN of the business entity or individual." },
            { title: "GST Registration Certificate", description: "GSTIN details of the business." },
            { title: "Bank Account Proof", description: "Cancelled cheque or bank statement." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Foreign Trade Policy",
          description: "IEC is mandatory for all businesses engaged in cross-border trade as per the Foreign Trade Policy of India.",
          points: [
            { title: "Lifetime Validity", description: "IEC does not require renewal unless updated by the applicant." },
            { title: "DGFT Compliance", description: "Businesses must comply with DGFT regulations for smooth operations." },
          ],
        },
      ],
    },
    {
      category: "Licenses and Certification",
      sub_category: "Digital Signature Certificate",
      title: "Digital Signature Certificate (DSC)",
      description: "A Digital Signature Certificate (DSC) is required for electronic document signing and online compliance filings.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Identity Proof", description: "Aadhaar or Passport for individuals." },
            { title: "Company Incorporation Proof", description: "Certificate of Incorporation for businesses." },
            { title: "Email ID and Mobile Number", description: "For OTP-based verification." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "Information Technology Act, 2000",
          description: "DSC is legally valid under the IT Act, 2000 for secure digital transactions.",
          points: [
            { title: "Mandatory for Online Filings", description: "Used for GST, MCA, and other statutory filings." },
            { title: "Issued by Certifying Authorities", description: "Only government-approved CAs can issue DSCs." },
          ],
        },
      ],
    },
    {
      category: "Licenses and Certification",
      sub_category: "Start up India Registration",
      title: "Start-up India Registration",
      description: "Startups can register under the Start-up India scheme to avail benefits such as tax exemptions and funding support.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Incorporation Certificate", description: "Company registration proof." },
            { title: "Business Plan", description: "Detailed plan outlining the startup’s objectives and growth potential." },
            { title: "Patent or Intellectual Property Proof", description: "If applicable, proof of innovation or patent registration." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "DPIIT Recognition",
          description: "Startups must be recognized by the Department for Promotion of Industry and Internal Trade (DPIIT).",
          points: [
            { title: "Tax Benefits", description: "Eligible startups can avail of tax exemptions under the Income Tax Act." },
            { title: "Funding Assistance", description: "Access to government grants and funding schemes." },
          ],
        },
      ],
    },
    {
      category: "Licenses and Certification",
      sub_category: "ISO Certification",
      title: "ISO Certification",
      description: "ISO certification enhances the credibility of businesses by ensuring adherence to international standards.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Registration", description: "Certificate of Incorporation or partnership deed." },
            { title: "Scope of Certification", description: "Processes and quality management details." },
            { title: "Management Policy", description: "Internal policies and procedures." },
          ],
        },
      ],
      regulations: [
        {
          headingTitle: "ISO Standards",
          description: "ISO certifications like ISO 9001, ISO 14001, and ISO 27001 are issued based on compliance with international standards.",
          points: [
            { title: "Quality Management", description: "ISO 9001 ensures consistent quality across products and services." },
            { title: "Certification by Accredited Bodies", description: "Only accredited certification bodies can issue ISO certificates." },
          ],
        },
      ],
    },
    {
      category: "Licenses and Certification",
      sub_category: "Factory License",
      title: "Factory License",
      description: "A Factory License is required for businesses operating manufacturing units to ensure they comply with legal regulations.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Registration", description: "Certificate of Incorporation or partnership deed." },
            { title: "Factory Address Proof", description: "Rental agreement or property documents." },
            { title: "Employee Details", description: "List of employees working in the factory." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "Factories Act, 1948",
          description: "The Factory License is governed by the Factories Act, 1948, which ensures safety, health, and welfare of factory workers.",
          points: [
            { title: "Workplace Safety", description: "Factories must comply with the workplace safety guidelines under the Factories Act." },
            { title: "Employee Welfare", description: "Factories are required to provide adequate welfare facilities for employees." }
          ]
        }
      ]
    },
    {
      category: "Licenses and Certification",
      sub_category: "MSME_Udyam Registration",
      title: "MSME/Udyam Registration",
      description: "MSME/Udyam Registration provides recognition and benefits for small and medium enterprises in India.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Registration", description: "Certificate of Incorporation or partnership deed." },
            { title: "PAN Card", description: "PAN card of the business or proprietor." },
            { title: "Address Proof", description: "Utility bill or lease agreement for business premises." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "MSME Development Act, 2006",
          description: "The MSME/Udyam registration is governed by the MSME Development Act, 2006, providing support for micro, small, and medium enterprises.",
          points: [
            { title: "Financial Assistance", description: "MSMEs can avail of financial assistance under various government schemes." },
            { title: "Tax Benefits", description: "MSMEs are eligible for tax exemptions and other benefits under the government schemes." }
          ]
        }
      ]
    },
    {
      category: "Licenses and Certification",
      sub_category: "GST Registration",
      title: "GST Registration",
      description: "GST Registration is mandatory for businesses with a certain turnover to ensure tax compliance under the Goods and Services Tax regime.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "PAN Card", description: "PAN of the business or proprietor." },
            { title: "Business Address Proof", description: "Utility bill or lease agreement for business premises." },
            { title: "Bank Account Proof", description: "Cancelled cheque or bank statement for business account." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "Goods and Services Tax Act",
          description: "GST Registration is governed by the Goods and Services Tax Act, 2017.",
          points: [
            { title: "Taxable Turnover", description: "GST registration is mandatory for businesses with turnover exceeding the threshold limit." },
            { title: "Filing Returns", description: "Registered businesses must file GST returns periodically." }
          ]
        }
      ]
    },
    {
      category: "Licenses and Certification",
      sub_category: "Shops and Establishment Act Registration",
      title: "Shops and Establishment Act Registration",
      description: "Shops and Establishment Act Registration is required for businesses operating in commercial spaces to ensure compliance with labor laws.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Registration", description: "Certificate of Incorporation or partnership deed." },
            { title: "Address Proof", description: "Utility bill or lease agreement for business premises." },
            { title: "Employee Details", description: "List of employees working in the establishment." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "Shops and Establishment Act",
          description: "The Shops and Establishment Act governs the registration of businesses operating in commercial spaces.",
          points: [
            { title: "Working Hours", description: "The Act regulates working hours, rest intervals, and overtime for employees." },
            { title: "Employee Benefits", description: "It ensures benefits such as paid holidays, sick leave, and maternity leave." }
          ]
        }
      ]
    },
    {
      category: "Licenses and Certification",
      sub_category: "Labour licenses",
      title: "Labour Licenses",
      description: "Labour licenses are required for businesses that employ workers to ensure compliance with labor laws.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Registration", description: "Certificate of Incorporation or partnership deed." },
            { title: "Employee List", description: "List of employees working in the business." },
            { title: "Payment Records", description: "Salary or wage records of employees." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "Labour Laws",
          description: "Labour licenses are governed by the various labor laws including the Industrial Disputes Act and Payment of Wages Act.",
          points: [
            { title: "Employment Standards", description: "Labor laws ensure fair employment standards, including minimum wages." },
            { title: "Health and Safety", description: "Regulates the health and safety standards at the workplace." }
          ]
        }
      ]
    },
    {
      category: "Licenses and Certification",
      sub_category: "Professional Tax Registration",
      title: "Professional Tax Registration",
      description: "Professional Tax Registration is required for businesses to pay tax on income earned by employees.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Registration", description: "Certificate of Incorporation or partnership deed." },
            { title: "Employee List", description: "List of employees working in the business." },
            { title: "PAN Card", description: "PAN of the business or proprietor." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "Professional Tax Act",
          description: "Professional Tax Registration is governed by the Professional Tax Act of the respective state.",
          points: [
            { title: "Tax Deduction", description: "Professional tax is deducted from the employees' salaries by the employer." },
            { title: "State-Specific Regulations", description: "The amount of professional tax varies by state." }
          ]
        }
      ]
    },
    {
      category: "Licenses and Certification",
      sub_category: "PAN_TAN registration for Businesses",
      title: "PAN/TAN Registration for Businesses",
      description: "PAN and TAN registration is mandatory for businesses to manage taxes effectively and comply with tax regulations.",
      headings: [
        {
          headingTitle: "Documents Required",
          content: [
            { title: "Business Registration", description: "Certificate of Incorporation or partnership deed." },
            { title: "PAN Card", description: "PAN card of the business." },
            { title: "Address Proof", description: "Utility bill or lease agreement for business premises." }
          ]
        }
      ],
      regulations: [
        {
          headingTitle: "Income Tax Act",
          description: "PAN and TAN registration for businesses is governed by the Income Tax Act, 1961.",
          points: [
            { title: "Tax Management", description: "PAN is used for tracking financial transactions and tax payments." },
            { title: "TAN for Tax Deduction", description: "TAN is used to track tax deductions at source." }
          ]
        }
      ]
    }
  ];
  
  

// Merge all services
const allServices = [...companyRegistrationData, ...compliancesAndReturnsData, ...iprRegistrationData, ...legalAndBusinessConsultancyData, ...licensesAndCertificationData];
 // ✅ Correct

// Seed Data Function
const seedData = async () => {
  try {
    for (const service of allServices) {
      await SubService.findOneAndUpdate(
        { category: service.category, sub_category: service.sub_category }, // Find by category & sub_category
        { $set: service }, // ✅ Wrap data inside `$set`
        { upsert: true, new: true, setDefaultsOnInsert: true } // Upsert options
      );
    }
    console.log("✅ Subservices seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding subservices:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to MongoDB and seed data
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    seedData();
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });
