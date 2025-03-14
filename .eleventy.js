const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

module.exports = function (eleventyConfig) {
  if (eleventyConfig === null || eleventyConfig === undefined) {
    throw new Error("Eleventy configuration is null or undefined.");
  }

  try {
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

