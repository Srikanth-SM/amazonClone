# curl -v --url http://localhost:8080/product/ \
#     -d name="Apple Laptop" \
#     -d price=224000 \
#     -d category=Laptop

curl -v --url http://localhost:8080/cart/ \
    -d productId=2 \
    -d quantity=1