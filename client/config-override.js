module.exports = function override(config, env) {
    // Add the fallback
    config.resolve.fallback = {
      ...config.resolve.fallback, // Include the existing fallback configuration
      "url": require.resolve("url")
    };
  
    return config;
  };
  