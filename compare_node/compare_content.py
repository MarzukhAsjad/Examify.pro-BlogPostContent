#!/usr/bin/env python3
import sys
import json
import re

def extract_snippet_object(snippet_content):
    cleaned = snippet_content.strip().rstrip(';')
    
    if 'export const newBlogPost' in cleaned:
        pattern = r'export const newBlogPost\s*=\s*(\{.*?\});'
        match = re.search(pattern, cleaned, re.DOTALL)
        if match:
            object_str = match.group(1)
            json_str = re.sub(r'(\w+):', r'"\1":', object_str)
            json_str = re.sub(r',\s*}', '}', json_str)
            json_str = re.sub(r',\s*]', ']', json_str)
            return json.loads(json_str)
    
    if cleaned.startswith('{') and cleaned.endswith('}'):
        json_str = re.sub(r'(\w+):', r'"\1":', cleaned)
        json_str = re.sub(r',\s*}', '}', json_str)
        json_str = re.sub(r',\s*]', ']', json_str)
        return json.loads(json_str)
    
    raise ValueError("Invalid snippet format")

def extract_preview_object(snippet_content):
    cleaned = snippet_content.strip().rstrip(';')
    
    if 'export const newBlogPreview' in cleaned:
        pattern = r'export const newBlogPreview\s*=\s*(\{.*?\});'
        match = re.search(pattern, cleaned, re.DOTALL)
        if match:
            object_str = match.group(1)
            json_str = re.sub(r'(\w+):', r'"\1":', object_str)
            json_str = re.sub(r',\s*}', '}', json_str)
            json_str = re.sub(r',\s*]', ']', json_str)
            return json.loads(json_str)
    
    if cleaned.startswith('{') and cleaned.endswith('}'):
        json_str = re.sub(r'(\w+):', r'"\1":', cleaned)
        json_str = re.sub(r',\s*}', '}', json_str)
        json_str = re.sub(r',\s*]', ']', json_str)
        return json.loads(json_str)
    
    raise ValueError("Invalid snippet format")

def check_duplicate_slug(existing_content, new_slug):
    existing_slugs = [item.get('slug', '') for item in existing_content]
    return new_slug in existing_slugs

def compare_blog_post_content(github_content, snippet_content):
    pattern = r'export const blogPostContent\s*=\s*(\[.*?\]);'
    match = re.search(pattern, github_content, re.DOTALL)
    
    if not match:
        existing_posts = []
    else:
        array_content = match.group(1)
        existing_posts = json.loads(array_content)
    
    new_post = extract_snippet_object(snippet_content)
    
    if check_duplicate_slug(existing_posts, new_post.get('slug', '')):
        return {
            "hasChanges": False,
            "error": f"Blog post with slug '{new_post.get('slug', '')}' already exists",
            "existingCount": len(existing_posts),
            "newPost": new_post
        }
    
    for existing_post in existing_posts:
        if existing_post.get('slug') == new_post.get('slug'):
            if json.dumps(existing_post, sort_keys=True) == json.dumps(new_post, sort_keys=True):
                return {
                    "hasChanges": False,
                    "message": "Content is identical",
                    "existingCount": len(existing_posts),
                    "newPost": new_post
                }
    
    merged_posts = existing_posts + [new_post]
    
    return {
        "hasChanges": True,
        "existingCount": len(existing_posts),
        "newCount": len(merged_posts),
        "newPost": new_post,
        "mergedContent": merged_posts
    }

def compare_blog_previews(github_content, snippet_content):
    pattern = r'export const blogPreviews\s*=\s*(\[.*?\]);'
    match = re.search(pattern, github_content, re.DOTALL)
    
    if not match:
        existing_previews = []
    else:
        array_content = match.group(1)
        existing_previews = json.loads(array_content)
    
    new_preview = extract_preview_object(snippet_content)
    
    if check_duplicate_slug(existing_previews, new_preview.get('slug', '')):
        return {
            "hasChanges": False,
            "error": f"Blog preview with slug '{new_preview.get('slug', '')}' already exists",
            "existingCount": len(existing_previews),
            "newPreview": new_preview
        }
    
    for existing_preview in existing_previews:
        if existing_preview.get('slug') == new_preview.get('slug'):
            if json.dumps(existing_preview, sort_keys=True) == json.dumps(new_preview, sort_keys=True):
                return {
                    "hasChanges": False,
                    "message": "Content is identical",
                    "existingCount": len(existing_previews),
                    "newPreview": new_preview
                }
    
    merged_previews = existing_previews + [new_preview]
    
    return {
        "hasChanges": True,
        "existingCount": len(existing_previews),
        "newCount": len(merged_previews),
        "newPreview": new_preview,
        "mergedContent": merged_previews
    }

def main():
    if len(sys.argv) < 4:
        print("Usage: python compare_content.py <content_type> <github_content> <snippet_content>")
        sys.exit(1)
    
    content_type = sys.argv[1]
    github_content = sys.argv[2]
    snippet_content = sys.argv[3]
    
    try:
        if content_type == "blogPostContent":
            result = compare_blog_post_content(github_content, snippet_content)
        elif content_type == "blogPreviews":
            result = compare_blog_previews(github_content, snippet_content)
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
