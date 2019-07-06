package main

import (
	"os"
	"fmt"
	"io/ioutil"
)

func main() {
	switch(os.Args[1]) {
	case "auth-config":
		config := os.Getenv("FIREBASE_CONFIG")
		if config == "" {
			fmt.Println("Could not complete task. No FIREBASE_CONFIG env variable present.")
			return
		}
		ioutil.WriteFile("./src/secret_auth_config.json", []byte(config), 0777)
		break
	}
}