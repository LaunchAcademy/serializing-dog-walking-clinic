const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/serializing_dog_walking_development",
      test: "postgres://postgres:postgres@localhost:5432/serializing_dog_walking_test",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
