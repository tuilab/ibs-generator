// @flow
import nunjucks from "nunjucks"
import neatCsv from "neat-csv"
import fs from "fs"

const attrMap = {
  "Protein Name": "name",
  "Total length": "length",
}

const colors = ["153,153,255", "255,153,153", "255,255,153", "153,255,153"]

const getLabelCoordinates = (curr, prev = null) => {
  if (!prev) {
    return {
      centerx: curr.position,
      deltax: curr.position,
      centery: 50,
      deltay: 50,
    }
  }

  const nbDigits = `${curr.position}`.length
  const positionThreshold = nbDigits * 5
  // const xDelta = nbDigits * 2
  const xDelta = 6
  const isNear = curr.position - prev.position < positionThreshold

  const centerx = isNear
    ? curr.position + (prev.centerx - prev.position) + xDelta
    : curr.position
  const centery = isNear ? prev.centery + 20 : 50

  return {
    centerx: centerx,
    deltax: curr.position,
    centery: centery,
    deltay: centery,
  }
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

    // TODO relies on object mutation.
    return Object.assign(label, getLabelCoordinates(label, prevLabel))
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
