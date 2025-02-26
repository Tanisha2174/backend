// scripts/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Offering = require('../models/Offering'); // Adjust path if needed

dotenv.config(); // Load environment variables

const offerings = [
  {
    image: "/images/c.webp",
    title: "Legal and Business Consultancy Services",
    description: "Expert legal guidance to simplify business operations and ensure compliance.",
    link: "practice-areas/Legal-and-Business-Consultancy-Services",
  },
  {
    image: "/images/register.jpeg",
    title: "Company/ Society / Trust Registration",
    description: "Seamless registration services to establish your business or nonprofit with ease.",
    link: "practice-areas/Company-Registration",
  },
  {
    image: "/images/ipr.jpg",
    title: "IPR Registration",
    description: "Protect your brand, inventions, and creative works with trademark, patent, and copyright registration.",
    link: "practice-areas/IPR-Registration",
  },
  {
    image: "/images/consult.png",
    title: "Consumer Case Filing / Consultancy",
    description: "Legal support for businesses and individuals in consumer disputes and case filings.",
    link: "practice-areas/Consumer-Case-Filing_Consultancy",
  },
  {
    image: "/images/licence.jpg",
    title: "Licences & Certification",
    description: "Hassle-free assistance in obtaining essential business licenses and regulatory approvals.",
    link: "practice-areas/Licences-and-Certification",
  },
  {
    image: "/images/compliance.jpg",
    title: "Compliances & Returns",
    description: "Ensure smooth tax filings and legal compliance to avoid penalties and risks.",
    link: "practice-areas/Compliances-and-Returns",
  }
];

// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('✅ Connected to MongoDB');

  try {
    for (const offering of offerings) {
      await Offering.findOneAndUpdate(
        { title: offering.title },  // Find by title (assuming it's unique)
        offering,                   // Update fields
        { upsert: true, new: true, setDefaultsOnInsert: true } // Upsert options
      );
    }

    console.log('✅ Offerings seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding offerings:', error);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
}).catch((error) => {
  console.error('❌ Error connecting to MongoDB:', error);
});
