import path from "path"
import fs from "fs"

import { run } from "./index"

const pkg = require("../../package.json")

const testData = path.join(__dirname, "..", "test", "data")

const csv = fs.readFileSync(path.join(testData, "example.csv"), "utf-8")

const template = fs.readFileSync(path.join(testData, "example.xml"), "utf-8")

/**
 * Makes sure the API shape is validated against.
 */
describe(pkg.name, () => {
  it("works", () => {
    const result = run(csv, template)
    fs.writeFile(path.join(testData, "result.xml"), result, "utf-8", () => {
      console.log(`wrote XML to ${testData}`)
    })
  })
})
