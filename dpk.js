const { createHash } = require("crypto");

/**
 * This function gets the candidate partitionKey based on
 * @param {string|null|{partitionKey: any}} event an event with a string, or an object with a partitionKey property or null
 * @returns the partition key based on the event or an empty string if no event is provided.
 */
function getCandidatePartitionKey(event) {
  if (!event) return "";

  const { partitionKey } = event;

  if (!partitionKey) {
    const data = JSON.stringify(event);
    return createHash("sha3-512").update(data).digest("hex");
  }

  if (typeof partitionKey !== "string") {
    return JSON.stringify(partitionKey);
  }

  return partitionKey;
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  const candidate = getCandidatePartitionKey(event);

  if (!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
