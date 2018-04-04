// @flow
import nunjucks from "nunjucks"
import neatCsv from "neat-csv"
import fs from "fs"

const attrMap = {
  "Protein Name": "name",
  "Total length": "length",
}

const colors = ["153,153,255", "255,153,153", "255,255,153", "153,255,153"]

const getLabelHeight = (curr, prev = null) => {
  if (!prev) {
    return 50
  }

  const nbDigits = `${curr.position}`.length
  const threshold = nbDigits * 5
  const isNear = curr.position - prev.position < threshold

  return isNear ? prev.height + 20 : 50
}

export const mapCSVRow = (row) => {
  const cols = Object.keys(row)
  const protein = cols.reduce(
    (prot, col) => {
      const attr = attrMap[col]

      if (attr) {
        prot[attr] = row[col]
      }

      return prot
    },
    {
      domains: [],
      labels: [],
    },
  )

  const domains = cols
    .filter((col) => col.includes(" domain "))
    .map((col) => col.replace(" domain starts", "").replace(" domain ends", ""))
    .filter((col, i, self) => self.indexOf(col) === i)

  protein.domains = domains.map((domain, i) => {
    return {
      id: `D${i + 1}`,
      name: domain,
      start: row[`${domain} domain starts`],
      end: row[`${domain} domain ends`],
      color: colors[i],
    }
  })

  const labels = cols
    .filter((col) => col.includes("Cys Pos "))
    .map((col) => col.replace("Cys Pos ", ""))
    .filter((col, i, self) => self.indexOf(col) === i)

  protein.labels = labels
    .filter((site) => !!row[`Cys Pos ${site}`])
    .map((site, i) => {
      return {
        id: `L${i + 1}`,
        position: parseInt(row[`Cys Pos ${site}`], 10),
        label: row[`Cys Pos ${site}`],
      }
    })

  let prevLabel
  protein.labels = protein.labels.map((label, i) => {
    prevLabel = i === 0 ? null : protein.labels[i - 1]

    label.height = getLabelHeight(label, prevLabel)

    return label
  })

  return protein
}

export const mapCSV = (sheet) => {
  return sheet.map(mapCSVRow)
}

export const run = (csv: string, template: string) => {
  // console.log(csv, template)
  return neatCsv(csv).then((parsed) => {
    const proteins = mapCSV(parsed)

    proteins.forEach((protein) => {
      const xml = nunjucks.renderString(template, {
        data: protein,
      })

      fs.writeFileSync(`${protein.name}.xml`, xml)
    })
  })
}
