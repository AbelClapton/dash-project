function log(stage, message) {
	console.log(`stage: ${stage}, message: ${message}`)
}

function error(stage, message) {
	console.error(`stage: ${stage}, message: ${message}`)
}

export default { log, error }
