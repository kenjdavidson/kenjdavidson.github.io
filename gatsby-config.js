"use strict";

/**
 * https://www.extensive.one/converting-gatsby-config-and-node-api-to-typescript/
 * 
 * A lot of people are smarter than me! 
 * 
 * Allows the direct import of Typescript during the Gatsby build process.
 * 
 */

require("source-map-support").install();
require("ts-node").register();

module.exports = require("./gatsby-config.ts");