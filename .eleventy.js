const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

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

