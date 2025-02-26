const express = require("express"); 
const router = express.Router();
const contentful = require("contentful");
const { documentToHtmlString } = require("@contentful/rich-text-html-renderer");

// Contentful client
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch all blog posts
router.get("/", async (req, res) => {
  try {
    const response = await client.getEntries({ content_type: "blog" });

    const blogs = response.items.map((item) => ({
      id: item.sys.id,
      slug: item.fields.slug || "No Slug",
      title: item.fields.title || "No Title",
      author: item.fields.author || "Unknown",
      postedOn: item.fields.postedOn || "No Date",
      status: item.fields.status || ["Draft"],
      image: item.fields.image?.fields?.file?.url || null, // Fixing image field path
      content: item.fields.content ? documentToHtmlString(item.fields.content) : "No Content",
      metaTitle: item.fields.metaTitle || "No Meta Title",
      metaDescription: item.fields.metaDescription || "No Meta Description",
      metaKeywords: item.fields.metaKeywords || [],
    }));

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blogs", details: error.message });
  }
});

// Fetch a single blog post by ID
// Fetch a single blog post by ID
router.get("/:id", async (req, res) => {
    try {
      console.log(`Fetching blog with ID: ${req.params.id}`); // Log the ID being requested
      const response = await client.getEntry(req.params.id);
  
      if (!response) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      const blog = {
        id: response.sys.id,
        slug: response.fields.slug,
        title: response.fields.title,
        author: response.fields.author,
        postedOn: response.fields.postedOn,
        status: response.fields.status,
        image: response.fields.image?.fields.file.url,
        content: response.fields.content,
        metaTitle: response.fields.metaTitle,
        metaDescription: response.fields.metaDescription,
        metaKeywords: response.fields.metaKeywords,
      };
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      res.status(404).json({ error: "Blog not found", details: error.message });
    }
  });
  


module.exports = router;
