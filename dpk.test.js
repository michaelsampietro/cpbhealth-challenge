const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a sha3-512 hash if the input is a string", () => {
    const testStringKey = deterministicPartitionKey("test");
    const testStringHash =
      "0fa3727b22cbb0a5271dddfcb7d414a1a512284913ccd690b198751de8100b1ea1935c1b63c35837696f8e73709431de092894581bec9bbfe6532106733af6d8";
    expect(testStringKey).toBe(testStringHash);
  });

  it("Returns the partitionKey provided in event, if its present", () => {
    const eventPartitionKey = deterministicPartitionKey({
      partitionKey: "partitionKeyTest",
    });
    expect(eventPartitionKey).toBe("partitionKeyTest");
  });

  it("Returns the event hash if an object with no partitionKey prop is provided", () => {
    const customEventKey = deterministicPartitionKey({
      customProp: "partitionKeyTest",
    });

    const eventHash =
      "d6a45749fe6edcb55d0283d0df441b5fac24937b5f8e1014f1408d39495d4fc3e510f25d29aed39be35a8b5a52fefdea79a243871391ea35b82e734040ab21a5";
    expect(customEventKey).toBe(eventHash);
  });

  it("Returns the JSON of an event, if the partitionKey prop is not a string", () => {
    const customEventKeyWithNumber = deterministicPartitionKey({
      partitionKey: 123,
    });

    const customEventWithObject = deterministicPartitionKey({
      partitionKey: {
        foo: "bar"
      },
    });

    expect(customEventKeyWithNumber).toBe("123");
    expect(customEventWithObject).toBe(`{"foo":"bar"}`);

  });
});
