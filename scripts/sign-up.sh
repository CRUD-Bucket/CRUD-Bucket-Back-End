#!/bin/bash

curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "f",
      "password": "f",
      "password_confirmation": "f"
    }
  }'
