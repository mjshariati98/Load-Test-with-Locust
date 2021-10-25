from locust import HttpUser, task

class LoadTestUser(HttpUser):

    @task
    def Go(self):
        self.client.get(f"/go/sha256?shaInput={self.sha_input}", name="/go/sha256")

    @task
    def NodeJS(self):
        self.client.get(f"/node/sha256?shaInput={self.sha_input}", name="/node/sha256")

    def on_start(self):
        self.sha_input = self.client.post("/go/sha256", json={"InputString":"load-test"}).json()
