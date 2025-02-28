import { describe, test, expect } from "vitest"
import * as dateUtils from "./date"

describe('dateUtils', () => {
  test('format date correctly', () =>{
    const testDate = new Date('2025-02-27T07:30:30.000Z');
    const result = dateUtils.formatDate(testDate);
    expect(result).toBe('Feb, 27 2025');
  })

  test('convert string to date correctly', ()=>{
    const testDateString = '2025-02-27T07:30:30.000Z'
    const result = dateUtils.convertStringToDate(testDateString)
    expect(result).toBeInstanceOf(Date)
  })
})
