// @flow
import nunjucks from "nunjucks"

import example from "../test/data/example"

export const run = (csv: string, template: string) => {
  // console.log(csv, template)
  return nunjucks.renderString(template, {
    data: example,
  })
}
