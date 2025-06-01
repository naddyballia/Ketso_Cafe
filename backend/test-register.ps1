$body = @{
    username = "teststaff"
    password = "password123"
    role = "waitstaff"
    restaurant_id = 1
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/register" -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json 