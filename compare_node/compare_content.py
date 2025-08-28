#!/usr/bin/env python3
"""
Compare content between GitHub files and Google Drive snippets
"""

import sys
import json
import re
from typing import Dict, Any, List, Tuple

def extract_snippet_object(snippet_content: str) -> Dict[str, Any]:
    """Extract object from snippet content"""
    try:
        # Remove any trailing semicolon and whitespace
        cleaned = snippet_content.strip().rstrip(';')
        
        # If it's already an export statement, extract the object
        if 'export const newBlogPost' in cleaned:
            pattern = r'export const newBlogPost\s*=\s*(\{.*?\});'
            match = re.search(pattern, cleaned, re.DOTALL)
            if match:
                object_str = match.group(1)
                # Convert to valid JSON
                json_str = re.sub(r'(\w+):', r'"\1":', object_str)
                json_str = re.sub(r',\s*}', '}', json_str)
                json_str = re.sub(r',\s*]', ']', json_str)
                return json.loads(json_str)
        
        # If it's a raw object, wrap it and extract
        if cleaned.startswith('{') and cleaned.endswith('}'):
            # Convert to valid JSON
            json_str = re.sub(r'(\w+):', r'"\1":', cleaned)
            json_str = re.sub(r',\s*}', '}', json_str)
            json_str = re.sub(r',\s*]', ']', json_str)
            return json.loads(json_str)
        
        raise ValueError("Invalid snippet format")
        
    except Exception as e:
        raise ValueError(f"Failed to extract snippet object: {e}")

def extract_preview_object(snippet_content: str) -> Dict[str, Any]:
    """Extract preview object from snippet content"""
    try:
        # Remove any trailing semicolon and whitespace
        cleaned = snippet_content.strip().rstrip(';')
        
        # If it's already an export statement, extract the object
        if 'export const newBlogPreview' in cleaned:
            pattern = r'export const newBlogPreview\s*=\s*(\{.*?\});'
            match = re.search(pattern, cleaned, re.DOTALL)
            if match:
                object_str = match.group(1)
                # Convert to valid JSON
                json_str = re.sub(r'(\w+):', r'"\1":', object_str)
                json_str = re.sub(r',\s*}', '}', json_str)
                json_str = re.sub(r',\s*]', ']', json_str)
                return json.loads(json_str)
        
        # If it's a raw object, wrap it and extract
        if cleaned.startswith('{') and cleaned.endswith('}'):
            # Convert to valid JSON
            json_str = re.sub(r'(\w+):', r'"\1":', cleaned)
            json_str = re.sub(r',\s*}', '}', json_str)
            json_str = re.sub(r',\s*]', ']', json_str)
            return json.loads(json_str)
        
        raise ValueError("Invalid snippet format")
        
    except Exception as e:
        raise ValueError(f"Failed to extract preview object: {e}")

def check_duplicate_slug(existing_content: List[Dict], new_slug: str) -> bool:
    """Check if slug already exists in existing content"""
    existing_slugs = [item.get('slug', '') for item in existing_content]
    return new_slug in existing_slugs

def compare_blog_post_content(github_content: str, snippet_content: str) -> Dict[str, Any]:
    """Compare blog post content between GitHub and snippet"""
    try:
        # Extract existing blog posts from GitHub
        pattern = r'export const blogPostContent\s*=\s*(\[.*?\]);'
        match = re.search(pattern, github_content, re.DOTALL)
        
        if not match:
            existing_posts = []
        else:
            array_content = match.group(1)
            existing_posts = json.loads(array_content)
        
        # Extract new blog post from snippet
        new_post = extract_snippet_object(snippet_content)
        
        # Check for duplicate slug
        if check_duplicate_slug(existing_posts, new_post.get('slug', '')):
            return {
                "hasChanges": False,
                "error": f"Blog post with slug '{new_post.get('slug', '')}' already exists",
                "existingCount": len(existing_posts),
                "newPost": new_post
            }
        
        # Check if content is identical (compare with existing posts)
        for existing_post in existing_posts:
            if existing_post.get('slug') == new_post.get('slug'):
                if json.dumps(existing_post, sort_keys=True) == json.dumps(new_post, sort_keys=True):
                    return {
                        "hasChanges": False,
                        "message": "Content is identical",
                        "existingCount": len(existing_posts),
                        "newPost": new_post
                    }
        
        # Content is different, needs to be merged
        merged_posts = existing_posts + [new_post]
        
        return {
            "hasChanges": True,
            "existingCount": len(existing_posts),
            "newCount": len(merged_posts),
            "newPost": new_post,
            "mergedContent": merged_posts
        }
        
    except Exception as e:
        return {
            "hasChanges": False,
            "error": f"Failed to compare blog post content: {e}"
        }

def compare_blog_previews(github_content: str, snippet_content: str) -> Dict[str, Any]:
    """Compare blog previews between GitHub and snippet"""
    try:
        # Extract existing blog previews from GitHub
        pattern = r'export const blogPreviews\s*=\s*(\[.*?\]);'
        match = re.search(pattern, github_content, re.DOTALL)
        
        if not match:
            existing_previews = []
        else:
            array_content = match.group(1)
            existing_previews = json.loads(array_content)
        
        # Extract new blog preview from snippet
        new_preview = extract_preview_object(snippet_content)
        
        # Check for duplicate slug
        if check_duplicate_slug(existing_previews, new_preview.get('slug', '')):
            return {
                "hasChanges": False,
                "error": f"Blog preview with slug '{new_preview.get('slug', '')}' already exists",
                "existingCount": len(existing_previews),
                "newPreview": new_preview
            }
        
        # Check if content is identical (compare with existing previews)
        for existing_preview in existing_previews:
            if existing_preview.get('slug') == new_preview.get('slug'):
                if json.dumps(existing_preview, sort_keys=True) == json.dumps(new_preview, sort_keys=True):
                    return {
                        "hasChanges": False,
                        "message": "Content is identical",
                        "existingCount": len(existing_previews),
                        "newPreview": new_preview
                    }
        
        # Content is different, needs to be merged
        merged_previews = existing_previews + [new_preview]
        
        return {
            "hasChanges": True,
            "existingCount": len(existing_previews),
            "newCount": len(merged_previews),
            "newPreview": new_preview,
            "mergedContent": merged_previews
        }
        
    except Exception as e:
        return {
            "hasChanges": False,
            "error": f"Failed to compare blog previews: {e}"
        }

def main():
    """Main function to compare content"""
    if len(sys.argv) < 4:
        print("Usage: python compare_content.py <content_type> <github_content> <snippet_content>")
        print("content_type: 'blogPostContent' or 'blogPreviews'")
        sys.exit(1)
    
    content_type = sys.argv[1]
    github_content = sys.argv[2]
    snippet_content = sys.argv[3]
    
    try:
        # Compare content based on type
        if content_type == "blogPostContent":
            result = compare_blog_post_content(github_content, snippet_content)
        elif content_type == "blogPreviews":
            result = compare_blog_previews(github_content, snippet_content)
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
