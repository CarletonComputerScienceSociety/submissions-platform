# Submissions Platform

## Setup

To set up the Submissions Platform, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/submissions-platform.git
```

2. Navigate to the project directory:

```bash
cd submissions-platform
```

3. Install the required dependencies:

```bash
npm install
```

4. Add a `.env` and `.env.test` file it your root with the following configurations:

```bash
PORT=3000
DATABASE_URL="./db/dev.db"
```

```bash
PORT=3000
DATABASE_URL="./db/test.db"
```

5. Run database setup commands

```bash
npm run db:push:dev
npm run db:push:test
```

6. Start the application:

```bash
npm run dev
```

That's it! You have successfully set up the Submissions Platform on your local machine.
