require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');  // Adjust the path to your schema

const serviceData = [
  {
    category: 'Company Registration',
    preCardContent: {
      title: 'COMPANY/SOCIETY/TRUST REGISTRATION',
      description: 'Starting a business or nonprofit requires legal structuring and compliance. We assist with company, society, and trust registrations, handling documentation, approvals, and regulatory filings. From choosing the right entity to securing registrations like PAN, TAN, and GST, we streamline the entire process. Our guidance ensures that your business is set up correctly from day one, reducing legal risks.',
    },
    services: [
      { name: 'Private Limited Company', href: '/practice-areas/Company-Registration/Private-Limited-Company', description: 'Ideal for startups looking for limited liability and scalability.' },
      { name: 'LLP Registration', href: '/practice-areas/Company-Registration/LLP-Registration', description: 'A hybrid business structure with features of both partnership and company.' },
      { name: 'Section 8 Company (NGO)', href: '/practice-areas/Company-Registration/Section-8-Company', description: 'Non-profit organizations focusing on charitable and social objectives.' },
      { name: 'One Person Company', href: '/practice-areas/Company-Registration/One-Person-Company', description: 'A perfect choice for solo entrepreneurs seeking legal recognition.' },
      { name: 'Public Limited Company', href: '/practice-areas/Company-Registration/Public-Limited-Company', description: 'Suitable for large businesses planning to raise capital from the public.' },
      { name: 'Nidhi Company', href: '/practice-areas/Company-Registration/Nidhi-Company', description: 'A unique business model for savings and mutual financial benefits.' },
      { name: 'Indian Subsidiary Registration', href: '/practice-areas/Company-Registration/Indian-Subsidiary-Registration', description: 'For foreign companies looking to establish a presence in India.' },
      { name: 'Society Registration', href: '/practice-areas/Company-Registration/Society-Registration', description: 'For groups aiming to promote social welfare and charitable activities.' },
      { name: 'Trust Registration', href: '/practice-areas/Company-Registration/Trust-Registration', description: 'For establishing and managing public or private charitable trusts.' },
    ],
  },
  {
    category: 'IPR Registration',
    preCardContent: {
      title: 'INTELLECTUAL PROPERTY RIGHTS (IPR) REGISTRATION',
      description: 'Protecting intellectual property is essential for brand security and innovation. We assist with trademark, patent, copyright, and design registration, ensuring legal protection against infringement. Our services include conducting IP searches, filing applications, and managing objections to safeguard your brand and creative assets. With our expertise, you can secure exclusive rights to your innovations and strengthen your market position.',
    },
    services: [
      { name: 'Trademark Registration', href: '/practice-areas/IPR-Registration/Trademark-Registration', description: 'Protect your brand with trademark registration.' },
      { name: 'Copyright Registration', href: '/practice-areas/IPR-Registration/Copyright-Registration', description: 'Register your original works such as literature, music, and art.' },
      { name: 'Patent Registration', href: '/practice-areas/IPR-Registration/Patent-Registration', description: 'Secure your inventions and innovative processes through patent registration.' },
      { name: 'Design Registration', href: '/practice-areas/IPR-Registration/Design-Registration', description: 'Register the unique design of your products to protect their visual appearance.' },
    ],
  },
  {
    category: 'Licenses and Certification',
    preCardContent: {
      title: 'LICENSES AND CERTIFICATION',
      description: 'Get the necessary certifications and licenses to comply with legal requirements and operate your business smoothly.',
    },
    services: [
      { name: 'FSSAI Registration, Renewal, Modification', href: '/practice-areas/Licences-and-Certification/FSSAI-Registration,Renewal,Modification', description: 'For food businesses, ensuring safety and quality standards.' },
      { name: 'Import Export Code', href: '/practice-areas/Licences-and-Certification/Import-Export-Code', description: 'Required for businesses engaged in international trade.' },
      { name: 'Digital Signature Certificate (DSC)', href: '/practice-areas/Licences-and-Certification/Digital-Signature-Certificate', description: 'For online filings, secure document signing, and e-filing of taxes.' },
      { name: 'Start-up India Registration', href: '/practice-areas/Licences-and-Certification/Start-up-India-Registration', description: 'For start-ups to get recognition, incentives, and benefits from the government.' },
      { name: 'ISO Certification', href: '/practice-areas/Licences-and-Certification/ISO-Certification', description: 'For businesses to demonstrate compliance with international standards.' },
      { name: 'Factory License', href: '/practice-areas/Licences-and-Certification/Factory-License', description: 'Required for manufacturing units to comply with legal standards.' },
      { name: 'MSME/Udyam Registration', href: '/practice-areas/Licences-and-Certification/MSME_Udyam-Registration', description: 'Registration for micro, small, and medium enterprises for benefits and recognition.' },
      { name: 'GST Registration', href: '/practice-areas/Licences-and-Certification/GST-Registration', description: 'Mandatory for businesses with a certain turnover to register for GST.' },
      { name: 'Shops and Establishment Act Registration', href: '/practice-areas/Licences-and-Certification/Shops-and-Establishment-Act-Registration', description: 'Required for all businesses operating in commercial spaces.' },
      { name: 'Labour licenses', href: '/practice-areas/Licences-and-Certification/Labour-licenses', description: 'For businesses employing workers, ensuring compliance with labor laws.' },
      { name: 'Professional Tax Registration', href: '/practice-areas/Licences-and-Certification/Professional-Tax-Registration', description: 'Required for businesses to pay tax on income earned by employees.' },
      { name: 'PAN/TAN registration for Businesses', href: '/practice-areas/Licences-and-Certification/PAN_TAN-registration-for-Businesses', description: 'Required for all businesses to manage taxes effectively.' },
    ],
  },
  {
    category: 'Compliances and Returns',
    preCardContent: {
      title: 'COMPLIANCES AND RETURNS',
      description: 'Staying compliant with tax and corporate laws is critical to avoiding penalties. We manage income tax, GST, and TDS return filings, annual ROC filings, secretarial compliance, and labor law obligations like ESIC and PF filings, ensuring smooth legal operations. Our proactive approach helps businesses meet deadlines, maintain transparency, and avoid costly legal troubles.',
    },
    services: [
      { name: 'Company Secretarial compliance', href: '/practice-areas/Compliances-and-Returns/Company-Secretarial-compliance', description: 'Ensuring compliance with corporate governance and legal standards.' },
      { name: 'Auditing compliance', href: '/practice-areas/Compliances-and-Returns/Auditing-compliance', description: 'For verifying financial records and ensuring legal compliance.' },
      { name: 'Tax Compliance', href: '/practice-areas/Compliances-and-Returns/Tax-Compliance', description: 'Ensuring your business meets tax requirements and avoids penalties.' },
      { name: 'GST-filing', href: '/practice-areas/Compliances-and-Returns/GST-filing', description: 'Filing returns and maintaining GST compliance.' },
      { name: 'TDS Return Filing Assistance', href: '/practice-areas/Compliances-and-Returns/TDS-Return-Filing-Assistance', description: 'Assistance with filing TDS returns and ensuring compliance.' },
      { name: 'Income Tax Registration', href: '/practice-areas/Compliances-and-Returns/Income-Tax-Registration', description: 'Register your business for income tax compliance.' },
      { name: 'Annual Return filing', href: '/practice-areas/Compliances-and-Returns/Annual-Return-filing', description: 'File annual returns for your business to meet legal obligations.' },
    ],
  },
  {
    category: 'Legal and Business Consultancy',
    preCardContent: {
      title: 'LEGAL AND BUSINESS CONSULTANCY SERVICES',
      description: 'Running a business comes with legal complexities, but with the right expertise, you can focus on growth while we handle compliance and protection. At LegSim, we provide end-to-end legal solutions tailored to businesses, startups, and nonprofits, ensuring smooth operations and risk management. Our expert team simplifies legal processes, ensuring you stay compliant with evolving regulations.',
    },
    services: [
      { name: 'Legal Consultancy', href: '/practice-areas/Legal-and-Business-Consultancy-Services/Legal-Consultancy', description: 'Expert legal advice on business matters and dispute resolution.' },
      { name: 'Society/Trust/NGO Consultancy', href: '/practice-areas/Legal-and-Business-Consultancy-Services/Society_Trust_NGO-Consultancy', description: 'Guidance on setting up and managing a society, trust, or NGO.' },
      { name: 'Contract drafting and due diligence', href: '/practice-areas/Legal-and-Business-Consultancy-Services/Contract-drafting-and-due-diligence', description: 'Legal drafting of contracts and performing due diligence for business agreements.' },
      { name: 'Business Consultancy', href: '/practice-areas/Legal-and-Business-Consultancy-Services/Business-Consultancy', description: 'Professional advice to help your business expand and succeed.' },
      { name: 'Legal Drafting Services', href: '/practice-areas/Legal-and-Business-Consultancy-Services/Legal-Drafting-Services', description: 'Drafting legal documents such as agreements, contracts, and deeds.' },
    ],
  },
  {
    category: 'Consumer Case Filing Consultancy',
    preCardContent: {
      title: 'CONSUMER CASE FILING/CONSULTANCY',
      description: 'Consumer disputes can impact businesses and individuals. We provide expert legal support in filing consumer complaints, responding to claims, and representing clients before Consumer Forums and Courts. Whether you are a business facing a dispute or an individual seeking justice, we ensure fair resolution. Our team handles everything from drafting legal notices to advocating for you in court.',
    },
    services: [
      { name: 'Get in touch', href: '/contact-us', description: 'Contact us for expert advice on filing consumer cases.' },
    ],
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    try {
      for (const data of serviceData) {
        await Service.findOneAndUpdate(
          { category: data.category },  // Find by category (unique)
          data,                         // Update fields
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }

      console.log('✅ Services seeded successfully');
    } catch (error) {
      console.error('❌ Error seeding services:', error);
    } finally {
      mongoose.connection.close();  // Close connection after seeding
    }
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error);
  });
