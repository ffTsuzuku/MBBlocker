function isSimilar(str1: string, str2: string) {
    const len1 = str1.length
    const len2 = str2.length
    const matrix = []

    // Initialize the matrix
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i]
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j
    }

    // Compute the Levenshtein distance
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            )
        }
    }

    const distance = matrix[len1][len2]
    const maxLength = Math.max(len1, len2)
    const similarity = 1 - distance / maxLength

    // Return true if similarity is above a certain threshold
    return similarity >= 0.7 // Adjust the threshold as needed
}

export { isSimilar }
