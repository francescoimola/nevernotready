const fs = require('fs');
const path = require('path');
const Image = require('@11ty/eleventy-img');

// Parse playground.njk to find remote image URLs
async function downloadRemoteImages() {
  const playgroundPath = './src/playground.njk';
  const content = fs.readFileSync(playgroundPath, 'utf-8');

  // Find all remote URLs in the file
  const remoteUrlRegex = /src:\s*"(https?:\/\/[^"]+)"/g;
  const matches = [...content.matchAll(remoteUrlRegex)];

  console.log(`Found ${matches.length} remote image URLs\n`);

  for (const match of matches) {
    const remoteUrl = match[1];
    const imageName = remoteUrl.split('/').pop().split('.').slice(0, -1).join('.');
    const imageExt = remoteUrl.split('.').pop().toLowerCase();
    const fallbackFormat = imageExt === 'png' ? 'png' : 'jpeg';

    // Check if image already exists locally
    const webpPath = path.join('./assets/images', `${imageName}.webp`);
    const fallbackPath = path.join('./assets/images', `${imageName}.${fallbackFormat}`);

    if (fs.existsSync(webpPath) || fs.existsSync(fallbackPath)) {
      console.log(`✓ Already exists: ${imageName}`);
      continue;
    }

    // Download and optimize
    console.log(`⬇ Downloading: ${remoteUrl}`);
    try {
      await Image(remoteUrl, {
        widths: [1200], // Original size
        formats: ["webp", fallbackFormat],
        outputDir: "./assets/images/",
        filenameFormat: function (id, src, width, format, options) {
          return `${imageName}.${format}`;
        },
        sharpWebpOptions: {
          quality: 80,
        },
        sharpPngOptions: {
          quality: 80,
        },
        sharpJpegOptions: {
          quality: 80,
        }
      });
      console.log(`✓ Downloaded and optimized: ${imageName}\n`);
    } catch (error) {
      console.error(`✗ Error downloading ${remoteUrl}:`, error.message, '\n');
    }
  }

  console.log('\nDone!');
}

downloadRemoteImages().catch(console.error);
