curl --include --request POST "http://localhost:3000/folders" \
  --header "Authorization: Token token=RC6tF8ImUF4k6cUPesUOnhkNX+HncO9unjGyukV6ylQ=--ylI/A25PIIiMpnl+M8sw2SgbTjr8BtINKUM+fs32IOU=" \
  --header "Content-Type: application/json" \
  --data '{
    "folder": {
      "name": "folder name2",
      "description": "folder description2",
      "path": "folder path2"
    }
  }'

  #token=RC6tF8ImUF4k6cUPesUOnhkNX+HncO9unjGyukV6ylQ=--ylI/A25PIIiMpnl+M8sw2SgbTjr8BtINKUM+fs32IOU=
  #id:57c9ee4e67c11dd53cb2d845
