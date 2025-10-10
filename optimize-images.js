const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");

// List of all images from playground.njk
const images = [
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Odd-and-Wonderful.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Not-Bad.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Translator-and-Editor-at-Passing-Notes-1.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Translator-and-Editor-at-Passing-Notes-2.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Translator-and-Editor-at-Passing-Notes-3.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Translator-and-Editor-at-Passing-Notes-4.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/How-to-feel-more-at-home-1.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/How-to-feel-more-at-home-2.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/How-to-feel-more-at-home-4.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-1.gif",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-2.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-3.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-4.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-5.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-6.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-7.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-8.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-9.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-10.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-11.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-12.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Everything-You-See-Is-In-The-Past-13.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Feed-Your-Demons-and-Meet-the-Ally-1.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Feed-Your-Demons-and-Meet-the-Ally-2.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Feed-Your-Demons-and-Meet-the-Ally-3.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Feed-Your-Demons-and-Meet-the-Ally-4.png",
  "https://images.squarespace-cdn.com/content/v1/5b92faa55417fcf7915a7792/1576605216760-8PQXIOFCJDLTFFROM3TB/image-asset.jpeg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Three-Years-1.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Three-Years-2.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Three-Years-3.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Three-Years-4.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/New-Alumni-19-at-University-of-Greenwich-1.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/New-Alumni-19-at-University-of-Greenwich-2.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/New-Alumni-19-at-University-of-Greenwich-3.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/New-Alumni-19-at-University-of-Greenwich-4.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Exhibition-Title-Bot.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/In-The-Aisles-1.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/In-The-Aisles-2.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Concert-Photographer-at-Getintothis-1.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Concert-Photographer-at-Getintothis-2.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Concert-Photographer-at-Getintothis-3.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Concert-Photographer-at-Getintothis-4.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Concert-Photographer-at-Getintothis-5.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Concert-Photographer-at-Getintothis-6.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Musician.jpg",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Readcv-Features-1.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Readcv-Features-2.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Readcv-Features-3.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/Readcv-Features-4.png",
  "https://poetic-banoffee-3c755a.netlify.app/content/media/How-to-feel-more-at-home-3.jpg",
];

async function optimizeImages() {
  console.log(`Starting optimization of ${images.length} images...`);

  const outputDir = "./assets/images";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let completed = 0;

  for (let imageUrl of images) {
    try {
      // Remove Cloudinary automatic quality parameters
      imageUrl = imageUrl.replace('c_limit,w_auto,f_auto/dpr_auto/', '');

      const filename = path.basename(imageUrl.split('?')[0]);
      const ext = path.extname(filename).toLowerCase();

      // Use PNG for images that were originally PNG (to preserve transparency)
      // Use JPEG for JPG images
      const fallbackFormat = ext === '.png' ? 'png' : 'jpeg';

      console.log(`Processing ${filename}...`);

      await Image(imageUrl, {
        widths: [800], // Single optimized width
        formats: ["webp", fallbackFormat],
        outputDir: outputDir,
        filenameFormat: function (id, src, width, format) {
          const name = path.basename(src, path.extname(src));
          return `${name}.${format}`;
        },
        cacheOptions: {
          duration: "30d",
          directory: ".cache",
        },
        sharpWebpOptions: {
          quality: 80,
        },
        sharpJpegOptions: {
          quality: 80,
        },
        sharpPngOptions: {
          quality: 80,
        }
      });

      completed++;
      console.log(`✓ ${completed}/${images.length} completed`);
    } catch (error) {
      console.error(`Error processing ${imageUrl}:`, error.message);
    }
  }

  console.log(`\nDone! Optimized ${completed} out of ${images.length} images`);
  console.log(`Images saved to: ${outputDir}`);
}

optimizeImages();
