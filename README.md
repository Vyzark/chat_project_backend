# Live Chat API

This is a basic API for a Live Chat application.

## Features

- Basic Express server setup
- CORS enabled
- Environment configuration with `.env` support

#### Development mode

To start the server in development mode with `nodemon`, which will automatically restart the server on file changes, run:

```bash
npm run dev
```

### Available Scripts

- **start**: Runs `node index.js` to start the server.
- **dev**: Runs `nodemon index.js` to start the server in development mode with automatic restarts on file changes.

### Project Structure

    ├── src
    │   ├── app.js          # Express app configuration
    │   ├── models          # Data models
    │   ├── controllers     # Route controllers
    │   ├── routes          # Application routes
    ├── .env                # Environment variables
    ├── index.js           # Server creation and configuration
    ├── package.json        # Project metadata and dependencies

### Contributing

Feel free to submit issues and pull requests to improve the project. For major changes, please open an issue first to discuss what you would like to change.

### License

This project is licensed under the ISC License - see the LICENSE file for details.
