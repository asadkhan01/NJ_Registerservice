
let data = ["1. this is one", "2. This is two", "3. This is three"];

function test (group) {

return data. filter ((gp) => gp.substr(0, 1) == group)[0];
}

console.log(test("2"));