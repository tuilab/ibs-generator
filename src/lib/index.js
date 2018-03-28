// @flow
import nunjucks from "nunjucks"

export const run = (csv: string, template: string) => {
  // console.log(csv, template)
  return nunjucks.renderString(template, {
    test: "Hello IBS",
  })
}
