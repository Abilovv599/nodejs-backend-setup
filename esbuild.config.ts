import { resolve } from "node:path";
import { type BuildOptions, build, context } from "esbuild";

const watch = process.argv.includes("--watch");

const options: BuildOptions = {
  entryPoints: ["src/**/*.ts"],
  outdir: "dist",
  outbase: "src",
  absWorkingDir: process.cwd(),
  format: "esm",
  platform: "node",
  target: "node22",
  packages: "external",
  sourcemap: true,
  bundle: true, // IMPORTANT: rewrite imports & resolve aliases
  splitting: true, // multiple chunks (esm)
  minify: false, // set to true for production
  treeShaking: true,
  alias: {
    "@": resolve("src"), // supports "@/..." imports
  },
  logLevel: "info",
  metafile: true,
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("👀 Watching for changes...");
} else {
  await build(options);
  console.log("✅ Build complete");
}
