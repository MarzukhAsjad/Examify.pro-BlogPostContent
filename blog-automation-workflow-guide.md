# Blog Automation Workflow Guide

## Overview

This guide describes a simplified blog content automation system that uses Google Drive as a content management interface and GitHub Actions for automated deployment. The system is designed for users who can code and edit TypeScript files, providing a streamlined workflow from content creation to live website updates.

## 🎯 Four-Phase Implementation Strategy

### Phase 1: Complete TypeScript File Upload
**Goal**: Upload entire TypeScript files to trigger complete blog rebuilds

**Process**:
1. User uploads complete `blogPostContent.ts` or `blogPreviews.ts` files to Google Drive
2. Manual trigger in n8n workflow downloads the file from Google Drive
3. n8n workflow pushes the file content to GitHub repository
4. GitHub push action triggers automatic build and deployment of the updated blog

**Use Case**: When you want to completely replace all blog content or make major structural changes

### Phase 2: Partial TypeScript Content Upload
**Goal**: Upload specific blog post content to append to existing files

**Process**:
1. User uploads TypeScript code snippets for new blog posts to Google Drive
2. Manual trigger in n8n workflow downloads the file from Google Drive
3. n8n workflow merges new content with existing files
4. n8n workflow pushes updated files to GitHub repository
5. GitHub push action triggers automatic build and deployment with new content

**Use Case**: When adding new blog posts without replacing existing content

### Phase 3: JSON File Upload
**Goal**: Upload structured JSON data that gets converted to TypeScript

**Process**:
1. User uploads JSON files with blog post data to Google Drive
2. Manual trigger in n8n workflow downloads the JSON file
3. n8n workflow converts JSON to TypeScript format
4. n8n workflow pushes updated TypeScript files to GitHub repository
5. GitHub push action triggers automatic build and deployment

**Use Case**: When content creators prefer JSON format or when integrating with external content management systems

### Phase 4: Google Docs Natural Language Upload
**Goal**: Upload Google Docs that get processed into structured blog content

**Process**:
1. User uploads Google Docs with natural language blog content to Google Drive
2. Manual trigger in n8n workflow downloads the Google Doc
3. n8n workflow processes content and converts to JSON
4. n8n workflow converts JSON to TypeScript format
5. n8n workflow pushes updated TypeScript files to GitHub repository
6. GitHub push action triggers automatic build and deployment

**Use Case**: When content creators prefer writing in natural language without technical knowledge

## 🏗️ Technical Architecture

### Core Components

#### 1. Google Drive Integration
- **Purpose**: Content upload interface
- **Setup**: Configure webhook to monitor specific folder
- **Supported Formats**: 
  - Phase 1: `.ts` files
  - Phase 2: `.ts` code snippets
  - Phase 3: `.json` files
  - Phase 4: Google Docs

#### 2. n8n Workflow
- **Purpose**: Automated processing and file management
- **Triggers**: Manual execution
- **Actions**: File processing, TypeScript generation, GitHub repository updates

#### 3. Content Processing Engine
- **Purpose**: Convert various input formats to TypeScript
- **Capabilities**: JSON parsing, natural language processing, TypeScript generation

#### 4. Repository Management
- **Purpose**: Version control and file management
- **Files**: `data/blogPostContent.ts`, `data/blogPreviews.ts`
- **Operations**: Overwrite, merge, append

## 📋 Implementation Guide

### Prerequisites

1. **Google Drive Setup**
   - Create a dedicated folder for blog content uploads
   - Configure webhook permissions
   - Set up API credentials

2. **GitHub Repository Setup**
   - Enable GitHub Actions
   - Configure repository secrets
   - Set up deployment permissions

3. **Content Structure Understanding**
   - Familiarity with TypeScript syntax
   - Understanding of blog post data structure
   - Knowledge of JSON format (for Phase 3+)

### Phase 1 Implementation

#### Google Drive Configuration
```bash
# Create content folder structure
content/
├── blogPostContent.ts
├── blogPreviews.ts
└── uploads/
```

#### n8n Workflow Configuration
```json
{
  "name": "Blog Content Automation",
  "nodes": [
    {
      "parameters": {},
      "name": "Manual Trigger",
      "type": "n8n-nodes-base.manualTrigger"
    },
    {
      "parameters": {
        "resource": "fileFolder",
        "queryString": "blogPostContent.ts",
        "filter": {
          "folderId": "YOUR_GOOGLE_DRIVE_FOLDER_ID"
        }
      },
      "name": "Search for blogPostContent.ts",
      "type": "n8n-nodes-base.googleDrive"
    },
    {
      "parameters": {
        "operation": "download",
        "fileId": "={{ $json.id }}"
      },
      "name": "Download file from Google Drive",
      "type": "n8n-nodes-base.googleDrive"
    },
    {
      "parameters": {
        "resource": "file",
        "operation": "edit",
        "owner": "YOUR_GITHUB_USERNAME",
        "repository": "YOUR_REPOSITORY_NAME",
        "filePath": "data/blogPostContent.ts",
        "binaryData": true,
        "commitMessage": "Auto-update blog content from Google Drive"
      },
      "name": "Update file in GitHub",
      "type": "n8n-nodes-base.github"
    }
  ]
}
```

### Phase 2 Implementation

#### Content Snippet Format
```typescript
// blogPostContent-snippet.ts
export const newBlogPost: BlogPostContent = {
  slug: 'new-blog-post',
  title: 'New Blog Post Title',
  date: '2025-01-20',
  authors: ['Author Name'],
  tags: ['tag1', 'tag2'],
  image: '/image.jpg',
  excerpt: 'Blog post excerpt...',
  content: 'Blog post content...',
  richContent: [...]
};
```

#### Merge Logic
```yaml
- name: Merge Content
  run: |
    # Extract new content and merge with existing
    node -e "
      const fs = require('fs');
      const newContent = require('./uploaded_file.ts');
      const existingContent = require('./data/blogPostContent.ts');
      
      // Merge logic here
      const mergedContent = [...existingContent.blogPostContent, newContent.newBlogPost];
      
      // Generate updated TypeScript file
      const output = \`export const blogPostContent = \${JSON.stringify(mergedContent, null, 2)};\`;
      fs.writeFileSync('data/blogPostContent.ts', output);
    "
```

### Phase 3 Implementation

#### JSON Input Format
```json
{
  "type": "blogPostContent",
  "content": {
    "slug": "new-blog-post",
    "title": "New Blog Post Title",
    "date": "2025-01-20",
    "authors": ["Author Name"],
    "tags": ["tag1", "tag2"],
    "image": "/image.jpg",
    "excerpt": "Blog post excerpt...",
    "content": "Blog post content..."
  }
}
```

#### JSON to TypeScript Conversion
```yaml
- name: Convert JSON to TypeScript
  run: |
    node -e "
      const fs = require('fs');
      const input = JSON.parse(fs.readFileSync('uploaded_file.json', 'utf8'));
      
      if (input.type === 'blogPostContent') {
        const existingContent = require('./data/blogPostContent.ts');
        const newPost = input.content;
        
        // Add to existing content
        existingContent.blogPostContent.push(newPost);
        
        // Generate TypeScript output
        const output = \`export const blogPostContent = \${JSON.stringify(existingContent.blogPostContent, null, 2)};\`;
        fs.writeFileSync('data/blogPostContent.ts', output);
      }
    "
```

### Phase 4 Implementation

#### Google Docs Processing
```yaml
- name: Process Google Docs
  run: |
    # Download Google Docs content
    curl -H "Authorization: Bearer ${{ secrets.GOOGLE_DRIVE_TOKEN }}" \
         "https://docs.googleapis.com/v1/documents/${{ github.event.client_payload.doc_id }}" \
         -o doc_content.json
    
    # Convert to structured data
    node -e "
      const fs = require('fs');
      const doc = JSON.parse(fs.readFileSync('doc_content.json', 'utf8'));
      
      // Extract content and metadata
      const content = doc.body.content.map(block => block.paragraph?.elements?.[0]?.textRun?.content || '').join('');
      
      // Generate blog post structure
      const blogPost = {
        slug: generateSlug(doc.title),
        title: doc.title,
        date: new Date().toISOString().split('T')[0],
        authors: ['Content Creator'],
        tags: extractTags(content),
        image: '/default-image.jpg',
        excerpt: extractExcerpt(content),
        content: content
      };
      
      // Convert to TypeScript and update files
      const existingContent = require('./data/blogPostContent.ts');
      existingContent.blogPostContent.push(blogPost);
      
      const output = \`export const blogPostContent = \${JSON.stringify(existingContent.blogPostContent, null, 2)};\`;
      fs.writeFileSync('data/blogPostContent.ts', output);
    "
```

## 🔧 Setup Instructions

### 1. Google Drive Webhook Setup

```bash
# Create webhook endpoint
curl -X POST https://api.github.com/repos/OWNER/REPO/dispatches \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "event_type": "google-drive-upload",
    "client_payload": {
      "file_id": "GOOGLE_DRIVE_FILE_ID",
      "file_name": "blogPostContent.ts"
    }
  }'
```

### 2. GitHub Repository Configuration

```yaml
# .github/workflows/blog-automation.yml
name: Blog Automation
on:
  repository_dispatch:
    types: [google-drive-upload]
  workflow_dispatch:

env:
  GOOGLE_DRIVE_TOKEN: ${{ secrets.GOOGLE_DRIVE_TOKEN }}
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

jobs:
  process-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Process Uploaded Content
        run: |
          # Implementation based on phase
          echo "Processing ${{ github.event.client_payload.file_name }}"
```

### 3. Environment Variables

```bash
# Required secrets in GitHub repository
GOOGLE_DRIVE_TOKEN=your_google_drive_api_token
GOOGLE_DOCS_TOKEN=your_google_docs_api_token
CONTENT_FOLDER_ID=your_google_drive_folder_id
```

## 📁 File Structure

```
your-blog-repo/
├── .github/
│   └── workflows/
│       └── blog-automation.yml
├── data/
│   ├── blogPostContent.ts
│   └── blogPreviews.ts
├── docs/
│   └── blog-automation-workflow-guide.md
└── README.md
```

## 🚀 Usage Examples

### Phase 1: Complete File Upload
1. Edit your `blogPostContent.ts` file locally
2. Upload the complete file to Google Drive
3. System automatically updates the repository
4. Website rebuilds with new content

### Phase 2: Content Snippet Upload
1. Create a TypeScript snippet with new blog post
2. Upload to Google Drive with specific naming convention
3. System merges with existing content
4. Website updates with new post

### Phase 3: JSON Upload
1. Create JSON file with blog post data
2. Upload to Google Drive
3. System converts to TypeScript and updates
4. Website rebuilds automatically

### Phase 4: Google Docs Upload
1. Write blog post in Google Docs
2. Upload document to Google Drive
3. AI processes content and converts to structured data
4. Website updates with new content

## 🔍 Monitoring and Debugging

### Logs and Notifications
- GitHub Actions execution logs
- Google Drive webhook delivery status
- Email notifications for successful updates
- Error alerts for failed processing

### Common Issues
1. **Authentication Errors**: Check API tokens and permissions
2. **File Format Issues**: Verify TypeScript/JSON syntax
3. **Merge Conflicts**: Handle content conflicts automatically
4. **Build Failures**: Validate generated TypeScript code

## 🔄 Migration Path

### From Current System
1. **Phase 1**: Start with complete file uploads
2. **Phase 2**: Add partial content support
3. **Phase 3**: Introduce JSON format
4. **Phase 4**: Add natural language processing

### Testing Strategy
1. Test each phase with sample content
2. Validate TypeScript output
3. Verify website functionality
4. Monitor performance and reliability

## 📈 Future Enhancements

### Advanced Features
- Content validation and sanitization
- Image processing and optimization
- SEO metadata generation
- Social media integration
- Analytics and reporting

### Integration Possibilities
- CMS integration (WordPress, Contentful)
- E-commerce platforms
- Newsletter systems
- Social media automation

---

This simplified workflow provides a powerful yet accessible way to manage blog content through Google Drive while maintaining the benefits of automated deployment and version control through GitHub Actions.
