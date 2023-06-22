#!/usr/bin/env node
/* eslint-disable no-console */
'use strict';

const engines = '>=16.12.0';
const skipSemverCheckIfAbove = 16;

/** `moons *` */
async function main() {
	const version = process.versions.node;
	// Fast-path for higher Node.js versions
	if ((parseInt(version) || 0) <= skipSemverCheckIfAbove) {
		try {
			const semver = await import('semver');
			if (!semver.satisfies(version, engines)) {
				await errorNodeUnsupported();
				return;
			}
		} catch {
			await errorNodeUnsupported();
			return;
		}
	}

	return import('../dist/cli/index.mjs')
		.catch((error) => {
			console.error(error);
			process.exit(1);
		});
}

async function errorNodeUnsupported() {
	console.error(`\
Node.js v${process.versions.node} is not supported by Moons!
Please upgrade Node.js to a supported version: "${engines}"\n`);

	const ci = typeof require !== 'undefined' ? require('ci-info') : await import('ci-info');

	// Special instructions for CI environments, which may have special steps needed.
	// This is a common issue that we can help users with proactively.
	if (ci.isCI) {
		let platform;
		for (const [key, value] of Object.entries(ci)) {
			if (value === true) {
				platform = key;
				break;
			}
		}
		console.log(
			`${ci.name} CI Environment Detected!\nAdditional steps may be needed to set your Node.js version:`
		);
		// console.log(`Documentation: `);
		if (CI_INSTRUCTIONS[platform]) {
			console.log(`${ci.name} Documentation: ${CI_INSTRUCTIONS[platform]}`);
		}
		console.log(``);
	}

	process.exit(1);
}

main()
	.then(() => process.exit(0))
	.catch(() => process.exit(1));
