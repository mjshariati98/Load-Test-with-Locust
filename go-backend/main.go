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

type InputVar struct {
	InputString string `json:"inputString"`
}

func isRedisDown() bool {
	pong, err := client.Ping().Result()
	fmt.Println(err, pong)
	return err != nil
}

func fPost(c *gin.Context) {
	if isRedisDown() {
		c.IndentedJSON(http.StatusInternalServerError, "Redis is Down.")
		return
	}

	var newInput InputVar
	if err := c.BindJSON(&newInput); err != nil {
		return
	}

	stInput := newInput.InputString
	h := sha256.New()
	if len(stInput) < 8 {
		c.IndentedJSON(http.StatusBadRequest, "String length must be greater than 7.")
		return
	}

	h.Write([]byte(stInput))
	sha1_hash := hex.EncodeToString(h.Sum(nil))

	err := client.Set(sha1_hash, stInput, 0).Err()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
		return
	}
	c.IndentedJSON(http.StatusCreated, sha1_hash)
}

func fGet(c *gin.Context) {
	if isRedisDown() {
		c.IndentedJSON(http.StatusInternalServerError, "Redis is Down.")
		return
	}

	shaInput := c.Query("shaInput")

	val, err := client.Get(shaInput).Result()
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, "Not exists.")
		return
	}
	c.IndentedJSON(http.StatusOK, val)
}

func main() {

	router := gin.Default()

	client = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	router.POST("/go/sha256", fPost)
	router.GET("/go/sha256", fGet)

	router.Run()
}
