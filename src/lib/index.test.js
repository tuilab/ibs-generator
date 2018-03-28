import path from "path"
import fs from "fs"

import { run } from "./index"

const pkg = require("../../package.json")

const csv = fs.readFileSync(
  path.join(__dirname, "..", "test", "data", "example.csv"),
  "utf-8",
)

const template = fs.readFileSync(
  path.join(__dirname, "..", "test", "data", "example.xml"),
  "utf-8",
)

/**
 * Makes sure the API shape is validated against.
 */
describe(pkg.name, () => {
  it("works", () => {
    console.log(run(csv, template))
  })
})
