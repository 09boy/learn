import express from 'express';

const app = express();

app.get('*', (req, rep) => {
	rep.set('Content-Type', 'text/html');
	// rep.sendFile()
});

const server = {
	start: () => {
		console.log('start server...');
	}
};

export { server };
