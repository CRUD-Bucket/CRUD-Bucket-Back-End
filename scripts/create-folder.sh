curl --include --request POST "http://localhost:3000/folders" \
  --header "Authorization: Token token=o2rBHSPMd89G3oUGac4Y4j6jnU4An7znNdmIMUZ1zM4=--Mj2FjXrkmw7mhdP0ScBfj5wZi4HxiR+x94GBwMq7Gy4=" \
  --header "Content-Type: application/json" \
  --data '{
    "folder": {
      "name": "folder name",
      "description": "folder description",
      "path": "folder path"
    }
  }'

  #token=D5Sh+9mABD3Kv0taW6pLw3G5R+R3yUpr09Y8xA0o/zc=--iUq3QoZ3EQz7Yq04D4xgCLuPEvtvb5W2m4uoxI2E/2k=
