curl --include --request POST "http://localhost:3000/folders" \
  --header "Authorization: Token token=D5Sh+9mABD3Kv0taW6pLw3G5R+R3yUpr09Y8xA0o/zc=--iUq3QoZ3EQz7Yq04D4xgCLuPEvtvb5W2m4uoxI2E/2k=" \
  --header "Content-Type: application/json" \
  --data '{
    "folder": {
      "name": "folder name",
      "description": "folder description",
      "path": "folder path"
    }
  }'

  #token=D5Sh+9mABD3Kv0taW6pLw3G5R+R3yUpr09Y8xA0o/zc=--iUq3QoZ3EQz7Yq04D4xgCLuPEvtvb5W2m4uoxI2E/2k=
