const fs = require("fs")
const esbuild = require("esbuild")
const { sassPlugin } = require("esbuild-sass-plugin")

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync("./dist/")) {
    fs.mkdirSync("./dist/");
}

//build the application
esbuild
  .build({
    entryPoints: ["./src/index.tsx"],
    outdir: "./dist",
    format: "esm",
    minify: true, //so the resulting code is easier to understand
    bundle: true,
    splitting: true,
    logLevel: "info",
    plugins: [sassPlugin({type: "css",})],
    watch: process.env.WATCH ? true : false,
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

//use a basic html file to test with
fs.copyFile("./src/index.html", "./dist/index.html", (err) => {
    if (err) throw err;
});