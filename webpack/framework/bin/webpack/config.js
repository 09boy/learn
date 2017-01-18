import { resolve } from 'path';
import webpack from 'webpack';


/**
 * @pages <String | Object>
 * @vendors <Array>
 * desc: to create a single page application when pages argument is String.
 *			 If pages argument is Object to create multi page application.
 * refLink: https://webpack.js.org/concepts/entry-points/
 */
const getEntry = (pages, vendors) => {
	let entry = {};
	if (typeof pages === 'object') { for (let point in pages) {
			entry[point] = [];
		}
		return entry;
	}

	// return { bundle: [ resolve() ], ...entry};
};

const configuration = config => {
	// const config = {};

	return {
		// entry: getEntry()
	}

};

export const webpackConfigFun = configuration
