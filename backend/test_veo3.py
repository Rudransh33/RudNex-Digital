#!/usr/bin/env python3
"""
Test script for the hidden VEO3 admin endpoint
This demonstrates how to call the /admin/veo3 endpoint with proper authentication
"""

import requests
import json
import time

# Configuration
BASE_URL = "http://localhost:8000"
ADMIN_TOKEN = "rudnex-admin-2025"  # Default from config, change in production

def test_veo3_endpoint():
    """Test the hidden VEO3 endpoint with admin authentication"""
    
    # Method 1: Using Bearer Token Authentication
    print("=== Testing VEO3 Endpoint with Bearer Token ===")
    
    headers = {
        "Authorization": f"Bearer {ADMIN_TOKEN}",
        "Content-Type": "application/json"
    }
    
    data = {
        "prompt": "Generate a cinematic vampire-themed teaser with dark atmosphere",
        "duration": 8,
        "resolution": "1080p",
        "style": "cinematic",
        "audio_enabled": True
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/admin/veo3",
            headers=headers,
            json=data
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
    
    print("\n" + "="*50 + "\n")
    
    # Method 2: Using cURL equivalent
    print("=== cURL Command Equivalent ===")
    curl_command = f'''curl -X POST "{BASE_URL}/admin/veo3" \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer {ADMIN_TOKEN}" \\
     -d '{json.dumps(data)}' '''
    
    print(curl_command)
    
    print("\n" + "="*50 + "\n")
    
    # Method 3: Python requests with session (for cookie-based auth)
    print("=== Testing with Session-based Authentication ===")
    
    session = requests.Session()
    
    # First, login to get admin session cookie
    login_data = {
        "username": "admin",
        "password": "rudnex123"
    }
    
    try:
        login_response = session.post(
            f"{BASE_URL}/api/admin/login",
            data=login_data,
            allow_redirects=False
        )
        
        if login_response.status_code == 303:  # Redirect after successful login
            print("Login successful, testing VEO3 endpoint with session...")
            
            # Now test VEO3 endpoint with session cookies
            response = session.post(
                f"{BASE_URL}/admin/veo3",
                json=data
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
            
        else:
            print(f"Login failed: {login_response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"Session request failed: {e}")

def test_unauthorized_access():
    """Test that unauthorized access is properly blocked"""
    
    print("=== Testing Unauthorized Access ===")
    
    # Try without authentication
    data = {
        "prompt": "This should fail",
        "duration": 5
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/admin/veo3",
            json=data
        )
        
        print(f"Unauthorized Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    print("VEO3 Admin Endpoint Test Script")
    print("Make sure the backend server is running on http://localhost:8000")
    print("="*50)
    
    # Test unauthorized access first
    test_unauthorized_access()
    
    print("\n" + "="*50 + "\n")
    
    # Test authorized access
    test_veo3_endpoint()
    
    print("\nTest completed!")
