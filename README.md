# Cartzilla API

A Spring Boot REST API for the Cartzilla e-commerce platform with PostgreSQL database running in Docker.

## Prerequisites

Before you begin, ensure you have the following installed:

- Java 17 or higher
- Maven 3.6 or higher
- Docker and Docker Compose
- Git (optional, for version control)

## Project Setup

### 1. Clone or Create the Project

If you're starting fresh, create a new Spring Boot project with the following dependencies:

- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Spring Boot DevTools (optional)
- Lombok (optional)
- Spring Boot Actuator (optional)

### 2. PostgreSQL Docker Setup

Create a `docker-compose.yml` file in the root of your project:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: cartzilla-postgres
    environment:
      POSTGRES_DB: cartzilla_db
      POSTGRES_USER: cartzilla_user
      POSTGRES_PASSWORD: cartzilla_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - cartzilla-network

volumes:
  postgres_data:

networks:
  cartzilla-network:
    driver: bridge
```

### 3. Start the PostgreSQL Container

Run the following command in your project root directory:

```bash
docker-compose up -d
```

To verify the container is running:

```bash
docker ps
```

To view container logs:

```bash
docker logs cartzilla-postgres
```

### 4. Configure Application Properties

Update your `src/main/resources/application.properties` or `application.yml`:

**For application.properties:**

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/cartzilla_db
spring.datasource.username=cartzilla_user
spring.datasource.password=cartzilla_pass
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Connection Pool Configuration
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

**For application.yml:**

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/cartzilla_db
    username: cartzilla_user
    password: cartzilla_pass
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
  
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

### 5. Update Maven Dependencies

Ensure your `pom.xml` includes the necessary dependencies:

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Spring Boot DevTools (Optional) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>

    <!-- Lombok (Optional) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- Spring Boot Starter Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## Running the Application

### Start the Application

**Using Maven:**

```bash
./mvnw spring-boot:run
```

**Using Maven (Windows):**

```bash
mvnw.cmd spring-boot:run
```

**Using Java:**

```bash
./mvnw clean package
java -jar target/cartzilla-api-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## Database Management

### Stop the PostgreSQL Container

```bash
docker-compose down
```

### Stop and Remove All Data

```bash
docker-compose down -v
```

### Access PostgreSQL CLI

```bash
docker exec -it cartzilla-postgres psql -U cartzilla_user -d cartzilla_db
```

### Useful PostgreSQL Commands

Once inside the PostgreSQL CLI:

```sql
-- List all databases
\l

-- Connect to database
\c cartzilla_db

-- List all tables
\dt

-- Describe a table
\d table_name

-- Exit
\q
```

## Troubleshooting

### Port Already in Use

If port 5432 is already in use, modify the ports mapping in `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"
```

Then update your application.properties:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/cartzilla_db
```

### Connection Refused

Ensure the PostgreSQL container is running:

```bash
docker ps
```

Check container logs for errors:

```bash
docker logs cartzilla-postgres
```

### Database Schema Issues

If you need to reset the database, you can set:

```properties
spring.jpa.hibernate.ddl-auto=create
```

**Warning:** This will drop and recreate tables on every restart. Use `update` or `validate` in production.

## Development Workflow

1. Start PostgreSQL container: `docker-compose up -d`
2. Run the Spring Boot application: `./mvnw spring-boot:run`
3. Make your changes
4. Test your endpoints
5. Stop the application: `Ctrl + C`
6. Stop PostgreSQL (optional): `docker-compose down`

## Production Considerations

Before deploying to production:

- Change `spring.jpa.hibernate.ddl-auto` to `validate` or `none`
- Use environment variables for sensitive data (database credentials)
- Set up proper database migrations using Flyway or Liquibase
- Configure proper connection pooling
- Enable SSL for database connections
- Set up database backups
- Use Docker secrets for sensitive information

## Additional Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Data JPA Documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

[//]: # (## License)

[//]: # ()
[//]: # ([Add your license information here])

[//]: # ()
[//]: # (## Contributors)

[//]: # ()
[//]: # ([Add contributor information here])