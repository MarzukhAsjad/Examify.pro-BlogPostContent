#!/usr/bin/env python3
"""
Test script for Claude API with custom endpoint
Tests both completion and chat completion formats
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
API_BASE_URL = "https://chat.cloudapi.vip/v1"
API_KEY = "sk-0OWSqUxHysj4ne4EE7F2HedZHw5QZEkTG6R7Wp7Otvelk7Xv"
MODEL = "claude-sonnet-4-20250514-thinking"

# Headers
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def test_chat_completion():
    """Test chat completion format (messages array)"""
    print("🔍 Testing Chat Completion Format...")
    
    url = f"{API_BASE_URL}/chat/completions"
    
    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Hello! Please respond with 'API is working correctly' if you can see this message."
            }
        ],
        "temperature": 0.3,
        "max_tokens": 100
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Chat Completion Test PASSED")
            print(f"Response: {json.dumps(result, indent=2)}")
            return True
        else:
            print("❌ Chat Completion Test FAILED")
            print(f"Error Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Chat Completion Test ERROR: {str(e)}")
        return False

def test_completion():
    """Test completion format (prompt field)"""
    print("\n🔍 Testing Completion Format...")
    
    url = f"{API_BASE_URL}/completions"
    
    payload = {
        "model": MODEL,
        "prompt": "Hello! Please respond with 'API is working correctly' if you can see this message.",
        "temperature": 0.3,
        "max_tokens": 100
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Completion Test PASSED")
            print(f"Response: {json.dumps(result, indent=2)}")
            return True
        else:
            print("❌ Completion Test FAILED")
            print(f"Error Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Completion Test ERROR: {str(e)}")
        return False

def test_models_endpoint():
    """Test if we can list available models"""
    print("\n🔍 Testing Models Endpoint...")
    
    url = f"{API_BASE_URL}/models"
    
    try:
        response = requests.get(url, headers=headers, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Models Test PASSED")
            print(f"Available Models: {json.dumps(result, indent=2)}")
            return True
        else:
            print("❌ Models Test FAILED")
            print(f"Error Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Models Test ERROR: {str(e)}")
        return False

def test_connection():
    """Test basic connection to the API"""
    print("\n🔍 Testing Basic Connection...")
    
    try:
        # Test with a simple GET request
        response = requests.get(API_BASE_URL, timeout=10)
        print(f"Connection Status Code: {response.status_code}")
        
        if response.status_code in [200, 401, 403, 404]:
            print("✅ Connection Test PASSED - Server is reachable")
            return True
        else:
            print(f"❌ Connection Test FAILED - Unexpected status: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Test FAILED - Cannot connect to server")
        return False
    except Exception as e:
        print(f"❌ Connection Test ERROR: {str(e)}")
        return False

def main():
    """Main test function"""
    print("🚀 Claude API Test Script")
    print("=" * 50)
    print(f"API Base URL: {API_BASE_URL}")
    print(f"Model: {MODEL}")
    print(f"API Key: {API_KEY[:10]}...{API_KEY[-4:]}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)
    
    results = []
    
    # Test 1: Basic connection
    results.append(test_connection())
    
    # Test 2: Models endpoint
    results.append(test_models_endpoint())
    
    # Test 3: Chat completion
    results.append(test_chat_completion())
    
    # Test 4: Completion
    results.append(test_completion())
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    tests = ["Connection", "Models", "Chat Completion", "Completion"]
    for i, (test, result) in enumerate(zip(tests, results)):
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{i+1}. {test}: {status}")
    
    passed = sum(results)
    total = len(results)
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your API key is working correctly.")
        return 0
    elif passed > 0:
        print("⚠️  Some tests passed. Check the failed tests above.")
        return 1
    else:
        print("💥 All tests failed. Please check your API key and endpoint.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
