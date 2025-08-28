#!/usr/bin/env python3
import sys
import json
import base64
import re

def decode_base64_content(content):
    decoded_bytes = base64.b64decode(content)
    return decoded_bytes.decode('utf-8')

def extract_blog_post_content(github_content):
    pattern = r'export const blogPostContent\s*=\s*(\[.*?\]);'
    match = re.search(pattern, github_content, re.DOTALL)
    
    if not match:
        return {"blogPostContent": []}
    
    array_content = match.group(1)
    blog_posts = json.loads(array_content)
    
    return {
        "blogPostContent": blog_posts,
        "rawContent": github_content
    }

def extract_blog_previews(github_content):
    pattern = r'export const blogPreviews\s*=\s*(\[.*?\]);'
    match = re.search(pattern, github_content, re.DOTALL)
    
    if not match:
        return {"blogPreviews": []}
    
    array_content = match.group(1)
    blog_previews = json.loads(array_content)
    
    return {
        "blogPreviews": blog_previews,
        "rawContent": github_content
    }

def main():
    if len(sys.argv) < 3:
        print("Usage: python extract_github_content.py <content_type> <base64_content>")
        sys.exit(1)
    
    content_type = sys.argv[1]
    base64_content = sys.argv[2]
    
    try:
        decoded_content = decode_base64_content(base64_content)
        
        if content_type == "blogPostContent":
            result = extract_blog_post_content(decoded_content)
        elif content_type == "blogPreviews":
            result = extract_blog_previews(decoded_content)
        else:
            raise ValueError(f"Unknown content type: {content_type}")
        
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
