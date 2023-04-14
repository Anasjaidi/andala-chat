const request = require("supertest");
const app = require("./../app");

let authToken;

let cnvId;

let newCnvId

describe("start conversation tests", () => {
	it("test getting all conversation for a user", async () => {
		const response = await request(app).post("/api/v1/user/signin").send({
			email: "anas.jaidi@icloud.com",
			password: "pass",
		});

		expect(response.statusCode).toBe(200);

		expect(response.body.status).toBe("success");

		authToken = response.body.token;

		const conversations = await request(app)
			.get("/api/v1/conversation/")
			.set("Authorization", `Bearer ${authToken}`);

		expect(conversations.statusCode).toBe(200);
		expect(conversations.body.status).toBe("success");
		expect(conversations.body.result).toBeGreaterThan(0);

		cnvId = conversations.body.data[0].uid;
	});

	it("test getting all message in a conversation", async () => {
		const response = await request(app)
			.get(`/api/v1/conversation/${cnvId}`)
			.set("Authorization", `Bearer ${authToken}`);

		expect(response.statusCode).toBe(200);
	});

	it("test getting all message in a unexsisted conversation", async () => {
		const response = await request(app)
			.get(`/api/v1/conversation/${cnvId + "t"}`)
			.set("Authorization", `Bearer ${authToken}`);


		expect(response.statusCode).toBe(404);
		expect(response.body.status).toBe("fail");
		expect(response.body.message).toBe("conversation not found.");
	});

  it('test adding new conversation', async  () => {
    const response = await request(app)
			.post(`/api/v1/conversation/`)
			.set("Authorization", `Bearer ${authToken}`);

      expect(response.statusCode).toBe(201);
			expect(response.body.status).toBe("success");
			expect(response.body.data.title).toBe("new conversation");

      newCnvId = response.body.data.uid;
  });

  it('test adding new message', async () => {
    const response = await request(app)
			.post(`/api/v1/conversation/${newCnvId}`)
			.set("Authorization", `Bearer ${authToken}`)
      .send({
        content: "hi chatgpt reply with only yes + anas jaidi"
      });


		expect(response.statusCode).toBe(201);
		expect(response.body.status).toBe("success");
		expect(response.body.data.type).toBe("assistant");
		expect(response.body.data.content).toBe("Yes, Anas Jaidi.");
		expect(response.body.data.conversation_uid).toBe(newCnvId);
  });
  
  it('test delete unexist conversation', async  () => {
    const response = await request(app)
			.delete(`/api/v1/conversation/${newCnvId+"t"}`)
			.set("Authorization", `Bearer ${authToken}`)
      
      expect(response.statusCode).toBe(404)
  });
  
  it('test delete  conversation', async  () => {
    const response = await request(app)
			.delete(`/api/v1/conversation/${newCnvId}`)
			.set("Authorization", `Bearer ${authToken}`)
      
      expect(response.statusCode).toBe(204)
  });

  it('test update unexist conversation', async  () => {
    const response = await request(app)
			.patch(`/api/v1/conversation/${cnvId + "t"}`)
			.set("Authorization", `Bearer ${authToken}`)
			.send({
				title: "science",
			});
      
      expect(response.statusCode).toBe(404)
  });
  
  it('test update  conversation', async  () => {
    const response = await request(app)
			.patch(`/api/v1/conversation/${cnvId}`)
			.set("Authorization", `Bearer ${authToken}`)
      .send({
        title: 'science'
      })
      
      expect(response.statusCode).toBe(200)
      expect(response.body.data.title).toBe('science')
  });
  
  it('test update  conversation with missing params', async  () => {
    const response = await request(app)
			.patch(`/api/v1/conversation/${cnvId}`)
			.set("Authorization", `Bearer ${authToken}`)
      .send({
        // title: 'science'
      })
      
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe("please provide a title");
  });
  

  

});
