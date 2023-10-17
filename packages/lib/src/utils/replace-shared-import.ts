export const replaceSharedImports = (fileContent: string, dep: string) => {
  return fileContent.replace(
    new RegExp(
      `import\\s*{((\\s*[a-zA-Z]+\\s*as\\s*[a-zA-Z]+\\s*,?)+)}\\s*from\\s*'\\.\\/__federation_shared_${dep}\\.js'`,
      'g'
    ),
    (match, groups) => {
      const namedImports = groups
        .split(',')
        .map((pair) => pair.trim().split(' as '))
      const imports = namedImports
        .map((pair) => (pair.length > 1 ? `${pair[0]}: ${pair[1]}` : pair[0]))
        .join(', ')
      return `const { ${imports} } = await importShared('${dep}')`
    }
  )
}
