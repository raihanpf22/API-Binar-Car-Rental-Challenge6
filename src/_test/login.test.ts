import app from "../../app";
import request from "supertest";

describe("POST / - Login Module", () => {
  it("Should response with 200 as status code", async () => {
    const payload = {
      email: "raihanpambagyo@gmail.com",
      password: "P@ssw0rd",
    };

    return request(app)
      .post("/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.data).not.toEqual(null);
      });
  });
});
