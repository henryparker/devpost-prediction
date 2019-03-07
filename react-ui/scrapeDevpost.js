/* eslint-disable no-loop-func */
// ##### CONFIGURATION VARIABLES ######

const NUM_PROJECTS = 50;
const OUTPUT_FILE = 'devpost.csv';






// ##### SCRAPING CODE #####

const fs = require('fs');
const requestPromise = require('request-promise');
const $ = require('cheerio');


const baseUrl = 'https://devpost.com/software/newest';
const pageEnd = 1 + Math.floor(NUM_PROJECTS / 24);

let csvData = "title,shortpitch,description";

const addEntry = function(title, shortpitch, description) {
	csvData += "\n";
	csvData += `${JSON.stringify(title)},${JSON.stringify(shortpitch)},${JSON.stringify(description)}`;
}
let hackLinks = [];

const deepWalk = (obj) => {
	let res = "";
	if (!obj)
		return res;
	else if (obj.type !== 'text') {
		for (let child of obj.children) {
			res += deepWalk(child);
		}
	}
	else
		res += obj.data;
	return res;
}

const linkPromises = [];
const processLinks = () => {
	hackLinks.forEach((link) => {
		linkPromises.push((async (link) => {
			const linkHtml = await requestPromise(link);
			const titleParse = $('#app-title', linkHtml)[0];
			const title = titleParse.children[0].data.trim();
			const shortpitch = titleParse.next.next.children[0].data.trim();
			const descriptionParse = $('#app-details-left > div', linkHtml);
			let description = "";
			for (let child in descriptionParse) {
				if (!descriptionParse[child].attribs.id) {
					description = deepWalk(descriptionParse[child]).trim();
					break;
				}
			}
			addEntry(title, shortpitch, description);
		})(link));
	});
}

const writeCsv = () => {
	fs.writeFile(OUTPUT_FILE, csvData, (err) => {
		if (err)
			throw err;
		console.log('finished');
	});
}

let pagePromises = [];
for (let i = 1; i <= pageEnd; i++) {
	pagePromises.push((async (i) => {
		const pageHtml = await requestPromise(baseUrl + '?page=' + i);
		const parse = $('.gallery-item > a', pageHtml);
		for (let key in parse) {
			if (!isNaN(key))
				hackLinks.push(parse[key].attribs.href);
		}
	})(i));
}

Promise.all(pagePromises).then(() => {
	processLinks();
	Promise.all(linkPromises).then(writeCsv);
});