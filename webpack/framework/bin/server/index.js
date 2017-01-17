import express from 'express';
import fs from 'path';

const app = express();

app.get('*', (req, rep) => {
	rep.set('Content-Type', 'text/html');
	rep.sendFile(fs.resolve(__dirname, '..', '..', 'bin/template.html'));
});

const server = {
	start: () => {
		app.listen('3000', () => {
			console.log('start server...');
		});
	}
};

export { server };
