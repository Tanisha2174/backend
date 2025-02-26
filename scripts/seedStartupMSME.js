const mongoose = require('mongoose');
const dotenv = require('dotenv');
const StartupMSME = require('../models/StartupMSME');

dotenv.config();

const allPackages = [
  // Start-Up Packages
  {
    category: "Start-Up Packages",
    name: "Starter Bundle",
    price: "₹12,000/-",
    features: [
      "Unlimited Contract Drafting",
      "Monthly Mentorship Sessions",
      "Annual Secretarial Compliances (ROC Filing, etc.)",
      "Basic Auditing Support",
      "50% Discount on Additional Services",
    ],
  },
  {
    category: "Start-Up Packages",
    name: "Growth Bundle",
    price: "₹20,000/-",
    features: [
      "All features of the Starter Bundle",
      "GST Registration & Filing",
      "Bi-Weekly Mentorship Sessions",
      "Trademark Registration",
      "Secretarial Compliances (Annual Filing, ROC Compliance)",
      "Auditing Compliances",
      "HR Policy Development",
      "Annual Compliance Reports",
    ],
  },
  {
    category: "Start-Up Packages",
    name: "Premium Bundle",
    price: "₹30,000/-",
    features: [
      "All features of the Growth Bundle",
      "Weekly Mentorship Sessions",
      "Investment Pitch Deck Support",
      "Business Process Optimization Guidance",
      "Due Diligence Reports",
      "Dedicated Legal Consultant",
    ],
  },
  {
    category: "Start-Up Packages",
    name: "Elite Bundle",
    price: "₹50,000/-",
    features: [
      "All features of the Growth Bundle",
      "Unlimited Mentorship Sessions",
      "Investment & Fundraising Guidance",
      "Customized Legal Support (Litigation Advice, Dispute Resolution)",
      "Trademark & IP Portfolio Management",
      "Business Expansion Advisory",
    ],
  },
  
  // Startups Yet to Register
  {
    category: "Startups Yet to Register",
    name: "Basic Startup Essentials",
    price: "₹8,000/-",
    features: [
      "Company Registration (ROC)",
      "GST Registration",
      "PAN and TAN Application",
      "Mentorship Session (Business Consultant)",
    ],
  },
  {
    category: "Startups Yet to Register",
    name: "Business Kickstart Package",
    price: "₹12,000/-",
    features: [
      "Company Registration (ROC)",
      "GST Registration",
      "Mentorship Program (Business Strategy)",
      "Basic Agreement Drafting (Partnership/Vendor Agreements)",
    ],
  },
  {
    category: "Startups Yet to Register",
    name: "Premium MSME Launch Kit",
    price: "₹20,000/-",
    features: [
      "Company Registration (ROC)",
      "GST Registration",
      "Business Strategy Mentorship (3 Sessions)",
      "Unlimited Agreement Drafting",
      "Branding Support (Trademark Filing)",
    ],
  },
  {
    category: "Startups Yet to Register",
    name: "Compliance & Growth Package",
    price: "₹25,000/-",
    features: [
      "Company Registration (ROC)",
      "GST and Tax Filings (One Year)",
      "Agreement Drafting (5 Custom Agreements)",
      "Mentorship Program (Quarterly Sessions)",
      "Website Assistance",
    ],
  },
  
  // New MSMEs (Not Registered in ROC)
  {
    category: "New MSMEs (Not registered in ROC)",
    name: "Basic Business Starter Kit",
    price: "₹5,000/-",
    features: [
      "GST Registration",
      "MSME Registration (Udyam)",
      "PAN and TAN Application",
      "Mentorship Session (Business Setup)",
    ],
  },
  {
    category: "New MSMEs (Not registered in ROC)",
    name: "Operational Compliance Package",
    price: "₹10,000/-",
    features: [
      "GST Registration",
      "Bookkeeping Setup",
      "Mentorship Program (Operations Management)",
      "Vendor/Employee Agreement Drafting",
    ],
  },
  {
    category: "New MSMEs (Not registered in ROC)",
    name: "Tax and Compliance Essentials",
    price: "₹15,000/-",
    features: [
      "GST Registration & Filing",
      "Income Tax Filing",
      "MSME Registration",
      "Basic Legal Support (2 Agreements)",
    ],
  },
  {
    category: "New MSMEs (Not registered in ROC)",
    name: "Growth and Mentorship Plan",
    price: "₹20,000/-",
    features: [
      "GST Registration & Compliance",
      "Business Mentorship (Quarterly Sessions)",
      "Branding Support (Trademark Application)",
      "Unlimited Contract Drafting",
    ],
  },
  {
    category: "New MSMEs (Not registered in ROC)",
    name: "All-in-One Business Support Package",
    price: "₹30,000/-",
    features: [
      "GST Registration & Filing",
      "Tax Compliance (Income Tax Filing)",
      "MSME and Other Licenses",
      "Unlimited Legal Agreement Drafting",
      "Business Mentorship (Monthly Sessions)",
    ],
  },
];

// Hero data
const heroData = {
  title: "Empower Your Startup with LEGSIM’s Paralegal Expertise",
  description:
    "Starting and scaling a business can be challenging—but with LEGSIM by your side, you can focus on growth while we handle the legal complexities. Our tailored packages are designed to empower startups like yours, ensuring compliance, protecting your interests, and saving you time and resources.",
};

// Seed Data Function with Upsert
const seedData = async () => {
  try {
    // Insert hero data and packages
    await StartupMSME.findOneAndUpdate(
      {},
      {
        $set: {
          hero: heroData,
          packages: allPackages,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log("✅ Startup & MSME packages and hero data seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding Startup & MSME packages and hero data:", error);
  } finally {
    mongoose.connection.close();
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    seedData();
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });
