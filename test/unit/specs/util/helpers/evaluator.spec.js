import evaluator from '@/util/helpers/evaluator'

describe('evaluator', () => {
  describe('string comparison', () => {
    const expression = '$(\'myProp\').value() === "test"'
    it('should eval  "test === "test" as true ', () => {
      const entity = { myProp: 'test' }
      expect(evaluator(expression, entity)).to.equal(true)
    })
    it('should eval "test === "not test" as false ', () => {
      const entity = { myProp: 'not test' }
      expect(evaluator(expression, entity)).to.equal(false)
    })
  })

  describe('isValidJson', () => {
    const expression = '$(\'myProp\').isValidJson().value()'
    it('should return true in case of valid json ("{"foo": 5}")', () => {
      const entity = { myProp: '{"foo": 5}' }
      const result = evaluator(expression, entity)
      expect(result).to.equal(true)
    })
    it('should return false in case of invalid json ("{"foo: 5}"), missing quotes after foo', () => {
      const entity = { myProp: '{"foo: 5}' }
      const result = evaluator(expression, entity)
      expect(result).to.equal(false)
    })
  })

  describe('plus', () => {
    it('add property (3) to value (2) should equal 5', () => {
      const expression = '$(\'myProp\').plus(3).value()'
      const entity = { myProp: 2 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(5)
    })
    it('add property (2) to property (1) should equal 3', () => {
      const expression = '$(\'myProp1\').plus($(\'myProp2\')).value()'
      const entity = { myProp1: 2, myProp2: 1 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(3)
    })
  })

  describe('pow', () => {
    it('raising a property (3) to the power of 3 should equal 27', () => {
      const expression = '$(\'myProp\').pow(3).value()'
      const entity = { myProp: 3 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(27)
    })
  })

  describe('times', () => {
    it('property (2) times value (3) should equal 6', () => {
      const expression = '$(\'myProp\').times(3).value()'
      const entity = { myProp: 2 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(6)
    })
    it('property (2) times property (4) should equal 6', () => {
      const expression = '$(\'myProp1\').times($(\'myProp2\')).value()'
      const entity = { myProp1: 2, myProp2: 4 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(8)
    })
  })

  describe('div', () => {
    it('property (1) divided by value (1) should equal 0.5', () => {
      const expression = '$(\'myProp\').div(2).value()'
      const entity = { myProp: 1 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(0.5)
    })
    it('property (8) divided by property (2) should equal 4', () => {
      const expression = '$(\'myProp1\').div($(\'myProp2\')).value()'
      const entity = { myProp1: 8, myProp2: 2 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(4)
    })
  })

  describe('age', () => {
    it('should return undefined in case of empty property', () => {
      const expression = '$(\'myProp\').age().value()'
      const entity = { myProp: null }
      const result = evaluator(expression, entity)
      expect(result).to.equal(undefined)
    })
    it('should return the age in years (4) if the property is a valid date', () => {
      const expression = '$(\'myProp1\').age().value()'
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth()
      const day = d.getDate()
      const testDate = new Date(year - 4, month, day)
      const entity = { myProp1: testDate }
      const result = evaluator(expression, entity)
      expect(result).to.equal(4)
    })
  })

  describe('map', () => {
    it('should map property value (1) to 2 given the mapping 1:2', () => {
      const expression = '$(\'myProp\').map({0:1, 1:2}, 4, 5).value()'
      const entity = { myProp: 1 }
      const result = evaluator(expression, entity)
      expect(result).to.equal(2)
    })
    it('should map to a default value 4 if no mapping is defined for the property (3)', () => {
      const expression2 = '$(\'myProp\').map({0:1, 1:2}, 4, 5).value()'
      const entity2 = { myProp: 3 }
      const result2 = evaluator(expression2, entity2)
      expect(result2).to.equal(4)
    })
    it('should map to the null value (5) is property is missing', () => {
      const expression2 = '$(\'myProp\').map({0:1, 1:2}, 4, 5).value()'
      const entity2 = { myProp: null }
      const result2 = evaluator(expression2, entity2)
      expect(result2).to.equal(5)
    })
    it('should map to the null value (5) is property is undefined', () => {
      const expression2 = '$(\'myProp\').map({0:1, 1:2}, 4, 5).value()'
      const entity2 = { myProp: null }
      const result2 = evaluator(expression2, entity2)
      expect(result2).to.equal(5)
    })
  })

  describe('group', () => {
    it('should transform value (101) into group (75+), given a set of groups [18, 35, 50, 75]', () => {
      const expression = '$(\'myProp\').group([18, 35, 50, 75]).value()'
      const entity = { myProp: 101 }
      const result = evaluator(expression, entity)
      expect(result).to.equal('75+')
    })
  })

  describe('eq', () => {
    it('property value (null) compared to value null returns false', () => {
      const expression = '$(\'myProp\').eq().value()'
      const entity = { myProp: null }
      const result = evaluator(expression, entity)
      expect(result).to.equal(false)
    })
    it('property value (null) compared to non null value (3) returns false', () => {
      const expression = '$(\'myProp\').eq(3).value()'
      const entity = { myProp: null }
      const result = evaluator(expression, entity)
      expect(result).to.equal(false)
    })
    it('non null property value ("a") compared to non null value ("b") returns false', () => {
      const expression = '$(\'myProp\').eq("b").value()'
      const entity = { myProp: 'a' }
      const result = evaluator(expression, entity)
      expect(result).to.equal(false)
    })
    it('non null property value ("c") compared to non null value ("c") returns true', () => {
      const expression = '$(\'myProp\').eq("c").value()'
      const entity = { myProp: 'c' }
      const result = evaluator(expression, entity)
      expect(result).to.equal(true)
    })
  })

  describe('matches', () => {
    it('property value ("123abc456") matched against regex ("abc") should equal true', () => {
      var patt = new RegExp('abc')
      const expression = '$(\'myProp\').matches(' + patt + ').value()'
      const entity = {myProp: '123abc456'}
      const result = evaluator(expression, entity)
      expect(result).to.equal(true)
    })
    it('property value ("123abc456") matched against regex ("efg") should equal false', () => {
      var patt = new RegExp('efg')
      const expression = '$(\'myProp\').matches(' + patt + ').value()'
      const entity = {myProp: '123abc456'}
      const result = evaluator(expression, entity)
      expect(result).to.equal(false)
    })
  })

})
