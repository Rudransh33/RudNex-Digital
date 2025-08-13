# Hidden VEO3 Admin Endpoint

This document describes the hidden `/admin/veo3` endpoint in the RudnexDigital backend system.

## Overview

The VEO3 endpoint is a **hidden admin-only feature** that provides AI-powered video generation capabilities. It's not visible in public API documentation and requires proper admin authentication to access.

## Security

- **Hidden from public docs**: The endpoint is not included in FastAPI's automatic documentation
- **Admin authentication required**: Uses the same authentication system as other admin endpoints
- **Session-based or token-based auth**: Supports both cookie sessions and Bearer tokens

## Authentication Methods

### Method 1: Bearer Token
```bash
curl -X POST "http://localhost:8000/admin/veo3" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer rudnex-admin-2025" \
     -d '{"prompt":"Cinematic vampire scene","duration":8,"resolution":"1080p"}'
```

### Method 2: Session Cookie
1. First login to get admin session:
```bash
curl -X POST "http://localhost:8000/api/admin/login" \
     -d "username=admin&password=rudnex123" \
     -c cookies.txt
```

2. Then use the session for VEO3 requests:
```bash
curl -X POST "http://localhost:8000/admin/veo3" \
     -H "Content-Type: application/json" \
     -b cookies.txt \
     -d '{"prompt":"Cinematic vampire scene","duration":8}'
```

## API Endpoint

### POST `/admin/veo3`

**Request Body:**
```json
{
  "prompt": "string (required)",
  "duration": 5,
  "resolution": "720p",
  "style": "cinematic",
  "audio_enabled": true
}
```

**Parameters:**
- `prompt` (required): Text description of the video to generate
- `duration` (optional): Video duration in seconds (default: 5)
- `resolution` (optional): Video resolution (default: "720p")
- `style` (optional): Video style (default: "cinematic")
- `audio_enabled` (optional): Enable audio generation (default: true)

**Response:**
```json
{
  "status": "success",
  "message": "VEO3 video generation started for prompt: ...",
  "generation_id": 123,
  "settings": {
    "duration": 8,
    "resolution": "1080p",
    "style": "cinematic",
    "audio_enabled": true
  },
  "output_path": "/outputs/veo3_123_1234567890.mp4",
  "estimated_completion": "2-3 minutes"
}
```

## Testing

Run the test script to verify the endpoint works:

```bash
cd backend
python test_veo3.py
```

This will test both authorized and unauthorized access scenarios.

## Integration

The endpoint integrates with the existing content generation system:

1. **Database logging**: All VEO3 requests are logged in the `content_generations` table
2. **File management**: Generated videos are stored in the `outputs/` directory
3. **Analytics**: VEO3 generations appear in admin analytics dashboard

## Production Considerations

1. **Change default tokens**: Update `ADMIN_TOKEN` in environment variables
2. **HTTPS**: Always use HTTPS in production to protect authentication tokens
3. **Rate limiting**: Consider adding rate limiting for the VEO3 endpoint
4. **Actual VEO3 integration**: Replace the placeholder code with real VEO3 API calls

## Error Handling

The endpoint returns appropriate HTTP status codes:
- `200`: Success
- `401`: Unauthorized (invalid or missing authentication)
- `500`: Server error (generation failed)

## Example Usage

### Python
```python
import requests

headers = {
    "Authorization": "Bearer rudnex-admin-2025",
    "Content-Type": "application/json"
}

data = {
    "prompt": "Generate a cinematic vampire-themed teaser with dark atmosphere",
    "duration": 8,
    "resolution": "1080p",
    "style": "cinematic",
    "audio_enabled": True
}

response = requests.post(
    "http://localhost:8000/admin/veo3",
    headers=headers,
    json=data
)

print(response.json())
```

### JavaScript/Node.js
```javascript
const response = await fetch('http://localhost:8000/admin/veo3', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer rudnex-admin-2025',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Cinematic vampire scene',
    duration: 8,
    resolution: '1080p'
  })
});

const result = await response.json();
console.log(result);
```

## Troubleshooting

1. **401 Unauthorized**: Check your admin token or session
2. **500 Server Error**: Check server logs for detailed error messages
3. **Connection refused**: Ensure the backend server is running on port 8000

## Future Enhancements

- Add progress tracking for long-running generations
- Implement video preview generation
- Add batch processing capabilities
- Integrate with actual VEO3 API service
