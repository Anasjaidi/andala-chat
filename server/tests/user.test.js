const request = require("supertest");
const app = require("./../app");

let authToken;

describe("start sign up tests", () => {
	it("test with missid arguments [name, email, etc.]", async () => {
		const response = await request(app).post("/api/v1/user/signup").send({
			firstName: "anas",
			email: "email",
		});

		expect(response.statusCode).toBe(400);

		expect(response.body.status).toBe("fail");

		expect(response.body.message).toBe(
			"please provide [firstName, lastName, password, email]"
		);
	});

	it("test with existed email", async () => {
		const response = await request(app).post("/api/v1/user/signup").send({
			firstName: "anas",
			email: "anas.jaidi@icloud.com",
			lastName: "last",
			password: "pass",
		});

		expect(response.statusCode).toBe(400);

		expect(response.body.status).toBe("fail");

		expect(response.body.message).toBe("email, need to be unique.");
	});

	it("test with valid infos", async () => {
		const infos = {
			firstName: "anas",
			email: `anas.jaiddli${new Date().getMilliseconds()}@icloud.com`,
			lastName: "last",
			password: "pass",
		};

		const response = await request(app).post("/api/v1/user/signup").send(infos);

		expect(response.statusCode).toBe(201);

		expect(response.body.status).toBe("success");

	});
});

describe("start sign in tests", () => {
	it("test with incorrect email or password", async () => {
		const response = await request(app).post("/api/v1/user/signin").send({
			email: "anas.sjaidi@icloud.com",
			password: "last",
		});

		expect(response.statusCode).toBe(400);

		expect(response.body.status).toBe("fail");

		expect(response.body.message).toBe("email, or password not valid");
	});

	it("test with misiing fields", async () => {
		const response = await request(app).post("/api/v1/user/signin").send({
			email: "anas.sjaidi@icloud.com",
			lastName: "last",
		});

		expect(response.statusCode).toBe(400);

		expect(response.body.status).toBe("fail");

		expect(response.body.message).toBe("please provide email and password.");
	});

	it("test with correct user", async () => {
		const response = await request(app).post("/api/v1/user/signin").send({
			email: "anas.jaidi@icloud.com",
			password: "pass",
		});

		expect(response.statusCode).toBe(200);

		expect(response.body.status).toBe("success");

		expect(response.body.conversations.length).toBeGreaterThan(0);
		authToken = response.body.token;
	});
});

describe("test authentication", () => {
	it("test with no token", async () => {
		const response = await request(app).post("/api/v1/conversation/");

		expect(response.statusCode).toBe(401);
		expect(response.body.status).toBe("fail");
		expect(response.body.message).toBe("please provide a token.");
	});

	it("test with invalid token", async () => {
		const response = await request(app)
			.post("/api/v1/conversation/")
			.set("Authorization", `Bearer ${authToken + "invalid"}`);

		expect(response.statusCode).toBe(401);
		expect(response.body.status).toBe("fail");
		expect(response.body.message).toBe("invalid signature");
	});
	it("test with valid token", async () => {
		const response = await request(app)
			.post("/api/v1/conversation/")
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.statusCode).toBe(201);
		expect(response.body.status).toBe("success");
	});
});
