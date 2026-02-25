// try...catch...finally

function bootNavigation(maploaded) {
  try {
    console.log(`Is navigation loaded: ${maploaded}`);
    if (!maploaded) {
      throw new Error("Map was not passed in this function");
    }
    return `Nav_Ok`;
  } catch (error) {
    console.log(error);
    console.log(`Navigation Failed: ${error.message}`);
  } finally {
    console.log("Navigation sequence completed");
  }
}

// const status1 = bootNavigation(true);
const status1 = bootNavigation(false);
console.log(`Result: ${status1}`);
