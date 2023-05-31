const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a sha3-512 hash if the input is a string", () => {
    const testStringKey = deterministicPartitionKey("test");
    const expectedOutput =
      "0fa3727b22cbb0a5271dddfcb7d414a1a512284913ccd690b198751de8100b1ea1935c1b63c35837696f8e73709431de092894581bec9bbfe6532106733af6d8";
    expect(testStringKey).toBe(expectedOutput);
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

    const expectedOutput =
      "d6a45749fe6edcb55d0283d0df441b5fac24937b5f8e1014f1408d39495d4fc3e510f25d29aed39be35a8b5a52fefdea79a243871391ea35b82e734040ab21a5";
    expect(customEventKey).toBe(expectedOutput);
  });

  it("Returns the JSON of an event, if the partitionKey prop is not a string", () => {
    const customEventKeyWithNumber = deterministicPartitionKey({
      partitionKey: 123,
    });

    const customEventWithObject = deterministicPartitionKey({
      partitionKey: {
        foo: "bar",
      },
    });

    expect(customEventKeyWithNumber).toBe("123");
    expect(customEventWithObject).toBe(`{"foo":"bar"}`);
  });

  it("Returns the hash of the string if event partitionKey string is larger than 256, ", () => {
    const eventWithLargePartitionKey = deterministicPartitionKey({
      partitionKey:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
    });

    const expectedOutput =
      "a4eea13607be4f97b282c2cc375350ae8fcd149abe2998b2686bf5d1e2473f3aa54551deb21fd5445b6d87e80a4b90d4f19ea9a8ea315dbe70cfa37343afe5be";

    expect(eventWithLargePartitionKey).toBe(expectedOutput);
  });
});
