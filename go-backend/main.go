package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

var client *redis.Client

type inputVar struct {
	InputString string `json:"inputString"`
}

func fPost(c *gin.Context) {

	var newInput inputVar
	if err := c.BindJSON(&newInput); err != nil {
		return
	}

	stInput := newInput.InputString
	h := sha256.New()
	if len(stInput) < 8 {
		c.IndentedJSON(http.StatusCreated, -1)
		return
	}

	h.Write([]byte(stInput))
	sha1_hash := hex.EncodeToString(h.Sum(nil))

	err := client.Set(sha1_hash, stInput, 0).Err()
	if err != nil {
		fmt.Println(err)
	}
	c.IndentedJSON(http.StatusCreated, sha1_hash)
}

func fGet(c *gin.Context) {
	shaInput := c.Param("shaInput")
	val, err := client.Get(shaInput).Result()
	if err != nil {
		c.IndentedJSON(http.StatusCreated, "not exist")
		return
	}
	c.IndentedJSON(http.StatusCreated, val)
}

func main() {

	r := gin.Default()
	client = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	pong, err := client.Ping().Result()
	fmt.Println(err, pong)

	r.POST("/go/sha256", fPost)
	r.GET("/go/sha256/:shaInput", fGet)

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
