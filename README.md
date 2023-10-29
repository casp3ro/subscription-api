1. docker compose up --build
2. npm run api
3. npm run migration:run

Subscription activated:
curl -X POST -H "Content-Type: application/json" -d '{"event": "subscription-activated", "data": {"subscription_id": 1}}' http://localhost:3000/webhook

Subscription cancelled:
curl -X POST -H "Content-Type: application/json" -d '{"event": "subscription-cancelled", "data": {"subscription_id": 1}}' http://localhost:3000/webhook

Subscription inactivated:
curl -X POST -H "Content-Type: application/json" -d '{"event": "subscription-inactivated", "data": {"subscription_id": 1}}' http://localhost:3000/webhook

psql -h localhost -p 5432 -U postgres -d postgres
