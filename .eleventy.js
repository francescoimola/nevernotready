const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  if (eleventyConfig === null || eleventyConfig === undefined) {
    throw new Error("Eleventy configuration is null or undefined.");
  }

  try {
    let markdownItOptions = {
    html: true
    }
    eleventyConfig.setLibrary("md", markdownIt(markdownItOptions).use(markdownItAnchor).use(markdownItAttrs))
    eleventyConfig.addPlugin(eleventySass);
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("assets");

    // Add split filter for Nunjucks
    eleventyConfig.addFilter("split", function(str, separator) {
      return str.split(separator);
    });

    // Check if image source is a remote URL
    eleventyConfig.addFilter("isRemoteUrl", function(src) {
      return src && (src.startsWith('http://') || src.startsWith('https://'));
    });

    // Check if local image file exists
    const fs = require('fs');
    const path = require('path');
    eleventyConfig.addFilter("localImageExists", function(imageName, ext) {
      const webpPath = path.join('./assets/images', `${imageName}.webp`);
      const fallbackPath = path.join('./assets/images', `${imageName}.${ext}`);
      return fs.existsSync(webpPath) || fs.existsSync(fallbackPath);
    });

    // Image optimization shortcode
    eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
      try {
        let metadata = await Image(src, {
          widths: [400, 800, 1200],
          formats: ["webp", "jpeg"],
          outputDir: "./public/img/",
          urlPath: "/img/",
          cacheOptions: {
            duration: "1d",
            directory: ".cache",
            removeUrlQueryParams: false,
          },
          sharpWebpOptions: {
            quality: 80,
          },
          sharpJpegOptions: {
            quality: 80,
          }
        });

        let imageAttributes = {
          alt,
          sizes,
          loading: "lazy",
          decoding: "async",
        };

        return Image.generateHTML(metadata, imageAttributes);
      } catch (error) {
        console.error(`Error processing image ${src}:`, error);
        // Fallback to regular img tag
        return `<img src="${src}" alt="${alt}" loading="lazy">`;
      }
    });

    // Playground project image handler
    eleventyConfig.addNunjucksAsyncShortcode("playgroundImage", async function(src, alt) {
      const fs = require('fs');
      const path = require('path');

      const isRemote = src && (src.startsWith('http://') || src.startsWith('https://'));
      const imageName = src.split('/').pop().split('.').slice(0, -1).join('.');
      const imageExt = src.split('.').pop().toLowerCase();
      const fallbackFormat = imageExt === 'png' ? 'png' : 'jpeg';

      // Check if image exists locally in assets/images
      const webpPath = path.join('./assets/images', `${imageName}.webp`);
      const fallbackPath = path.join('./assets/images', `${imageName}.${fallbackFormat}`);
      const localExists = fs.existsSync(webpPath) || fs.existsSync(fallbackPath);

      // If remote and doesn't exist locally, process it with the image shortcode
      if (isRemote && !localExists) {
        try {
          let metadata = await Image(src, {
            widths: [400, 800, 1200],
            formats: ["webp", "jpeg"],
            outputDir: "./public/img/",
            urlPath: "/img/",
            cacheOptions: {
              duration: "1d",
              directory: ".cache",
              removeUrlQueryParams: false,
            },
            sharpWebpOptions: {
              quality: 80,
            },
            sharpJpegOptions: {
              quality: 80,
            }
          });

          let imageAttributes = {
            alt,
            sizes: "100vw",
            loading: "lazy",
            decoding: "async",
          };

          return Image.generateHTML(metadata, imageAttributes);
        } catch (error) {
          console.error(`Error processing remote image ${src}:`, error);
          // Fallback to regular img tag
          return `<img src="${src}" alt="${alt}" loading="lazy">`;
        }
      } else {
        // Use existing local images
        return `<picture>
          <source type="image/webp" srcset="/assets/images/${imageName}.webp">
          <img src="/assets/images/${imageName}.${fallbackFormat}" alt="${alt}" loading="lazy" decoding="async">
        </picture>`;
      }
    });

    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  } catch (error) {
    console.error("Error configuring Eleventy:", error);
    throw error;
  }
};

