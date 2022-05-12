const gonzales = require('gonzales-pe');

const {toString} = Object.prototype;

function isRegexp(value) {
	return toString.call(value) === '[object RegExp]';
}

// exclude: string | RegExp | (string | RegExp)[]
function autoClassPrefixier(src, options) {
  const ast = gonzales.parse(src, {syntax: 'scss'})
  let exclude = Array.isArray(options.exclude) ? options.exclude : [options.exclude]

  const isExcluded = (content) => {
    if(!options.exclude) {
      return false
    }

    const excludeValidators = Array.isArray(options.exclude) ? options.exclude : [options.exclude]
    return excludeValidators.some(exclude => {
      if(isRegexp(exclude)) {
        return exclude.test(content)
      } else if(typeof exclude === "string") {
        return content.includes(exclude)
      } else {
        throw new Error(`exclude should be a string or a RegExp, but got ${exclude}`)
      }
    })
  }

  ast.traverseByType('class', (node) => {
    const content = node.toString()
    if(isExcluded(content)) {
      return
    }

    const firstChild = node.first()
    if(firstChild.type === 'ident') {
      firstChild.content = `${options.prefix}${firstChild.content}`
    } else if(firstChild.type === 'interpolation') {
      // 处理插值开头的情况，例如 .#{name}，此时在开头插入一个新的 ident node，
      // 内容为前缀
      node.insert(0, gonzales.createNode({
        type: 'ident',
        content: options.prefix
      }))
    }
  })

  const res = ast.toString()
  return res
} 

module.exports = {
  autoClassPrefixier
}
