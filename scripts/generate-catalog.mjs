#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generateFullCatalogDocument } from "../dist/catalog.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const distDir = resolve(rootDir, "dist");

console.log("Generating PiUI Component Catalog...");
const html = generateFullCatalogDocument();

// Ensure dist exists
mkdirSync(distDir, { recursive: true });

// Write to root catalog.html and dist/catalog.html
const rootTarget = resolve(rootDir, "catalog.html");
const distTarget = resolve(distDir, "catalog.html");

writeFileSync(rootTarget, html, "utf-8");
writeFileSync(distTarget, html, "utf-8");

console.log(`[OK] Catalog written successfully:`);
console.log(`  -> ${rootTarget}`);
console.log(`  -> ${distTarget}`);
