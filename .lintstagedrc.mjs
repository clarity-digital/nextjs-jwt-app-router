import { relative } from "path";

const typeCheckCommand = "tsc --project tsconfig.json --pretty --noEmit";

const writePrettierCommand = "npx prettier --write";

const buildEslintCommand = (filenames) => {
  return `next lint --fix --file ${filenames
    .map((file) => relative(process.cwd(), file))
    .join(" --file ")}`;
};

export default {
  "*.{ts,tsx}": [typeCheckCommand],
  "*.{js,jsx,ts,tsx}": [writePrettierCommand, buildEslintCommand],
  "*.{css,scss}": [writePrettierCommand],
};
