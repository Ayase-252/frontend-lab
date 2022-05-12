const {autoClassPrefixier} = require('.');
const fsp = require('fs/promises');
const path = require('path');

function readFixture(fixtureName) {
  return Promise.all([
    fsp.readFile(path.resolve('fixtures', `${fixtureName}.scss`), 'utf8'),
    fsp.readFile(path.resolve('fixtures', `${fixtureName}-expected.scss`), 'utf8')
  ])
}

it("should auto prepend prefix to class", async () => {
  const [src, expected] = await readFixture('test')
  const res = autoClassPrefixier(src, {prefix: 'test-'})
  
  expect(res).toEqual(expected)
})

it.each`
  exclude
  ${'exclude'}
  ${/exclude/}
  ${['exclude']}
  ${[/exclude/]}
`
("should exclude class which contains string in excluded if exclude is set to $exclude", async ({exclude}) => {
  const [src, expected] = await readFixture('exclude')
  
  const res = autoClassPrefixier(src, {
    prefix: 'test-',
    exclude
  })

  expect(res).toEqual(expected)
})
