# TinyURL NestJS (Zookeeper, Cassandra)

The TinyURL project is designed to convert long URLs into short URLs. This allows for easier sharing and management of URLs.
![image](https://github.com/kryptonpust/tinyURL/assets/30733693/08c14c7a-a1ce-435d-91e8-b77e749fc9ac)



## Getting Started

To get started with the TinyURL project, follow these steps:

1. Clone this repository.
2. Navigate to the project directory: `cd tinyURL`
3. Run the following commands to start the development environment:

```bash
mkdir cassandra_data zookeeper_data # create persistent data directories for Cassandra and Zookeeper
chmod -R 777 cassandra_data zookeeper_data # set permissions for the data directories, cause we are running the containers as root (Optional, depending on your system)
cp apps/backend/.env.example apps/backend/.env # copy the environment file
docker-compose up -f compose-dev.yaml up --build -d # start the development environment
```

(Note: Cassandra and Zookeeper will take some time to start up. So, Ignore the connection errors related to the database and Zookeeper until they are up and running. They will go away once the services are up.)

## Usage

Once the application is running, you can access it through your swagger `http://localhost:5000/docs/api`. You can also use the following endpoints:

- `POST /api/v1/create-short-url`: Create a new short URL.
- `GET /api/v1/get/:shortUID`: Get the original URL from a short URL.
- `GET /api/v1/redirect/:shortUID`: Redirect to the original URL from a short URL.

## Technologies

## Backend

- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [Cassandra](https://cassandra.apache.org/): A distributed NoSQL database that provides high availability and scalability.
- [Zookeeper](https://zookeeper.apache.org/): A centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.
- [Jest](https://jestjs.io/): A JavaScript testing framework that provides a simple way to write tests.

# Frontend

- TODO

## Project Structure

The project has to apps, one for the frontend and one for the backend. The frontend app is located in the `apps/fronted` folder, while the backend app is located in the `apps/backend` folder.

The `apps/backend` folder contains the following files and folders:

1. `src`: Contains the source code for the backend app.
2. `Dockerfile`: Defines the Docker image for the backend app.
3. `package.json`: Contains the dependencies and scripts for the backend app.
4. `tsconfig.json`: Contains the TypeScript configuration for the backend app.
5. `nest-cli.json`: Contains the NestJS CLI configuration for the backend app.

The `backend/src` folder contains the following files and folders:

1. `main.ts`: Contains the entry point for the backend app.
2. `app.module.ts`: Contains the main module for the backend app.
3. `app.controller.ts`: Contains the controller for the backend app.
4. `app.service.ts`: Contains the service for the backend app.
5. `env-config.ts`: Contains the configuration for the backend app.
6. `database`: Contains the database configuration and entities for the backend app.
7. `tiny-uid`: Contains the utility service for generating short URLs.
8. `zookeeper`: Contains the Zookeeper service for the backend app.

Feel free to explore each folder to understand the project's structure and functionality.

## Contributing

Contributions are welcome! If you would like to contribute to the TinyURL project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add your commit message'`
4. Push your changes to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request.
