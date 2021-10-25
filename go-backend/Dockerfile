FROM golang:1.17.2 

WORKDIR /home/go-backend

COPY ./go.mod .
COPY ./go.sum .
COPY ./main.go . 

RUN go mod download
