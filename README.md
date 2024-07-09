# TinyURL NestJS (Zookeeper, Cassandra)

The TinyURL project is designed to convert long URLs into short URLs. This allows for easier sharing and management of URLs.
![image](https://github.com/kryptonpust/tinyURL/assets/30733693/08c14c7a-a1ce-435d-91e8-b77e749fc9ac)

## Features

1. Create a short URL from a long URL.
2. Get the original URL from a short URL.
3. Redirect to the original URL from a short URL.
4. High availability and scalability using Cassandra.
5. Distributed synchronization and group services using Zookeeper.
6. Highly configurable using environment variables.
7. Unit tests using Jest.

Most of important feature is the ability to generate short URLs in a distributed environment using Zookeeper. This ensures that the short URLs are unique and consistent across multiple instances of the application.

With default configuration, it generates short URLs with a length of 6 characters using the characters `a-z`, `A-Z`, and `0-9`. 6 characters provide 56,800,235,584 (~56 billion) unique combinations, which should be sufficient for most use cases. However, you can customize the length and characters used to generate the short URLs by changing the environment variables.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Docker and Docker Compose.

## Getting Started(Development/Production)

To get started with the TinyURL project, follow these steps:

1. Clone this repository.
2. Navigate to the project directory: `cd tinyURL`
3. Run the following commands to start the development environment:

```bash
mkdir cassandra_data zookeeper_data # create persistent data directories for Cassandra and Zookeeper
chmod -R 777 cassandra_data zookeeper_data # set permissions for the data directories, cause we are running the containers as root (Optional, depending on your system)
cp apps/backend/.env.example apps/backend/.env # copy the environment file

### To start the development environment ###
docker-compose -f compose-dev.yaml up --build -d # start the development environment

### To start the production environment ###
docker-compose up --build -d # start the production environment
```

(Note: Cassandra and Zookeeper will take some time to start up. So, Ignore the connection errors related to the database and Zookeeper until they are up and running. They will go away once the services are up.)

## Usage

Once the application is running, you can access it through your swagger

- `http://localhost:5000/docs/api` (development)
- `http://localhost/docs/api` (production - nginx as reverse proxy)

You can also use the following endpoints:

- `POST /api/v1/create-short-url`: Create a new short URL.
- `GET /api/v1/get/:shortUID`: Get the original URL from a short URL.
- `GET /api/v1/redirect/:shortUID`: Redirect to the original URL from a short URL.

## Environment Variables

The following environment variables are available for the TinyURL project:

- `app_env`: The environment in which the application is running (development or production).
- `app_url`: The base URL for the application.
- `app_shortUIDLength`: The length of the short URL.
- `app_shortUIDChars` : The characters used to generate the short URL.

- `zookeeper_connectionStrings` : The connection strings for Zookeeper.
- `zookeeper_poolChunkSize` : The pool chunk size for Zookeeper.
- `zookeeper_counterPath` : The path for the counter in Zookeeper.

- `cassandra_contactPoints`: Specifies the contact points for Cassandra, including the hostname or IP address and port number.
- `cassandra_keyspace`: Specifies the keyspace to be used in Cassandra, which is similar to a database in relational databases.
- `cassandra_username`: Specifies the username for authentication with Cassandra.
- `cassandra_password`: Specifies the password for authentication with Cassandra.
- `cassandra_localDataCenter`: Specifies the local data center for Cassandra, which is used for data replication and fault tolerance.
- `cassandra_replicationFactor`: Specifies the replication factor for Cassandra, which determines the number of copies of data to be stored across the cluster.
- `cassandra_replicationStrategy`: Specifies the replication strategy for Cassandra, which determines how data is replicated across the cluster.
- `cassandra_migrationStrategy`: Specifies the migration strategy for Cassandra, which determines how schema changes are applied to the database.

## Unit Testing

To run the unit tests for the TinyURL project, follow these steps:

1. Navigate to the project directory: `cd tinyURL/apps/backend`
2. Run the following command to run the unit tests:

```bash
npm run test
```

This command will run the unit tests for the backend app and display the results in the terminal.

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

## Roadmap

- Add frontend app using React.
- Add authentication and authorization using JWT.
- Add rate limiting and request throttling.
- Add logging and monitoring using Winston and Prometheus.
- Add e23 tests using Supertest.

## Security

This project generates short URLs in a linear fashion using Zookeeper, which can be a security risk if the short URLs are predictable.

To mitigate this risk:

- one can use a random number picker to pick the next number from the local server reserved range.

- Another option is add suffix to the short URL, which can be a random string or a hash of the original URL. This will make the short URLs more secure and less predictable.

## Contributing

Contributions are welcome! If you would like to contribute to the TinyURL project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add your commit message'`
4. Push your changes to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request.

## Acknowledgements

This README is written with the help of co-pilot.
