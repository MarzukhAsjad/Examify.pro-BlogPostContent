#!/usr/bin/env python3
"""
Extract and decode content from GitHub files
"""

import sys
import json
import base64
import re
from typing import Dict, Any, Optional

def decode_base64_content(content: str) -> str:
    """Decode base64 content from GitHub API response"""
    try:
        decoded_bytes = base64.b64decode(content)
        return decoded_bytes.decode('utf-8')
    except Exception as e:
        raise ValueError(f"Failed to decode base64 content: {e}")

def extract_blog_post_content(github_content: str) -> Dict[str, Any]:
    """Extract blog post content from GitHub file"""
    try:
        # Find the blogPostContent array
        pattern = r'export const blogPostContent\s*=\s*(\[.*?\]);'
        match = re.search(pattern, github_content, re.DOTALL)
        
        if not match:
            return {"blogPostContent": []}
        
        # Extract the array content
        array_content = match.group(1)
        
        # Parse as JSON
        blog_posts = json.loads(array_content)
        
        return {
            "blogPostContent": blog_posts,
            "rawContent": github_content
        }
    except Exception as e:
        raise ValueError(f"Failed to extract blog post content: {e}")

def extract_blog_previews(github_content: str) -> Dict[str, Any]:
    """Extract blog previews from GitHub file"""
    try:
        # Find the blogPreviews array
        pattern = r'export const blogPreviews\s*=\s*(\[.*?\]);'
        match = re.search(pattern, github_content, re.DOTALL)
        
        if not match:
            return {"blogPreviews": []}
        
        # Extract the array content
        array_content = match.group(1)
        
        # Parse as JSON
        blog_previews = json.loads(array_content)
        
        return {
            "blogPreviews": blog_previews,
            "rawContent": github_content
        }
    except Exception as e:
        raise ValueError(f"Failed to extract blog previews: {e}")

def main():
    """Main function to process GitHub content"""
    if len(sys.argv) < 3:
        print("Usage: python extract_github_content.py <content_type> <base64_content>")
        print("content_type: 'blogPostContent' or 'blogPreviews'")
        sys.exit(1)
    
    content_type = sys.argv[1]
    base64_content = sys.argv[2]
    
    try:
        # Decode the base64 content
        decoded_content = decode_base64_content(base64_content)
        
        # Extract content based on type
        if content_type == "blogPostContent":
            result = extract_blog_post_content(decoded_content)
        elif content_type == "blogPreviews":
            result = extract_blog_previews(decoded_content)
        else:
            raise ValueError(f"Unknown content type: {content_type}")
        
        # Output as JSON
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        error_result = {
            "error": str(e),
            "content_type": content_type
        }
        print(json.dumps(error_result, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()
